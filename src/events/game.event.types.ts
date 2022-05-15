import { Game } from '../';
import { DOMContext } from '../';

export enum GameEvents {
  stop = 'game.stop',
  start = 'game.start',
  pause = 'game.pause',
  nextlevel = 'game.nextlevel',
  prenextlevel = 'game.prenextlevel',
  render = 'game.render',
}
export type onGameEventData = (dom?: DOMContext, game?: Game) => void;
export type onPreNextLevelListener = (
  current?: number,
  next?: number,
  dom?: DOMContext,
  game?: Game
) => void;
export type onNextLevelListener = (
  level?: number,
  dom?: DOMContext,
  game?: Game
) => void;
