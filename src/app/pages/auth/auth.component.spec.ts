import { Router } from '@angular/router';
import { AuthStateService } from '../../core/services/auth/state/auth-state.service';
import { AuthComponent } from './auth.component';
import { createSpyObj } from '../../core/utils/create-spy-obj';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let authStateServiceMock: jest.Mocked<AuthStateService>;
  let router: Router;

  beforeEach(async () => {
    authStateServiceMock = createSpyObj(AuthStateService);
    authStateServiceMock.isLoggedIn$ = of(true);
    component = new AuthComponent(authStateServiceMock, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
