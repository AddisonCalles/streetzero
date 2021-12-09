import { Drawable } from './drawable.class';
import { Vector } from './vector.class';

export class Kinematic extends Drawable {
    private _destroy = false;
    private _path: Path2D;
    private _vector = new Vector(this);
    private _enabledVectorRotation = true;
    constructor(canvas: any, x: number, y: number, width: number = 0, height: number = 0) {
        super(canvas, x, y, width, height)
        this._path = new Path2D();
        this._vector.setVector(0, 0);
    }

    edgeColision() {
        if ((this.x <= 0) && this._vector.vel.x < 0) {
            return 'right';
        } else if (this.x2 >= this.canvas.width && this._vector.vel.x > 0) {
            return 'left';
        }
        if ((this.y <= 0) && this._vector.vel.y < 0) {
            return 'top';
        } else if (this.y2 >= (this.canvas.height) && this._vector.vel.y > 0) {
            return 'bottom';
        }
        return false;
    }
    hasColision(el: Kinematic) {
        let xColision = false;
        if (this.x <= el.x2 && el.x <= this.x2) {
            xColision = true;
        } else if (this.x2 >= el.x && this.x2 <= el.x2) {
            xColision = true;
        }
        let yColision = false;
        if (this.y <= el.y2 && el.y <= this.y2) {
            yColision = true;
        } else if (this.y2 >= el.y && this.y2 <= el.y2) {
            yColision = true;
        }
        return (xColision && yColision);
    }
    move() {
        super.move(this._vector.vel.x, this._vector.vel.y);
    }
    isDestroy() { return this._destroy; }
    destroy() { this._destroy = true; }
    get vector() { return this._vector; }
    get path() { return this._path; }
    set enabledVectorRotation(value) { this._enabledVectorRotation = value; }
    get enabledVectorRotation() { return this._enabledVectorRotation; }
}