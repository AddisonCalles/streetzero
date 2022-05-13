import 'jest-canvas-mock';
import 'reflect-metadata';
import { reloadDependency } from '../mocks/app.mock';
import 'jest';
import '../../src/events/game.events';
import { container } from 'tsyringe';
import { EventProvider, MouseEventProvider } from '../../src/providers';
import {
  CanvasEvents,
  GameEvents,
  onGamePause,
  onGameStart,
  onGameStop,
  onNextLevel,
  onPreNextLevel,
  onRender,
} from '../../src/events';
import { Game } from '../../src';

const startSystemTime = new Date(2022, 3, 1, 22, 40, 23);
beforeAll(() => {
  jest.useFakeTimers('modern');
});
beforeEach(() => {
  jest.setSystemTime(startSystemTime.getTime());
});
afterEach(() => {
  jest.clearAllTimers();
  reloadDependency();
  return;
});
afterAll(() => {
  jest.useRealTimers();
  return;
});
describe('Unit Tests Game Class', () => {
  test('Event Provider test', () => {
    const provider = new EventProvider();
    expect(provider.registry('test-event')).toBeUndefined();
    expect(provider.find('test-event')).not.toBeUndefined();
    const eventCallback = jest.fn();
    expect(provider.on('test-event', eventCallback));
    expect(provider.keys.includes('test-event')).toBeTruthy();
    const data = { data: 'data-test-event' };
    provider.emit('test-event', data);
    expect(eventCallback).lastCalledWith(data);
    expect(eventCallback).nthCalledWith(1, data);
  });
  test('Event Provider with container test', () => {
    const provider = container.resolve(EventProvider);
    expect(provider.registry('test-event')).toBeUndefined();
    expect(provider.find('test-event')).not.toBeUndefined();
    const eventCallback = jest.fn();
    expect(provider.on('test-event', eventCallback));
    const data = { data: 'data-test-event' };
    provider.emit('test-event', data);
    expect(eventCallback).lastCalledWith(data);
    expect(eventCallback).nthCalledWith(1, data);
  });

  test('Event Game Inicialization test', () => {
    const game = container.resolve(Game);
    const provider = container.resolve(EventProvider);
    game;
    expect(provider.find(GameEvents.stop)).not.toBeUndefined();
    expect(provider.find(GameEvents.start)).not.toBeUndefined();
    expect(provider.find(GameEvents.pause)).not.toBeUndefined();
    expect(provider.find(GameEvents.nextlevel)).not.toBeUndefined();
    expect(provider.find(GameEvents.render)).not.toBeUndefined();
  });

  test('Canvas Events Inicialization test', () => {
    const { manager } = container.resolve(MouseEventProvider);

    expect(manager.find(CanvasEvents.click)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.keydown)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.keyup)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.mousedown)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.mousemove)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.mouseout)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.mouseup)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.touchcancel)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.touchend)).not.toBeUndefined();
    expect(manager.find(CanvasEvents.touchstart)).not.toBeUndefined();
  });

  test('Canvas Mouse Events Test', () => {
    reloadDependency();
    const eventGameStart = jest.fn();
    const eventGamePause = jest.fn();
    const eventGameStop = jest.fn();
    const eventPreNextLevel = jest.fn();
    const eventNextLevel = jest.fn();
    const eventRender = jest.fn();

    const game = container.resolve(Game);
    game;
    class Generic {
      @onGameStart()
      eventStart(): void {
        eventGameStart();
      }
      @onGamePause()
      eventPause(): void {
        eventGamePause();
      }
      @onGameStop()
      eventGameStop() {
        eventGameStop();
      }
      @onNextLevel()
      eventNextLevel() {
        eventNextLevel();
      }
      @onPreNextLevel()
      eventPreNextLevel() {
        eventPreNextLevel();
      }
      @onRender()
      eventRender() {
        eventRender();
      }
    }

    new Generic();
    const { manager } = container.resolve(MouseEventProvider);
    const data = { data: 'data-test' };
    expect(manager).not.toBeUndefined();
    expect(manager.registry(GameEvents.start)).toThrow(
      `Duplicate Event: ${GameEvents.start}`
    );
    expect(manager.find(GameEvents.start)).not.toBeUndefined();
    expect(manager.find(GameEvents.stop)).not.toBeUndefined();
    expect(manager.find(GameEvents.pause)).not.toBeUndefined();
    expect(manager.find(GameEvents.nextlevel)).not.toBeUndefined();
    expect(manager.find(GameEvents.render)).not.toBeUndefined();

    expect(eventGameStart).nthReturnedWith(1, data);
    expect(eventGamePause).nthReturnedWith(1, data);
    expect(eventGameStop).nthCalledWith(1, data);
    expect(eventNextLevel).nthCalledWith(1, data);
    expect(eventRender).nthCalledWith(1, data);
  });
});
