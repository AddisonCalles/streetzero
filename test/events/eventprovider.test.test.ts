import 'jest';
import { EventProvider } from '../../src/providers';
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
describe('Unit EventProvider Class', () => {
  test('Event Provider test', () => {
    const provider = EventProvider.getInstance(true);
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

  test('Event Provider singelton test', () => {
    const provider = EventProvider.getInstance(true);
    expect(provider.registry('test-event')).toBeUndefined();
    expect(provider.find('test-event')).not.toBeUndefined();

    const eventRegister = (event: string) => {
      return function(target: any, propertyKey: string) {
        target;
        propertyKey;
        expect(EventProvider.getInstance().find(event)).not.toBeUndefined();
      };
    };

    class Test {
      constructor() {}
      @eventRegister('test-event')
      test() {}
    }
    expect(new Test());
    const provier2 = EventProvider.getInstance();
    expect(provier2.find('test-event')).not.toBeUndefined();
  });
});
