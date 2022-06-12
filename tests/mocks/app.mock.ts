import 'jest-canvas-mock';
import 'jest';
(function mockDOMMatrix() {
  class DOMMatrixMock extends DOMMatrix {
    scale = jest
      .fn()
      .mockImplementation((scaleX, scaleY) => this.setScale(scaleX, scaleY));
    translate = jest.fn().mockImplementation((x, y) => this.setTranslate(x, y));

    setScale(scaleX: number, scaleY: number) {
      this.f = scaleY;
      this.e = scaleX;
      return this;
    }

    setTranslate(x: number, y: number) {
      this.b = x;
      this.c = y;
      return this;
    }
  }

  global.DOMMatrix = DOMMatrixMock;
})();

let canvasOBJ = document.createElement('canvas');
canvasOBJ.id = '#canvas-origin';
canvasOBJ.width = window.innerWidth;
canvasOBJ.height = window.innerHeight;
document.body.prepend(canvasOBJ);
export const context2D = canvasOBJ.getContext('2d');

export const canvas = canvasOBJ;
