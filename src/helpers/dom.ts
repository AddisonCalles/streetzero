export interface DOMContext {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
}

export const getContext = (strict?: boolean): DOMContext => {
  let canvas = document.querySelector('canvas');
  if (strict && !canvas) throw new Error('Canvas2D undefined in dom...');
  const context = canvas?.getContext('2d') ? canvas?.getContext('2d') : null;
  return { canvas, context };
};
