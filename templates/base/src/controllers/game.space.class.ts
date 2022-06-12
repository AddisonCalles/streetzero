import { math, Controller, DOMContext, Game } from 'streetzero';
import { SmallShip, EnemyLevels } from "../kinematics/enemies/smallShip.class";
import { Sounds } from "../resources/sounds.class";
import { Player } from "../kinematics/player.class";
import { Colors } from "../ui/colors";
import { QueenShipV1 } from "../kinematics/enemies/queenship.class";
import { Enemy } from "../kinematics/enemies/enemy.class";


@Controller()
export class GameSpace {
    private _player: Player;
    #points = 0;
    private _enemies: Enemy[] = [];
    private _levelText = "";
    private _queen = false;
    private _queenLevel = 25;
    private _resetText = `Press click to reset...`;
    private _secondsToReset = 3;
    private game: Game;
    private context: CanvasRenderingContext2D | null;
    private canvas: DOMContext;
    constructor({context, canvas}: DOMContext, game: Game) {
        this.context = context;
        this.canvas = canvas;
        this._player = new Player(canvas, '#4f83cc', 20, 50, 15);
        this._player.health.deadEvent.subscribe(() => {
            game.gameOver = true;
        })
    }

    onRender() {
        if (!this.context) return;
        if (this.game.gameOver) {
            this.gameOverScreen()
            return;
        }
        
        this.context.fillStyle = Colors.background;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.game.isPlay) {
            this.context.font = "20px Arial";
            this.context.fillStyle = 'gray';
            this.context.fillText('Press Click to Start...', (this.canvas.width / 2) - 100, this.canvas.height / 2);
          }
        if (this.game.isPlay) {
            this._player.render();
            this.renderEnemies();
            if (this.canvas.gameOver) {
                this.onGameOver();
            }
            if (this._levelText != '') {
                this.context.font = "20px Arial";
                this.context.fillStyle = Colors.title;
                this.context.fillText(this._levelText, (this.canvas.width / 2) - 25, this.canvas.height / 2);
                this.context.font = "10px Arial";
                this.context.fillText('Powered By StreetZero A.C.', (this.canvas.width / 2) - 50, (this.canvas.height / 2) + 20);
            }
        }
    }
    onFire() {
        if (!this.game.isPlay) {
            this.game.play();
        } else if (this.game.gameOver) {
            this.reset();
        } else {
            this.player.fire();
        }
    }
    onMouseMove(event: any) {
        this.player.setPos(10, event.offsetY - this.player.height);
    }
    onGameOver() {
        Sounds.gameOver();
    }
    renderEnemies() {
        this._enemies.forEach(enemy => {
            if (!enemy.health.isDead) {
                enemy.move();
                if (this._player.isShootedEnemy(enemy)) {
                    this.#points++;
                } else if (this._player.hasColision(enemy)) {
                    enemy.destroy();
                    this._player.health.reduce(1);
                } else {
                    enemy.render();
                }
            }
        });
        this._enemies = this._enemies.filter(enemy => !enemy.isDestroy());
        if (this.level % this._queenLevel == 0 && this._queen) {
            //Is Queen level
        }
        else if (this._enemies.length == 0 && this._levelText == '') {
            Sounds.explosionEnd();
            this.nextLevel();
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
    onNextLevel() {
        if (this.level % this._queenLevel == 0) {
            this._enemies.push(new QueenShipV1(this.canvas, this._player));
        }
        this.addEnemies(this.level);
    }
    onKeyDown() { }
    onKeyUp() { }
    onNexLevelPress() { }
    onPreload() { }
    onStart() { }
    onStop() { }
    onTouchStart() { }
    onTouchEnd() { }
    onTouchCancel() { }

    private gameOverScreen() {
        if (!this.context) return;
        this.context.font = "40px Arial";
        this.context.fillStyle = 'gray';
        this.context.fillText(`Game Over`, (this.canvas.width / 2) - 100, this.canvas.height / 2);
        this.context.font = "18px Arial";
        this.context.fillText(this._resetText, (this.canvas.width / 2) - 100, (this.canvas.height / 2) + 35);
    }
    private addEnemies(count: number) {
        for (let index = 0; index < count; index++) {
            let levelEnemy = EnemyLevels.level1;
            if (index < 10) {
            } else if (index % 10 == 0) {
                levelEnemy = EnemyLevels.level2;
            } else if (index % 6 == 0) {
                levelEnemy = EnemyLevels.level3;
            }
            const enemy = new SmallShip(this.canvas, levelEnemy, (this.canvas.width - 100), math.random(this.canvas.height-50, 50), this._player);
            enemy.vector.setVector(1.5 + (this.level / 5), math.random(270, 90));
            this._enemies.push(enemy)
        }
    }
    get points() { return this.#points; }
    get enemies() { return this._enemies; }
    get player() { return this._player; }
}