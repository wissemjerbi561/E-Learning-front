import { Cours } from "./cours";

export class Payment {
    id!:number;
    amount!:number;
    date!:Date;
    paymentStatus!:string;
    cours !:Cours[];
    name: any;
    quantity: any;
    memberId: any;
    lastName: any;
    firstName: any;
    totlalPayment!:any;

}
