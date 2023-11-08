import { TestBed } from '@angular/core/testing';

import { AffectationtacheService } from './affectationtache.service';

describe('AffectationtacheService', () => {
  let service: AffectationtacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationtacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
