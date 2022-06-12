import 'jest-canvas-mock';
import 'jest';
import fs from 'fs';
import {
  CLIPATH,
  pathProject,
  PROJECT,
  TEMPLATE_PATH,
} from '../../src/cli/helpers/path.helper';
import { copyTemplate } from '../../src/cli/helpers/project.new.helper';
const Name = 'tests/temp/projects-cli/Test-Project-' + Date.now();
beforeAll(() => {});
beforeEach(() => {
  if (fs.existsSync(pathProject(Name)))
    fs.rmSync(pathProject(Name), { recursive: true, force: true });
});
afterEach(() => {});
afterAll(() => {});
describe('Make project test', () => {
  test('General Perperties', () => {
    console.log(TEMPLATE_PATH);
    expect(fs.existsSync(TEMPLATE_PATH)).toBeTruthy();
    expect(fs.existsSync(PROJECT)).toBeTruthy();
    console.log(TEMPLATE_PATH);
    console.log(CLIPATH);
  });

  test('CLI Template copy to project', () => {
    const project = pathProject(Name);
    const pathArray = project.split('/');
    const nameSplit = Name.split('/');
    expect(pathArray[pathArray.length - 1]).toBe(
      nameSplit[nameSplit.length - 1]
    );
    expect(pathArray[pathArray.length - 2]).toBe('projects-cli');
    console.log(project);
    expect(copyTemplate(project)).resolves.toBeTruthy();
    expect(fs.existsSync(PROJECT)).toBeTruthy();
    console.log('✓ Success. Complete create project.'.green);
    console.log('Run CLI CLI', CLIPATH);
  });
});
