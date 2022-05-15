import { math } from 'streetzero';
import { SpaceShipV2Drawing } from '../../drawings/space-ship.drawing';
import { Enemy } from './enemy.class';

export interface EnemyLevel {
    color: string;
    health: number;
    velocity: number;
}

export const EnemyLevels: {
    level1: EnemyLevel;
    level2: EnemyLevel;
    level3: EnemyLevel;
} = {
    level1: {
        color: '#d32f2f',
        health: 1,
        velocity: 1,
    },
    level2: {
        color: '#bc5100',
        health: 2,
        velocity: 1.25,
    },
    level3: {
        color: '#4a148c',
        health: 3,
        velocity: 1.5,
    },
};

export class SmallShip extends Enemy {
    private _evilMode: NodeJS.Timeout | undefined;
    private _evilModeTimer: number = 99999;
    private _color;
    constructor(level: EnemyLevel, x: number, y: number) {
        super(x, y, 30, 40, level.health);
        super.centerOffset();
        this._color = level.color;
        this.initEvilMode();
        super.setLeyers(SpaceShipV2Drawing(this._color, this));
    }

    private initEvilMode() {
        this._evilModeTimer = parseInt(math.random(25000, 5000).toString());
        this._evilMode = setTimeout(() => {
            if (!this.player) return;
            this.vector.rotateTo(this, this.player);
            this.initEvilMode();
        }, this._evilModeTimer);
    }

    move() {
        if (super.edgeCollision()) {
            this.vector.rotate(60);
        }
        super.move();
    }
    destroy() {
        if (!this._evilMode) return super.destroy();
        try {
            clearInterval(this._evilMode);
        } catch (error) {}
        super.destroy();
    }
}
