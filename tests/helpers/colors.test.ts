import { rgba } from '../../src/helpers/color';

test('Test RGBA', () => {
  expect(rgba('#43ff64', 0.5)).toBe('rgba(67,255,100,0.5)');
  expect(rgba('#43ff64', 1)).toBe('rgba(67,255,100,1)');
});
