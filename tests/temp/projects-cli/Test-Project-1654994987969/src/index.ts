import { zModule, zGame } from 'streetzero';
import { MainModule } from './main.module';

const main: zModule = <zModule>new MainModule();
const ioc = main.ioc;

const game = ioc.get(zGame); //find mainGame instance

game.start();
