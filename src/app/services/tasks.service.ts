import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  note: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasksList: Task[] = [
    {
      id: uuidV4(),
      title: 'Task #1',
      priority: 'High',
      note: 'Very important task',
      done: false,
    },
    {
      id: uuidV4(),
      title: 'Task #2',
      priority: 'Medium',
      note: 'So-so task',
      done: false,
    },
    {
      id: uuidV4(),
      title: 'Task #3',
      priority: 'Low',
      note: 'Easy peasy task',
      done: false,
    },
    {
      id: uuidV4(),
      title: 'Task #4',
      priority: 'Low',
      note: 'Easy peasy task',
      done: false,
    },
    {
      id: uuidV4(),
      title: 'Task #5',
      priority: 'Low',
      note: 'Easy peasy task',
      done: false,
    },
    {
      id: uuidV4(),
      title: 'Task #6',
      priority: 'Low',
      note: 'Easy peasy task',
      done: false,
    },
    {
      id: uuidV4(),
      title: 'Task #7',
      priority: 'Low',
      note: 'Easy peasy task',
      done: true,
    },
  ];

  getTasks() {
    return this.tasksList.filter((task) => !task.done);
  }

  getCompletedTasks() {
    return this.tasksList.filter((task) => task.done);
  }

  addTask(newTask: Task) {
    this.tasksList.push(newTask);
  }

  removeTask(idToRemove: string) {
    this.tasksList = this.tasksList.filter((task) => task.id !== idToRemove);
  }

  markTaskComplete(idOfCompleted: string) {
    this.tasksList = this.tasksList.map((task) => {
      if (task.id === idOfCompleted) {
        return {
          ...task,
          done: true,
        };
      }
      return task;
    });
  }

  getTask(id: string | null) {
    const task = this.tasksList.find((task) => task.id === id);
    if (!task || !id) {
      return null;
    }
    return task;
  }
}
