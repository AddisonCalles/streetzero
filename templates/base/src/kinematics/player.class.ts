import { Kinematic, Health, dom, DOMContext } from 'streetzero';
import { HealthBar } from '../ui/healthBar.class';
import { Sounds } from '../resources/sounds.class';
import { Rocket } from './rocket.class';
import { SpaceShipV2Drawing } from '../drawings/space-ship.drawing';
import { Enemy } from './enemies/enemy.class';

export class Player extends Kinematic {
    private static instance: Player;
    private _rockets: Rocket[] = [];
    private readonly maxRockts = 6;
    private _healthBar;
    private _health;
    private _canvasWidth: number;
    private constructor(
        _color: string = '#4f83cc',
        _x: number = 20,
        _y: number = 50,
        _health: number = 15
    ) {
        const { canvas } = dom.getContext();
        super(_x, _y, 30, 40);
        super.centerOffset();
        this._canvasWidth = canvas.width;
        this._health = new Health(_health);
        this._health.reduceEvent.subscribe(() => Sounds.shoot2());
        this._healthBar = new HealthBar(10, 60, this._canvasWidth * 0.2, 8, this.health);
        const element: Kinematic = <Kinematic>(<unknown>this);
        super.setLeyers(SpaceShipV2Drawing(_color, element));
    }
    public static getInstance() {
        if (!Player.instance) {
            Player.instance = new Player();
        }
        return Player.instance;
    }
    reset() {
        this._rockets = [];
    }
    render(dom: DOMContext) {
        const { canvas } = dom;
        this._rockets.forEach(rocket => {
            rocket.move();
            rocket.render(dom);
        });
        this._healthBar.render(dom);
        this._rockets = this._rockets.filter(
            rocket => rocket.x < canvas.width && !rocket.isDestroy()
        );
        super.render(dom);
    }
    fire() {
        if (this._rockets.length >= this.maxRockts) return;
        const rocket = new Rocket('gray', this.x + 5, this.y + 15);
        rocket.vector.setVector(15, 0);
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
}
