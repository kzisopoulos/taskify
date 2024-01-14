import { Router } from '@angular/router';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { createSpyObj } from '../../core/utils/create-spy-obj';
import { CreateTaskComponent } from './create-task.component';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let tasksServiceMock: jest.Mocked<TasksService>;
  let router: Router;

  beforeEach(async () => {
    tasksServiceMock = createSpyObj(TasksService);
    component = new CreateTaskComponent(tasksServiceMock, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
