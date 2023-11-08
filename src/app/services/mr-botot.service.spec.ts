import { TestBed } from '@angular/core/testing';

import { MrBototService } from './mr-botot.service';

describe('MrBototService', () => {
  let service: MrBototService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrBototService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
