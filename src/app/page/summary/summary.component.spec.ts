import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';

import {SummaryComponent} from './summary.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('SummaryComponent', () => {
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
    detectChanges: false
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
