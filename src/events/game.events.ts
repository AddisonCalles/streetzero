import { container } from 'tsyringe';
import { EventProvider } from '../providers/event.provider';
import { GameEvents } from './game.event.types';

const provider = container?.resolve(EventProvider);
export function onGameStart() {
  return function(target: any, propertyKey: string) {
    provider?.on(GameEvents.start, target[propertyKey]);
    //descriptor.enumerable = value;
  };
}
export function onGameStop() {
  return function(target: any, propertyKey: string) {
    provider?.on(GameEvents.stop, target[propertyKey]);
  };
}
export function onNextLevel() {
  return function(target: any, propertyKey: string) {
    provider?.on(GameEvents.nextlevel, target[propertyKey]);
  };
}
export function onPreNextLevel() {
  return function(target: any, propertyKey: string) {
    provider?.on(GameEvents.prenextlevel, target[propertyKey]);
  };
}
export function onGamePause() {
  return function(target: any, propertyKey: string) {
    provider?.on(GameEvents.pause, target[propertyKey]);
  };
}
export function onRender() {
  return function(target: any, propertyKey: string) {
    provider?.on(GameEvents.render, target[propertyKey]);
  };
}
