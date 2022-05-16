import 'jest';
import { canvas } from './mocks/app.mock';
import { Game } from '../src/game.class';
const startSystemTime = new Date(2022, 3, 1, 22, 40, 23);
class MockGameBase extends Game {
  protected onStart?(): void {}
  protected onStop?(): void {}
  protected onGameOver?(): void {}
  protected onFire?(event: any): void {
    event;
  }
  protected onMouseMove?(event: any): void {
    event;
  }
  protected onPreload?(): void {}
  protected onRender?(): void {}
  protected onTouchStart?(event: any): void {
    event;
  }
  protected onTouchCancel?(event: any): void {
    event;
  }
  protected onTouchEnd?(event: any): void {
    event;
  }
  protected onNextLevel?(): void {}
  protected onNexLevelPress?(): void {}
  protected onKeyDown?(event: any): void {
    event;
  }
  protected onKeyUp?(event: any): void {
    event;
  }
}
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
    const game = new MockGameBase(canvas);
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
    class MockGame extends MockGameBase {
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
    var game = new MockGame(canvas);
    //Start Step
    game.speed = 20;
    game.start();
    expect(testOnStart).nthCalledWith(1);
    expect(testOnPreload).nthCalledWith(1);
    expect(game.initTime).toBe(startSystemTime.getTime());
    expect(game.points).toBe(0);
    expect(game.isPlay).toBeFalsy();
    expect(game.canvas).toBe(canvas);
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
    class MockGame extends MockGameBase {
      onStart() {
        testOnStart();
      }
      onStop() {
        testOnStop();
      }
      onGameOver() {
        testOnGameOver();
      }
      onPreload() {
        testOnPreload();
      }
      onRender() {
        testOnRender();
      }
    }
    var game = new MockGame(canvas);
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
    class MockGame extends MockGameBase {
      onNextLevel() {
        testOnNextLevel();
      }
      onNexLevelPress() {
        testOnNexLevelPress();
      }
      onGameOver() {}
    }
    var game = new MockGame(canvas);
    //Next Level

    game.nextLevel(0);
    expect(testOnNexLevelPress).lastCalledWith();
    game.nextLevel(0);
    jest.runOnlyPendingTimers(); //Run intervals
    expect(testOnNextLevel).lastCalledWith();
    expect(game.level).toBe(2);
    expect(game.clearCanvas()).toBeUndefined();
    expect(game.onNexLevelPress());
    expect(game.onNextLevel());
    //Point increce
    game.incrementPoints(40);
    expect(game.points).toBe(40);
    game.incrementPoints(-4);
    expect(game.points).toBe(36);
    expect(game.onGameOver());
  });

  test('Mouse and key events', () => {
    const testOnNextLevel = jest.fn();
    const testOnNexLevelPress = jest.fn();
    class MockGame extends MockGameBase {
      onNextLevel() {
        testOnNextLevel();
      }
      onNexLevelPress() {
        testOnNexLevelPress();
      }
    }
    var game = new MockGame(canvas);
    //Next Level

    game.nextLevel(0);
    expect(testOnNexLevelPress).lastCalledWith();
  });
});
