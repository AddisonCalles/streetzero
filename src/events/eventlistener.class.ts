export class EventListener {
  private _listeners: Function[] = [];
  constructor() {}
  subscribe(listener: Function): boolean {
    if (this._listeners.includes(listener)) return false;
    this._listeners.push(listener);
    return true;
  }

  unsubscribe(listener: Function) {
    this._listeners = this._listeners.filter(inlist => inlist !== listener);
  }
  emit(params: any) {
    this._listeners.forEach(listener => listener(params));
  }
}
