export interface EventProvider{
  reset():void;
  on<T>(listener: T):void;
  isRegistred<T>(listener: T):boolean;
  emit<T,K>(data: K):void;
  /*findListener(event: string):void;*/
  get keys():void;
}
