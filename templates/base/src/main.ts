import { Game } from 'streetzero';
import { SpaceController } from './controllers/game.space.class';

const game: Game = Game.getInstance(true);
const controller = new SpaceController();
controller;
game.nextLevel();
game.play();
game.start();
