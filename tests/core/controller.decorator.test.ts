import 'jest-canvas-mock';
const canvas = document.createElement('canvas');
document.body.prepend(canvas);
import { Controller } from '../../src';
import {
  getMethodName,
  hasEventMethod,
} from '../../src/core/controller.decorator';
import { GameEvents } from '../../src/enums/game.event.enum';
import { MainGame } from '../../src/core/game.class';

describe('Controllers decorators', () => {
  test('Test Constructor de nombre de metodo del evento', () => {
    expect(getMethodName(GameEvents.gameover)).toBe('onGameover');
  });

  test('Test Helpers Decorator Controllers', () => {
    @Controller({ canvas })
    class TestController {
      onRender() {}
    }
    const testController = new TestController();
    expect(hasEventMethod(testController, GameEvents.render)).toBeTruthy();
    expect(hasEventMethod(testController, GameEvents.start)).toBeFalsy();
  });
  test('General eventos en Decorator Controllers', () => {
    const onRender = jest.fn();
    const onGameover = jest.fn();
    const onNextlevel = jest.fn();
    const onStop = jest.fn();
    const onStart = jest.fn();
    const onPause = jest.fn();
    const onPrenextlevel = jest.fn();
    const onPlay = jest.fn();
    @Controller({ canvas, document })
    class TestController {
      test = 'contexto correcto';
      constructor() {}
      onRender() {
        expect(this.test).toBe('contexto correcto');
        onRender();
      }
      onGameover() {
        expect(this.test).toBe('contexto correcto');
        onGameover();
      }
      onNextlevel() {
        expect(this.test).toBe('contexto correcto');
        onNextlevel();
      }
      onStop() {
        expect(this.test).toBe('contexto correcto');
        onStop();
      }
      onStart() {
        expect(this.test).toBe('contexto correcto');
        onStart();
      }
      onPause() {
        expect(this.test).toBe('contexto correcto');
        onPause();
      }
      onPrenextlevel() {
        expect(this.test).toBe('contexto correcto');
        onPrenextlevel();
      }
      onPlay() {
        expect(this.test).toBe('contexto correcto');
        onPlay();
      }
    }
    const testController = new TestController();
    testController;
    for (const value of Object.values(GameEvents)) {
      MainGame.dispatchEvent(value);
    }
    expect(onRender).lastCalledWith();
    expect(onGameover).lastCalledWith();
    expect(onNextlevel).lastCalledWith();
    expect(onStop).lastCalledWith();
    expect(onStart).lastCalledWith();
    expect(onPause).lastCalledWith();
    expect(onPrenextlevel).lastCalledWith();
    expect(onPlay).lastCalledWith();
  });
});
