import 'reflect-metadata';
import { canvas, context2D, reloadDependency } from './mocks/app.mock';
import 'jest-canvas-mock';
import 'jest';
import { Game } from '../src/game.class';
import { container } from 'tsyringe';
import { EventProvider } from '../src/providers';
import { GameEvents, onGameStart, onGameStop } from '../src/events';
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
  reloadDependency();
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
    const game = container.resolve(Game);
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
    expect(game.context).toBe(context2D);
  });

  test('Game Start/Stop/Preload Event', () => {
    const testOnStop = jest.fn();
    const testOnStart = jest.fn();
    const game = global.resolve(Game);

    class Generic {
      @onGameStart()
      onStart() {
        testOnStart();
      }
      @onGameStop()
      onStop() {
        testOnStop();
      }
    }
    new Generic();
    //Start Step
    game.speed = 20;
    game.start();
    expect(testOnStart).lastCalledWith({});
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
    const testOnRender = jest.fn();

    var game = container.resolve(Game);
    const manager = container.resolve(EventProvider);
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

      expect(testOnRender).nthCalledWith(loops, {});
      const exact = (loops / game.speed).toFixed();
      const newTime = parseInt(exact);
      expect(game.time).toBe(newTime);
      return element;
    });
  });

  test('Levels & Points Events', () => {
    const testOnNextLevel = jest.fn();
    const testOnNexLevelPress = jest.fn();
    const game = container.resolve(Game);
    const manager = container.resolve(EventProvider);
    expect(manager).not.toBeUndefined();
    manager.on(GameEvents.nextlevel, testOnNextLevel);
    manager.on(GameEvents.prenextlevel, testOnNexLevelPress);
    //Next Level
    game.nextLevel(0);
    expect(testOnNexLevelPress).lastCalledWith({ affter: 0, next: 1 });
    jest.runOnlyPendingTimers(); //Run intervals
    expect(testOnNextLevel).lastCalledWith({ level: 1 });
    game.nextLevel(0);
    jest.runOnlyPendingTimers(); //Run intervals
    expect(testOnNextLevel).lastCalledWith({ level: 2 });
    expect(game.level).toBe(2);
    expect(game.clearCanvas()).toBeUndefined();
    //Point increce
    game.incrementPoints(40);
    expect(game.points).toBe(40);
    game.incrementPoints(-4);
    expect(game.points).toBe(36);
  });
});
