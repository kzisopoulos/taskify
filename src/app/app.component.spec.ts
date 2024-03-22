import { AppComponent } from './app.component';
import { AuthStateService } from './core/services/auth/state/auth-state.service';
import { createSpyObj } from './core/utils/create-spy-obj';

describe('AppComponent', () => {
  let component: AppComponent;
  let authServiceMock: jest.Mocked<AuthStateService>;

  beforeEach(async () => {
    authServiceMock = createSpyObj(AuthStateService);
    component = new AppComponent(authServiceMock);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
