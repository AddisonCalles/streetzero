import 'jest';

import { Vector } from '../src/vector.class';

beforeAll(() => {});
beforeEach(() => {});
afterEach(() => {});
afterAll(() => {});
describe('Unit Tests Vector Class', () => {
  test('Vector initial state', () => {
    const vector = new Vector();
    expect(vector.dir).toBe(0);
    expect(vector.vel).toMatchObject({ vel: 0, x: 0, y: 0 });
  });
  test('Vector set direction', () => {
    const vector = new Vector();
    //Test Case 0
    vector.setVel(12.65);
    expect(vector.vel).toMatchObject({ vel: 12.65, x: 12.65, y: 0 });

    //Test Case 45
    vector.rotate(45);
    expect(vector.dir).toBe(45);
    expect(vector.vel).toMatchObject({
      vel: 12.65,
      x: 8.94490078,
      y: 8.94490078,
    });

    //Test Case 90
    vector.rotate(45);
    expect(vector.dir).toBe(90);
    expect(vector.vel).toMatchObject({ vel: 12.65, x: 0, y: 12.65 });

    //Test Case 135
    vector.rotate(45);
    expect(vector.dir).toBe(135);
    expect(vector.vel).toMatchObject({
      vel: 12.65,
      x: -8.94490078,
      y: 8.94490078,
    });

    //Test Case 180
    vector.rotate(45);
    expect(vector.dir).toBe(180);
    expect(vector.vel).toMatchObject({
      vel: 12.65,
      x: -12.65,
      y: 0,
    });

    //Test Case -45
    vector.rotate(-225);
    expect(vector.dir).toBe(-45);
    expect(vector.vel).toMatchObject({
      vel: 12.65,
      x: 8.94490078,
      y: -8.94490078,
    });

    //Test Case -90
    vector.rotate(-45);
    expect(vector.dir).toBe(-90);
    expect(vector.vel).toMatchObject({ vel: 12.65, x: 0, y: -12.65 });

    //Test Case -135
    vector.rotate(-45);
    expect(vector.dir).toBe(-135);
    expect(vector.vel).toMatchObject({
      vel: 12.65,
      x: -8.94490078,
      y: -8.94490078,
    });
  });
});
