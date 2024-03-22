import { TasksApiService } from './tasks-api.service';
import { HttpClient } from '@angular/common/http';
import { createSpyObj } from '../../../utils/create-spy-obj';
import { AuthStateService } from '../../auth/state/auth-state.service';

describe('TasksApiervice', () => {
  let service: TasksApiService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let authStateServiceMock: jest.Mocked<AuthStateService>;
  beforeEach(() => {
    httpClientMock = createSpyObj(HttpClient);
    authStateServiceMock = createSpyObj(AuthStateService);
    service = new TasksApiService(httpClientMock, authStateServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
