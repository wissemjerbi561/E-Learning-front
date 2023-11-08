import { Cours } from "./cours";

export class CartItem {

    id!: number;
    name!:string;
    price!:number;
    quantity!: number;
    cours!:Cours[];
    


    
    constructor(cours:Cours){
        this.id=cours.idCours;
        this.name=cours.name;
        this.price=cours.price;
        this.quantity=1;        
        
    }
    

}
