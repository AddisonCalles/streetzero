import { Health, Kinematic, zGame } from 'streetzero';
import { SpaceShipV2Drawing } from '../drawings/space-ship.drawing';
import { Sounds } from '../resources/sounds.class';
import { HealthBar } from '../ui/healthBar.class';
import { Enemy } from './enemies/enemy.class';
import { Rocket } from './rocket.class';
import { inject } from 'inversify';
import { ShootBar } from '../ui/shootsBar.class';

export class Player extends Kinematic {
    private _rockets: Rocket[] = [];
    private readonly maxRockts = 8;
    private _healthBar;
    private _health;
    private _rocketBar;
    constructor(_canvas: HTMLCanvasElement | null, _color: string, _x: number, _y: number, _health: number) {
        super(_canvas, _x, _y, 30, 40);
        super.centerOffset();
        this._health = new Health(_health);
        this._rocketBar = new ShootBar(this.canvas, 10, 10, 40, 30, this.maxRockts);
        this._health.reduceEvent.subscribe(() => Sounds.shoot2());
        this._healthBar = new HealthBar(_canvas, 10, 60, this.canvas.width * 0.2, 8, this.health);
        super.setLeyers(SpaceShipV2Drawing(_color, this));
    }
    reset() {
        this._rockets = [];
    }
    render() {
        this._rockets.forEach((rocket) => {
            rocket.move();
            rocket.render();
        });
        this._healthBar.render();
        this._rocketBar.render();
        this._rockets = this._rockets.filter((rocket) => rocket.x < this.canvas.width && !rocket.isDestroy());
        this._rocketBar.setRockets(this.rocketsaAvailable);
        super.render();
    }
    fire() {
        if (this._rockets.length >= this.maxRockts) return;
        const rocket = new Rocket(this.canvas, 'gray', this.x + 5, this.y + 15);
        rocket.vector.setVector(15, 0);
        this._rocketBar.setRockets(this.rocketsaAvailable);
        this._rockets.push(rocket);
    }
    isShootedEnemy(enemy: Enemy) {
        for (const rocket of this._rockets) {
            if (rocket.hasColision(enemy)) {
                enemy.health.reduce(1);
                if (enemy.health.isDead) {
                    enemy.destroy();
                }
                return true;
            }
        }
        return false;
    }

    get health() {
        return this._health;
    }
    get rockets() {
        return this._rockets;
    }
    get rocketsaAvailable() {
        return this.maxRockts - this._rockets.length;
    }
}
