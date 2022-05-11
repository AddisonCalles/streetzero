import { prompt, QuestionCollection } from 'inquirer';
import 'colors';
import { Action } from '../actions';
const pjson = require('../../../package.json');

const options: QuestionCollection = {
  type: 'list',
  name: 'option',
  message: 'What do you need to do?',
  choices: [
    {
      name: '1.- Start a new project.',
      value: Action.PROJECT_NEW,
    },
    {
      name: '2.- Create new component.',
      value: Action.MAKE,
    },
  ],
};

export const menuActions = async () => {
  console.clear();
  console.log('===================================='.green);
  console.log('STREET ZERO - MAIN MENU');
  console.log('Version: ', pjson.version.blue);
  console.log('===================================='.green);
  const response = await prompt(options);
  return response.option;
};

export default menuActions;
