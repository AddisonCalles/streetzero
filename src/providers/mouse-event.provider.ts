import { MouseEvents } from '../events';
import { EventProvider } from './event.provider';
import { getContext } from '../helpers/dom';

export class MouseEventProvider {
  private static instance: MouseEventProvider | null = null;
  private constructor() {
    this._initMouseEvents();
    this._initProvierEvents();
  }
  static getInstance(reload: boolean = false) {
    if (MouseEventProvider.instance == null || reload) {
      MouseEventProvider.instance = new MouseEventProvider();
    }
    return MouseEventProvider.instance;
  }

  private _initProvierEvents() {
    EventProvider.getInstance().registry<any>(MouseEvents.clic);
    EventProvider.getInstance().registry(MouseEvents.mousemove);
    EventProvider.getInstance().registry(MouseEvents.keydown);
    EventProvider.getInstance().registry(MouseEvents.keyup);
    EventProvider.getInstance().registry(MouseEvents.touchstart);
    EventProvider.getInstance().registry(MouseEvents.touchend);
    EventProvider.getInstance().registry(MouseEvents.touchcancel);
    EventProvider.getInstance().registry(MouseEvents.mousedown);
    EventProvider.getInstance().registry(MouseEvents.mouseup);
    EventProvider.getInstance().registry(MouseEvents.mouseout);
  }
  private _initMouseEvents() {
    const { canvas } = getContext();
    const provider = EventProvider.getInstance();
    canvas.addEventListener('click', function(event: any) {
      provider.emit(MouseEvents.clic, event);
    });
    canvas.addEventListener('mousemove', function(event: any) {
      provider.emit(MouseEvents.mousemove, event);
    });
    document.addEventListener('keydown', function(event: any) {
      provider.emit(MouseEvents.keydown, event);
    });
    document.addEventListener('keyup', function(event: any) {
      provider.emit(MouseEvents.keyup, event);
    });
    canvas.addEventListener(
      'touchstart',
      function(event: any) {
        provider.emit(MouseEvents.touchstart, event);
      },
      false
    );
    canvas.addEventListener(
      'touchend',
      function(event: any) {
        provider.emit(MouseEvents.touchend, event);
      },
      false
    );
    canvas.addEventListener(
      'touchcancel',
      function(event: any) {
        provider.emit(MouseEvents.touchcancel, event);
      },
      false
    );
    canvas.addEventListener('mousedown', function(event: any) {
      provider.emit(MouseEvents.mousedown, event);
    });
    canvas.addEventListener('mouseup', function(event: any) {
      provider.emit(MouseEvents.mouseup, event);
    });
    canvas.addEventListener('mouseout', function(event: any) {
      provider.emit(MouseEvents.mouseout, event);
    });
  }
}
