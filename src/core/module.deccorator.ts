import { Container, injectable } from 'inversify';

export const container = new Container();

export interface szModule {
  ioc: Container;
}
export interface ModuleProps {
  imports: any[];
  controllers?: any[];
  services?: any[];
}

/**
 *
 * @returns return injectable Controller
 */
export const Module = (props: ModuleProps) => {
  const controllers = props?.controllers;
  const { imports } = props;
  return function _Module<T extends { new (...args: any[]): any }>(
    constructor_: T
  ) {
    return class extends injectable()(constructor_) implements szModule {
      readonly ioc: Container;
      constructor(...args: any[]) {
        super(...args);
        this.ioc = container;
        if (controllers && Array.isArray(controllers)) {
          controllers.forEach(controller => {
            console.log(controller);
            this.ioc.bind(controller).toSelf();
          });
        }
        if (imports && Array.isArray(imports)) {
          imports.forEach(import_ => {
            this.ioc.bind(import_).toSelf();
          });
        }
      }
    };
  };
};
