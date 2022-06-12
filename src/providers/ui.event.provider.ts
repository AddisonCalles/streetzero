import { UIEvents } from '../events';

export class UIEventProvider {
  constructor(private canvas?: HTMLCanvasElement | null) {}
  onClick(listener: Function) {
    if (!this.canvas) console.warn('Canvas undefined');
    this.canvas?.addEventListener(UIEvents.click, e => listener(e));
  }
  onMouseMove(listener: Function) {
    this.canvas?.addEventListener(UIEvents.mousemove, e => listener(e));
  }
  onKeyDown(listener: Function) {
    document.addEventListener(UIEvents.keydown, e => listener(e));
  }
  onKeyUp(listener: Function) {
    document.addEventListener(UIEvents.keyup, e => listener(e));
  }
  onTouchStart(listener: Function) {
    this.canvas?.addEventListener(UIEvents.touchstart, e => listener(e));
  }
  onTouchEnd(listener: Function) {
    this.canvas?.addEventListener(UIEvents.touchend, e => listener(e));
  }
  onTouchCancel(listener: Function) {
    this.canvas?.addEventListener(UIEvents.touchcancel, e => listener(e));
  }
  onMouseDown(listener: Function) {
    this.canvas?.addEventListener(UIEvents.mousedown, e => listener(e));
  }
  onMouseUp(listener: Function) {
    this.canvas?.addEventListener(UIEvents.mouseup, e => listener(e));
  }
  onMouseOut(listener: Function) {
    this.canvas?.addEventListener(UIEvents.mouseout, e => listener(e));
  }
}
