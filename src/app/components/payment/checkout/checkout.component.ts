import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice!:number;
  totalQuantity!:number;

  constructor(private formBuilder:FormBuilder,
    private cartService :CartService) { }

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:['',Validators.required ,Validators.minLength(2)],
        lastName:['',Validators.required ,Validators.minLength(2)],
        email:[''] }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        cardNumber:[''],
        securityCode:['']
          

        })
    })
  }

  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity=> this.totalQuantity = totalQuantity);



    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice=> this.totalPrice = totalPrice);
  }
  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

}
