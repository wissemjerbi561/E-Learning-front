import { TypeNotification } from "./type-notification";

export class Notificationrania {
   notificationId!: number;
   objectId!: number;
   title!: string;
   description!: string;
   type!: TypeNotification;
   senderName!: string; 
   recipientName!:string;
   timestamp!: Date;
}
