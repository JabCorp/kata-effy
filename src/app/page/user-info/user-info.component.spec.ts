import {createComponentFactory, Spectator, SpyObject} from '@ngneat/spectator/jest';
import {UserInfoComponent} from './user-info.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SpectatorElement} from "@ngneat/spectator";
import {Router} from "@angular/router";
import {NgForm, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {of} from "rxjs";
import {Builder} from "../../utils/builder";
import {UserInfo} from "../../models/userInfo.model";

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let appService: SpyObject<AppService>;
  let router: SpyObject<Router>;
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
    mocks: [Router, AppService],
    detectChanges: false
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    router = spectator.inject(Router);
    appService = spectator.inject(AppService);
    appService.userInfo$ = of(Builder<UserInfo>().build());
  });

  test('should create an instance', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  test('should call onClickGoToProject on click', () => {
    // GIVEN
    jest.spyOn(component, 'onClickGoToProject');
    const submitButton = spectator.query('button') as SpectatorElement;
    // WHEN
    spectator.click(submitButton)
    // THEN
    expect(spectator.component.onClickGoToProject).toHaveBeenCalled();
  })

  test('should call router.navigate when form valid', () => {
    // GIVEN
    const userInfoForm = new NgForm([], []);
    // WHEN
    component.onClickGoToProject(userInfoForm);
    // THEN
    expect(router.navigate).toHaveBeenCalledWith(['project']);
    expect(appService.setUserInfo).toHaveBeenCalled();
  })

  test('should set error to true when form invalid', () => {
    // GIVEN
    jest.spyOn(AppService.prototype, 'setProject');
    const userInfoForm = new NgForm([Validators.required], []);
    userInfoForm.form.setErrors({required: true});
    // WHEN
    component.onClickGoToProject(userInfoForm);
    // THEN
    expect(component.userInfo.valid).toBeFalsy();
    expect(component.error).toBeTruthy();
  })
});
