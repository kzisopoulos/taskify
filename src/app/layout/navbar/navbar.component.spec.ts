import { AuthService } from '../../core/services/auth/state/auth.service';
import { NavbarComponent } from './navbar.component';
import { createSpyObj } from '../../core/utils/create-spy-obj';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthService);
    component = new NavbarComponent(authServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
