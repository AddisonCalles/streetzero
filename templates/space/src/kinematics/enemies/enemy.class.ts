import { Health, Kinematic } from 'streetzero';
import { inject } from 'tsyringe';
import { Colors } from '../../ui/colors';
import { HealthBar } from '../../ui/healthBar.class';
import { Player } from '../player.class';

export class Enemy extends Kinematic {
  private _healthBar;
  private _health;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    _health: number,
    @inject('Player') public player?: Player
    
  ) {
    super(x, y, width, height);
    super.enabledGravity = false;
    super.centerOffset();
    this._health = new Health(_health);
    this._healthBar = new HealthBar(
      x,
      y + this.height + 5,
      this.width,
      1,
      this.health
    );

  }

  render() {
    this._healthBar.setPos(this.x, this.y + this.height + 5);
    this._healthBar.render(Colors.background, '_76ff03');
    super.render();
  }
  get health() {
    return this._health;
  }
}
