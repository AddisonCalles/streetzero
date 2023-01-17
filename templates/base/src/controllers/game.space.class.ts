import { inject } from 'inversify';
import { Controller, DOMContext, GameEvents, math, MouseEvents, zGame } from 'streetzero';
import { Enemy } from '../kinematics/enemies/enemy.class';
import { QueenShipV1 } from '../kinematics/enemies/queenship.class';
import { EnemyLevels, SmallShip } from '../kinematics/enemies/smallShip.class';
import { Player } from '../kinematics/player.class';
import { Sounds } from '../resources/sounds.class';
import { Colors } from '../ui/colors';

@Controller()
export class SpaceController implements GameEvents, MouseEvents {
    private _player: Player;
    private _lastFire?: Date;
    private _points = 0;
    private _enemies: Enemy[] = [];
    private _levelText = '';
    private _queen = false;
    private _queenLevel = 25;
    private _resetText = `Press click to reset...`;
    private _secondsToReset = 3;
    private context: CanvasRenderingContext2D | null;
    private canvas: HTMLCanvasElement | null;
    constructor(@inject(DOMContext) { context, canvas }: DOMContext, @inject(zGame) private game: zGame) {
        this.context = context;
        this.canvas = canvas;
        this._player = new Player(canvas, '#4f83cc', 20, 50, 15);
        this._player.health.deadEvent.subscribe(() => {
            game.gameOver = true;
        });
    }
    onClick(event: any): void {
        if (!this.game.isPlay) {
            this.game.play();
        } else if (this.game.gameOver) {
            this.reset();
        } else {
            const now = new Date();
            if (!this._lastFire) {
                this._lastFire = new Date();
                this.player.fire();
            } else if (now.getTime() - this._lastFire.getTime() > 150) {
                this._lastFire = new Date();
                this.player.fire();
            }
        }
    }
    onMousemove(event: any): void {
        this.player.setPos(10, event.offsetY - this.player.height);
    }
    onMousedown(event: any): void {
        console.log('onMousedown');
    }
    onMouseup(event: any): void {
        console.log('onMouseup');
    }
    onMouseout(event: any): void {
        console.log('onMouseout');
    }
    onStop(): void {
        console.log('game stoped...');
    }
    onStart(): void {
        console.log('game atarted...');
    }
    onPreload(): void {
        console.log('game onPreload...');
    }
    onPause(): void {
        console.log('game paused...');
    }
    onPrenextlevel(): void {
        console.log('game prenextlevel...');
    }
    onPlay(): void {
        console.log('game play...');
    }
    onGameover(): void {
        Sounds.gameOver();
    }
    onRender() {
        if (!this.context || !this.canvas) return;
        if (this.game.gameOver) {
            this.gameOverScreen();
            return;
        }

        this.context.fillStyle = Colors.background;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.game.isPlay) {
            this.context.font = '20px Arial';
            this.context.fillStyle = 'gray';
            this.context.fillText('Press Click to Start...', this.canvas.width / 2 - 100, this.canvas.height / 2);
        }
        if (this.game.isPlay) {
            this._player.render();
            this.renderEnemies();
            if (this._levelText !== '') {
                this.context.font = '20px Arial';
                this.context.fillStyle = Colors.title;
                this.context.fillText(this._levelText, this.canvas.width / 2 - 25, this.canvas.height / 2);
                this.context.font = '10px Arial';
                this.context.fillText('Powered By StreetZero A.C.', this.canvas.width / 2 - 50, this.canvas.height / 2 + 20);
            }
            this.game.printDebug();
            this.context.fillText(`Enemies: ${this.enemies.length} | Level: ${this.game.level} | points: ${this.game.points}`, 15, 45);
        }
    }
    renderEnemies() {
        this.enemies.forEach((enemy) => {
            if (!enemy.health.isDead) {
                enemy.move();
                if (this._player.isShootedEnemy(enemy)) {
                    this.game.incrementPoints();
                } else if (this.player.hasColision(enemy)) {
                    enemy.destroy();
                    this.player.health.reduce(1);
                } else {
                    enemy.render();
                }
            }
        });
        this._enemies = this.enemies.filter((enemy) => !enemy.isDestroy());
        if (this.game.level % this._queenLevel == 0 && this._queen) {
            //Is Queen level
        } else if (this._enemies.length == 0 && this._levelText == '') {
            Sounds.explosionEnd();
            this.game.nextLevel();
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
    onNextlevel() {
        if (!this.context || !this.canvas) return;
        if (this.game.level % this._queenLevel == 0) {
            this.enemies.push(new QueenShipV1(this.canvas, this._player));
        }
        this.addEnemies(this.game.level);
    }
    private gameOverScreen() {
        if (!this.context || !this.canvas) return;
        this.context.font = '40px Arial';
        this.context.fillStyle = 'gray';
        this.context.fillText(`Game Over`, this.canvas.width / 2 - 100, this.canvas.height / 2);
        this.context.font = '18px Arial';
        this.context.fillText(this._resetText, this.canvas.width / 2 - 100, this.canvas.height / 2 + 35);
    }
    private addEnemies(count: number) {
        if (!this.context || !this.canvas) return;
        for (let index = 0; index < count; index++) {
            let levelEnemy = EnemyLevels.level1;
            if (index < 10) {
            } else if (index % 10 == 0) {
                levelEnemy = EnemyLevels.level2;
            } else if (index % 6 == 0) {
                levelEnemy = EnemyLevels.level3;
            }
            const enemy = new SmallShip(this.canvas, levelEnemy, this.canvas.width - 100, math.random(this.canvas.height - 50, 50), this._player);
            enemy.vector.setVector(1.5 + this.game.level / 5, math.random(270, 90));
            this.enemies.push(enemy);
        }
    }
    get points() {
        return this._points;
    }
    get enemies() {
        return this._enemies;
    }
    get player() {
        return this._player;
    }
}
