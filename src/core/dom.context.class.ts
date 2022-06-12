import { injectable } from 'inversify';
import { getContext } from '../helpers/dom';

@injectable()
export class DOMContext {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;

  constructor() {
    const { canvas, context } = getContext(true);
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    this.canvas = canvas;
    this.context = context;
  }
}
