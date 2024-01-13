import { AuthApiService } from './auth-api.service';
import { HttpClient } from '@angular/common/http';
import { createSpyObj } from '../../../utils/create-spy-obj';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = createSpyObj(HttpClient);
    service = new AuthApiService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
