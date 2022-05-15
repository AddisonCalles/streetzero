import 'jest';
import { EventProvider } from '../../src/providers';
import { MouseEvents, GameEvents } from '../../src/events';
import { Game } from '../../src';
import '../mocks/app.mock';

const startSystemTime = new Date(2022, 3, 1, 22, 40, 23);
beforeAll(() => {
  jest.useFakeTimers('modern');
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
  test('Event Game Inicialization test', () => {
    const game = Game.getInstance(true);
    const provider = EventProvider.getInstance();
    game;
    expect(provider.find(GameEvents.stop)).not.toBeUndefined();
    expect(provider.find(GameEvents.start)).not.toBeUndefined();
    expect(provider.find(GameEvents.pause)).not.toBeUndefined();
    expect(provider.find(GameEvents.nextlevel)).not.toBeUndefined();
    expect(provider.find(GameEvents.render)).not.toBeUndefined();
  });

  test('Canvas Events Inicialization test', () => {
    Game.getInstance(true);
    const manager = EventProvider.getInstance();
    expect(manager.find(MouseEvents.clic)).not.toBeUndefined();
    expect(manager.find(MouseEvents.keydown)).not.toBeUndefined();
    expect(manager.find(MouseEvents.keyup)).not.toBeUndefined();
    expect(manager.find(MouseEvents.mousedown)).not.toBeUndefined();
    expect(manager.find(MouseEvents.mousemove)).not.toBeUndefined();
    expect(manager.find(MouseEvents.mouseout)).not.toBeUndefined();
    expect(manager.find(MouseEvents.mouseup)).not.toBeUndefined();
    expect(manager.find(MouseEvents.touchcancel)).not.toBeUndefined();
    expect(manager.find(MouseEvents.touchend)).not.toBeUndefined();
    expect(manager.find(MouseEvents.touchstart)).not.toBeUndefined();
  });

  test('Game Decorator Events Test', () => {
    const eventGameStart = jest.fn();
    const eventGamePause = jest.fn();
    const eventGameStop = jest.fn();
    const eventPreNextLevel = jest.fn();
    const eventNextLevel = jest.fn();
    const eventRender = jest.fn();
    const provider = EventProvider.getInstance();
    const game = Game.getInstance(true);
    game;
    class Generic {
      constructor() {
        const provider = EventProvider.getInstance();
        provider.on(GameEvents.nextlevel, data => this.eventNextLevel(data));
        provider.on(GameEvents.start, data => this.eventStart(data));
        provider.on(GameEvents.stop, data => this.eventGameStop(data));
        provider.on(GameEvents.render, data => this.eventRender(data));
        provider.on(GameEvents.pause, data => this.eventPause(data));
        provider.on(GameEvents.prenextlevel, data =>
          this.eventPreNextLevel(data)
        );
      }

      eventStart(data: any): void {
        console.log('eventStart', data);
        eventGameStart(data);
      }
      eventPause(data: any): void {
        eventGamePause(data);
      }
      eventGameStop(data: any) {
        eventGameStop(data);
      }
      eventNextLevel(data: any) {
        eventNextLevel(data);
      }
      eventPreNextLevel(data: any) {
        eventPreNextLevel(data);
      }
      eventRender(data: any) {
        eventRender(data);
      }
    }

    const generic = new Generic();
    generic;

    const data = { data: 'data-test' };
    expect(provider).not.toBeUndefined();
    expect(() =>
      provider.registry<{ data: string }>(GameEvents.start)
    ).toThrowError(new Error(`Duplicate Event: ${GameEvents.start}`));
    expect(provider.find(GameEvents.stop)).not.toBeUndefined();
    expect(provider.find(GameEvents.start)).not.toBeUndefined();
    expect(provider.find(GameEvents.pause)).not.toBeUndefined();
    expect(provider.find(GameEvents.nextlevel)).not.toBeUndefined();
    expect(provider.find(GameEvents.render)).not.toBeUndefined();

    provider.emit(GameEvents.stop, data);
    provider.emit(GameEvents.start, data);
    provider.emit(GameEvents.pause, data);
    provider.emit(GameEvents.nextlevel, data);
    provider.emit(GameEvents.render, data);

    expect(eventGameStart).lastCalledWith(data);
    expect(eventGamePause).lastCalledWith(data);
    expect(eventGameStop).lastCalledWith(data);
    expect(eventNextLevel).lastCalledWith(data);
    expect(eventRender).lastCalledWith(data);
  });
});
