import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/class/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payment:Payment[] =[];
  payment1:Payment=new Payment();

  constructor(private route:ActivatedRoute,private paymentService:PaymentService,
              private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.postPayment();
    });
    this.route.paramMap.subscribe(() =>{
      this.getPaymentList();
    });
    this.savePayment();
  }

  savePayment(){
    this.paymentService.createPayment(this.payment1).subscribe(data =>{
      console.log(data);
      

    },
    error => console.log(error));
  }
  getPaymentList() {
    this.paymentService.getPaymentList().subscribe(
      data =>{
        this.payment = data;
      }
    )
  }
  postPayment() {
    this.paymentService.postPayment(this.payment).subscribe(
      data =>{
        this.payment = data;
      }
    )
  }
  

}
