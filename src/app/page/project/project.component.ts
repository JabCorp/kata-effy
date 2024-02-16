import {Component, OnDestroy, OnInit} from '@angular/core';
import {Builder} from "../../utils/builder";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {ProjectDetails} from "../../models/project.model";
import {EmailValidator} from "../../validators/email.validator";
import {NgIf} from "@angular/common";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    EmailValidator,
    FormsModule,
    NgIf,
    NgbToast,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit, OnDestroy {

  error: boolean = false;
  projectDetails: ProjectDetails = Builder<ProjectDetails>().build();
  private readonly destroy$ = new Subject<void>()

  constructor(private readonly appService: AppService,
              private readonly route: Router) {
  }

  ngOnInit(): void {
    this.appService.project$.pipe(takeUntil(this.destroy$)).subscribe(value => this.projectDetails = value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickGoToSummary(projectDetailsForm: NgForm): void {
    this.projectDetails.valid = <boolean>projectDetailsForm.valid;
    if (projectDetailsForm.valid) {
      this.appService.setProject(this.projectDetails);
      void this.route.navigate(['summary']);
    } else {
      projectDetailsForm.control.markAllAsTouched();
      this.error = true;
    }
  }

  onClickGoBackToUserInfo(): void {
    this.appService.setProject(this.projectDetails);
    void this.route.navigate(['userInfo']);
  }
}
