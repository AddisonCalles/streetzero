#!/usr/bin/env node
import { Action } from './actions';
import { menuActions } from './menus/main.menu';
import { NewProjectMenu } from './menus/project.new.menu';
import 'colors';
/* istanbul ignore next */
export const getController = async (
  action: string | Action
): Promise<Action> => {
  switch (action) {
    case Action.PROJECT_NEW:
      return NewProjectMenu();
    default:
      return Action.EXIT;
  }
};

/* istanbul ignore next */
(async () => {
  let action: Action = await menuActions();
  while (action != Action.EXIT) {
    action = await getController(action);
  }
})();
