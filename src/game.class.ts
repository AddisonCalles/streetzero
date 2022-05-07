export abstract class Game {
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
      gameRef.onFire?.(event);
    });
    this._canvas?.addEventListener('mousemove', function (event: any) {
      gameRef.onMouseMove?.(event);
    });
    document?.addEventListener('keydown', function (event: any) {
      gameRef.onKeyDown?.(event);
    });
    document?.addEventListener('keyup', function (event: any) {
      gameRef.onKeyUp?.(event);
    });
    this._canvas?.addEventListener(
      'touchstart',
      function (event: any) {
        gameRef.onTouchStart?.(event);
      },
      false
    );
    this._canvas?.addEventListener(
      'touchend',
      function (event: any) {
        gameRef.onTouchEnd?.(event);
      },
      false
    );
    this._canvas?.addEventListener(
      'touchcancel',
      function (event: any) {
        gameRef.onTouchCancel?.(event);
      },
      false
    );
    this._canvas?.addEventListener('mousedown', function (event: any) {
      gameRef.onTouchStart?.(event);
    });
    this._canvas?.addEventListener('mouseup', function (event: any) {
      gameRef.onTouchEnd?.(event);
    });
    this._canvas?.addEventListener('mouseout', function (event: any) {
      gameRef.onTouchCancel?.(event);
    });
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
    this._level++;
    this.onNexLevelPress?.();
    setTimeout(() => {
      this.onNextLevel?.();
    }, sleepOffset);
  }

  public start() {
    this.onStart?.();
    this._initTime = new Date().getTime();
    this.onPreload?.();
    this._mainRunner = setInterval(() => {
      this.clearCanvas();
      this.updateCounters();
      this.onRender?.();
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
    this.onStop?.();
  }
  public incrementPoints(amount: number = 1) {
    return (this._points += amount);
  }

  //#region Abstracts Methods
  protected abstract onStart?(): void;
  protected abstract onStop?(): void;
  protected abstract onGameOver?(): void;
  protected abstract onFire?(event: any): void;
  protected abstract onMouseMove?(event: any): void;
  protected abstract onPreload?(): void;
  protected abstract onRender?(): void;
  protected abstract onTouchStart?(event: any): void;
  protected abstract onTouchCancel?(event: any): void;
  protected abstract onTouchEnd?(event: any): void;
  protected abstract onNextLevel?(): void;
  protected abstract onNexLevelPress?(): void;
  protected abstract onKeyDown?(event: any): void;
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
