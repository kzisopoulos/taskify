import { TasksService } from './tasks-state.service';
import { TasksApiService } from '../api/tasks-api.service';
import { createSpyObj } from '../../../utils/create-spy-obj';

describe('TasksApiervice', () => {
  let service: TasksService;
  let tasksApiServiceMock: jest.Mocked<TasksApiService>;
  beforeEach(() => {
    tasksApiServiceMock = createSpyObj(TasksApiService);
    service = new TasksService(tasksApiServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
