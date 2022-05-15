import { SmallShip, EnemyLevels } from '../kinematics/enemies/smallShip.class';
import { Sounds } from '../resources/sounds.class';
import { Player } from '../kinematics/player.class';
import { Colors } from '../ui/colors';
import { QueenShipV1 } from '../kinematics/enemies/queenship.class';
import {
    math,
    Game,
    onRender,
    onClic,
    onMouseMove,
    onNextLevel,
    DOMContext,
    NextLevelEvent,
    EventProvider,
    GameEvents,
} from 'streetzero';
import { Enemy } from '../kinematics/enemies/enemy.class';
import { getContext } from 'streetzero/dist/helpers/dom';

export class SpaceController {
    private _enemies: Enemy[] = [];
    private _levelText = '';
    private _queen = false;
    private _queenLevel = 25;
    private _resetText = `Press click to reset...`;
    private _secondsToReset = 3;
    constructor() {
        const player: Player = Player.getInstance();
        player.health.deadEvent.subscribe(() => {
            Game.getInstance().gameOver = true;
        });
        const provider = EventProvider.getInstance();
        const context = this;
        provider.on(GameEvents.render, (dom: DOMContext) => context.onRender(dom, context));
        provider.on(GameEvents.nextlevel, (data: NextLevelEvent) => context.onNextLevel(data));
    }

    @onRender()
    onRender(dom: DOMContext, _this: SpaceController) {
        const player: Player = Player.getInstance();
        const game = Game.getInstance();
        const { context, canvas } = getContext();
        if (!context) return;
        if (game.gameOver) {
            _this.gameOverScreen(dom);
            return;
        }

        context.fillStyle = Colors.background;
        context.fillRect(0, 0, canvas.width, canvas.height);
        if (!game.isPlay) {
            context.font = '20px Arial';
            context.fillStyle = 'gray';
            context.fillText('Press Click to Start...', canvas.width / 2 - 100, canvas.height / 2);
        }
        if (game.isPlay) {
            player.render(dom);
            _this.renderEnemies(dom, game);
            if (game.gameOver) {
                _this.onGameOver();
            }
            if (_this._levelText != '') {
                context.font = '20px Arial';
                context.fillStyle = Colors.title;
                context.fillText(_this._levelText, canvas.width / 2 - 25, canvas.height / 2);
                context.font = '10px Arial';
                context.fillText(
                    'Powered By StreetZero A.C.',
                    canvas.width / 2 - 50,
                    canvas.height / 2 + 20
                );
            }
        }
    }

    @onClic()
    onFire() {
        const player: Player = Player.getInstance();
        const game = Game.getInstance();
        if (!game.isPlay) {
            game.play();
        } else if (game.gameOver) {
            this.reset();
        } else {
            player.fire();
        }
    }
    @onMouseMove()
    onMouseMove(event: any) {
        const player: Player = Player.getInstance();
        player.setPos(10, event.offsetY - player.height);
    }

    onGameOver() {
        Sounds.gameOver();
    }
    renderEnemies(dom: DOMContext, game: Game) {
        const player: Player = Player.getInstance();
        this._enemies.forEach(enemy => {
            if (!enemy.health.isDead) {
                enemy.move();
                if (player.isShootedEnemy(enemy)) {
                    game.incrementPoints(1);
                } else if (player.hasColision(enemy)) {
                    enemy.destroy();
                    player.health.reduce(1);
                } else {
                    enemy.render(dom);
                }
            }
        });
        this._enemies = this._enemies.filter(enemy => !enemy.isDestroy());
        if (game.level % this._queenLevel == 0 && this._queen) {
            //Is Queen level
        } else if (this._enemies.length == 0 && this._levelText == '') {
            Sounds.explosionEnd();
            game.nextLevel();
        }
    }
    reset() {
        setInterval(() => {
            if (this._secondsToReset == 0) {
                document.location.reload();
            }
            this._resetText = `Reset in ${this._secondsToReset} seconds...`;
            this._secondsToReset--;
        }, 1000);
    }
    @onNextLevel()
    onNextLevel({ domContext }: NextLevelEvent) {
        const game = Game.getInstance();
        if (game.level % this._queenLevel == 0) {
            this._enemies.push(new QueenShipV1());
        }
        this.addEnemies(game, domContext.canvas, game.level);
    }
    private gameOverScreen({ canvas, context }: DOMContext) {
        if (!context) return;
        context.font = '40px Arial';
        context.fillStyle = 'gray';
        context.fillText(`Game Over`, canvas.width / 2 - 100, canvas.height / 2);
        context.font = '18px Arial';
        context.fillText(this._resetText, canvas.width / 2 - 100, canvas.height / 2 + 35);
    }
    private addEnemies(game: Game, canvas: HTMLCanvasElement, count: number) {
        for (let index = 0; index < count; index++) {
            let levelEnemy = EnemyLevels.level1;
            if (index < 10) {
            } else if (index % 10 == 0) {
                levelEnemy = EnemyLevels.level2;
            } else if (index % 6 == 0) {
                levelEnemy = EnemyLevels.level3;
            }
            const enemy = new SmallShip(
                levelEnemy,
                canvas.width - 100,
                math.random(canvas.height, 5)
            );
            enemy.vector.setVector(1.5 + game.level / 5, math.random(270, 90));
            this._enemies.push(enemy);
        }
    }
    get enemies() {
        return this._enemies;
    }
}
