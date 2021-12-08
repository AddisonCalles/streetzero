export class EventListener{
    _listeners: Function[] = [];
    constructor(){
    }
    subscribe(listener: Function){
        this._listeners.push(listener);
    }
    unsubscribe(listener:Function){
        this._listeners = this._listeners.filter((inlist)=>inlist !== listener);
    }
    emit(params:any){
        this._listeners.forEach((listener)=>listener(params));
    }
}