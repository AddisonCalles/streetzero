import { GameEvents } from '../events';

export class GameEventProvider {
  constructor() {}
  onGameOver(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.gameover, (data: Event) =>
      listener(data)
    );
  }
  onStart(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.start, (data: Event) => listener(data));
  }
  onStop(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.stop, (data: Event) => listener(data));
  }
  onPause(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.pause, (event: Event) =>
      listener(event)
    );
  }
  onPlay(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.play, (event: Event) => listener(event));
  }
  onRender(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.render, (event: Event) =>
      listener(event)
    );
  }
  onNextLevel(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.nextlevel, (event: Event) =>
      listener(event)
    );
  }
  onPreNextLevel(listener: (data: Event) => void | undefined) {
    window.addEventListener(GameEvents.prenextlevel, (event: Event) =>
      listener(event)
    );
  }
}
