import { Directions, Kinematic } from 'streetzero';
import { math } from 'streetzero';
import { inject } from 'tsyringe';
import { queenShipV1Drawing } from '../../drawings/enemies/queen-ship.drawing';
import { EnergyBall } from '../energyball.class';
import { Player } from '../player.class';
import { Enemy } from './enemy.class';

export class QueenShipV1 extends Enemy {
    _gunsRunnerProcess: NodeJS.Timer | undefined;
    _evilMode: boolean = false;
    _energyBalls: Kinematic[] = [];
    _guns;
    _velocity = 1;

    constructor() {
        super(300, 0, 300, 300, 200);
        super.centerOffset();
        super.setLeyers(queenShipV1Drawing('red', this));
        this._guns = [
            { x: 10, y: 60, dir: 180 },
            { x: 10, y: 240, dir: 180 },
            { x: 160, y: 10, dir: 180 },
            { x: 160, y: 290, dir: 180 },
        ];
        super.vector.setDir(180);
        super.rotate(180);
        super.vector.setVelXY(0, this._velocity);
        super.enabledVectorRotation = false;
        this.gunsRunner();
    }

    render() {
        this._energyBalls = this._energyBalls.filter(
            ball => !ball.edgeCollision() && !ball.isDestroy()
        );
        if (!this.player) return super.render();
        this._energyBalls.forEach(ball => {
            if (ball.hasColision(this.player)) {
                this.player?.health.reduce(1);
                ball.destroy();
            } else {
                ball.move();
                ball.render();
            }
        });

        super.render();
    }

    move() {
        const colision = super.edgeCollision();
        if (colision) {
            if (colision.includes(Directions.bottom) || colision.includes(Directions.top)) {
                super.vector.setVelXY(0, this.vector.vel.y * -1);
            }
        } else if (this.vector.vel.y == 0) {
            super.vector.setVelXY(0, this._velocity);
        }
        if (this.vector.vel.x == 0 && this.x2 > this.canvas.width - this.canvas.width * 0.1) {
            super.vector.setVector(this._velocity, math.random(230, 150));
        }
        if (this.vector.vel.x != 0 && this.x2 < this.canvas.width - this.canvas.width * 0.1) {
            super.vector.setVelXY(0, this._velocity);
        }
        super.move();
    }

    private gunsRunner() {
        this._gunsRunnerProcess = setInterval(() => {
            this.fire();
        }, 500);
    }

    fire() {
        const indexGun = parseInt(math.random(0, this._guns.length - 0.9).toString());
        const energyBall = new EnergyBall(
            this.x + this._guns[indexGun].x,
            this.y + this._guns[indexGun].y
        );
        energyBall.vector.setVector(3, 180);
        this._energyBalls.push(energyBall);
    }

    destroy() {
        if (!this._gunsRunnerProcess) return super.destroy();
        try {
            clearInterval(this._gunsRunnerProcess);
        } catch (error) {}
        return super.destroy();
    }
}
