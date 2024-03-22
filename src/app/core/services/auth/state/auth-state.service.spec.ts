import { of } from 'rxjs';
import { createSpyObject } from '../../../utils/create-spy-obj';
import { AuthApiService } from '../api/auth-api.service';
import { AuthService } from './auth-state.service';
import { RouteResponse } from '../../../models/response.interface';
import { AuthRouteResponse } from '../../../models/auth.interface';

describe('AuthService', () => {
  let service: AuthService;
  let authApiServiceMock: jest.Mocked<AuthApiService>;

  const mock: RouteResponse<AuthRouteResponse> = {
    code: 200,
    data: { accessToken: '', id: 0, username: '' },
    error: null,
    message: '',
    success: true,
  };

  beforeEach(() => {
    authApiServiceMock = createSpyObject(AuthApiService, [
      'refreshToken',
      'logout',
      'login',
      'register',
    ]);
    authApiServiceMock.refreshToken.mockReturnValue(of(mock));
    service = new AuthService(authApiServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
