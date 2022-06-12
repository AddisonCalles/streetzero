export interface Game {
    clearScreen(): void;
    play(): void;
    pause(): void;
    nextLevel(sleepOffset: number): void;
    start(): void;
    stop(): void;
    incrementPoints(amount: number): void;

    get gameOver();
    set gameOver(value: boolean);
    set speed(value);
    get points(): number;
    get level(): number;
    get isPlay(): boolean;
    get time(): number;
    get initTime(): number;
    get fps(): number;
    get speed(): number;
}
