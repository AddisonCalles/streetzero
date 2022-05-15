import {
  onGameEventData,
  onNextLevelListener,
  onPreNextLevelListener,
} from './game.event.types';

export interface onGameEvent {
  onGameEvent: onGameEventData;
}
export interface onGameStop {
  onGameStop: onGameEventData;
}
export interface onGameStart {
  onGameStart: onGameEventData;
}
export interface onRender {
  onRender: onGameEventData;
}
export interface onPause {
  onPause: onGameEventData;
}
export interface onPreNextLevel {
  onPreNextLevel: onPreNextLevelListener;
}
export interface onNextLevel {
  onNextLevel: onNextLevelListener;
}
