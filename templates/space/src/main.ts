import { Game } from 'streetzero';

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const game = new Game(canvas);
game.nextLevel();
game.start();
