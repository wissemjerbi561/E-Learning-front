import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AviCoursComponent } from './avi-cours.component';

describe('AviCoursComponent', () => {
  let component: AviCoursComponent;
  let fixture: ComponentFixture<AviCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AviCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AviCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
