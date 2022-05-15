import { MouseEvents } from './mouse.event.types';
import { eventRegister } from './onevents';
export function onClic() {
  return eventRegister(MouseEvents.clic);
}
export function onMouseMove() {
  return eventRegister(MouseEvents.mousemove);
}
export function onKeyDown() {
  return eventRegister(MouseEvents.keydown);
}
export function onKeyUp() {
  return eventRegister(MouseEvents.keyup);
}
export function onTouchStart() {
  return eventRegister(MouseEvents.touchstart);
}
export function onTouchEnd() {
  return eventRegister(MouseEvents.touchend);
}
export function onTouchCancel() {
  return eventRegister(MouseEvents.touchcancel);
}
export function onMouseDown() {
  return eventRegister(MouseEvents.mousedown);
}
export function onMouseUp() {
  return eventRegister(MouseEvents.mouseup);
}
export function onMouseOut() {
  return eventRegister(MouseEvents.mouseout);
}
