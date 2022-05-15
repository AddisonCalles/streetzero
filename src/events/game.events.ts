import { GameEvents } from './game.event.types';
import { eventRegister } from './onevents';

export function onGameStart() {
  return eventRegister(GameEvents.start);
  //descriptor.enumerable = value;
}
export function onGameStop() {
  return eventRegister(GameEvents.stop);
}
export function onNextLevel() {
  return eventRegister(GameEvents.nextlevel);
}
export function onPreNextLevel() {
  return eventRegister(GameEvents.prenextlevel);
}
export function onGamePause() {
  return eventRegister(GameEvents.pause);
}
export function onRender() {
  return eventRegister(GameEvents.render);
}
