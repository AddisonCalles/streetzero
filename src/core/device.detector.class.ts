import DeviceDetector from 'device-detector-js';
import { injectable } from 'inversify';

@injectable()
export class zDeviceDetector {
    private _detector;
    constructor() {
        const parser = new DeviceDetector();
        this._detector = parser.parse(navigator.userAgent);
    }

    public get detector() {
        return this._detector;
    }
}
