import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetParMembreComponent } from './list-projet-par-membre.component';

describe('ListProjetParMembreComponent', () => {
  let component: ListProjetParMembreComponent;
  let fixture: ComponentFixture<ListProjetParMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjetParMembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjetParMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
