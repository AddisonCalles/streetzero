import fs from 'fs-extra';
import { ProjectTemplates } from '../common/project.templates';
import path from 'path';
import 'colors';
export const CLIPATH = path.dirname(`${__dirname}`);
export const PROJECT = CLIPATH.split('dist')[0].split('src')[0];
export const TEMPLATE_PATH = `${PROJECT}templates/`;
export const copyTemplate = async (
  projectPath: string,
  template: ProjectTemplates
): Promise<boolean> => {
  if (fs.existsSync(TEMPLATE_PATH)) {
    console.log('● Check Template: ', TEMPLATE_PATH.blue, '✓'.green);
  } else {
    console.error('✕ Template directory not found.'.red, TEMPLATE_PATH.red);
    return false;
  }

  if (!isValidProjectPath(projectPath)) return false;

  console.log(
    '● Copy Base Template In progress...',
    projectPath.blue,
    '✓'.green
  );
  if (!(await fileCopy(`${TEMPLATE_PATH}base`, projectPath))) {
    console.error('✕ Copy Base Template Error.'.red);
    return false;
  }
  if (!(await fileCopy(`${TEMPLATE_PATH}${template}`, projectPath))) {
    console.error(`✕ Copy ${template} Files Template Error.`.red);
    return false;
  }

  return true;
};

const fileCopy = (source: string, target: string) => {
  return new Promise(async resolve => {
    try {
      await fs.copySync(source, target, {
        recursive: true,
      });
      resolve(true);
    } catch (ex) {
      console.log(ex);
      return resolve(false);
    }
  });
};

export const isValidProjectPath = (PATH_PROJECT: string) => {
  if (fs.existsSync(PATH_PROJECT)) {
    console.error(
      '✕ Error: The path to create the new project already exists..'.red
    );
    console.warn(`✕ Route already exists: ${PATH_PROJECT}`.yellow);
    return false;
  }
  return true;
};
