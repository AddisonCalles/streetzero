import {
  random,
  vectorComponents,
  angleBetweenPoints,
  vectorByXY,
  intersectionRanges,
  intersectionRectangles,
  Rectangle,
} from '../../src/helpers/math';
test('Math random helper', () => {
  const randNumber = random(55, 59);
  expect(randNumber >= 55);
  expect(randNumber <= 59);
});
test('Math vector vx vy helper', () => {
  const vector = vectorComponents(60.00000001, 10);
  expect(vector.x).toEqual(5.0);
  expect(vector.y).toEqual(8.66025404);
  const vector2 = vectorComponents(30, 10);
  expect(vector2.x).toEqual(8.66025404);
  expect(vector2.y).toEqual(5);
  const vector3 = vectorComponents(45, 35.35533906);
  expect(vector3.x).toBe(25);
  expect(vector3.y).toBe(25);
});
test('Math angle between 2 points (0.8,0.6) y (1,0.75)', () => {
  const angle = angleBetweenPoints({ x: 0.8, y: 0.6 }, { x: 1, y: 0.75 });
  expect(angle).toEqual(36.86989765);
});
test('Math angle between 2 points (90, 180, -90, 0 grades)', () => {
  const angle90 = angleBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 1 });
  expect(angle90).toEqual(90);
  const angle0 = angleBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 0 });
  expect(angle0).toEqual(0);
  const angle180 = angleBetweenPoints({ x: 0, y: 0 }, { x: -1, y: 0 });
  expect(angle180).toEqual(180);
  const angle270 = angleBetweenPoints({ x: 0, y: 1 }, { x: 0, y: 0 });
  expect(angle270).toEqual(-90);
});

test('Math vector units and angle By vX vY helper', () => {
  const vector = vectorByXY(25, 25);
  expect(vector.vel).toBe(35.35533906);
  expect(vector.dir).toBe(45);
  const vector2 = vectorByXY(300, 400);
  expect(vector2.vel).toBe(500);
  expect(vector2.dir).toBe(53.13010235);
  const vector3 = vectorByXY(5.0, 8.66025404);
  expect(vector3.vel).toBe(10);
  expect(vector3.dir).toBe(60.00000001);
});

test('Math intersection Ranges', () => {
  const staticRange = { p1: 0, p2: 5 };
  expect(intersectionRanges(staticRange, { p1: 5, p2: 10 })).toBeTruthy(); // intersection right
  expect(intersectionRanges(staticRange, { p1: -5, p2: 0 })).toBeTruthy(); // intersection left
  expect(intersectionRanges(staticRange, { p1: 1, p2: 4 })).toBeTruthy(); // dynamic inside static
  expect(intersectionRanges(staticRange, { p1: -5, p2: 10 })).toBeTruthy(); // static inside  dynamic
  expect(intersectionRanges(staticRange, { p1: -5, p2: -0.0001 })).toBeFalsy(); // outside to left
  expect(intersectionRanges(staticRange, { p1: 5.0001, p2: 10 })).toBeFalsy(); // outside to right
});

test('Math intersection Rectangles', () => {
  const staticRectangle: Rectangle = { y: 0, y2: 10, x: 0, x2: 10 };

  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, x: -10.001, x2: -0.001})
  ).toBeFalsy(); // outside to left
  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, x: 10.001, x2: 20.001})
  ).toBeFalsy(); // outside to right
  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, y: 10.001, y2: 20.001})
  ).toBeFalsy(); // outside to bottom
  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, y: -10.001, y2: -0.001})
  ).toBeFalsy(); // outside to top

  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, x: 10.001, x2: 0})
  ).toBeFalsy(); // intersection to left
  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, x: 10.001, x2: 20.001})
  ).toBeFalsy(); // intersection to right
  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, y: 10.001, y2: 20.001})
  ).toBeFalsy(); // intersection to bottom
  expect(
    intersectionRectangles(staticRectangle, { ...staticRectangle, y: -10.001, y2: -0.001})
  ).toBeFalsy(); // intersection to top

  // static inside  dynamic
  // static inside  dynamic
});
