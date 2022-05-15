import { EventProvider } from '../providers';
export const eventRegister = (event: string) => {
  return function(target: any, propertyKey: string) {
    EventProvider.getInstance().on(event, target[propertyKey]);
    //descriptor.enumerable = value;
  };
};
