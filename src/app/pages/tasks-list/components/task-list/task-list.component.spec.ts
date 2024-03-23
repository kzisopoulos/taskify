import { TasksStateService } from '../../../../core/services/tasks/state/tasks-state.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let tasksStateServiceMock: jest.Mocked<TasksStateService>;

  beforeEach(() => {
    component = new TaskListComponent(tasksStateServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
