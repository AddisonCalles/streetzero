import 'reflect-metadata';
/**
 * HELPERS
 */
import * as colorImport from './helpers/color';
import * as mathInport from './helpers/math';
export const math = { ...mathInport };
export const color = { ...colorImport };

export { Controller } from './core/controller.decorator';
export { DOMContext } from './core/dom.context.class';
export { zEngine } from './core/zengine.class';
/**
 * MODULES CORE
 */
export { zGame } from './core/zgame.class';
/**
 * GAME ELEMENTS
 */
export { Drawable } from './drawable.class';
export { EventListener } from './eventlistener.class';
export { Health } from './health.class';
export { getContext } from './helpers/dom';
/**
 * INTERFACES
 */
export { Game } from './interfaces/game.interface';
export { GameEvents } from './interfaces/gameevent.interface';
export { KeyboardEvents } from './interfaces/keyboardevent.interface';
export { Line } from './interfaces/line';
export { MouseEvents } from './interfaces/mouseevent.interface';
export { Point } from './interfaces/point';
export { TouchEvents } from './interfaces/touchevent.interface';
export { Directions, Kinematic } from './kinematic.class';
export { LayerPath } from './layerPath.class';
export { Vector } from './vector.class';

//export { zCoreModule } from "./core/zcore.module";
