import { DOMContext } from './helpers/dom';
import { Kinematic } from './kinematic.class';

export class LayerPath {
  private _color: string;
  private _path: Path2D;
  private _element: Kinematic;
  private _originalPath: Path2D;
  private _rotation = 0;

  constructor(path: Path2D, color: string, element: Kinematic) {
    this._color = color;
    this._path = path;
    this._originalPath = path;
    this._element = element;
  }

  rotate(direction: number) {
    const rotatePath = new Path2D();
    rotatePath.addPath(
      this._originalPath,
      DOMMatrix.fromMatrix()
        .translate(this._element.width / 2, this._element.height / 2)
        .rotate(direction)
        .translate(
          (this._element.width / 2) * -1,
          (this._element.height / 2) * -1
        )
    );
    this._path = new Path2D();
    this.path.addPath(
      rotatePath,
      DOMMatrix.fromMatrix().translate(this._element.x, this._element.y)
    );
  }

  render({ context }: DOMContext) {
    if (!context) return;
    const rotation =
      this.rotation +
      this._element.rotation +
      (this._element.enabledVectorRotation ? this._element.vector.dir : 0);
    this.rotate(rotation);
    context.fillStyle = this.color;
    context.fill(this._path);
  }

  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    this._rotation = value;
  }
  get color() {
    return this._color;
  }
  get path() {
    return this._path;
  }
}
