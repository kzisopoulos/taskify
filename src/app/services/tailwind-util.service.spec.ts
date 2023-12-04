import { TestBed } from '@angular/core/testing';

import { TailwindUtilService } from './tailwind-util.service';

describe('TailwindUtilService', () => {
  let service: TailwindUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TailwindUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
