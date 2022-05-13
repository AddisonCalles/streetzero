import { inject, singleton } from 'tsyringe';
import { GameEvents } from './events';
import { EventProvider } from './providers/event.provider';

@singleton()
export class Game {
  private _play = false;
  private _level = 0;
  private _points = 0;
  private _mainRunner: any;
  private _gameover = false;
  private _fps = 1;
  private _fpsCounter = 0;
  private _time: number = 0;
  private _initTime: number = 0;
  private _lastTime: number = 0;
  private _speed: number = 60;
  constructor(
    @inject('Canvas') private _canvas: HTMLCanvasElement,
    @inject('Context2D') private _context: CanvasRenderingContext2D,
    @inject(EventProvider) private eventProvider: EventProvider
  ) {
    if (!this.eventProvider) throw new Error('Event Provider not found..');
    this.eventProvider.registry(GameEvents.nextlevel);
    this.eventProvider.registry(GameEvents.start);
    this.eventProvider.registry(GameEvents.stop);
    this.eventProvider.registry(GameEvents.pause);
    this.eventProvider.registry(GameEvents.render);
    this.eventProvider.registry(GameEvents.prenextlevel);
  }
  public clearCanvas() {
    if (this._context && this._canvas)
      this._context?.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
  }
  public play() {
    this._play = true;
  }
  public pause() {
    this._play = false;
  }
  public nextLevel(sleepOffset = 0) {
    this.eventProvider.emit(GameEvents.prenextlevel, {
      next: this.level + 1,
      affter: this.level,
    });
    this._level++;
    setTimeout(() => {
      this.eventProvider.emit(GameEvents.nextlevel, { level: this.level });
    }, sleepOffset);
  }

  public start() {
    this.eventProvider.emit(GameEvents.start, {});
    this._initTime = new Date().getTime();
    this._mainRunner = setInterval(() => {
      this.clearCanvas();
      this.updateCounters();
      this.eventProvider.emit(GameEvents.render, {});
    }, 1000 / this.speed);
  }

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

  public stop() {
    clearInterval(this._mainRunner);
    this.eventProvider.emit(GameEvents.stop, {});
  }
  public incrementPoints(amount: number = 1) {
    return (this._points += amount);
  }

  get gameOver() {
    return this._gameover;
  }
  set gameOver(value: boolean) {
    this._gameover = value;
  }
  set speed(value) {
    this._speed = value;
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
  get canvas() {
    return this._canvas;
  }
}
