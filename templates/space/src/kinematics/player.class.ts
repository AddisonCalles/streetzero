import { Kinematic, Health } from 'streetzero';
import { HealthBar } from '../ui/healthBar.class';
import { Sounds } from '../resources/sounds.class';
import { Rocket } from './rocket.class';
import { SpaceShipV2Drawing } from '../drawings/space-ship.drawing';
import { Enemy } from './enemies/enemy.class';
import { singleton } from 'tsyringe';

@singleton()
export class Player extends Kinematic {
  private _rockets: Rocket[] = [];
  private readonly maxRockts = 6;
  private _healthBar;
  private _health;
  constructor(
    _color: string = '#4f83cc',
    _x: number = 20,
    _y: number = 50,
    _health: number = 15
  ) {
    super(_x, _y, 30, 40);
    super.centerOffset();
    this._health = new Health(_health);
    this._health.reduceEvent.subscribe(() => Sounds.shoot2());
    const hw = this.canvas?.width ? this.canvas.width : 1;
    this._healthBar = new HealthBar(10, 60, hw * 0.2, 8, this.health);
    super.setLeyers(SpaceShipV2Drawing(_color, this));
  }
  reset() {
    this._rockets = [];
  }
  render() {
    this._rockets.forEach(rocket => {
      rocket.move();
      rocket.render();
    });
    this._healthBar.render();
    this._rockets = this._rockets.filter(
      rocket => rocket.x < this.canvas.width && !rocket.isDestroy()
    );
    super.render();
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
