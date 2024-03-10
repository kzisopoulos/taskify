import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth/state/auth.service';
import { createSpyObj } from './core/utils/create-spy-obj';

describe('AppComponent', () => {
  let component: AppComponent;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthService);
    component = new AppComponent(authServiceMock);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
