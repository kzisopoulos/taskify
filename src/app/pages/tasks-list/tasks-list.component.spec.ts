import { TasksStateService } from '../../core/services/tasks/state/tasks-state.service';
import { TasksListComponent } from './tasks-list.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let tasksStateServiceMock: jest.Mocked<TasksStateService>;

  beforeEach(async () => {
    component = new TasksListComponent(tasksStateServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
