import { cwd } from 'process';
import path from 'path';

export const pathProject = (name: string) =>
  path.dirname(`${cwd()}/${name}/.`).replaceAll('\\', '/');
export const CLIPATH = path.dirname(`${__dirname}`);
export const PROJECT = CLIPATH.split('dist')[0].split('src')[0];
export const TEMPLATE_PATH = `${PROJECT}templates/`;
