import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/class/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-liste-paiements',
  templateUrl: './liste-paiements.component.html',
  styleUrls: ['./liste-paiements.component.css']
})
export class ListePaiementsComponent implements OnInit {
  listPaiements !:Payment[];
  constructor(private PaymentService: PaymentService) { }

  ngOnInit(): void {
   this.PaymentService.getPaymentList().subscribe((data:any)=> this.listPaiements=data);
  }
  
}
