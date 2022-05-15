import { DOMContext } from '../helpers/dom';

export interface onEventGame<T> {
  domContext: DOMContext;
  data: T;
}
