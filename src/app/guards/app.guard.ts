import {CanMatchFn} from '@angular/router';
import {inject} from "@angular/core";
import {AppService} from "../services/app.service";
import {map, take} from "rxjs";

export const projectGuard: CanMatchFn = (_route, _segments) => {
  return inject(AppService).userInfo$
    .pipe(
      take(1),
      map(value => !!value.valid),
    )
}

export const summaryGuard: CanMatchFn = (_route, _segments) => {
  return inject(AppService).project$
    .pipe(
      take(1),
      map(value => !!value.valid)
    )
}
