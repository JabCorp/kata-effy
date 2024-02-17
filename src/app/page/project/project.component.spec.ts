import {Spectator, createComponentFactory, SpyObject} from '@ngneat/spectator/jest';

import { ProjectComponent } from './project.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";
import {SpectatorElement} from "@ngneat/spectator";
import {NgForm, Validators} from "@angular/forms";
import {Builder} from "../../utils/builder";
import {of} from "rxjs";
import {ProjectDetails} from "../../models/project.model";

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let appService: SpyObject<AppService>;
  let router: SpyObject<Router>;
  let spectator: Spectator<ProjectComponent>;
  const createComponent = createComponentFactory({
    component: ProjectComponent,
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
    appService.project$ = of(Builder<ProjectDetails>().build());
  });

  it('should create an instance', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  test('should call onClickGoBackToUserInfo on click on previous button', () => {
    // GIVEN
    jest.spyOn(component, 'onClickGoBackToUserInfo');
    const button = spectator.query('button.btn-outline-secondary') as SpectatorElement;
    // WHEN
    spectator.click(button)
    // THEN
    expect(spectator.component.onClickGoBackToUserInfo).toHaveBeenCalled();
  })

  test('should call onClickGoToSummary on click on next button', () => {
    // GIVEN
    jest.spyOn(component, 'onClickGoToSummary');
    const button = spectator.query('button.btn-primary') as SpectatorElement;
    // WHEN
    spectator.click(button)
    // THEN
    expect(spectator.component.onClickGoToSummary).toHaveBeenCalled();
  })

  test('should call router.navigate when click on previous button', () => {
    // WHEN
    component.onClickGoBackToUserInfo();
    // THEN
    expect(router.navigate).toHaveBeenCalledWith(['userInfo']);
    expect(appService.setProject).toHaveBeenCalled();
  })

  test('should call router.navigate when form valid', () => {
    // GIVEN
    const projectForm = new NgForm([], []);
    // WHEN
    component.onClickGoToSummary(projectForm);
    // THEN
    expect(component.projectDetails.valid).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['summary']);
    expect(appService.setProject).toHaveBeenCalled();
  })

  test('should set error to true when form invalid', () => {
    // GIVEN
    jest.spyOn(AppService.prototype, 'setProject');
    const userInfoForm = new NgForm([Validators.required], []);
    userInfoForm.form.setErrors({required: true});
    // WHEN
    component.onClickGoToSummary(userInfoForm);
    // THEN
    expect(component.projectDetails.valid).toBeFalsy();
    expect(component.error).toBeTruthy();
  })
});
