import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import {
  CreateTaskBodyProps,
  TaskRouteResponse,
  UpdateTaskBodyProps,
} from '../../../models/task.interface';
import { TasksApiService } from '../api/tasks-api.service';

@Injectable({
  providedIn: 'root',
})
export class TasksStateService {
  private tasksSubject = new BehaviorSubject<TaskRouteResponse[] | null>(null);
  public tasks$ = this.tasksSubject.asObservable();

  public constructor(private tasksApiService: TasksApiService) {}

  public loadTasks(): void {
    this.tasksApiService
      .getTasks()
      .pipe(
        take(1),
        tap((tasks) => {
          if (tasks.success && tasks.data) {
            this.tasksSubject.next(tasks.data);
          } else {
            this.tasksSubject.next(null);
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
}
