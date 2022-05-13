import { inject, singleton } from 'tsyringe';
import { CanvasEvents } from '../events';
import { EventListener } from '../events/eventlistener.class';
import { EventProvider } from './event.provider';

@singleton()
export class MouseEventProvider {
  constructor(
    @inject(EventProvider) private provider: EventProvider,
    @inject('Canvas') private canvas: HTMLCanvasElement
  ) {
    console.log('MouseEventProvider Init');
    this._initMouseEvents();
    this._initProvierEvents();
  }

  private _initProvierEvents() {
    this.provider.registry(CanvasEvents.click);
    this.provider.registry(CanvasEvents.mousemove);
    this.provider.registry(CanvasEvents.keydown);
    this.provider.registry(CanvasEvents.keyup);
    this.provider.registry(CanvasEvents.touchstart);
    this.provider.registry(CanvasEvents.touchend);
    this.provider.registry(CanvasEvents.touchcancel);
    this.provider.registry(CanvasEvents.mousedown);
    this.provider.registry(CanvasEvents.mouseup);
    this.provider.registry(CanvasEvents.mouseout);
  }
  private _initMouseEvents() {
    const providerContext = this.provider;
    this.canvas?.addEventListener('click', function(event: any) {
      providerContext.find(CanvasEvents.click)?.event.emit(event);
    });
    this.canvas?.addEventListener('mousemove', function(event: any) {
      providerContext.find(CanvasEvents.mousemove)?.event.emit(event);
    });
    document?.addEventListener('keydown', function(event: any) {
      providerContext.find(CanvasEvents.keydown)?.event.emit(event);
    });
    document?.addEventListener('keyup', function(event: any) {
      providerContext.find(CanvasEvents.keyup)?.event.emit(event);
    });
    this.canvas?.addEventListener(
      'touchstart',
      function(event: any) {
        providerContext.find(CanvasEvents.touchstart)?.event.emit(event);
      },
      false
    );
    this.canvas?.addEventListener(
      'touchend',
      function(event: any) {
        providerContext.find(CanvasEvents.touchend)?.event.emit(event);
      },
      false
    );
    this.canvas?.addEventListener(
      'touchcancel',
      function(event: any) {
        providerContext.find(CanvasEvents.touchcancel)?.event.emit(event);
      },
      false
    );
    this.canvas?.addEventListener('mousedown', function(event: any) {
      providerContext.find(CanvasEvents.mousedown)?.event.emit(event);
    });
    this.canvas?.addEventListener('mouseup', function(event: any) {
      providerContext.find(CanvasEvents.mouseup)?.event.emit(event);
    });
    this.canvas?.addEventListener('mouseout', function(event: any) {
      providerContext.find(CanvasEvents.mouseout)?.event.emit(event);
    });
  }

  get manager() {
    return this.provider;
  }
}

export interface EventRegistry {
  name: string;
  event: EventListener;
}
