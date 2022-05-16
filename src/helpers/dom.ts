export interface DOMContext {
  canvas?: HTMLCanvasElement | null;
  context?: CanvasRenderingContext2D | null;
}

export const getContext = (): DOMContext => {
  let canvas = document.querySelector('canvas');
  const context = canvas?.getContext('2d');
  return { canvas, context };
};
