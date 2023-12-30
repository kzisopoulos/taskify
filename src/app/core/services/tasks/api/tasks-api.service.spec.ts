import { TestBed } from '@angular/core/testing';
import { TasksApiService } from './tasks-api.service';

describe('TasksApiervice', () => {
  let service: TasksApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksApiService],
    });
    service = TestBed.inject(TasksApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
