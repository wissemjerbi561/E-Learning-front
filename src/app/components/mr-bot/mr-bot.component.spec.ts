import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrBotComponent } from './mr-bot.component';

describe('MrBotComponent', () => {
  let component: MrBotComponent;
  let fixture: ComponentFixture<MrBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MrBotComponent]
    });
    fixture = TestBed.createComponent(MrBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
