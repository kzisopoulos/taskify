import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { createSpyObj } from '../../core/utils/create-spy-obj';
import { EditTaskComponent } from './edit-task.component';
import { Subject, of } from 'rxjs';
import { DestroyRef } from '@angular/core';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let destoryRefMock: jest.Mocked<DestroyRef>;
  let tasksServiceMock: jest.Mocked<TasksService>;
  let activatedRouteMock: jest.Mocked<ActivatedRoute>;
  let routerMock: jest.Mocked<Router>;

  const paramsSubject = new Subject<Params>();

  beforeEach(async () => {
    destoryRefMock = createSpyObj(DestroyRef, ['onDestroy']);
    activatedRouteMock = createSpyObj(ActivatedRoute);
    routerMock = createSpyObj(Router);
    activatedRouteMock.params = paramsSubject.asObservable();
    tasksServiceMock = createSpyObj(TasksService);
    tasksServiceMock.tasks$ = of([]);
    component = new EditTaskComponent(
      destoryRefMock,
      activatedRouteMock,
      routerMock,
      tasksServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
