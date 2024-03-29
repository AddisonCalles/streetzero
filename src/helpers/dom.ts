export interface DOMContext {
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
}

export const getContext = (strict?: boolean): DOMContext => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    if (strict && !canvas) throw new Error('Canvas2D undefined in dom...');
    const context = canvas?.getContext('2d') ? canvas?.getContext('2d') : null;
    return { canvas, context };
};
