import { HandEventDetector } from '../../domain/HandEventDetector';
import { HandsDomEvent } from '../../domain/HandsDomEvent';
import { HandsEventDetails } from '../../domain/HandsEventDetails';
import { HandsOptionsEvent } from '../../domain/HandsEventOptions';

export class HandDetectedEventDetector implements HandEventDetector {
    detect(landmarks: HandsEventDetails): HandsDomEvent | undefined {
        if (landmarks.left || landmarks.right) {
            return new HandsDomEvent(HandsOptionsEvent.detect, landmarks);
        }
        return;
    }
}
