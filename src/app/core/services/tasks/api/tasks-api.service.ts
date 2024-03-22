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
import { AuthStateService } from '../../auth/state/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private url = environment.apiUrl + '/tasks';

  public constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  public getTasks(): Observable<RouteResponse<TaskRouteResponse[]>> {
    return this.authStateService.id$.pipe(
      switchMap((userId) => {
        const getTasksUrl = this.url + `/${userId}`;
        return this.http.get<RouteResponse<TaskRouteResponse[]>>(getTasksUrl);
      })
    );
  }

  public addTask(
    body: Omit<CreateTaskBodyProps, 'userId'>
  ): Observable<RouteResponse<TaskRouteResponse>> {
    return this.authStateService.id$.pipe(
      switchMap((userId) => {
        const addTaskUrl = this.url;
        return this.http.post<RouteResponse<TaskRouteResponse>>(addTaskUrl, {
          ...body,
          userId,
        });
      })
    );
  }

  public updateTask(
    taskId: string,
    body: UpdateTaskBodyProps
  ): Observable<RouteResponse<TaskRouteResponse>> {
    const updateTaskUrl = this.url + `/${taskId}`;
    return this.http.put<RouteResponse<TaskRouteResponse>>(updateTaskUrl, body);
  }

  public deleteTask(taskId: string): Observable<undefined> {
    const deleteTaskUrl = this.url + `/${taskId}`;
    return this.http.delete<undefined>(deleteTaskUrl);
  }
}
