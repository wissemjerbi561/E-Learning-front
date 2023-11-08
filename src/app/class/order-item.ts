import { CartItem } from "./cart-item";

export class OrderItem {
    id!:number;
    nom!:string;
    price!:number;
    quantity!: number;
    


    constructor(cartItem : CartItem){
        this.id=cartItem.id;
        this.nom=cartItem.name;
        this.price=cartItem.price;
        this.quantity=cartItem.quantity;

    }
}
