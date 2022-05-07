import { Kinematic, LayerPath } from 'streetzero';

function body(xoff: number, yoff: number, xmul: number, ymul: number) {
    const ctx = new Path2D();
    ctx.moveTo(101 * xmul + xoff, 94 * ymul + yoff);
    ctx.lineTo(153 * xmul + xoff, 56 * ymul + yoff);
    ctx.lineTo(257 * xmul + xoff, 48 * ymul + yoff);
    ctx.lineTo(270 * xmul + xoff, 83 * ymul + yoff);
    ctx.lineTo(263 * xmul + xoff, 104 * ymul + yoff);
    ctx.lineTo(145 * xmul + xoff, 111 * ymul + yoff);
    ctx.lineTo(98 * xmul + xoff, 124 * ymul + yoff);
    ctx.lineTo(140 * xmul + xoff, 140 * ymul + yoff);
    ctx.lineTo(140 * xmul + xoff, 151 * ymul + yoff);
    ctx.lineTo(70 * xmul + xoff, 151 * ymul + yoff);
    ctx.lineTo(16 * xmul + xoff, 110 * ymul + yoff);
    ctx.lineTo(49 * xmul + xoff, 83 * ymul + yoff);
    ctx.lineTo(21 * xmul + xoff, 30 * ymul + yoff);
    ctx.lineTo(34 * xmul + xoff, 12 * ymul + yoff);
    ctx.lineTo(83 * xmul + xoff, 43 * ymul + yoff);
    ctx.closePath();
    return ctx;
}

function body3(xoff: number, yoff: number, xmul: number, ymul: number) {
    const ctx = new Path2D();
    ctx.moveTo(101 + 100 * xmul + xoff, 94 * ymul + yoff);
    ctx.lineTo(153 + 100 * xmul + xoff, 56 * ymul + yoff);
    ctx.lineTo((237 + 40) * xmul + xoff, (78 + 20) * ymul + yoff);
    ctx.lineTo((256 + 30) * xmul + xoff, (83 + 30) * ymul + yoff);
    ctx.lineTo(98 * xmul + xoff, 124 * ymul + yoff);
    ctx.lineTo((110 + 60) * xmul + xoff, (140 - 10) * ymul + yoff);
    ctx.lineTo(250 * xmul + xoff, 150 * ymul + yoff);
    ctx.lineTo(40 * xmul + xoff, 150 * ymul + yoff);
    ctx.lineTo(16 * xmul + xoff, 110 * ymul + yoff);
    ctx.lineTo(49 * xmul + xoff, 83 * ymul + yoff);
    ctx.lineTo(83 * xmul + xoff, 43 * ymul + yoff);
    ctx.closePath();
    return ctx;
}

function body2(xoff: number, yoff: number, xmul: number, ymul: number) {
    const ctx = new Path2D();
    ctx.moveTo(100 * xmul + xoff, 10 * ymul + yoff);
    ctx.lineTo(133 * xmul + xoff, 66 * ymul + yoff);
    ctx.lineTo(40 * xmul + xoff, 150 * ymul + yoff);
    ctx.lineTo(16 * xmul + xoff, 60 * ymul + yoff);
    ctx.lineTo(49 * xmul + xoff, 60 * ymul + yoff);
    ctx.lineTo(83 * xmul + xoff, 10 * ymul + yoff);
    ctx.closePath();
    return ctx;
}
function guns1(xoff: number, yoff: number, xmul: number, ymul: number) {
    const ctx = new Path2D();
    ctx.moveTo(275 * xmul + xoff, 105 * ymul + yoff);
    ctx.lineTo(288 * xmul + xoff, 92 * ymul + yoff);
    ctx.lineTo(270 * xmul + xoff, 58 * ymul + yoff);
    ctx.lineTo(245 * xmul + xoff, 62 * ymul + yoff);
    ctx.lineTo(275 * xmul + xoff, 105 * ymul + yoff);
    ctx.closePath();
    return ctx;
}
function guns2(xoff: number, yoff: number, xmul: number, ymul: number) {
    const ctx = new Path2D();
    ctx.moveTo(100 * xmul + xoff, 110 * ymul + yoff);
    ctx.lineTo(250 * xmul + xoff, 130 * ymul + yoff);
    ctx.lineTo(250 * xmul + xoff, 150 * ymul + yoff);
    ctx.lineTo(100 * xmul + xoff, 150 * ymul + yoff);
    ctx.closePath();
    return ctx;
}
export const queenShipV1Drawing = (color: string, element: Kinematic) => [
    new LayerPath(guns1(0 - 150, 0 - 50, 1, 1), 'gray', element),
    new LayerPath(guns1(0 - 150, 300 + 50, 1, -1), 'gray', element),
    new LayerPath(guns1(0, 0, 1, 1), 'gray', element),
    new LayerPath(guns1(0, 300, 1, -1), 'gray', element),
    new LayerPath(body2(0, 0, 1, 1), '#616161', element),
    new LayerPath(body2(0, 300, 1, -1), '#616161', element),
    new LayerPath(guns2(0, 0, 1, 1), 'gray', element),
    new LayerPath(guns2(0, 300, 1, -1), 'gray', element),
    new LayerPath(body3(0, 300, 1, -1), '#bf360c', element),
    new LayerPath(body3(0, 0, 1, 1), '#bf360c', element),
    new LayerPath(body(0, 0, 1, 1), '#bdbdbd', element),
    new LayerPath(body(0, 300, 1, -1), '#bdbdbd', element),
];
