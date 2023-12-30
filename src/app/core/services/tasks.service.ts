import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth/state/auth.service';
import { RouteResponse } from '../models/response.interface';
import {
  CreateTaskBodyProps,
  TaskRouteResponse,
  UpdateTaskBodyProps,
} from '../models/task.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private url = environment.apiUrl + '/tasks';
  private tasklist$ = new BehaviorSubject<TaskRouteResponse[] | null>(null);
  public tasks$ = this.tasklist$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getTasks(): Observable<RouteResponse<TaskRouteResponse[]>> {
    const getTasksUrl = this.url + `/${this.authService.getUserId()}`;
    return this.http.get<RouteResponse<TaskRouteResponse[]>>(getTasksUrl).pipe(
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
    const addTaskUrl = this.url;
    return this.http
      .post<RouteResponse<TaskRouteResponse>>(addTaskUrl, body)
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
    const updateTaskUrl = this.url + `/${taskId}`;
    return this.http.put<RouteResponse<TaskRouteResponse>>(updateTaskUrl, body);
  }

  deleteTask(taskId: number): Observable<undefined> {
    const deleteTaskUrl = this.url + `/${taskId}`;
    return this.http.delete<undefined>(deleteTaskUrl);
  }
}
