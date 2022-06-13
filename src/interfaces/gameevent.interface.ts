export interface GameEvents {
  onStop(): void;
  onStart(): void;
  onPreload(): void;
  onPause(): void;
  onNextlevel(): void;
  onPrenextlevel(): void;
  onRender(): void;
  onPlay(): void;
  onGameover(): void;
}
