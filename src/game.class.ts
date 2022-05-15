import { GameEvents } from './events';
import { DOMContext, getContext } from './helpers/dom';
import { MouseEventProvider } from './providers';
import { EventProvider } from './providers/event.provider';
export class Game {
  private static instance: Game | null = null;
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
  private constructor(reset: boolean = false) {
    this.initCanvas();
    EventProvider.getInstance(reset);
    MouseEventProvider.getInstance(reset);
    this._initEventRegistry();
  }

  public static getInstance(reload: boolean = false) {
    if (Game.instance == null || reload) {
      Game.instance = new Game(reload);
    }
    return Game.instance;
  }

  private _initEventRegistry() {
    //if (Game.EventRegistry) return;
    //if (!this.provider.keys.includes(GameEvents.nextlevel))
    EventProvider.getInstance().registry<any>(GameEvents.nextlevel);
    //if (!EventProvider.getInstance().keys.includes(GameEvents.start))
    EventProvider.getInstance().registry(GameEvents.start);
    //if (!EventProvider.getInstance().keys.includes(GameEvents.stop))
    EventProvider.getInstance().registry(GameEvents.stop);
    //if (!EventProvider.getInstance().keys.includes(GameEvents.pause))
    EventProvider.getInstance().registry(GameEvents.pause);
    //if (!EventProvider.getInstance().keys.includes(GameEvents.render))
    EventProvider.getInstance().registry(GameEvents.render);
    //if (!EventProvider.getInstance().keys.includes(GameEvents.prenextlevel))
    EventProvider.getInstance().registry(GameEvents.prenextlevel);
    //Game.EventRegistry = true;
  }
  public clearCanvas() {
    let { canvas, context } = getContext();
    if (context && canvas)
      context?.clearRect(0, 0, canvas?.width, canvas?.height);
  }
  public play() {
    this._play = true;
  }
  public pause() {
    this._play = false;
    EventProvider.getInstance().emit(GameEvents.pause, getContext());
  }
  public nextLevel(sleepOffset = 0) {
    const data: PreNextLevelEvent = {
      next: this.level + 1,
      affter: this.level,
      domContext: getContext(),
    };
    EventProvider.getInstance().emit(GameEvents.prenextlevel, data);
    this._level++;
    setTimeout(() => {
      const data: NextLevelEvent = {
        level: this.level,
        domContext: getContext(),
      };
      EventProvider.getInstance().emit(GameEvents.nextlevel, data);
    }, sleepOffset);
  }

  private initCanvas() {
    let { canvas } = getContext();
    if (!canvas || !window) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  public start() {
    const domContext = getContext();
    EventProvider.getInstance().emit(GameEvents.start, domContext);
    this._initTime = new Date().getTime();
    this._mainRunner = setInterval(() => {
      this.clearCanvas();
      this.updateCounters();
      EventProvider.getInstance().emit(GameEvents.render, domContext);
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
    EventProvider.getInstance().emit(GameEvents.stop, getContext());
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
}

export interface NextLevelEvent {
  level: number;
  domContext: DOMContext;
}
export interface PreNextLevelEvent {
  next: number;
  affter: number;
  domContext: DOMContext;
}
