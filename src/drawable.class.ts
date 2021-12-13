import { angleBetweenPoints } from "./helpers/math";
import { LayerPath } from "./layerPath.class";

export class Drawable {
    private _ctx: any;
    private _offset = { x: 0, y: 0 };
    private _canvas: any;
    private _layers: LayerPath[] = [];
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _rotation: number = 0;
    private _debug: boolean = false;
    constructor(_canvas: any, _x: number, _y: number, _width: number = 0, _height: number = 0) {
        this._width = _width;
        this._height = _height;
        this._x = _x;
        this._y = _y;
        this._ctx = _canvas.getContext('2d');
        this._canvas = _canvas;
    }
    setLeyers(layers: LayerPath[]) {
        this._layers = layers;
    }
    move(x: number, y: number) {
        this._x += x;
        this._y += y;
    }
    rotate(angle: number) {
        this._rotation = this._rotation + angle;
    }
    rotateTo(element:{x:number, y:number}){
        const angleBetweenElements = angleBetweenPoints(this, element);
        this._rotation = angleBetweenElements;
    }
    setPos(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    setCanvas(canvas: any) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext('2d');
    }
    centerOffset() {
        this._offset = { x: this.width / 2, y: this.height / 2 };
    }
    render() {
        this._layers.forEach((layer) => {
            layer.render();
        });
        if (this._debug) {
            this.context.fillStyle = 'orange';
            this.context.font = "10px Arial";
            this.context.fillText(`(${this.x.toFixed()},${this.y.toFixed(0)})`, this.x - 10, this.y - 10);
            this.context.strokeStyle = 'gray';
            this.context.strokeRect(this.x, this.y, this.width, this.height);
            this.context.beginPath();
            this.context.arc(this.x, this.y, 4, 0, Math.PI * 2);
            this.context.fill();
        }
    }
    public enableDebug(){
        this._debug = true;
    }
    public get context(): any { return this._ctx; }
    get canvas() { return this._canvas; }
    get x() { return this._x + this._offset.x; }
    get y() { return this._y + this._offset.y; }
    get x2() { return this.x + this._width; }
    get y2() { return this.y + this._height; }
    get rotation() { return this._rotation; }
    get width() { return this._width; }
    get height() { return this._height; }
    get offset() { return this._offset; }
    set offset(value) { this._offset = value; }
    set rotation(value) { this._rotation = value; }

}