import { TestBed } from '@angular/core/testing';

import { GetCorsService } from './get-cors.service';

describe('GetCorsService', () => {
  let service: GetCorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
