import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/class/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-list-payment-par-membre',
  templateUrl: './list-payment-par-membre.component.html',
  styleUrls: ['./list-payment-par-membre.component.css']
})
export class ListPaymentParMembreComponent implements OnInit {
  listPaiementsParMembre !:Payment[];
  totalItems :any; 
  page=1;
  itemsPerPage=5;
  payments: any[]  = [];
  searchDate:any;

  constructor(private PaymentService: PaymentService,   private ac: ActivatedRoute) { }

  memberId =this.ac.snapshot.params['id']
  searchDescription: string = '';

  ngOnInit(): void {
      this.getPaymentListParMembre(this.page, this.itemsPerPage);
    

      
  }
  getPaymentListParMembre(page:any, itemsPerPage:any){ this.PaymentService.getPaymentListParMembre(page, itemsPerPage, this.memberId).subscribe((data:any)=>  
    {this.payments=data;
    this.listPaiementsParMembre = this.payments ;
    this.totalItems =data.totlalPayment
       
    if (this.searchDescription !== '' ){
      this.listPaiementsParMembre = this.listPaiementsParMembre.filter((payment: Payment) =>
        payment.name.toLowerCase().includes(this.searchDescription.toLowerCase())   
    );
    } 
  });
  }

}
