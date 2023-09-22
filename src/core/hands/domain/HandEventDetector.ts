import { HandsDomEvent } from './HandsDomEvent';
import { HandsEventDetails } from './HandsEventDetails';

export interface HandEventDetector {
    detect(landmarks: HandsEventDetails, videoSize: { width: number; height: number }): HandsDomEvent | undefined;
}
