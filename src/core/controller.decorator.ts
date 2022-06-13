import { GameEvents } from '../enums/game.event.enum';
import { MouseEvents } from '../enums/mouse.event.enum';
import { KeyboardEvents } from '../enums/keyboard.event.enum';

import { injectable } from 'inversify';
import { getContext } from '../helpers/dom';
/**
 * Gets the name of the method related to the event,
 * EX. if the event is render the output will be onRender.
 * @param event
 * @returns
 */
export const getMethodName = (event: string) => {
  const sub = event.includes('.') ? event.split('.')[1] : event;
  const first = sub[0].toUpperCase();
  let last = sub.split('');
  last.shift();
  return `on${first}${last.join('')}`;
};

/**
 * Check that the event listener method exists inside the object
 * @param obj
 * @param event
 * @returns boolean
 */
export const hasEventMethod = (obj: any, event: string) => {
  const method = getMethodName(event);
  return method in obj && typeof obj[method] === 'function';
};

/**
 * This configure function adds the event method to the eventListener
 * @param obj <any> Controller instance
 * @param event <string[]> Event to be configured
 * @param element <HTMLElement> this is the element
 */
export const setEvents = (
  obj: any,
  events: string[],
  element: HTMLCanvasElement | HTMLElement | Document
) => {
  for (const event of events) {
    if (event == '0') return; //the Object.value(enum) return names and index
    const method = getMethodName(event);
    if (hasEventMethod(obj, event)) {
      element.addEventListener(event, e => obj[method].call(obj, e));
    }
  }
};

export interface ControllerProps {
  canvas?: HTMLCanvasElement | null;
  document?: any;
}

/**
 *
 * @returns return injectable Controller
 */
export const Controller = (props?: ControllerProps) => {
  return function _Controller<T extends { new (...args: any[]): any }>(
    constructor_: T
  ) {
    return class extends injectable()(constructor_) {
      controllerName: string;
      constructor(...args: any[]) {
        super(...args);
        this.controllerName = constructor_.name;
        const _this = this;
        let canvas = props?.canvas;
        //Config Game Events
        if (!canvas) {
          console.log('Canvas props is undefined');
          const { canvas: canvasContext } = getContext(true);
          canvas = canvasContext;
        }
        const doc = props?.document ? props.document : document;
        if (!canvas) return;
        setEvents(_this, Object.values(GameEvents), doc);
        setEvents(_this, Object.values(MouseEvents), canvas);
        setEvents(_this, Object.values(KeyboardEvents), doc);
      }
    };
  };
};
