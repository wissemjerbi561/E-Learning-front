import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursParMembreComponent } from './list-cours-par-membre.component';

describe('ListCoursParMembreComponent', () => {
  let component: ListCoursParMembreComponent;
  let fixture: ComponentFixture<ListCoursParMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCoursParMembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCoursParMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
