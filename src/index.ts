import 'reflect-metadata';
/**
 * HELPERS
 */
import * as mathInport from './helpers/math';
import * as colorImport from './helpers/color';
export const math = { ...mathInport };
export const color = { ...colorImport };

export { getContext } from './helpers/dom';
export { Health } from './health.class';

/**
 * GAME ELEMENTS
 */
export { Drawable } from './drawable.class';
export { Kinematic, Directions } from './kinematic.class';
export { LayerPath } from './layerPath.class';
export { Point } from './point.class';
export { Vector } from './vector.class';

export { EventListener } from './eventlistener.class';

/**
 * INTERFACES
 */

export { Game } from './interfaces/game.interface';
export { GameEvents } from './interfaces/gameevent.interface';
export { MouseEvents } from './interfaces/mouseevent.interface';
export { TouchEvents } from './interfaces/touchevent.interface';
export { KeyboardEvents } from './interfaces/keyboardevent.interface';

/**
 * MODULES CORE
 */
export { zGame } from './core/zgame.class';
export { Controller } from './core/controller.decorator';
export { DOMContext } from './core/dom.context.class';
export { zEngine } from './core/zengine.class';
//export { zCoreModule } from "./core/zcore.module";
