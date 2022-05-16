import 'jest';
import { UIEventProvider } from '../../src/providers';
import { canvas } from '../mocks/app.mock';

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
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOut = jest.fn();
    const onTouchCancel = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchStart = jest.fn();
    const provider = new UIEventProvider(canvas);

    provider.onClick(onClick);
    canvas.click();
    expect(onClick).nthReturnedWith(1, undefined);

    provider.onKeyDown(onKeyDown);
    document.dispatchEvent(new Event('keydown'));
    expect(onKeyDown).nthReturnedWith(1, undefined);

    provider.onKeyUp(onKeyUp);
    document.dispatchEvent(new Event('keyup'));
    expect(onKeyUp).nthReturnedWith(1, undefined);

    provider.onMouseDown(onMouseDown);
    canvas.dispatchEvent(new Event('mousedown'));
    expect(onMouseDown).nthReturnedWith(1, undefined);

    provider.onMouseUp(onMouseUp);
    canvas.dispatchEvent(new Event('mouseup'));
    expect(onMouseUp).nthReturnedWith(1, undefined);

    provider.onMouseOut(onMouseOut);
    canvas.dispatchEvent(new Event('mouseout'));
    expect(onMouseOut).nthReturnedWith(1, undefined);

    provider.onTouchCancel(onTouchCancel);
    canvas.dispatchEvent(new Event('touchcancel'));
    expect(onTouchCancel).nthReturnedWith(1, undefined);

    provider.onTouchEnd(onTouchEnd);
    canvas.dispatchEvent(new Event('touchend'));
    expect(onTouchEnd).nthReturnedWith(1, undefined);

    provider.onTouchStart(onTouchStart);
    canvas.dispatchEvent(new Event('touchstart'));
    expect(onTouchStart).nthReturnedWith(1, undefined);
  });
});
