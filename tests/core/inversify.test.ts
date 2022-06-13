import 'jest';
import 'reflect-metadata';
import { canvas, context2D } from '../mocks/app.mock';
import { zEngine, zGame } from '../../src';
import { Container, inject } from 'inversify';
import { DOMContext } from '../../src';
import { Controller } from '../../src';

describe('Module Test', () => {
  test('Test IOC', () => {
    const initController = jest.fn();
    @Controller()
    class MainController {
      test = 'test text 12345';
      constructor(
        @inject(DOMContext) { context, canvas: CanvasDom }: DOMContext
      ) {
        initController();
        expect(context).toBe(context2D);
        expect(canvas).toBe(CanvasDom);
      }
    }

    const ioc = new Container({
      autoBindInjectable: true,
      defaultScope: 'Singleton',
    });

    const game = ioc.get(zGame);
    const controller = ioc.get(MainController);
    expect(game).not.toBeUndefined();
    expect(controller).not.toBeUndefined();
    expect(controller.test).toBe('test text 12345');

    //expect(initController).lastCalledWith();
  });
  test('Test IOC zEngine', () => {
    const initController = jest.fn();
    @Controller()
    class MainController {
      test = 'test text 12345';
      constructor(
        @inject(DOMContext) { context, canvas: CanvasDom }: DOMContext
      ) {
        initController();
        expect(context).toBe(context2D);
        expect(canvas).toBe(CanvasDom);
      }
    }

    const engine = zEngine.initialize([MainController]);

    const game = engine.ioc.get(zGame);
    const controller = engine.ioc.get(MainController);
    expect(game).not.toBeUndefined();
    expect(controller).not.toBeUndefined();
    expect(controller.test).toBe('test text 12345');

    //expect(initController).lastCalledWith();
  });
});
