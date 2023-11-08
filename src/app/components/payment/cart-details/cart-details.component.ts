import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from 'src/app/class/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[]=[];
  totalPrice!:number;
  totalQuantity!:number;
  urlBack=environment.urlBack;

  constructor(private cartService:CartService, private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data =>this.totalPrice = data);
          
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data);

    this.cartService.computeCartTotals();  
  }
  remove(theCartItem:CartItem){
    this.cartService.remove(theCartItem);
  }


  // We load Stripe
  stripePromise = loadStripe(environment.stripeApi);

  memberString = localStorage.getItem('member');
  member = JSON.parse(this.memberString ?? 'null');
  lastName = this.member?.lastName ?? null;
  firstName = this.member?.firstName ?? null;
  memberId= this.member?.memberId?? null;
  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: this.cartItems.map(item => item.name).join(', '),
      currency: 'EUR',
      amount: this.totalPrice  * 100, // convert to cents
      quantity: '1',
      cancelUrl: environment.urlFront+'/cancel',
      successUrl: environment.urlFront+'/success',
      memberId: this.memberId,
      lastName: this.lastName,
      firstName: this.firstName,
    };

    const stripe = await this.stripePromise;


    // this is a normal http call to a backend API
    this.httpClient.post(`${this.urlBack}/payment/stripe`, payment).subscribe(
      (data: any) => {
        // I use stripe to redirect to the Checkout page of the Stripe platform
        stripe?.redirectToCheckout({
          sessionId: data.id
        });
      },
      (error: any) => {
        console.error('Error creating payment session:', error);
      }
    );
  }

}
