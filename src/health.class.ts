import { EventListener } from "./eventListener.class";

export class Health {
    private _health;
    private _total;
    private _reduceEvent = new EventListener();
    private _deadEvent = new EventListener();

    constructor(total:number) {
        this._total = total;
        this._health = total;
    }

    reset() {
        this._health = this._total;
    }

    reduce(reduce:number) {
        const health = this._health - reduce;
        if (health <= 0) {
            this._health = 0;
            this.deadEvent.emit(this);
        } else {
            this._health = health;
        }
    }

    get current() { return this._health; }
    get total() { return this._total; }
    get reduceEvent() { return this._reduceEvent; }
    get deadEvent() { return this._deadEvent; }
    get isDead() { return this.current <= 0; }
}