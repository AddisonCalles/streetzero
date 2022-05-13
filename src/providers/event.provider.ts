import { singleton } from 'tsyringe';
import { EventListener } from '../events/eventlistener.class';

@singleton()
export class EventProvider {
  constructor() {
    console.log('Start EventProvider');
  }
  private events: EventRegistry[] = [];
  public on(name: string, event: Function) {
    this.findListener(name).subscribe(event);
  }
  public registry(name: string) {
    if (this.find(name)) throw new Error(`Duplicate Event: ${name}`);
    this.events.push({ name, event: new EventListener() });
  }
  public find(event: string) {
    return this.events.find(reg => reg.name.toString() == event.toString());
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
    return this.events.map(l => l.name);
  }
}

export interface EventRegistry {
  name: string;
  event: EventListener;
}
