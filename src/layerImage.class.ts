import { LayerDraw } from './interfaces/layer.interface';
import { Kinematic } from './kinematic.class';

export class LayerImage implements LayerDraw {
    private _image: HTMLImageElement = new Image();
    private _element: Kinematic;
    private _rotation = 0;

    constructor(src: string, element: Kinematic) {
        this._image.src = src;
        this._element = element;
    }
    rotate(direction: number): void {
        this._element.rotate(direction);
    }

    render() {
        this._element.context.drawImage(this._image);
    }

    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = value;
    }
}
