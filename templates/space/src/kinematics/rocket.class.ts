import { Kinematic, LayerPath } from 'streetzero';
import { Sounds } from '../resources/sounds.class';

export class Rocket extends Kinematic {
  private _primaryColor;
  constructor(color: string, x: number, y: number) {
    Sounds.shoot();
    super(x, y, 30, 10);
    this._primaryColor = color;
    super.enabledGravity = false;
    this.initLayer();
  }
  initLayer() {
    const shoot = new Path2D();
    const center = 5;
    shoot.moveTo(0, center - 2);
    shoot.lineTo(20, center - 2);
    shoot.lineTo(25, center);
    shoot.lineTo(20, center + 2);
    shoot.lineTo(0, center + 2);
    shoot.lineTo(0, center - 2);
    shoot.closePath();

    /*
        shoot.rect(0, center-2, 20, 4); // Gun
        shoot.rect(5, center-7.5, 2, 15);// Fly
        shoot.rect(0, center-7.5, 3, 15);// Fly
        */
    const flame = new Path2D();
    flame.ellipse(0, center, 10, 4, 0, 0, Math.PI * 2); // llama

    const flame2 = new Path2D();
    flame2.ellipse(2, center, 8, 2, 0, 0, Math.PI * 2); // llama

    super.setLeyers([
      new LayerPath(shoot, this._primaryColor, this),
      new LayerPath(flame, 'red', this),
      new LayerPath(flame2, 'yellow', this),
    ]);
  }

  hasColision(element: Kinematic) {
    if (super.hasColision(element)) {
      Sounds.explosion();
      super.destroy();
      return true;
    }
    return false;
  }
}
