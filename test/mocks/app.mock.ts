import 'jest-canvas-mock';
import 'jest';
export const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.prepend(canvas);
export const context2D = canvas.getContext('2d');
const newcanvas = document.createElement('canvas');
document.body.prepend(newcanvas);
