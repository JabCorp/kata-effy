import {Component, OnInit} from '@angular/core';
import {Builder} from "../../utils/builder";
import {UserInfo} from "../../models/userInfo.model";
import {AppService} from "../../services/app.service";
import {Observable, of} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {AsyncPipe, CurrencyPipe, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {Router} from "@angular/router";
import {Eligibility} from "../../models/eligibility.model";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    AsyncPipe,
    CurrencyPipe,
    UpperCasePipe,
    TitleCasePipe
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  eligibility: Eligibility | null = null;
  userInfo$: Observable<UserInfo> = of(Builder<UserInfo>().build());

  constructor(private readonly router: Router,
              private readonly appService: AppService) {
  }

  ngOnInit(): void {
    this.userInfo$ = this.appService.userInfo$;
    this.eligibility = this.appService.calculateEligibility()
  }

  onClickGoBackToProject(): void {
    void this.router.navigate(['project']);
  }

}
