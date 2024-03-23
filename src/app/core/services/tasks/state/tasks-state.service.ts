import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import {
  CreateTaskBodyProps,
  TaskRouteResponse,
  TaskStatus,
  UpdateTaskBodyProps,
} from '../../../models/task.interface';
import { TasksApiService } from '../api/tasks-api.service';

interface MutateTaskState {
  isEditing: boolean;
  taskId: string;
}
@Injectable({
  providedIn: 'root',
})
export class TasksStateService {
  public constructor(private tasksApiService: TasksApiService) {}

  private tasksSubject = new BehaviorSubject<TaskRouteResponse[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  private isMutatingTaskSubject = new BehaviorSubject<MutateTaskState>({
    isEditing: false,
    taskId: '',
  });
  public isMutatingTask$ = this.isMutatingTaskSubject.asObservable();

  public loadTasks(): void {
    this.tasksApiService
      .getTasks()
      .pipe(
        take(1),
        tap((tasks) => {
          if (tasks.success && tasks.data) {
            this.tasksSubject.next(tasks.data);
          } else {
            this.tasksSubject.next([]);
          }
          return tasks;
        })
      )
      .subscribe();
  }
  public createTask(body: Omit<CreateTaskBodyProps, 'userId'>): void {
    this.tasksApiService
      .addTask(body)
      .pipe(
        take(1),
        tap((task) => {
          const oldTasks = this.tasksSubject.getValue();
          if (task.success && task.data) {
            if (oldTasks) {
              this.tasksSubject.next([...oldTasks, task.data]);
            } else {
              this.tasksSubject.next([task.data]);
            }
          }
          return task;
        })
      )
      .subscribe();
  }
  public updateTask(taskId: string, body: UpdateTaskBodyProps): void {
    this.tasksApiService
      .updateTask(taskId, body)
      .pipe(
        take(1),
        tap((task) => {
          if (task.success && task.data) {
            const oldTasks = this.tasksSubject.getValue();
            const updatedTasks = oldTasks?.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  ...body,
                };
              }
              return task;
            });
            if (updatedTasks?.length) {
              this.tasksSubject.next(updatedTasks);
            }
          }
        })
      )
      .subscribe();
  }
  public deleteTask(taskId: string): void {
    this.tasksApiService
      .deleteTask(taskId)
      .pipe(
        take(1),
        tap(() => {
          const oldTasks = this.tasksSubject.getValue();
          const updatedTasks = oldTasks?.filter((task) => task.id !== taskId);
          if (updatedTasks) {
            this.tasksSubject.next(updatedTasks);
          }
        })
      )
      .subscribe();
  }

  public setMutatingTask(taskId: string) {
    const currentlyMutatedTask = this.isMutatingTaskSubject.getValue();
    if (currentlyMutatedTask.taskId === taskId) {
      this.isMutatingTaskSubject.next({
        isEditing: false,
        taskId: '',
      });
      this.removeEmptyTaskShell();
    } else {
      if (currentlyMutatedTask.taskId === 'NEW') {
        this.removeEmptyTaskShell();
      }
      this.isMutatingTaskSubject.next({
        isEditing: true,
        taskId: taskId,
      });
    }
  }

  public mutateTask(task: TaskRouteResponse) {
    if (task.id !== 'NEW') {
      this.updateTask(task.id, task);
      this.setMutatingTask(task.id);
    } else {
      this.createTask(task);
      this.removeEmptyTaskShell();
    }
  }

  public addEmptyTaskShell(listType: TaskStatus) {
    this.tasksSubject.next([
      ...this.tasksSubject.value,
      { id: 'NEW', status: listType, title: '', userId: '' },
    ]);
    this.setMutatingTask('NEW');
  }
  public removeEmptyTaskShell() {
    this.tasksSubject.next(
      [...this.tasksSubject.value].filter((task) => task.id !== 'NEW')
    );
  }
}
