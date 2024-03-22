import { AuthStateService } from '../../core/services/auth/state/auth-state.service';
import { NavbarComponent } from './navbar.component';
import { createSpyObj } from '../../core/utils/create-spy-obj';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let authServiceMock: jest.Mocked<AuthStateService>;

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthStateService);
    component = new NavbarComponent(authServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
