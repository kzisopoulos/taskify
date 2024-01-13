import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth/state/auth.service';
import { TasksService } from './core/services/tasks/state/tasks.service';
import { createSpyObj } from './core/utils/create-spy-obj';
import { of } from 'rxjs';
import { RouteResponse } from './core/models/response.interface';
import { AuthRouteResponse } from './core/models/auth.interface';

describe('AppComponent', () => {
  let component: AppComponent;
  let authServiceMock: jest.Mocked<AuthService>;
  let tasksServiceMock: jest.Mocked<TasksService>;
  let router: Router;

  const mock: RouteResponse<AuthRouteResponse> = {
    code: 200,
    data: { accessToken: '', id: 0, username: '' },
    error: null,
    message: '',
    success: true,
  };

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthService);
    authServiceMock.checkAuth$ = of(mock);
    tasksServiceMock = createSpyObj(TasksService);
    component = new AppComponent(authServiceMock, tasksServiceMock, router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
