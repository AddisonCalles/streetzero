import 'jest-canvas-mock';
import 'jest';
import { Point } from '../src/point.class';

describe('Unit Tests Point Class', () => {
  test('General Perperties', () => {
    const point = new Point();
    expect(point).toEqual({ x: 0, y: 0 });
    const point2 = new Point(20, 20);
    expect(point2).toEqual({ x: 20, y: 20 });
    expect(point2.x).toBe(20);
    expect(point2.y).toBe(20);
  });
});
