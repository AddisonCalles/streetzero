import { HandsEventDetails } from './HandsEventDetails';
import { HandsOptionsEvent } from './HandsEventOptions';

export class HandsDomEvent extends CustomEvent<HandsEventDetails> {
    constructor(event: HandsOptionsEvent, detail: HandsEventDetails) {
        super(event, { detail });
    }
}
