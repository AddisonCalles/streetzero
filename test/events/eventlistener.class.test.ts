import 'jest-canvas-mock';
import 'jest';
import { EventListener } from '../../src/events';

describe('Unit Tests EventListener Class', () => {
  test('General Perperties', () => {
    let subscriber1Mock = jest.fn();
    let subscriber2Mock = jest.fn();
    let event = new EventListener();
    event.subscribe(subscriber1Mock);
    event.emit({ message: 'test1' });
    expect(subscriber1Mock).nthCalledWith(1, { message: 'test1' });
    event.subscribe(subscriber2Mock);
    event.emit({ message: 'test2' });
    expect(subscriber1Mock).nthCalledWith(2, { message: 'test2' });
    expect(subscriber2Mock).nthCalledWith(1, { message: 'test2' });
    event.unsubscribe(subscriber2Mock);
    event.emit({ message: 'test3' });
    expect(subscriber2Mock).not.nthCalledWith(3, { message: 'test3' });
    expect(subscriber1Mock).nthCalledWith(3, { message: 'test3' });
  });
});
