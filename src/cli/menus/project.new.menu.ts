import { prompt } from 'inquirer';
import { Action } from '../actions';
import { ControllerFunction } from '../controller.interface';
import { cwd } from 'node:process';
import { copyTemplate } from '../helpers/project.new.helper';
import { ProjectTemplates } from '../common/project.templates';

export const NewProjectMenu: ControllerFunction = async () => {
  console.clear();
  console.log('===================================='.green);
  console.log('STREET ZERO - INIT PROJECT MENU');
  console.log('===================================='.green);
  const { Name } = await prompt({ type: 'input', name: 'Name' });
  const PATH_PROJECT = `${cwd()}/${Name}`;

  if (!(await copyTemplate(PATH_PROJECT, ProjectTemplates.space))) {
    return Action.EXIT;
  }
  console.log('✓ Success. Complete create project.'.green);
  console.log('Run CLI CLI', cwd());
  return Action.EXIT;
};

export default NewProjectMenu;
