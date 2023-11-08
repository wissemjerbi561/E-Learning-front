import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAideComponent } from './demande-aide.component';

describe('DemandeAideComponent', () => {
  let component: DemandeAideComponent;
  let fixture: ComponentFixture<DemandeAideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
