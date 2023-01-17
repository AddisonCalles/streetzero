import { GameEvents } from '../enums/game.event.enum';
import { Game } from '../interfaces/game.interface';
import { inject, injectable } from 'inversify';
import { DOMContext } from './dom.context.class';
import { HandController } from './hands/hand.controller';
@injectable()
export class zGame implements Game {
    private _play = false;
    private _level = 0;
    private _context: CanvasRenderingContext2D | null;
    private _points = 0;
    private _mainRunner: any;
    private _canvas: HTMLCanvasElement | null;
    private _gameover = false;
    private _fps = 1;
    private _fpsCounter = 0;
    private _time: number = 0;
    private _initTime: number = 0;
    private _lastTime: number = 0;
    private _speed: number = 60;
    constructor(@inject(DOMContext) context: DOMContext, @inject(HandController) private handDetection: HandController) {
        this._canvas = context.canvas;
        this._context = context.context;
    }

    public clearScreen() {
        if (this._context && this._canvas) this._context?.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
    }
    public play() {
        zGame.dispatchEvent(GameEvents.play);
        this._play = true;
    }
    public pause() {
        zGame.dispatchEvent(GameEvents.pause);
        this._play = false;
    }
    public nextLevel(sleepOffset = 0) {
        this._level++;
        zGame.dispatchEvent(GameEvents.prenextlevel);
        setTimeout(() => {
            zGame.dispatchEvent(GameEvents.nextlevel);
        }, sleepOffset);
    }
    public start() {
        zGame.dispatchEvent(GameEvents.preload);
        this._initTime = new Date().getTime();
        zGame.dispatchEvent(GameEvents.start);
        this._mainRunner = setInterval(async () => {
            this.clearScreen();
            this.updateCounters();
            if (this.handDetection?.isRunning) {
                await this.handDetection.analize();
            }
            zGame.dispatchEvent(GameEvents.render);
        }, 1000 / this.speed);
    }
    public stop() {
        clearInterval(this._mainRunner);
        zGame.dispatchEvent(GameEvents.stop);
    }
    public incrementPoints(amount: number = 1) {
        return (this._points += amount);
    }

    public static dispatchEvent(event: GameEvents) {
        document.dispatchEvent(new Event(event));
    }
    //#region getters
    get gameOver() {
        return this._gameover;
    }
    get points() {
        return this._points;
    }
    get level() {
        return this._level;
    }
    get isPlay() {
        return this._play;
    }
    get time() {
        return this._time;
    }
    get initTime() {
        return this._initTime;
    }
    get fps() {
        return this._fps;
    }
    get speed() {
        return this._speed;
    }
    get context() {
        return this._context;
    }
    //#endregion getters

    //#region setters
    set gameOver(value: boolean) {
        this._gameover = value;
    }
    set speed(value) {
        this._speed = value;
    }
    //#endregion setters

    private updateCounters() {
        const now = new Date().getTime();
        this._time = +((now - this._initTime) / 1000).toFixed(0);
        const milliSecondsDif = now - this._lastTime;
        if (milliSecondsDif >= 1000) {
            this._lastTime = new Date().getTime();
            this._fps = this._fpsCounter;
            this._fpsCounter = 0;
        }
        this._fpsCounter++;
    }

    public printDebug() {
        if (!this.context) return;
        this.context.font = '12px Arial';
        this.context.fillStyle = '#eeeee';
        this.context.fillText(`Level: ${this.level} | points: ${this.points}`, 15, 30);
        this.context.fillText(`fps: ${this.fps} | time: ${this.gameOver || this.time} seg`, 15, 15);
    }

    public runHandDetection() {
        this.handDetection.start();
    }
}
