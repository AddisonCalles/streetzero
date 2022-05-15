export interface DOMContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
}

export const getContext = (): DOMContext => {
  let canvas = document.querySelector('canvas');
  canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  return { canvas, context };
};
