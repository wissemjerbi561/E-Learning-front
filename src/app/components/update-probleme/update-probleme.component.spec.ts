import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProblemeComponent } from './update-probleme.component';

describe('UpdateProblemeComponent', () => {
  let component: UpdateProblemeComponent;
  let fixture: ComponentFixture<UpdateProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
