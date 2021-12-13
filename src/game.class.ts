
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
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._initMouseEvents();
  }

  _initMouseEvents() {
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
  }
  clearCanvas() {
    if (this._context && this._canvas) this._context?.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
  }
  play() {
    this._play = true;
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
    }, 1000 / 60)
  }

  stop() {
    clearInterval(this._mainRunner);
    this.onStop();
  }
  incrementPoints(amount: number) {
    return this._points += amount;
  }

  //#region Abstracts Methods
  onStart() {
    console.warn("onStop not implemented...");
  }
  onStop() {
    console.warn("onStop not implemented...");
  }
  onGameOver() {
    console.warn("onGameOver not implemented...");
  }
  onFire(event:any) {
    console.warn("onFire not implemented...","Data Event: ",event);
  }
  onMouseMove(event:any) {
    console.warn("onFire not implemented...","Data Event: ",event);
  }
  onPreload() {
    console.warn("onPreload not implemented...");
  }
  onRender() {
    console.error('render method not implemented...');
  }
  onNextLevel() {
    console.error('onNextLevel method not implemented...');
  }
  onNexLevelPress() {
    console.error('onNexLevelPress method not implemented...');
  }
  onKeyDown(event:any){
    console.error('onKeyDown method not implemented...',event);
  }
  onKeyUp(event:any){
    console.error('onKeyDown method not implemented...', event);
  }
  //#endregion

  get gameOver() { return this._gameover; }
  set gameOver(value: boolean) { this._gameover = value; }
  get points() { return this._points; }
  get level() { return this._level; }
  get isPlay() { return this._play; }
  get time() { return this._time; }
  get initTime() { return this._initTime; }
  get fps() { return this._fps; }

  get context() { return this._context; }
  get canvas() { return this._canvas; }

}