import { TasksListThemeConfig } from '../../core/models/task.theme.interface';

export const taskListStyleConfig: TasksListThemeConfig = {
  PENDING: {
    list: {
      background: 'bg-gray-600/10',
      titleBackground: 'bg-gray-600/50',
      titleDot: 'bg-white',
      newButton: 'text-gray-500 hover:bg-gray-500/10',
    },
    listItem: {
      background: 'bg-gray-800 hover:bg-gray-700/80',
    },
  },
  IN_PROGRESS: {
    list: {
      background: 'bg-blue-600/10',
      titleBackground: 'bg-blue-600/50',
      titleDot: 'bg-white',
      newButton: 'text-blue-500 hover:bg-blue-500/10',
    },
    listItem: {
      background: 'bg-blue-800 hover:bg-blue-700/80',
    },
  },
  DONE: {
    list: {
      background: 'bg-green-600/10',
      titleBackground: 'bg-green-600/10',
      titleDot: 'bg-green-500',
      newButton: 'text-green-600 hover:bg-gray-600/10',
    },
    listItem: {
      background: 'bg-green-800/20 hover:bg-green-700/30',
    },
  },
};
