import { EventListener } from '../events/eventlistener.class';

export class EventProvider {
  private static instance: EventProvider | null = null;
  private static events: EventRegistry[] = [];
  private constructor() {}
  static getInstance(reload: boolean = false) {
    if (EventProvider.instance == null || reload) {
      this.events = [];
      EventProvider.instance = new EventProvider();
    }
    return EventProvider.instance;
  }
  static reset() {
    this.instance = new EventProvider();
  }
  public on<T>(name: string, event: (data: T) => void) {
    if (!this.hasOrRegistry(name, event)) return;
    EventProvider.events.map(e => {
      if (e.name.toString() == name.toString()) {
        e.event.subscribe(event);
      }
      return e;
    });
  }
  public registry<T>(name: string) {
    if (this.keys.includes(name)) throw new Error(`Duplicate Event: ${name}`);
    const event = new EventListener<T>();
    const data: EventRegistry = { name, event };
    EventProvider.events.push(data);
  }
  public hasOrRegistry<T>(
    name: string,
    eventCallback: (data: T) => void
  ): boolean {
    if (this.keys.includes(name)) return true;
    const event = new EventListener<T>();
    event.subscribe(eventCallback);
    const data: EventRegistry = { name, event };
    EventProvider.events.push(data);
    return false;
  }
  public find(event: string) {
    return EventProvider.events.find(
      reg => reg.name.toString() == event.toString()
    );
  }
  public emit(event: string, data: any) {
    this.findListener(event).emit(data);
  }
  public findListener(event: string) {
    const eventListenner = this.find(event)?.event;
    if (!eventListenner) {
      throw new Error(`Event "${event}" not registry.`);
    }
    return eventListenner;
  }
  public get keys() {
    return EventProvider.events.map(l => l.name);
  }

  public clear() {
    EventProvider.events = [];
  }
}

export interface EventRegistry {
  name: string;
  event: EventListener<any>;
}
