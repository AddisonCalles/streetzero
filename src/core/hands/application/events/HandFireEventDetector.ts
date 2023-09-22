import { distanceBetweenPoints } from '../../../../helpers/math';
import { HandEventDetector } from '../../domain/HandEventDetector';
import { HandsDomEvent } from '../../domain/HandsDomEvent';
import { HandsEventDetails } from '../../domain/HandsEventDetails';
import { HandsOptionsEvent } from '../../domain/HandsEventOptions';
import { distanciaApertura } from '../helpers/lanmarks.helpers';

export class HandFireEventDetector implements HandEventDetector {
    detect(landmarks: HandsEventDetails): HandsDomEvent | undefined {
        if (landmarks.left) {
            const leftHand = landmarks.left.landmarks;
            const d1 = distanceBetweenPoints(leftHand[0], leftHand[5]);
            const d2 = distanceBetweenPoints(leftHand[0], leftHand[17]);
            const unitLength = (d1 + d2) / 2;

            const activador = distanciaApertura(leftHand[3], leftHand[5], unitLength);
            const fire = activador <= 0.35;
            if (fire) {
                return new HandsDomEvent(HandsOptionsEvent.fire, landmarks);
            }
        }
        return;
    }
}
