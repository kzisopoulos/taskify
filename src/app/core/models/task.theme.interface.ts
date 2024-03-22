import { TaskListType } from './task.interface';

export type TaskListTheme = {
  list: {
    background: string;
    titleBackground: string;
    titleDot: string;
    newButton: string;
  };
  listItem: {
    background: string;
  };
};

export type TasksListThemeConfig = {
  [k in TaskListType]: TaskListTheme;
};
