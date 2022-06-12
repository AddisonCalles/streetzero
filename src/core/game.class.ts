import { GameEvents } from '../enums/game.event.enum';
import { Game } from '../interfaces/game.interface';
import { injectable } from 'inversify';
import { DOMContext } from './dom.context.class';

@injectable()
export class MainGame implements Game {
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

  constructor(context: DOMContext) {
    this._canvas = context.canvas;
    this._context = context.context;
  }

  public clearScreen() {
    if (this._context && this._canvas)
      this._context?.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
  }
  public play() {
    MainGame.dispatchEvent(GameEvents.play);
    this._play = true;
  }
  public pause() {
    MainGame.dispatchEvent(GameEvents.pause);
    this._play = false;
  }
  public nextLevel(sleepOffset = 0) {
    this._level++;
    MainGame.dispatchEvent(GameEvents.prenextlevel);
    setTimeout(() => {
      MainGame.dispatchEvent(GameEvents.nextlevel);
    }, sleepOffset);
  }
  public start() {
    MainGame.dispatchEvent(GameEvents.start);
    this._initTime = new Date().getTime();
    MainGame.dispatchEvent(GameEvents.preload);
    this._mainRunner = setInterval(() => {
      this.clearScreen();
      this.updateCounters();
      MainGame.dispatchEvent(GameEvents.render);
    }, 1000 / this.speed);
  }
  public stop() {
    clearInterval(this._mainRunner);
    MainGame.dispatchEvent(GameEvents.stop);
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
}
