import { angleBetweenPoints, vectorByXY, vectorComponents } from './helpers/math';
import { Kinematic } from './kinematic.class';

export class Vector {
    private _vel =0;
    private _dir = 0;
    private _velX = 0;
    private _velY = 0;
    private _element: Kinematic;
    constructor(element: Kinematic) {
        this._element = element;
    }
    setVel(velocity: number) {
        this.setVector(velocity, this._dir);
    }
    setDir(_dir:number) {
        this.setVector(this._vel, _dir);
    }
    rotate(grades:number) {
        const sum = this._dir + grades;
        this._dir = sum % 360;
        this.setVector(this._vel, this._dir);
    }
    rotateTo(element:Kinematic){
        const angleBetweenElements = angleBetweenPoints(this._element, element);
        this.setDir(angleBetweenElements);
    }
    setVector(_vel:number, _dir:number) {
        this._vel = Math.abs(_vel);
        this._dir = _dir;
        const components = vectorComponents(this._dir, this._vel);
        this._velX = components.x;
        this._velY = components.y;
    }
    setVelXY(velx:number, vely:number) {
        this._velX = velx;
        this._velY = vely;
        const vector = vectorByXY(velx, vely);
        this._vel = vector.vel;
        this._dir = vector.dir;
    }
    get vel() { return { vel: this._vel, x: this._velX, y: this._velY }; }
    get dir() { return this._dir }

}