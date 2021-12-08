
import { EventListener } from "./eventListener.class.js";


export class Game {
  private _play = false;
  private _level = 0;
  private _context: any = {};
  private _points = 0;
  private _mainRunner: any;
  private _canvas: any = {};
  private _gameover = false;
  private _playEvent = new EventListener();
  private _preloadEvent = new EventListener();
  private _gameOverEvent = new EventListener();
  private _renderEvent = new EventListener();
  private _nextLevelEvent = new EventListener();
  private _fps = 1;
  private _fpsCounter = 0;
  private _time: number = 0;
  private _initTime: number = 0;
  private _lastTime: number = 0;
  private _controls = {
    fire: new EventListener(),
    move: new EventListener(),
    jump: new EventListener(),
    
  }
  constructor(canvas?: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas?.getContext('2d');
    this._preloadEvent.emit(this);
  }
  render() {
    if (!this._context) return;
    this._renderEvent.emit(this);
    if (this.isPlay) {

    }
  }
  _initMouseEvents() {
    const gameRef = this;
    this._canvas?.addEventListener('click', function (event: any) {
        gameRef._controls.fire.emit({context: gameRef, event: event});
    });
    this._canvas?.addEventListener('mousemove', function (event: any) {
        gameRef._controls.move.emit({context: gameRef, event: event});
    });
  }
  clearCanvas() {
    if (this._context && this._canvas) this._context?.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
  }
  play() {
    this._play = true;
  }
  nextLevel(sleepOffset = 0) {
    this._level++;
    setTimeout(() => {

    }, sleepOffset);
  }

  start() {
    this._initTime = new Date().getTime();
    this._mainRunner = setInterval(() => {
      this.clearCanvas();
      this.render();
      const now = new Date().getTime();
      const milliSecondsDif = (now) - this._lastTime;
      this._time = (+((now - this._initTime) / 1000).toFixed(0));

      if (milliSecondsDif >= 1000) {
        this._lastTime = new Date().getTime();
        this._fps = this._fpsCounter;
        this._fpsCounter = 0;
      }
      this._fpsCounter++;
    }, 1000 / 60)
  }

  stop() {
    clearInterval(this._mainRunner);
  }

  incrementPoints(amount:number){
    return this._points += amount;
  }
  get gameOverEvent() { return this._gameOverEvent; }
  get nextLevelEvent() { return this._nextLevelEvent; }
  get playEvent() { return this._playEvent; }
  get gameOver() { return this._gameover; }
  get points() { return this._points; }
  get level() { return this._level; }
  get isPlay() { return this._play; }
  get time(){
    return this._time;
  }
  get fps(){return this._fps;}
}