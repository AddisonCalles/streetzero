import 'jest';
import { GameEvents } from '../../src';
import { GameEventProvider } from '../../src/providers';

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
describe('Unit UIEventProvider Class', () => {
  test('Registry check', () => {
    const onStart = jest.fn();
    const onStop = jest.fn();
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const onRender = jest.fn();
    const onNextLevel = jest.fn();
    const onPreNextLevel = jest.fn();
    const provider = new GameEventProvider();

    provider.onStart(() => onStart());
    window.dispatchEvent(new Event(GameEvents.start));
    expect(onStart).nthCalledWith(1);

    provider.onStop(() => onStop());
    window.dispatchEvent(new Event(GameEvents.stop));
    expect(onStop).nthCalledWith(1);

    provider.onPlay(() => onPlay());
    window.dispatchEvent(new Event(GameEvents.play));
    expect(onPlay).nthCalledWith(1);

    provider.onPause(() => onPause());
    window.dispatchEvent(new Event(GameEvents.pause));
    expect(onPause).nthCalledWith(1);

    provider.onRender(() => onRender());
    window.dispatchEvent(new Event(GameEvents.render));
    expect(onRender).nthCalledWith(1);

    provider.onNextLevel(() => onNextLevel());
    window.dispatchEvent(new Event(GameEvents.nextlevel));
    expect(onNextLevel).nthCalledWith(1);

    provider.onPreNextLevel(() => onPreNextLevel());
    window.dispatchEvent(new Event(GameEvents.prenextlevel));
    expect(onPreNextLevel).nthCalledWith(1);
  });
});
