export class Animation {
    private _velocity: number = 1;
    frames: HTMLImageElement[] = [];
    constructor() {}

    set velocity(value: number) {
        this._velocity = value;
    }
    get velocity(){
        return this._velocity;
    }
}

