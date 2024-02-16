import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';
import {UserInfoComponent} from './user-info.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let spectator: Spectator<UserInfoComponent>;
  const createComponent = createComponentFactory({
    component: UserInfoComponent,
    imports: [
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      })
    ],
    detectChanges: false
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create an instance', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
