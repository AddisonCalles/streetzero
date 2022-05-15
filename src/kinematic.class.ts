import * as math from './helpers/math';
import { Drawable } from './drawable.class';
import { Vector } from './vector.class';
import { DOMContext, getContext } from './helpers/dom';
export enum Directions {
  right = 'right',
  left = 'left',
  top = 'top',
  bottom = 'bottom',
}
export class Kinematic extends Drawable {
  private _destroy = false;
  private _path: Path2D;
  private _vector = new Vector();
  private _enabledVectorRotation = true;
  private _gravity = 1.5;
  private _enableGravity = true;
  constructor(x: number, y: number, width: number = 0, height: number = 0) {
    super(x, y, width, height);
    this._path = new Path2D();
    this._vector.setVector(0, 0);
  }
  render(dom: DOMContext): void {
    const { context } = dom;
    if (!context) return;
    if (this.isDebug) {
      context.fillStyle = 'orange';
      context.font = '10px Arial';
      context.fillText(
        `(Vx:${this.vector.vel.x.toFixed(1)},Vy${this.vector.vel.y.toFixed(
          1
        )}, dir: ${this.vector.dir}, rot: ${this.rotation})`,
        this.x,
        15
      );
    }
    super.render(dom);
  }

  /**
   * This is equivalent to calling kinematic.vector.rotateTo(kinematic, element);
   * @param element
   */
  rotateToVectorial(element: Kinematic) {
    this._vector.rotateTo(this, element);
  }
  edgeCollision(): Directions[] | false {
    const { canvas } = getContext();
    const vel = this.vector.vel;
    const colisions: Directions[] = [];
    if (this.x <= 0 && vel.x < 0) {
      colisions.push(Directions.left);
    } else if (this.x2 >= canvas.width && vel.x > 0) {
      colisions.push(Directions.right);
    }
    if (this.y <= 0 && vel.y < 0) {
      colisions.push(Directions.top);
    } else if (
      this.y2 >= canvas.height &&
      (vel.y > 0 || !this._enableGravity)
    ) {
      colisions.push(Directions.bottom);
    }
    if (colisions.length == 0) return false;
    return colisions;
  }

  hasColision(el?: Kinematic) {
    if (!el) return;
    return math.intersectionRectangles(this, el);
  }

  move() {
    this.gravityChecker();
    this.vector.speedUpCheck();
    super.move(this.vector.vel.x, this.vector.vel.y);
  }

  gravityChecker() {
    if (this._enableGravity && this.vector.vel.y != this.gravity) {
      const newVel = this.vector.speedUpChange(
        this.vector.vel.y,
        this.gravity,
        2
      );
      this.vector.setVelXY(this.vector.vel.x, newVel);
    }
  }

  isDestroy() {
    return this._destroy;
  }
  destroy() {
    this._destroy = true;
  }
  get vector() {
    return this._vector;
  }
  get gravity() {
    return this._gravity;
  }
  set gravity(value) {
    this._gravity = value;
  }
  get enabledGravity() {
    return this._enableGravity;
  }
  set enabledGravity(value: boolean) {
    this._enableGravity = value;
  }
  get path() {
    return this._path;
  }
  set enabledVectorRotation(value) {
    this._enabledVectorRotation = value;
  }
  get enabledVectorRotation() {
    return this._enabledVectorRotation;
  }
}
export default Kinematic;
