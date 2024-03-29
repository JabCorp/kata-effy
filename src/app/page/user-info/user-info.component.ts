import {Component, OnDestroy, OnInit} from '@angular/core';
import {Civility, UserInfo} from "../../models/userInfo.model";
import {Builder} from "../../utils/builder";
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";
import {FormsModule, NgForm} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {EmailValidator} from "../../validators/email.validator";
import {NgIf} from "@angular/common";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    EmailValidator,
    NgIf,
    NgbToast
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit, OnDestroy {

  error: boolean = false;
  userInfo: UserInfo = Builder<UserInfo>().build();
  readonly CIVILITY = Civility;
  private readonly destroy$ = new Subject<void>()

  constructor(private readonly appService: AppService,
              private readonly route: Router) {
  }

  ngOnInit(): void {
    this.appService.userInfo$.pipe(takeUntil(this.destroy$)).subscribe(value => this.userInfo = value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickGoToProject(userInfoForm: NgForm): void {
    this.userInfo.valid = <boolean>userInfoForm.valid;
    if (userInfoForm.valid) {
      this.appService.setUserInfo(this.userInfo);
      void this.route.navigate(['project']);
    } else {
      userInfoForm.control.markAllAsTouched();
      this.error = true;
    }
  }
}
