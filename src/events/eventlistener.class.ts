export class EventListener<T> {
  private _listeners: Function[] = [];
  constructor() {}
  subscribe(listener: (data: T) => void): boolean {
    if (this._listeners.includes(listener)) return false;
    this._listeners.push(listener);
    return true;
  }

  unsubscribe(listener: (data: T) => void) {
    this._listeners = this._listeners.filter(inlist => inlist !== listener);
  }
  emit(params: T) {
    this._listeners.forEach(listener => listener(params));
  }
}
