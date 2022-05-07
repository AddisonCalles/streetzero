import { GameSpace } from "./controllers/game.space.class";


const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const game = new GameSpace(canvas);
game.nextLevel();
game.start();
