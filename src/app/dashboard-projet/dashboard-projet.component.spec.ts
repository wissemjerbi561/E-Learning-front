import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjetComponent } from './dashboard-projet.component';

describe('DashboardProjetComponent', () => {
  let component: DashboardProjetComponent;
  let fixture: ComponentFixture<DashboardProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
