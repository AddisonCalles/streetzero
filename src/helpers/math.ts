import { Line } from '../interfaces/line';
import { Point } from '../interfaces/point';

export interface Rectangle {
    x: number;
    x2: number;
    y: number;
    y2: number;
}

export interface Range {
    p1: number;
    p2: number;
}
const presicion = 8;
export const random = (max: number, min: number) => Math.random() * (max - min) + min;
export const angleBetweenPoints = (p1: { x: number; y: number }, p2: { x: number; y: number }) => toFixed((Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI);

export const rectsIntersect = (line1: Line, line2: Line): Point => {
    const b = (point: Point, m: number) => point.y - m * point.x;
    const pendiente = (line: Line) => (line.point1.y - line.point2.y) / (line.point1.x - line.point2.x);
    //calcular pendiente
    const m1 = pendiente(line1);
    const b1 = b(line1.point1, m1);
    const m2 = pendiente(line2);
    const b2 = b(line2.point1, m2);

    const x = (b2 - b1) / (m1 - m2);
    const y = m1 * x + b1;
    return { x, y, z: 0 };
};

export function distanceBetweenPoints(p1: Point, p2: Point) {
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}
export const vectorComponents = (direction: number, velocity: number) => {
    const radians = convertToRadians(direction);
    return {
        x: toFixed(velocity * Math.cos(radians)),
        y: toFixed(velocity * Math.sin(radians)),
    };
};
export const convertToDegrees = (radians: number) => (radians * 180) / Math.PI;
export const convertToRadians = (degrees: number) => (degrees * Math.PI) / 180;
export const vectorByXY = (vX: number, vY: number) => {
    const vel = toFixed(Math.sqrt(vX ** 2 + vY ** 2));
    const dir = toFixed(convertToDegrees(Math.atan2(vY, vX)));
    return { vel, dir };
};
export const toFixed = (num: number) => parseFloat(num.toFixed(presicion));
export const intersectionRectangles = (rect1: Rectangle, rect2: Rectangle) => {
    let xColision = intersectionRanges({ p1: rect1.x, p2: rect1.x2 }, { p1: rect2.x, p2: rect2.x2 });
    let yColision = intersectionRanges({ p1: rect1.y, p2: rect1.y2 }, { p1: rect2.y, p2: rect2.y2 });
    return xColision && yColision;
};
export const intersectionRanges = (line1: Range, line2: Range) => {
    return line1.p1 <= line2.p2 && line1.p2 >= line2.p1;
};
