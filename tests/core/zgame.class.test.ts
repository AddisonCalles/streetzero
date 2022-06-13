import 'jest';
import { canvas } from '../mocks/app.mock';
import { zGame } from '../../src';
import { Controller } from '../../src';
import { DOMContext } from '../../src/core/dom.context.class';
const startSystemTime = new Date(2022, 3, 1, 22, 40, 23);

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.spyOn(global, 'setInterval');
  jest.spyOn(global, 'setTimeout');
  jest.spyOn(global.console, 'warn');
  jest.spyOn(global.console, 'error');
});
beforeEach(() => {
  jest.setSystemTime(startSystemTime.getTime());
});
afterEach(() => {
  jest.clearAllTimers();
  return;
});
afterAll(() => {
  jest.useRealTimers();
  return;
});
describe('Unit Tests Game Class', () => {
  test('General Perperties', () => {
    const game = new zGame(new DOMContext());
    game.speed = 30;
    expect(game.speed).toBe(30);
    expect(game.isPlay).toBeFalsy();
    game.play();
    expect(game.isPlay).toBeTruthy();
    game.pause();
    expect(game.isPlay).toBeFalsy();
    expect(game.gameOver).toBeFalsy();
    game.gameOver = true;
    expect(game.gameOver).toBeTruthy();
    expect(game.context).toBe(canvas.getContext('2d'));
  });

  test('Game Start/Stop/Preload Event', () => {
    const testOnStop = jest.fn();
    const testOnStart = jest.fn();
    const testOnPreload = jest.fn();

    @Controller({ canvas, document })
    class MockGame {
      onStart() {
        testOnStart();
      }
      onStop() {
        testOnStop();
      }
      onPreload() {
        testOnPreload();
      }
    }
    new MockGame();
    var game = new zGame(new DOMContext());
    //Start Step
    game.speed = 20;
    game.start();
    expect(testOnStart).nthCalledWith(1);
    expect(testOnPreload).nthCalledWith(1);
    expect(game.initTime).toBe(startSystemTime.getTime());
    expect(game.points).toBe(0);
    expect(game.isPlay).toBeFalsy();
    expect(game.gameOver).toBeFalsy();
    expect(game.level).toBe(0);
    game.stop();
    expect(testOnStop).nthCalledWith(1);
  });

  test('Render Event', () => {
    const testOnStop = jest.fn();
    const testOnStart = jest.fn();
    const testOnGameOver = jest.fn();
    const testOnPreload = jest.fn();
    const testOnRender = jest.fn();
    @Controller({ canvas, document })
    class MockGame {
      onStart() {
        testOnStart();
      }
      onStop() {
        testOnStop();
      }
      onGameover() {
        testOnGameOver();
      }
      onPreload() {
        testOnPreload();
      }
      onRender() {
        testOnRender();
      }
    }
    new MockGame();
    var game = new zGame(new DOMContext());
    //Start Step
    game.speed = 20;
    game.play();
    game.start();
    let loops = 0;
    const timeByLoop = 1000 / game.speed;
    let currentTime = startSystemTime.getTime();

    expect(new Date().getTime()).toBe(startSystemTime.getTime());
    Array.from({ length: game.speed }, (_, i) => i + 1).forEach(element => {
      jest.setSystemTime(currentTime);
      jest.runOnlyPendingTimers(); //Run first iteration loop
      currentTime += timeByLoop;
      loops++;

      expect(testOnRender).nthCalledWith(loops);
      const exact = (loops / game.speed).toFixed();
      const newTime = parseInt(exact);
      expect(game.time).toBe(newTime);
      return element;
    });
  });

  test('Levels & Points Events', () => {
    const testOnNextLevel = jest.fn();
    const testOnNexLevelPress = jest.fn();

    @Controller({ canvas, document })
    class MockGame {
      onNextlevel() {
        testOnNextLevel();
      }
      onPrenextlevel() {
        testOnNexLevelPress();
      }
      onGameover() {}
    }
    new MockGame();
    var game = new zGame(new DOMContext());
    //Next Level

    game.nextLevel(0);
    expect(testOnNexLevelPress).lastCalledWith();
    game.nextLevel(0);
    jest.runOnlyPendingTimers(); //Run intervals
    expect(testOnNextLevel).lastCalledWith();
    expect(game.level).toBe(2);
    expect(game.clearScreen()).toBeUndefined();

    //Point increce
    game.incrementPoints(40);
    expect(game.points).toBe(40);
    game.incrementPoints(-4);
    expect(game.points).toBe(36);
  });
});
