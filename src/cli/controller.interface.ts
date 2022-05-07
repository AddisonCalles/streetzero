import { Action } from './actions';
export type ControllerFunction = () => Promise<Action>;
