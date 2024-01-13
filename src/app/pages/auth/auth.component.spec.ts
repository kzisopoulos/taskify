import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/state/auth.service';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { AuthComponent } from './auth.component';
import { createSpyObj } from '../../core/utils/create-spy-obj';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let authServiceMock: jest.Mocked<AuthService>;
  let tasksServiceMock: jest.Mocked<TasksService>;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthService);
    authServiceMock.isLoggedIn$ = of(true);
    tasksServiceMock = createSpyObj(TasksService);
    component = new AuthComponent(authServiceMock, tasksServiceMock, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
