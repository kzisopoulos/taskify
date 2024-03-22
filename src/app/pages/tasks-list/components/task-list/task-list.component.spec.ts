import { AuthService } from '../../../../core/services/auth/state/auth-state.service';
import { TasksService } from '../../../../core/services/tasks/state/tasks-state.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let tasksStateServiceMock: jest.Mocked<TasksService>;
  let authStateServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    component = new TaskListComponent(
      tasksStateServiceMock,
      authStateServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
