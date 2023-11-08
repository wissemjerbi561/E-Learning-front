import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/class/cart-item';
import { Cours } from 'src/app/class/cours';
import { CartService } from 'src/app/services/cart.service';
import { GetCorsService } from 'src/app/services/get-cors.service';

@Component({
  selector: 'app-liste-cours',
  templateUrl: './liste-cours.component.html',
  styleUrls: ['./liste-cours.component.css']
})
export class ListeCoursComponent implements OnInit {

  totalPrice:number=0.00;
  totalQuantity:number=0;
  cours:Cours[] =[];

  constructor(private coursService :GetCorsService,
    private cartService :CartService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listCours();
      this.updateCartStatus();
  
    });
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data =>this.totalPrice = data);
  
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity= data);
  }
  listCours(){
  
      this.coursService.getCours().subscribe(
        (data:any) =>{
          this.cours = data;
        }
      )
  }
  addToCart(theCours:Cours){
      console.log(`Adding to cart:${theCours.nom},${theCours.price}`);
      
      const theCartItem = new CartItem(theCours);
  
      this.cartService.addToCart(theCartItem);
  }

}
