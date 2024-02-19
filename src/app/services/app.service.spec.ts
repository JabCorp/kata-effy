import {createServiceFactory, SpectatorService} from '@ngneat/spectator/jest';
import {AppService} from './app.service';
import {ProjectDetails} from "../models/project.model";
import {Eligibility} from "../models/eligibility.model";
import {lastValueFrom, take} from "rxjs";
import {Civility, UserInfo} from "../models/userInfo.model";

describe('AppService', () => {
  let service: AppService;
  let spectator: SpectatorService<AppService>;
  const createService = createServiceFactory(AppService);

  beforeEach(() => {
    spectator = createService()
    service = spectator.service
  });

  test('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  test('should update project value', async () => {
    // Given
    const project: ProjectDetails = {
      valid: true,
      ownership: true,
      people: 2,
      income: 10000,
      surface: 30
    }
    // When
    service.setProject(project)
    const actual = await lastValueFrom(service.project$.pipe(take(1)))
    // Then
    expect(actual).toEqual(project)
  })

  test('should update project value', async () => {
    // Given
    const userInfo: UserInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'n9jLc@example.com',
      civility: Civility.MR,
      phoneNumber: '123456789'
    }
    // When
    service.setUserInfo(userInfo)
    const actual = await lastValueFrom(service.userInfo$.pipe(take(1)))
    // Then
    expect(actual).toEqual(userInfo)
  })

  test.each([
    [{ownership: false}, {eligible: false, amount: 0}],
    [{ownership: true, income: 10000, people: 2, surface: 30}, {eligible: true, amount: 1050}],
    [{ownership: true, income: 100000, people: 2, surface: 30}, {eligible: false, amount: -5700}],
  ])('should calculate eligibility to aid', (project, expected) => {
    // Given
    service.setProject(project as ProjectDetails);
    // When
    const actual = service.calculateEligibility();
    // Then
    expect(actual.amount).toEqual((expected as Eligibility).amount);
    expect(actual.eligible).toEqual((expected as Eligibility).eligible);
  })
});
