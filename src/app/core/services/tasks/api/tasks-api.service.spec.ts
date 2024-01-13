import { TasksApiService } from './tasks-api.service';
import { HttpClient } from '@angular/common/http';
import { createSpyObj } from '../../../utils/create-spy-obj';
import { AuthService } from '../../auth/state/auth.service';

describe('TasksApiervice', () => {
  let service: TasksApiService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let authServiceMock: jest.Mocked<AuthService>;
  beforeEach(() => {
    httpClientMock = createSpyObj(HttpClient);
    authServiceMock = createSpyObj(AuthService);
    service = new TasksApiService(httpClientMock, authServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
