import { TasksStateService } from './tasks-state.service';
import { TasksApiService } from '../api/tasks-api.service';
import { createSpyObj } from '../../../utils/create-spy-obj';

describe('TasksStateService', () => {
  let service: TasksStateService;
  let tasksApiServiceMock: jest.Mocked<TasksApiService>;
  beforeEach(() => {
    tasksApiServiceMock = createSpyObj(TasksApiService);
    service = new TasksStateService(tasksApiServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
