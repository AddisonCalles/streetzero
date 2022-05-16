import { Drawable } from 'streetzero';
import { Health } from 'streetzero';

export class HealthBar extends Drawable {
    private _health;

    constructor(
        canvas: HTMLCanvasElement,
        x: number,
        y: number,
        width: number,
        height: number,
        health: Health
    ) {
        super(canvas, x, y, width, height);
        this._health = health;
    }
    render(background = 'grey', color = 'green') {
        const unitWidth = this.width / this._health.total;
        const widthLife = this._health.current * unitWidth;
        const border = parseInt((0.2 * this.height).toString());
        const font = this.height < 8 ? 8 : this.height;
        this.context.strokeStyle = background;
        this.context.fillStyle = color;

        const height = this.height + border * 2;
        const width = this.width + border * 2;
        this.context.strokeRect(this.x, this.y, width, height);
        this.context.fillRect(this.x + border, this.y + border, widthLife, this.height);
        this.context.fillStyle = 'orange';
        this.context.font = `${font}px Arial`;
        this.context.fillText(
            `${parseInt(((this.health.current / this.health.total) * 100).toString())}%`,
            this.x,
            this.y + height + 10
        );
    }
    get health() {
        return this._health;
    }
}
