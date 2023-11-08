import { TestBed } from '@angular/core/testing';

import { NotreChatbotService } from './notre-chatbot.service';

describe('NotreChatbotService', () => {
  let service: NotreChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotreChatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
