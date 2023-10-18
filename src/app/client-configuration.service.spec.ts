import { TestBed } from '@angular/core/testing';

import { ClientConfigurationService } from './client-configuration.service';

describe('ClientConfigurationService', () => {
  let service: ClientConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
