import 'reflect-metadata';
import { container } from 'tsyringe';
import { GameSpace } from './controllers/game.space.class';
import { Player } from './kinematics/player.class';

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById('canvas')
);
const context2D = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

container.register('Canvas',{useValue: canvas});
container.register('Context2D',{useValue: context2D} );
container.register('Player', {useValue: new Player()});
container.register('Game', {useClass: GameSpace});

const game = container.resolve<GameSpace>('Game');
game.nextLevel();
game.start();
