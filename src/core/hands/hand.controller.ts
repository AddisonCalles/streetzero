import { Camera } from '@mediapipe/camera_utils';
import drawingUtils from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS, Hands, LandmarkConnectionArray, NormalizedLandmarkList, Results, VERSION } from '@mediapipe/hands';
import { inject, injectable } from 'inversify';
import { zDeviceDetector } from '../device.detector.class';
import { DOMContext } from '../dom.context.class';
import { HandFireEventDetector } from './application/events/HandFireEventDetector';
import { HandDetectedEventDetector } from './application/events/HandsDetectedEventDetector';
import { normalizePunto } from './application/helpers/lanmarks.helpers';
import { HandEventDetector } from './domain/HandEventDetector';
import { HandsEventDetails } from './domain/HandsEventDetails';
const config = {
    locateFile: (file: string) => {
        console.log(`https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}/${file}`);
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}/${file}`;
    },
};

const videoSize = { width: 1280, height: 720 };

/**
 * @version beta
 * Falta optimizar
 */
@injectable()
export class HandController {
    private eventDetectors: HandEventDetector[];
    private detector = new Hands(config);
    private camera?: Camera;
    private videoElement?: HTMLVideoElement;
    private context: CanvasRenderingContext2D;
    private contextHands: CanvasRenderingContext2D;
    private _isRunning = false;
    private canvas: HTMLCanvasElement;
    private _analize: boolean = true;
    constructor(@inject(DOMContext) context: DOMContext, @inject(zDeviceDetector) private deviceDetector: zDeviceDetector) {
        this.context = context.context!;
        this.canvas = context.canvas!;
        // legal values for client and os
        this.testSupport([{ client: 'Chrome' }]);
        this.eventDetectors = [new HandFireEventDetector(), new HandDetectedEventDetector()];

        this.contextHands = (document.querySelector('.landmark-grid-container') as HTMLCanvasElement).getContext('2d')!;
        this.detector.setOptions({
            selfieMode: true,
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
    }

    private testSupport(supportedDevices: { client?: string; os?: string }[]) {
        let isSupported = false;
        for (const device of supportedDevices) {
            if (device.client !== undefined) {
                const re = new RegExp(`^${device.client}$`);
                if (!re.test(this.deviceDetector.detector.client?.name || '')) {
                    continue;
                }
            }
            if (device.os !== undefined) {
                const re = new RegExp(`^${device.os}$`);
                if (!re.test(this.deviceDetector.detector.os?.name || '')) {
                    continue;
                }
            }
            isSupported = true;
            break;
        }

        if (!isSupported) {
            alert(`StreetZero detector de manos esta corriendo en  ${this.deviceDetector.detector.client?.name}/${this.deviceDetector.detector.os?.name}, ` + ` y actualmente no esta soportado, pero puedes continuar jugando con los controles habituales.`);
        }
    }

    public start() {
        this._isRunning = true;
        this.detector.onResults(this.onResults.bind(this));
        this.initializeCamera();
    }
    private clearCanvas(context: CanvasRenderingContext2D) {
        context.save();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    private onResults(results: Results): void {
        // console.log('onResult');
        // Hide the spinner.
        document.body.classList.add('loaded');
        this.contextHands.canvas.width = this.context.canvas.width;
        this.contextHands.canvas.height = this.context.canvas.height;

        this.clearCanvas(this.contextHands);
        this.contextHands.drawImage(results.image, 0, 0, this.canvas.width, this.canvas.height);
        const handEventsData: HandsEventDetails = {};
        if (results.multiHandLandmarks && results.multiHandedness) {
            for (let index = 0; index < results.multiHandLandmarks.length; index++) {
                const classification = results.multiHandedness[index];
                const isRightHand = classification.label === 'Right';
                const landmarks = results.multiHandLandmarks[index];
                const hand = { landmarks: landmarks.map((l) => normalizePunto(this.canvas, l)), score: classification.score };
                if (!isRightHand) {
                    this.renderHand(landmarks, HAND_CONNECTIONS, isRightHand);
                    const player = normalizePunto(this.canvas, landmarks[8]);
                    if (player.x > this.canvas.width) {
                        player.x = this.canvas.width;
                    } else if (player.x < 0) {
                        player.x = 0;
                    }
                    if (player.y > this.canvas.height) {
                        player.y = this.canvas.height;
                    } else if (player.y < 0) {
                        player.y = 0;
                    }
                    const event = new MouseEvent('mousemove', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: player.x,
                        clientY: player.y,
                    });
                    this.canvas.dispatchEvent(event);
                    handEventsData.left = hand;
                } else {
                    handEventsData.right = hand;
                }
                this.eventDetectors.forEach((detector) => {
                    const event = detector.detect(handEventsData, videoSize);
                    if (event) {
                        this.canvas.dispatchEvent(event);
                    }
                });
            }
        }
        this.contextHands.restore();
    }

    private renderHand(points: NormalizedLandmarkList, conections: LandmarkConnectionArray, isRightHand: boolean) {
        drawingUtils.drawConnectors(this.contextHands);
        drawingUtils.drawConnectors(this.contextHands, points, conections, { color: isRightHand ? '#00FF00' : '#FF0000' });
        drawingUtils.drawLandmarks(this.contextHands, points, {
            color: isRightHand ? '#00FF00' : '#FF0000',
            fillColor: isRightHand ? '#FF0000' : '#00FF00',
            radius: (data: drawingUtils.Data) => {
                return drawingUtils.lerp(data.from!.z!, -0.15, 0.1, 5, 1);
            },
        });
    }
    public async analize() {
        this._analize = true;
    }
    public get isRunning() {
        return this._isRunning;
    }
    private initializeCamera() {
        this.videoElement = document.createElement('video');
        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                if (this._analize) {
                    await this.detector.send({ image: this.videoElement! });
                    this._analize = false;
                }
            },
            width: videoSize.width,
            height: videoSize.height,
        });
        this.camera.start();
    }
}
