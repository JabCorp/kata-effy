import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { ProjectComponent } from './project.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('ProjectComponent', () => {
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
    detectChanges: false
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
