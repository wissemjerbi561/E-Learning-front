import { TestBed } from '@angular/core/testing';

import { AffectatinprojetService } from './affectatinprojet.service';

describe('AffectatinprojetService', () => {
  let service: AffectatinprojetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectatinprojetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
