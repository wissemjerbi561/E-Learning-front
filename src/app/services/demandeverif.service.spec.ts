import { TestBed } from '@angular/core/testing';

import { DemandeverifService } from './demandeverif.service';

describe('DemandeverifService', () => {
  let service: DemandeverifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeverifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
