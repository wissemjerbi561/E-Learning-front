import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePositionComponent } from './update-position.component';

describe('UpdatePositionComponent', () => {
  let component: UpdatePositionComponent;
  let fixture: ComponentFixture<UpdatePositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePositionComponent]
    });
    fixture = TestBed.createComponent(UpdatePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
