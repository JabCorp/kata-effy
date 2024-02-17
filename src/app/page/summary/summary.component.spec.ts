import {createComponentFactory, Spectator, SpyObject} from '@ngneat/spectator/jest';
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import {SummaryComponent} from './summary.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";
import {SpectatorElement} from "@ngneat/spectator";
import {of} from "rxjs";
import {Builder} from "../../utils/builder";
import {Civility, UserInfo} from "../../models/userInfo.model";
import {Eligibility} from "../../models/eligibility.model";

registerLocaleData(localeFr, 'fr')

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let appService: SpyObject<AppService>;
  let router: SpyObject<Router>;
  let spectator: Spectator<SummaryComponent>;
  const createComponent = createComponentFactory({
    component: SummaryComponent,
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
    appService.userInfo$ = of(Builder<UserInfo>().civility(Civility.MR).firstName('Bryan').lastName('Johnson').build());
  });

  it('should create an instance', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  test('should call onClickGoBackToProject on click on previous button', () => {
    // GIVEN
    jest.spyOn(component, 'onClickGoBackToProject');
    const button = spectator.query('button.btn-outline-secondary') as SpectatorElement;
    // WHEN
    spectator.click(button)
    // THEN
    expect(spectator.component.onClickGoBackToProject).toHaveBeenCalled();
  })

  test('should call router.navigate when click on previous button', () => {
    // WHEN
    component.onClickGoBackToProject();
    // THEN
    expect(router.navigate).toHaveBeenCalledWith(['project']);
  })

  test('should display div with text-danger class when not eligible', () => {
    // GIVEN
    component.eligibility = Builder<Eligibility>().eligible(false).amount(0).build();
    // WHEN
    spectator.detectComponentChanges();
    // THEN
    expect(spectator.query('.text-danger')).toExist()
    expect(spectator.query('.text-success')).not.toExist()
  })

  test('should display p with text-success class when eligible', () => {
    // GIVEN
    component.eligibility = Builder<Eligibility>().eligible(true).amount(100).build();
    // WHEN
    spectator.detectComponentChanges();
    // THEN
    expect(spectator.query('.text-danger')).not.toExist()
    expect(spectator.query('.text-success')).toExist()
  })
});
