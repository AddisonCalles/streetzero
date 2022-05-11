import 'jest-canvas-mock';
import 'jest';
import fs from 'fs';
import {
  PROJECT,
  TEMPLATE_PATH,
} from '../../src/cli/helpers/project.new.helper';
beforeAll(() => {});
beforeEach(() => {});
afterEach(() => {});
afterAll(() => {});
describe('Make project test', () => {
  test('General Perperties', () => {
    console.log(TEMPLATE_PATH);
    expect(fs.existsSync(TEMPLATE_PATH)).toBeTruthy();
    expect(fs.existsSync(PROJECT)).toBeTruthy();
  });
});
