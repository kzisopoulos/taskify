import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksApiervice', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
