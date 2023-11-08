import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import { Notificationrania } from '../class/notificationrania';
import { TypeNotification } from '../class/type-notification';
import { NotificationService } from '../services/notification.service';
import { ProjetService } from '../services/projet.service';
@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent {
  notifications: Notificationrania[] = [];
  
  nouveauTypeNotification: TypeNotification = new TypeNotification();


  senderName!: string; 
  socket!: Socket; // Declare 'socket' property at the class level

  notification: Notificationrania = {
    notificationId:0 ,
        objectId:0 ,
        description: '',
        title: '',
        senderName: '' ,
        recipientName:'',
        type:new TypeNotification,
        timestamp: new Date()
  };
  typeList!: TypeNotification[];
  constructor(
    private projetService: ProjetService ,private notificationService: NotificationService, private router:Router) { }

    ngOnInit(): void {
      this.notificationService.getAllNotifications().subscribe((data:any) => {
        this.typeList = data;
        this.notificationService.getAllNotifications().subscribe((data) => {
          this.notifications = data;
        });
      });
     
   }
  
    
   getNotificationLink(typeName: string): string {
    const selectedType = this.typeList.find(type => type.typeName === typeName);
    return selectedType ? selectedType.path : '';
  }
  

onSubmit() {
  const typeId = this.notification.type.typeId;
  this.projetService.ajouterNotification(this.notification, typeId)
    .subscribe((response: any) => {
      console.log('Notification ajoutée avec succès');
     
      const swalOptions: {
        title: string;
        icon: 'success';
        customClass: {
          container: string;
          title: string;
          confirmButton: string;
        };
        background: string;
        confirmButtonColor: string;
        confirmButtonText: string;
      } = {
        title: '<span style="color: #55ADDC;">Notification ajoutée avec succès</span>',
        icon: 'success',
        customClass: {
          container: 'my-swal-container',
          title: 'my-swal-title',
          confirmButton: 'my-swal-button'
        },
        background: '#f2f2f2',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Valider',
      };

      Swal.fire(swalOptions);
    
      this.notifications.push(this.notification);
      this.notification.senderName = response.memberName;
      


        // Emit the newly added notification
        this.notificationAdded.emit(this.notification);
   
      this.notification = {
        notificationId: 0,
        objectId: 0,
        description: '',
        title: '',
        senderName: '' ,
        recipientName:'',
        type: new TypeNotification(),
        timestamp: new Date()
      };
  
    });
  
}


 getNotificationDuration(timestamp: Date): string {
  return moment(timestamp).fromNow();
}
@Output() notificationAdded = new EventEmitter<Notificationrania>();
  @Output() updateNotificationCount = new EventEmitter<number>(); // Add this line
  
  

 

}


