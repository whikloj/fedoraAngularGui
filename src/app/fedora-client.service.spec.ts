import { TestBed } from '@angular/core/testing';

import { FedoraClientService } from './fedora-client.service';

describe('FedoraClientService', () => {
  let service: FedoraClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FedoraClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
