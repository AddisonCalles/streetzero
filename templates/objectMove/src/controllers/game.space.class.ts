import { inject } from 'inversify';
import { Controller, DOMContext, GameEvents, MouseEvents, Point, math, zGame } from 'streetzero';
import { HandsMapEvent } from 'streetzero/core/hands';
import { HandsEvents } from 'streetzero/hands';
import { Enemy } from '../kinematics/enemies/enemy.class';
import { QueenShipV1 } from '../kinematics/enemies/queenship.class';
import { Player } from '../kinematics/player.class';
import { Sounds } from '../resources/sounds.class';

@Controller()
export class SpaceController implements GameEvents, MouseEvents, HandsEvents {
    private _player: Player;
    // private _lastFire?: Date;
    private _points = 0;
    private _enemies: Enemy[] = [];
    // private _levelText = '';
    private _queen = false;
    private _queenLevel = 25;
    private _resetText = `Press click to reset...`;
    private _secondsToReset = 3;
    private context: CanvasRenderingContext2D | null;
    private canvas: HTMLCanvasElement | null;
    private apertura?: { circle: Point & { r: number }; p0p5Angle: number; pointer: Point };
    private clicked: boolean = false;
    constructor(@inject(DOMContext) { context, canvas }: DOMContext, @inject(zGame) private game: zGame) {
        this.context = context;
        this.canvas = canvas;
        this._player = new Player(canvas, '#4f83cc', 20, 50, 15);
        this.player.centerOffset();
        this._player.enableDebug();
        this._player.health.deadEvent.subscribe(() => {
            game.gameOver = true;
        });
    }
    onHandDetect({ detail }: HandsMapEvent): void {
        this.apertura = { circle: { x: 0, y: 0, z: 0, r: 0 }, p0p5Angle: 0, pointer: { x: 0, y: 0, z: 0 } };
        if (detail.left) {
            const p8 = detail.left.landmarks[8];
            const p0 = detail.left.landmarks[0];
            const p5 = detail.left.landmarks[5];
            const p17 = detail.left.landmarks[17];
            const p2 = detail.left.landmarks[2];
            const p4 = detail.left.landmarks[4];

            this.apertura.pointer = p8;
            const intersect = math.rectsIntersect({ point1: p0, point2: p5 }, { point1: p17, point2: p2 });
            const activator = math.distanceBetweenPoints(intersect, p4);
            const r = math.distanceBetweenPoints(intersect, p5) * 1.4;
            this.clicked = activator <= r;
            this.apertura.circle = { ...intersect, r };
            this.apertura.p0p5Angle = activator;
            console.log('onHandDetect', detail);
        }
    }
    onRender() {
        this.game.printDebug();
        if (this.context && this.apertura) {
            const { circle, p0p5Angle, pointer } = this.apertura;
            this.context.beginPath();
            this.context.fillStyle = '#552233';
            // this.context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
            this.context.fill();

            this.context.closePath();
            this.context.beginPath();
            this.context.fillStyle = '#00ff00';
            this.context.fillText(`Angulo P0 -> P5: ${p0p5Angle}`, circle.x + 10, circle.y + 10);
            this.context.fillText(`Clicked: ${this.clicked ? 'On' : 'Off'}`, circle.x + 10, circle.y + 20);
            if (this.clicked) {
                this.context.fillStyle = '#00ff00';
                this.context.arc(pointer.x, pointer.y, 25, 0, 2 * Math.PI);
                this.context.fill();
                const playerXd = this._player.x + this.player.width;
                const playerYd = this._player.y + this.player.height;
                const d = math.distanceBetweenPoints({ x: playerXd, y: playerYd, z: 0 }, pointer);
                if (d <= 50) {
                    this.player.setPos(pointer.x - this.player.width, pointer.y - this.player.height);
                }
            }
            this.context.closePath();
        }
        this._player.render();
    }
    onClick(event: any): void {
        if (!this.game.isPlay) {
            this.game.play();
        } else if (this.game.gameOver) {
            this.reset();
        } else {
            const now = new Date();
            // if (!this._lastFire) {
            //     this._lastFire = new Date();
            //     this.player.fire();
            // } else if (now.getTime() - this._lastFire.getTime() > 150) {
            //     this._lastFire = new Date();
            //     this.player.fire();
            // }
        }
    }
    onFire({ detail }: any) {
        console.log('hands onFire -------', detail);
    }
    onMousemove(event: any): void {
        // this.player.setPos(event.offsetX - this.player.width, event.offsetY - this.player.height);
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
        // this.addEnemies(this.game.level);
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
