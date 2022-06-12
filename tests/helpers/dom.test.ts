import { canvas, context2D } from '../mocks/app.mock';
import { getContext } from '../../src';
describe('Unit Tests Helper dom', () => {
  test('getContext return test', () => {
    const { canvas: canvasTest, context: contextTest } = getContext();
    expect(canvasTest).toBe(canvas);
    expect(contextTest).toBe(context2D);
  });
});
