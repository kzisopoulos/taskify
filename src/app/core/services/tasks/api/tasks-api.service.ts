import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable, switchMap } from 'rxjs';
import { RouteResponse } from '../../../models/response.interface';
import {
  CreateTaskBodyProps,
  TaskRouteResponse,
  UpdateTaskBodyProps,
} from '../../../models/task.interface';
import { AuthService } from '../../auth/state/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private url = environment.apiUrl + '/tasks';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasks(): Observable<RouteResponse<TaskRouteResponse[]>> {
    return this.authService.id$.pipe(
      switchMap((userId) => {
        const getTasksUrl = this.url + `/${userId}`;
        return this.http.get<RouteResponse<TaskRouteResponse[]>>(getTasksUrl);
      })
    );
  }

  addTask(
    body: Omit<CreateTaskBodyProps, 'userId'>
  ): Observable<RouteResponse<TaskRouteResponse>> {
    return this.authService.id$.pipe(
      switchMap((userId) => {
        const addTaskUrl = this.url;
        return this.http.post<RouteResponse<TaskRouteResponse>>(addTaskUrl, {
          ...body,
          userId,
        });
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
