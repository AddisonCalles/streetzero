import { GameEvents } from './events';
import { GameEventProvider, UIEventProvider } from './providers';

export abstract class Game {
  private _UIEvents: UIEventProvider;
  private _play = false;
  private _level = 0;
  private _context: CanvasRenderingContext2D | null;
  private _points = 0;
  private _mainRunner: any;
  private _canvas: HTMLCanvasElement;
  private _gameover = false;
  private _fps = 1;
  private _fpsCounter = 0;
  private _time: number = 0;
  private _initTime: number = 0;
  private _lastTime: number = 0;
  private _speed: number = 60;
  private _GameEvents: GameEventProvider;
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._UIEvents = new UIEventProvider(canvas);
    this._GameEvents = new GameEventProvider();
    this.initMouseEvents();
    this.initGameEvent();
  }

  private initMouseEvents() {
    this._UIEvents.onClick((e: any) => this.onFire && this.onFire(e));
    this._UIEvents.onKeyDown((e: any) => this.onKeyDown && this.onKeyDown(e));
    this._UIEvents.onKeyUp((e: any) => this.onKeyUp && this.onKeyUp(e));
    this._UIEvents.onMouseMove(
      (e: any) => this.onMouseMove && this.onMouseMove(e)
    );
    this._UIEvents.onTouchStart(
      (e: any) => this.onTouchStart && this.onTouchStart(e)
    );
    this._UIEvents.onTouchCancel(
      (e: any) => this.onTouchCancel && this.onTouchCancel(e)
    );
  }

  private initGameEvent() {
    this._GameEvents.onStart(() => this.onStart && this.onStart());
    this._GameEvents.onStop(() => this.onStop && this.onStop());
    this._GameEvents.onRender(() => this.onRender && this.onRender());
    this._GameEvents.onGameOver(() => this.onGameOver && this.onGameOver());
    this._GameEvents.onPreNextLevel(
      () => this.onNexLevelPress && this.onNexLevelPress()
    );
    this._GameEvents.onNextLevel(() => this.onNextLevel && this.onNextLevel());
  }

  public clearCanvas() {
    if (this._context && this._canvas)
      this._context?.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
  }
  public play() {
    window.dispatchEvent(new Event(GameEvents.play));
    this._play = true;
  }
  public pause() {
    window.dispatchEvent(new Event(GameEvents.pause));
    this._play = false;
  }
  public nextLevel(sleepOffset = 0) {
    this._level++;
    window.dispatchEvent(new Event(GameEvents.prenextlevel));
    setTimeout(() => {
      window.dispatchEvent(new Event(GameEvents.nextlevel));
      this.onNextLevel?.();
    }, sleepOffset);
  }

  public start() {
    window.dispatchEvent(new Event(GameEvents.start));
    this._initTime = new Date().getTime();
    this.onPreload?.();
    this._mainRunner = setInterval(() => {
      this.clearCanvas();
      this.updateCounters();
      window.dispatchEvent(new Event(GameEvents.render));
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
    window.dispatchEvent(new Event(GameEvents.stop));
  }
  public incrementPoints(amount: number = 1) {
    return (this._points += amount);
  }

  //#region Abstracts Methods
  /**
   * @deprecated
   */
  protected abstract onStart?(): void;
  /**
   * @deprecated
   */
  protected abstract onStop?(): void;

  protected abstract onGameOver?(): void;
  /**
   * @deprecated use this._UIEvents.onClick
   */
  protected abstract onFire?(event: any): void;
  /**
   * @deprecated use this._UIEvents.onMouseMove
   */
  protected abstract onMouseMove?(event: any): void;

  protected abstract onPreload?(): void;
  /**
   * @deprecated use UIEventProvider.onRender
   */
  protected abstract onRender?(): void;
  /**
   * @deprecated use UIEventProvider.onTouchStart
   */
  protected abstract onTouchStart?(event: any): void;
  /**
   * @deprecated use UIEventProvider.onTouchCancel
   */
  protected abstract onTouchCancel?(event: any): void;
  /**
   * @deprecated use UIEventProvider.onTouchEnd
   */
  protected abstract onTouchEnd?(event: any): void;
  /**
   * @deprecated use UIEventProvider.onNextLevel
   */
  protected abstract onNextLevel?(): void;
  /**
   * @deprecated use UIEventProvider.onNexLevelPress
   */
  protected abstract onNexLevelPress?(): void;
  /**
   * @deprecated use UIEventProvider.onKeyDown
   */
  protected abstract onKeyDown?(event: any): void;
  /**
   * @deprecated use UIEventProvider.onKeyUp
   */
  protected abstract onKeyUp?(event: any): void;
  //#endregion

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
