/* istanbul ignore file */
import { prompt } from 'inquirer';
import { Action } from '../actions';
import { ControllerFunction } from '../controller.interface';

import { copyTemplate } from '../helpers/project.new.helper';
import { CLIPATH, pathProject } from '../helpers/path.helper';

/**
 * @returns
 */
export const NewProjectMenu: ControllerFunction = async () => {
  console.clear();
  console.log('===================================='.green);
  console.log('STREET ZERO - INIT PROJECT MENU');
  console.log('===================================='.green);
  const { Name } = await prompt({ type: 'input', name: 'Name' });

  if (!(await copyTemplate(pathProject(Name)))) {
    return Action.EXIT;
  }
  console.log('✓ Success. Complete create project.'.green);
  console.log('Run CLI CLI', CLIPATH);
  return Action.EXIT;
};

export default NewProjectMenu;
