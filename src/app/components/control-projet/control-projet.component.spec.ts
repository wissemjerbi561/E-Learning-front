import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlProjetComponent } from './control-projet.component';

describe('ControlProjetComponent', () => {
  let component: ControlProjetComponent;
  let fixture: ComponentFixture<ControlProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
