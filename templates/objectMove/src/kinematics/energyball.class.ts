import { color, Kinematic, LayerPath, math } from 'streetzero';
import { Sounds } from '../resources/sounds.class';

export class EnergyBall extends Kinematic {
    private _color = ['#7f0000', '#f9a825'];
    constructor(canvas: HTMLCanvasElement, x: number, y: number) {
        super(canvas, x, y, 30, 30);
        this.rotation = parseInt(math.random(45, 0).toString());
        //Sounds.shoot()
        this.initLayer();
    }

    set color(value: string[]) {
        this._color = value;
    }
    initLayer() {
        const ball = new Path2D();
        ball.ellipse(15, 15, 10, 10, 0, 0, Math.PI * 2);
        super.setLeyers([new LayerPath(ball, this._color[0], this), ...this.makeFlame(0, 7), ...this.makeFlame(90, 7), ...this.makeFlame(180, 7), ...this.makeFlame(270, 7), ...this.makeFlame(45, 5), ...this.makeFlame(90 + 45, 5), ...this.makeFlame(180 + 45, 5), ...this.makeFlame(270 + 45, 5)]);
    }

    private makeFlame(rotation: number, center: number) {
        const flame = new Path2D();
        flame.ellipse(0, center, 6, 4, 0, 0, Math.PI * 2); // llama
        const flame2 = new Path2D();
        flame2.ellipse(2, center, 4, 2, 0, 0, Math.PI * 2); // llama
        const flameLayer = new LayerPath(flame, color.rgba(this._color[0], 0.9), this);
        flameLayer.rotation = rotation;
        const flame2Layer = new LayerPath(flame2, color.rgba(this._color[1], 0.9), this);
        flame2Layer.rotation = rotation;
        return [flameLayer, flame2Layer];
    }

    move() {
        super.rotate(-(this.vector.vel.vel * 0.4));
        super.move();
    }
    hasColision(element: Kinematic) {
        if (super.hasColision(element)) {
            Sounds.explosion();
            super.destroy();
            return true;
        }
        return false;
    }
}
