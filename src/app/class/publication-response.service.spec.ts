import { TestBed } from '@angular/core/testing';

import { PublicationResponseService } from './publication-response.service';

describe('PublicationResponseService', () => {
  let service: PublicationResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
