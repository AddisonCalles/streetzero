import { MainGame, DOMContext, Module } from 'streetzero';
import { GameSpace } from './controllers/game.space.class';

@Module({
    import: [DOMContext, MainGame],
    controllers: [GameSpace],
})
export class MainModule {}
