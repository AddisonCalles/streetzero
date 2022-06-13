import 'jest-canvas-mock';
import 'jest';
import { Directions, Kinematic } from '../src/kinematic.class';
const canvas = document.createElement('canvas');
canvas.width = 100;
canvas.height = 100;
document.body.prepend(canvas);
let kinematic: Kinematic;
const width = 50;
const height = 40;
const x = 0;
const y = 0;
beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.spyOn(global, 'setInterval');
  jest.spyOn(global, 'setTimeout');
});
beforeEach(() => {
  kinematic = new Kinematic(canvas, x, y, width, height);
});
afterEach(() => {
  jest.clearAllTimers();
  return;
});
afterAll(() => {
  jest.useRealTimers();
  return;
});
describe('Unit Tests Kinematic Class', () => {
  test('General Perperties', () => {
    expect(kinematic.canvas).toBe(canvas);
    expect(kinematic.x).toBe(0);
    expect(kinematic.y).toBe(0);
    expect(kinematic.x2).toBe(50);
    expect(kinematic.y2).toBe(40);
    expect(kinematic.gravity).toBe(1.5);
    expect(kinematic.height).toBe(40);
    expect(kinematic.width).toBe(50);
    expect(kinematic.vector.dir).toBe(0);
    //OFFSET CENTER
    expect(kinematic.offset.x).toBe(0);
    expect(kinematic.offset.y).toBe(0);
    kinematic.centerOffset();
    expect(kinematic.offset.x).toBe(25);
    expect(kinematic.offset.y).toBe(20);
    expect(kinematic.isDebug).toBeFalsy();
    expect(kinematic.enableDebug()).toBeUndefined();
    expect(kinematic.render()).toBeUndefined();
    expect(kinematic.isDestroy()).toBeFalsy();
    expect(kinematic.destroy()).toBeUndefined();
    expect(kinematic.isDestroy()).toBeTruthy();
  });
  test('rotateToVectorial', () => {
    expect(
      kinematic.rotateToVectorial(new Kinematic(canvas, 50, 50, width, height))
    ).toBeUndefined();
    expect(kinematic.vector.dir).toBe(45);
  });

  test('edgeCollision without offset', () => {
    kinematic.setPos(0, -1);
    kinematic.vector.setVelXY(0, -1);
    const colisionTop = kinematic.edgeCollision();
    expect(colisionTop).toEqual([Directions.top]);

    kinematic.setPos(-1, -1);
    kinematic.vector.setVelXY(-1, -1);
    const colisionTopLeft = kinematic.edgeCollision();
    expect(colisionTopLeft).toEqual([Directions.left, Directions.top]);

    kinematic.setPos(-1, 0);
    kinematic.vector.setVelXY(-1, 0);
    const colisionLeft = kinematic.edgeCollision();
    expect(colisionLeft).toEqual([Directions.left]);

    kinematic.setPos(-1, canvas.height);
    kinematic.vector.setVelXY(-1, 1);
    const colisionLeftBottom = kinematic.edgeCollision();
    expect(colisionLeftBottom).toEqual([Directions.left, Directions.bottom]);

    kinematic.setPos(0, canvas.height);
    kinematic.vector.setVelXY(0, 1);
    const colisionBottom = kinematic.edgeCollision();
    expect(colisionBottom).toEqual([Directions.bottom]);

    kinematic.setPos(canvas.width, canvas.height);
    kinematic.vector.setVelXY(1, 1);
    const colisionRightBottom = kinematic.edgeCollision();
    expect(colisionRightBottom).toEqual([Directions.right, Directions.bottom]);

    kinematic.setPos(canvas.width, 0);
    kinematic.vector.setVelXY(1, 1);
    const colisionRight = kinematic.edgeCollision();
    expect(colisionRight).toEqual([Directions.right]);

    kinematic.setPos(0, 0);
    kinematic.vector.setVelXY(1, 1);
    const colisionFalsyTopLeft = kinematic.edgeCollision();
    expect(colisionFalsyTopLeft).toBeFalsy();

    kinematic.setPos(canvas.width, canvas.height);
    kinematic.vector.setVelXY(-1, -1);
    const colisionFalsyBottomRight = kinematic.edgeCollision();
    expect(colisionFalsyBottomRight).toBeFalsy();
  });
});
