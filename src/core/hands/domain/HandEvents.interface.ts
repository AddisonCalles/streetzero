import { HandsEventDetails } from './HandsEventDetails';
export type HandsMapEvent = { detail: HandsEventDetails };
export interface HandsEvents {
    onFire(event: HandsMapEvent): void;
    onHandDetect(event: HandsMapEvent): void;
}
