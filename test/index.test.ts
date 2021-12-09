
import {
    LayerPath as LayerPathTs,
    Drawable as DrawableTs,
  EventListener as EventListenerTs,
  Kinematic as KinematicTs,
  Point as PointTs,
  Vector as VectorTs,
  Health as HealthTs,
  math as mathTs,
  color as colorTs,
  Game as GameTs} from "../src/index";
import   {
    LayerPath,
    Drawable,
  EventListener,
  Kinematic,
  Point,
  Vector,
  Health,
  math,
  color,
  Game
} from "../dist/index.js";
test('Module exports compilation TS', () => {
    expect(typeof LayerPath ).toBe(typeof LayerPathTs);
    expect(typeof Drawable).toBe(typeof  DrawableTs);
    expect(typeof EventListener).toBe(typeof EventListenerTs);
    expect(typeof Kinematic).toBe(typeof KinematicTs);
    expect(typeof Point).toBe(typeof PointTs);
    expect(typeof Vector).toBe(typeof VectorTs);
    expect(typeof Health).toBe(typeof HealthTs);
    expect(typeof math).toBe(typeof mathTs);
    expect(typeof color).toBe(typeof colorTs);
    expect(typeof Game).toBe(typeof GameTs);
})
