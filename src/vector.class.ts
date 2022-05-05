import {
  angleBetweenPoints,
  vectorByXY,
  vectorComponents,
} from './helpers/math';
import { Kinematic } from './kinematic.class';

export class Vector {
  private _vel = 0;
  private _dir = 0;
  private _velX = 0;
  private _velY = 0;

  private _speedUpFinalSpeed = { x: 0, y: 0 };
  private _speedUpDone = true;
  private _speedUpFactor = 1;

  constructor() {}

  setVel(velocity: number) {
    this.setVector(velocity, this._dir);
  }
  setDir(_dir: number) {
    this.setVector(this._vel, _dir);
  }
  rotate(grades: number) {
    const sum = this._dir + grades;
    this._dir = sum % 360;
    this.setVector(this._vel, this._dir);
  }
  rotateTo(pivot: Kinematic, target: Kinematic) {
    const angleBetweenElements = angleBetweenPoints(pivot, target);
    this.setDir(angleBetweenElements);
  }

  setVector(_vel: number, _dir: number) {
    this._vel = Math.abs(_vel);
    this._dir = _dir;
    const components = vectorComponents(this._dir, this._vel);
    this._velX = components.x;
    this._velY = components.y;
  }
  sum(vector: Vector) {
    this.setVelXY(this._velX + vector.vel.x, this._velY + vector.vel.y);
    return this;
  }

  speedUp(finalSpeed: number, speedFactor = 1) {
    const vectorFinalSpeed = vectorComponents(this.dir, finalSpeed);
    this._speedUpFinalSpeed = vectorFinalSpeed;
    this._speedUpFactor = speedFactor;
    this._speedUpDone = false;
  }

  speedUpXY(vx: number, vy: number, speedFactor = 1) {
    this._speedUpFinalSpeed = { x: vx, y: vy };
    this._speedUpFactor = speedFactor;
    this._speedUpDone = false;
  }

  speedUpVector(vx: number, vy: number, speedFactor = 1) {
    const vectorFinalSpeed = { x: vx, y: vy };
    this._speedUpFinalSpeed = vectorFinalSpeed;
    this._speedUpFactor = speedFactor;
    this._speedUpDone = false;
  }
  speedUpCheck() {
    if (this._speedUpDone) return;
    const { x: finalVx, y: finalVy } = this._speedUpFinalSpeed;
    const newVx = this.speedUpChange(this._velX, finalVx, this._speedUpFactor);
    const newVy = this.speedUpChange(this._velY, finalVy, this._speedUpFactor);
    this._speedUpDone = newVx == finalVx && newVy == finalVy;
    this.setVelXY(newVx, newVy);
  }
  speedUpChange(current: number, final: number, factor: number) {
    let newVx = final;
    const difSpeed = Math.abs(current - final);
    if (difSpeed > 0.09) {
      if (current > final) {
        newVx = current - factor;
        if (newVx < final) newVx = final;
      } else if (current < final) {
        newVx = current + factor;
        if (newVx > final) newVx = final;
      }
    }
    return newVx;
  }
  setVelXY(velx: number, vely: number) {
    this._velX = velx;
    this._velY = vely;
    const vector = vectorByXY(velx, vely);
    this._vel = vector.vel;
    this._dir = vector.dir;
  }
  get vel() {
    return { vel: this._vel, x: this._velX, y: this._velY };
  }
  get dir() {
    return this._dir;
  }
}
