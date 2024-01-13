import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;

  beforeEach(async () => {
    component = new ContactComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
