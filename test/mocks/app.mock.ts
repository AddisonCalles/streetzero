import 'jest-canvas-mock';
import 'reflect-metadata';
import { container } from 'tsyringe';

export const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.prepend(canvas);
export const context2D = canvas.getContext('2d');
const newcanvas = document.createElement('canvas');
document.body.prepend(newcanvas);
export const reloadDependency = () => {
  try {
    container.reset();
    container.clearInstances();
    container.register<HTMLCanvasElement | null>('Canvas', {
      useValue: canvas,
    });
    container.register<CanvasRenderingContext2D | null>('Context2D', {
      useValue: context2D,
    });
  } catch (error) {}
};

reloadDependency();
