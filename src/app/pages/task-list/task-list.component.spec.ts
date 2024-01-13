import { Router } from '@angular/router';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { TaskListComponent } from './task-list.component';
import { createSpyObj } from '../../core/utils/create-spy-obj';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let tasksServiceMock: jest.Mocked<TasksService>;
  let router: Router;

  beforeEach(async () => {
    tasksServiceMock = createSpyObj(TasksService);
    tasksServiceMock.tasks$ = of([]);
    component = new TaskListComponent(tasksServiceMock, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
