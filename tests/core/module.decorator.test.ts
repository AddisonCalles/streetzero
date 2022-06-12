import 'jest';
import 'reflect-metadata';
import { canvas, context2D } from '../mocks/app.mock';
import { Module, container } from '../../src/core/module.deccorator';
import { MainGame } from '../../src/core/game.class';
import { Container } from 'inversify';
import { DOMContext } from '../../src/core/dom.context.class';
import { Controller } from '../../src';

describe('Module Test', () => {
  test('Test IOC', () => {
    @Controller()
    class MainController {
      constructor({ context, canvas: CanvasDom }: DOMContext) {
        expect(context).toBe(context2D);
        expect(canvas).toBe(CanvasDom);
      }
    }

    @Module({
      imports: [DOMContext, MainGame],
      controllers: [MainController],
    })
    class MainModule {}

    const module: any = new MainModule();
    const ioc: Container = module.ioc;

    expect(ioc).toBe(container);
    const game = ioc.get(MainGame);
    expect(game).not.toBeUndefined();
  });
});
