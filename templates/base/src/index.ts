import { zEngine, zGame } from 'streetzero';
import { SpaceController } from './controllers/game.space.class';

const engine = zEngine.initialize([SpaceController]);
const game: zGame = engine.ioc.get(zGame);
game.start();
game.play();
game.runHandDetection();
