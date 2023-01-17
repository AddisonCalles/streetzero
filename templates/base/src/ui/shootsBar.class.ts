import { Drawable, Health } from 'streetzero';
import { Rocket } from '../kinematics/rocket.class';

export class ShootBar extends Drawable {
    private _capacity;
    private _disponibility;

    constructor(canvas: HTMLCanvasElement | null, x: number, y: number, width: number, height: number, maxRockets: number) {
        super(canvas, x, y, width, height);
        this._capacity = maxRockets;
        this._disponibility = maxRockets;
    }
    render(): void {
        const rocket = new Rocket(this.canvas, '#CCCCCC', 5, 85, false);
        rocket.vector.setVelXY(50, 0);
        for (let index = 0; index < this._disponibility; index++) {
            rocket.render();
            rocket.move();
        }
    }

    setRockets(count: number) {
        this._disponibility = count;
    }
    reset() {
        this._disponibility = this._capacity;
    }

    get disponibility() {
        return this._capacity;
    }
}
