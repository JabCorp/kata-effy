import {Routes} from '@angular/router';
import {UserInfoComponent} from "./page/user-info/user-info.component";
import {ProjectComponent} from "./page/project/project.component";
import {SummaryComponent} from "./page/summary/summary.component";
import {projectGuard, summaryGuard} from "./guards/app.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'userInfo'
  },
  {
    path: 'userInfo',
    pathMatch: 'full',
    component: UserInfoComponent
  },
  {
    path: 'project',
    pathMatch: 'full',
    component: ProjectComponent,
    canMatch: [projectGuard]
  },
  {
    path: 'summary',
    pathMatch: 'full',
    component: SummaryComponent,
    canMatch: [summaryGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'userInfo'
  }
];
