import {AppComponent} from './app.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;
  const createComponent = createComponentFactory({
    component: AppComponent,
    detectChanges: false
  })

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
