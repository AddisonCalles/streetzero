import { Kinematic, LayerPath } from 'streetzero';

const shoot = new Path2D();
const center = 5;
shoot.moveTo(0, center - 2);
shoot.lineTo(20, center - 2);
shoot.lineTo(25, center);
shoot.lineTo(20, center + 2);
shoot.lineTo(0, center + 2);
shoot.lineTo(0, center - 2);
shoot.closePath();

const flame = new Path2D();
flame.ellipse(0, center, 10, 4, 0, 0, Math.PI * 2); // llama

const flame2 = new Path2D();
flame2.ellipse(2, center, 8, 2, 0, 0, Math.PI * 2); // llama

export const Rocket2DDrawing = (element: Kinematic, color: string) => [new LayerPath(shoot, color, element), new LayerPath(flame, 'red', element), new LayerPath(flame2, 'yellow', element)];
