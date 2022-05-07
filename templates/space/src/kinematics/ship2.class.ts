import { Health, Kinematic, LayerPath } from 'streetzero';
export class Ship2 extends Kinematic {
    private _color;
    private _health;
    constructor(
        _canvas: HTMLCanvasElement,
        _color: string,
        _x: number,
        _y: number,
        _health: number
    ) {
        super(_canvas, _x, _y, 30, 30);
        this._health = new Health(_health);
        this._color = _color;
        this.offset = { x: this.width / 2, y: this.height / 2 };
        this.initLeyers();
    }
    reset() {
        this._health.reset();
    }

    initLeyers() {
        const path1 = new Path2D();
        path1.arc(6, this.offset.y + 1, 6, 0, 2 * Math.PI); // llama
        path1.rect(6, this.offset.y - 4.5, 20, 4); // Gun
        path1.rect(6, this.offset.y + 2.0, 20, 4); // Gun
        path1.rect(6, this.offset.y - 7.5, 10, 15); //Body
        path1.rect(6 + 5, 0, 2, this.offset.y * 2); // Fly
        path1.rect(6, 0, 3, this.offset.y * 2); // Fly

        const layer1 = new LayerPath(path1, this._color, this);
        super.setLeyers([layer1]);
    }

    get health() {
        return this._health;
    }
}
