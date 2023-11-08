import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentParMembreComponent } from './list-payment-par-membre.component';

describe('ListPaymentParMembreComponent', () => {
  let component: ListPaymentParMembreComponent;
  let fixture: ComponentFixture<ListPaymentParMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaymentParMembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPaymentParMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
