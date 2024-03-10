import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/state/auth.service';
import { AuthComponent } from './auth.component';
import { createSpyObj } from '../../core/utils/create-spy-obj';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let authServiceMock: jest.Mocked<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthService);
    authServiceMock.isLoggedIn$ = of(true);
    component = new AuthComponent(authServiceMock, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
