import { TasksService } from '../../core/services/tasks/state/tasks-state.service';
import { TasksListComponent } from './tasks-list.component';

describe('TaskListComponent', () => {
  let component: TasksListComponent;
  let tasksServiceMock: jest.Mocked<TasksService>;

  beforeEach(async () => {
    component = new TasksListComponent(tasksServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
