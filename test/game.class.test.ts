import './mocks/app.mock';
import 'jest';
import { Game } from '../src/game.class';
import { EventProvider } from '../src/providers';

import { GameEvents } from '../src/events';
import { getContext } from '../src/helpers/dom';
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
    const game = Game.getInstance(true);
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
  });

  test('Game Start/Stop/Preload Event', () => {
    const testOnStop = jest.fn();
    const testOnStart = jest.fn();

    expect(getContext().canvas).not.toBeUndefined();
    expect(getContext().canvas).not.toBeNull();

    const game = Game.getInstance(true);
    class Generic {
      constructor() {
        EventProvider.getInstance().on(GameEvents.start, () => this.onStart());
        EventProvider.getInstance().on(GameEvents.stop, () => this.onStop());
      }
      onStart() {
        testOnStart();
      }
      onStop() {
        testOnStop();
      }
    }
    new Generic();
    //Start Step
    game.speed = 20;
    game.start();
    expect(testOnStart).lastCalledWith();
    expect(game.initTime).toBe(startSystemTime.getTime());
    expect(game.points).toBe(0);
    expect(game.isPlay).toBeFalsy();
    expect(game.gameOver).toBeFalsy();
    expect(game.level).toBe(0);
    game.stop();
    expect(testOnStop).lastCalledWith();
    expect(testOnStart.mock.calls.length).toBe(1);
    expect(testOnStart.mock.calls.length).toBe(1);
  });

  test('Render Event', () => {
    const testOnRender = jest.fn();

    const game = Game.getInstance(true);
    const manager = EventProvider.getInstance();
    expect(manager).not.toBeUndefined();
    manager.on(GameEvents.render, testOnRender);
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
      const { context, canvas } = getContext();
      expect(context).not.toBeNull();
      if (context) {
        expect(
          testOnRender.mock.calls[loops - 1][0].context['canvas']
        ).toStrictEqual(canvas);
      }
      expect(testOnRender.mock.calls[loops - 1][0].canvas).toBe(canvas);
      const exact = (loops / game.speed).toFixed();
      const newTime = parseInt(exact);
      expect(game.time).toBe(newTime);
      return element;
    });
  });

  test('Levels & Points Events', () => {
    const testOnNextLevel = jest.fn();
    const testOnNexLevelPress = jest.fn();
    const game = Game.getInstance(true);
    const manager = EventProvider.getInstance();
    expect(manager).not.toBeUndefined();
    manager.on(GameEvents.nextlevel, data => testOnNextLevel(data));
    manager.on(GameEvents.prenextlevel, data => testOnNexLevelPress(data));
    //Next Level
    game.nextLevel(0);
    const dom = getContext();
    expect(testOnNexLevelPress.mock.calls[0][0]).toEqual({
      affter: 0,
      next: 1,
      domContext: dom,
    });
    jest.runOnlyPendingTimers(); //Run intervals
    expect(testOnNextLevel).lastCalledWith({
      level: 1,
      domContext: getContext(),
    });
    game.nextLevel(0);
    jest.runOnlyPendingTimers(); //Run intervals
    expect(testOnNextLevel).lastCalledWith({
      level: 2,
      domContext: getContext(),
    });
    expect(game.level).toBe(2);
    expect(game.clearCanvas()).toBeUndefined();
    //Point increce
    game.incrementPoints(40);
    expect(game.points).toBe(40);
    game.incrementPoints(-4);
    expect(game.points).toBe(36);
  });
});
