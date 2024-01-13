import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/state/auth.service';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { createSpyObj } from '../../core/utils/create-spy-obj';
import { CreateTaskComponent } from './create-task.component';
import { of } from 'rxjs';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let authServiceMock: jest.Mocked<AuthService>;
  let tasksServiceMock: jest.Mocked<TasksService>;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthService);
    authServiceMock.isLoggedIn$ = of(true);
    tasksServiceMock = createSpyObj(TasksService);
    component = new CreateTaskComponent(
      authServiceMock,
      tasksServiceMock,
      router
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
