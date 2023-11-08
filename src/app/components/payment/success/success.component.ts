import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private http: HttpClient,private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.paymentService.successPayment().subscribe(
      (response) => {
        console.log(response); // Gérer la réponse de la requête
      },
      (error) => {
        console.log(error); // Gérer les erreurs éventuelles
      }
    );

  }

}
