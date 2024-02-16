import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserInfo} from "../models/userInfo.model";
import {ProjectDetails} from "../models/project.model";
import {Builder} from "../utils/builder";
import {Eligibility} from "../models/eligibility.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly SURFACE_UNITARY_PRICE = 80;
  private readonly PROJECT_COST_MULTIPLIER = 0.75;
  private readonly INCOME_MULTIPLIER = 0.15;

  private readonly currentUserInfo = new BehaviorSubject<UserInfo>(Builder<UserInfo>().build());
  userInfo$ = this.currentUserInfo.asObservable();

  private readonly currentProject = new BehaviorSubject<ProjectDetails>(Builder<ProjectDetails>().build());
  project$ = this.currentProject.asObservable();

  setUserInfo(userInfo: UserInfo) {
    this.currentUserInfo.next(userInfo);
  }

  setProject(project: ProjectDetails) {
    this.currentProject.next(project);
  }

  private calculateSurfaceCost(project: ProjectDetails) {
    return project.surface * this.SURFACE_UNITARY_PRICE;
  }

  private calculateProjectCost(project: ProjectDetails) {
    return this.calculateSurfaceCost(project) * this.PROJECT_COST_MULTIPLIER;
  }

  private calculateIncomeByPerson(project: ProjectDetails) {
    return project.income / project.people;
  }

  private calculateIncomeByPersonWithMultiplier(project: ProjectDetails) {
    return this.calculateIncomeByPerson(project) * this.INCOME_MULTIPLIER;
  }

  private calculateEffyAid(): number {
    const project: ProjectDetails = this.currentProject.getValue();
    return this.calculateProjectCost(project) - this.calculateIncomeByPersonWithMultiplier(project);
  }

  calculateEligibility(): Eligibility {
    const amount = this.calculateEffyAid();
    const eligible = amount > 0 && this.currentProject.getValue().ownership;
    return Builder<Eligibility>().eligible(eligible).amount(amount).build();
  }

}
