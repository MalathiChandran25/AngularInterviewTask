import { TestBed } from '@angular/core/testing';

import { CredentialdataService } from './credentialdata.service';

describe('CredentialdataService', () => {
  let service: CredentialdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
