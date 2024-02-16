import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { AppService } from './app.service';

describe('AppService', () => {
  let spectator: SpectatorService<AppService>;
  const createService = createServiceFactory(AppService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});