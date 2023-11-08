import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotreChatbotComponent } from './notre-chatbot.component';

describe('NotreChatbotComponent', () => {
  let component: NotreChatbotComponent;
  let fixture: ComponentFixture<NotreChatbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotreChatbotComponent]
    });
    fixture = TestBed.createComponent(NotreChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
