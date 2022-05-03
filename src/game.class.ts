
export class Game {
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
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._initMouseEvents();
  }

  private _initMouseEvents() {
    const gameRef = this;
    this._canvas?.addEventListener('click', function (event: any) {
      gameRef.onFire(event);
    });
    this._canvas?.addEventListener('mousemove', function (event: any) {
      gameRef.onMouseMove(event);
    });
    document?.addEventListener('keydown', function (event: any) {
      gameRef.onKeyDown(event);
    });
    document?.addEventListener('keyup', function (event: any) {
      gameRef.onKeyUp(event);
    });
    this._canvas?.addEventListener("touchstart", function (event: any) {
      gameRef.onTouchStart(event);
    }, false);
    this._canvas?.addEventListener("touchend", function (event: any) {
      gameRef.onTouchEnd(event);
    }, false);
    this._canvas?.addEventListener("touchcancel", function (event: any) {
      gameRef.onTouchCancel(event);
    }, false);
    this._canvas?.addEventListener("mousedown", function (event: any) {
      gameRef.onTouchStart(event);
    });
    this._canvas?.addEventListener("mouseup", function (event: any) {
      gameRef.onTouchEnd(event);
    });
    this._canvas?.addEventListener("mouseout", function (event: any) {
      gameRef.onTouchCancel(event);
    });
  }

  clearCanvas() {
    if (this._context && this._canvas) this._context?.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
  }
  play() {
    this._play = true;
  }
  pause(){
    this._play = false;
  }
  nextLevel(sleepOffset = 0) {
    this._level++;
    this.onNexLevelPress();
    setTimeout(() => {
      this.onNextLevel();
    }, sleepOffset);
  }


  start() {
    this.onStart();
    this._initTime = new Date().getTime();
    this.onPreload();
    this._mainRunner = setInterval(() => {
      this.clearCanvas();
      const now = new Date().getTime();
      const milliSecondsDif = (now) - this._lastTime;
      this._time = (+((now - this._initTime) / 1000).toFixed(0));

      if (milliSecondsDif >= 1000) {
        this._lastTime = new Date().getTime();
        this._fps = this._fpsCounter;
        this._fpsCounter = 0;
      }
      this._fpsCounter++;
      this.onRender();
    }, 1000 / this.speed)
  }

  stop() {
    clearInterval(this._mainRunner);
    this.onStop();
  }
  incrementPoints(amount: number=1) {
    return this._points += amount;
  }

  //#region Abstracts Methods
  protected onStart() {
    console.warn("onStop not implemented...");
  }
  protected onStop() {
    console.warn("onStop not implemented...");
  }
  protected onGameOver() {
    console.warn("onGameOver not implemented...");
  }
  protected onFire(event: any) {
    console.warn("onFire not implemented...", "Data Event: ", event);
  }
  protected onMouseMove(event: any) {
    console.warn("onFire not implemented...", "Data Event: ", event);
  }
  protected onPreload() {
    console.warn("onPreload not implemented...");
  }
  protected onRender() {
    console.error('render method not implemented...');
  }
  protected onTouchStart(event:any) { 
    console.log("onTouchStart method not implemented.", event);
  }  
  protected onTouchCancel(event:any) {
    console.log("onTouchCancel method not implemented.", event);
  }
  protected onTouchEnd(event:any) {
    console.log("onTouchEnd method not implemented.", event);
  }

  onNextLevel() {
    console.error('onNextLevel method not implemented...');
  }
  onNexLevelPress() {
    console.error('onNexLevelPress method not implemented...');
  }
  onKeyDown(event: any) {
    console.error('onKeyDown method not implemented...', event);
  }
  onKeyUp(event: any) {
    console.error('onKeyDown method not implemented...', event);
  }
  //#endregion

  get gameOver() { return this._gameover; }
  set gameOver(value: boolean) { this._gameover = value; }
  set speed(value){ this._speed = value;}
  get points() { return this._points; }
  get level() { return this._level; }
  get isPlay() { return this._play; }
  get time() { return this._time; }
  get initTime() { return this._initTime; }
  get fps() { return this._fps; }
  get speed(){ return this._speed;}
  get context() { return this._context; }
  get canvas() { return this._canvas; }

}