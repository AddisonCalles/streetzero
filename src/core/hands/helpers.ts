import { NormalizedLandmark } from '@mediapipe/hands';

export function drawTwoPoints(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, label: string) {
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = '#f00';
    context.font = '30px Arial';
    context.fillStyle = '#00ff00';
    context.fillText(label, x1, y1);
    context.stroke();
}
export function distanciaApertura(context: Dimention, p1: NormalizedLandmark, p2: NormalizedLandmark, unitLength: number) {
    const result = distanciaEntrePuntos(context, p1, p2);
    result.distance = parseFloat((result.distance / unitLength).toFixed(2));
    return result;
}

export function distanciaEntrePuntos(context: Dimention, p1: NormalizedLandmark, p2: NormalizedLandmark) {
    const [x1, y1] = normalizePunto(context, p1);
    const [x2, y2] = normalizePunto(context, p2);
    return { distance: Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)), p1: { ...p1, x: x1, y: y1 }, p2: { ...p2, x: x2, y: y2 } };
}
export function normalizePunto(context: Dimention, p: NormalizedLandmark) {
    const { width, height } = context;
    return [p.x * width, p.y * height];
}
export type Dimention = { width: number; height: number };
