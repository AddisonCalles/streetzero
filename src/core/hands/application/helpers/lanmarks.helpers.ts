import { distanceBetweenPoints } from '../../../../helpers/math';
import { Point } from '../../../../interfaces/point';

export function drawTwoPoints(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, label: string) {
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = '#f00';
    context.font = '30px Arial';
    context.fillStyle = '#00ff00';
    context.fillText(label, x1, y1);
    context.stroke();
}
export function distanciaApertura(p1: Point, p2: Point, unitLength: number) {
    const distance = distanceBetweenPoints(p1, p2);
    return parseFloat((distance / unitLength).toFixed(2));
}

export function normalizePunto(context: Dimention, p: Point): Point {
    const { width, height } = context;
    const y = p.y * height;
    const x = p.x * width;
    return { x, y, z: p.z };
}
export type Dimention = { width: number; height: number };
