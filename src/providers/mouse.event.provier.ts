import { EventProvider } from '../interfaces/eventprovider.interface';

export class MouseEventProvider implements EventProvider {
  reset(): void {
    throw new Error('Method not implemented.');
  }
  on<T>(listener: T): void {
    throw new Error('Method not implemented.');
  }
  isRegistred<T>(listener: T): boolean {
    throw new Error('Method not implemented.');
  }
  emit<T, K>(data: K): void {
    throw new Error('Method not implemented.');
  }
  get keys(): void {
    throw new Error('Method not implemented.');
  }
  events: any = {};
}
