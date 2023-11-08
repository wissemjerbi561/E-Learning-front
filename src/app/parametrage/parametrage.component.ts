import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import Swal from 'sweetalert2';
import { TypeNotification } from '../class/type-notification';
import { NotificationsService } from '../services/notifications.service';
@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent {
  constructor(private notificationService:NotificationsService,private socket: Socket,private router: Router) {}
  pathOptions: string[] = [
    'demande-daide',
   
    'assistance-cours',
    'support-projet',
    'aide-tache'
  ];
  
  

  nouveauTypeNotification: TypeNotification = new TypeNotification();
  ngOnInit(): void {
    // Établir une connexion WebSocket avec le serveur
    this.socket.connect();

  
    this.socket.on('newNotification', (notification: any) => {

    });
  }

  ngOnDestroy(): void {
    
    this.socket.disconnect();
  }
 

  onSubmit() {
    this.notificationService.createType(this.nouveauTypeNotification)
      .subscribe(() => {
        console.log('Type ajouté avec succès');
       
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
        title: '<span style="color: #55ADDC;">Type ajouté avec succès</span>',
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
        // Émettre l'événement 'newNotification' aux clients connectés
        this.socket.emit('newNotification', this.nouveauTypeNotification);
  
        this.nouveauTypeNotification = {
          typeId: 0,
          typeName: '',
          path: '',
          code: ''
        };
      });
    
    
  }
}
