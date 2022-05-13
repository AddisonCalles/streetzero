import { EventListener } from './events/eventlistener.class';

export class Health {
  private _health: number;
  private _total: number;
  private _reduceEvent = new EventListener();
  private _deadEvent = new EventListener();

  constructor(total: number) {
    this._total = total;
    this._health = total;
  }

  reset() {
    this._health = this._total;
  }

  reduce(reduce: number) {
    if (reduce < 0) return;
    const health = this._health - reduce;
    if (this._health > 0 && health <= 0) {
      this._health = 0;
      this._reduceEvent.emit(this);
      this.deadEvent.emit(this);
    } else if (health > 0) {
      this._health = health;
      this._reduceEvent.emit(this);
    }
  }

  get current() {
    return this._health;
  }
  get total() {
    return this._total;
  }
  get reduceEvent() {
    return this._reduceEvent;
  }
  get deadEvent() {
    return this._deadEvent;
  }
  get isDead() {
    return this.current <= 0;
  }
}
