import { TestBed } from '@angular/core/testing';

import { DemandeaideService } from './demandeaide.service';

describe('DemandeaideService', () => {
  let service: DemandeaideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeaideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
