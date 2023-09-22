import { Kinematic } from 'streetzero';
import { Rocket2DDrawing } from '../drawings/rocket.drawing';
import { Sounds } from '../resources/sounds.class';

export class Note extends Kinematic {
    private _primaryColor;
    constructor(canvas: HTMLCanvasElement, color: string, x: number, y: number, sound: boolean = true) {
        if (sound) Sounds.shoot();
        super(canvas, x, y, 30, 10);
        this._primaryColor = color;
        super.enabledGravity = false;
        this.initLayer();
    }
    initLayer() {
        super.setLeyers(Rocket2DDrawing(this, this._primaryColor));
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
