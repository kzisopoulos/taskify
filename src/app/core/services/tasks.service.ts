import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { RouteResponse } from '../models/response.interface';
import {
  CreateTaskBodyProps,
  TaskRouteResponse,
  UpdateTaskBodyProps,
} from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasklist$ = new BehaviorSubject<TaskRouteResponse[] | null>(null);
  public tasks$ = this.tasklist$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getTasks(): Observable<RouteResponse<TaskRouteResponse[]>> {
    return this.http
      .get<RouteResponse<TaskRouteResponse[]>>(
        `http://localhost:3001/api/tasks/${this.authService.getUserId()}`
      )
      .pipe(
        tap((tasks) => {
          if (tasks.success && tasks.data) this.tasklist$.next(tasks.data);
        })
      );
  }

  loadTasks() {
    this.getTasks().subscribe((res) => res);
  }

  addTask(
    body: CreateTaskBodyProps
  ): Observable<RouteResponse<TaskRouteResponse>> {
    return this.http
      .post<RouteResponse<TaskRouteResponse>>(
        `http://localhost:3001/api/tasks`,
        body
      )
      .pipe(
        tap((task) => {
          if (task.data) {
            this.router.navigate(['']);
          }
          return task;
        })
      );
  }

  updateTask(
    taskId: number,
    body: UpdateTaskBodyProps
  ): Observable<RouteResponse<TaskRouteResponse>> {
    return this.http.put<RouteResponse<TaskRouteResponse>>(
      `http://localhost:3001/api/tasks/${taskId}`,
      body
    );
  }

  deleteTask(taskId: number): Observable<undefined> {
    return this.http.delete<undefined>(
      `http://localhost:3001/api/tasks/${taskId}`
    );
  }
}
