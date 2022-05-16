import { canvas } from './mocks/app.mock';
import { LayerPath } from '../src';
import { Kinematic } from '../src';

describe('Unit Tests LayerPath class', () => {
  test('General', () => {
    const kinematic = new Kinematic(canvas, 0, 0, 24, 24);
    const path = new Path2D();
    path.arc(0, 0, 24, 0, 0);
    const layer = new LayerPath(path, '#555', kinematic);
    expect(layer.path).toBe(path);
    //expect(layer.render()).not.toThrowError();
    expect(layer.color).toBe('#555');
    //expect(layer.rotate(90));
    expect(layer.rotation).toBe(0);
  });
});
