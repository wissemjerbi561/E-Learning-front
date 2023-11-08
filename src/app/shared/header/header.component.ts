import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Projet } from 'src/app/class/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { AddNotificationComponent } from 'src/app/add-notification/add-notification.component';



import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Cours } from 'src/app/class/cours';
import { TypeNotification } from 'src/app/class/type-notification';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  Swal from 'sweetalert2';
import {  EventEmitter, Output } from '@angular/core';

import { Affectatinprojet } from 'src/app/class/affectationprojet';
import { AffectatinprojetService } from 'src/app/services/affectatinprojet.service';
import { Notificationrania } from 'src/app/class/notificationrania';
import { NotificationService } from 'src/app/services/notification.service';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Member } from 'src/app/class/member';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  entryComponents: [AddNotificationComponent],
})
export class HeaderComponent implements OnInit {
  role: any;
  notificationComponentRef: ComponentRef<AddNotificationComponent> | null =
    null;




  
  totalPrice:number=0.00;
  totalQuantity:number=0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private affectationProjetService: AffectatinprojetService,
    private authService: AuthService,
    private toastr: ToastrService,
    private notificationsService: NotificationsService,
    private projetService: ProjetService
  ) {}

  notifications$!: Observable<string[]>;

  showAlerts: boolean = false;

  
  showNotification(): void {
    
    
  } 
  @ViewChild('notificationContainer', { read: ViewContainerRef }) notificationContainer!: ViewContainerRef;

  // ...

  
  toggleNotification(): void {
    if (this.notificationComponentRef) {
      this.notificationContainer.clear();
      this.notificationComponentRef = null;
    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddNotificationComponent);
      this.notificationComponentRef = this.notificationContainer.createComponent(componentFactory);
    }
  }
  onSubmit() {
    // ... Add the new notification

    // Emit the notificationAdded event
    this.notificationService.notificationAdded.emit();
  } 
  notificationAdded: EventEmitter<void> = new EventEmitter<void>();

  notifications: Notificationrania[] = [];
  
  ngOnInit() {
    
    this.role = localStorage.getItem('role');
    this.notificationService.getAllNotifications().subscribe((data) => {
      this.notifications = data;

    
    });
    this.notificationService.notificationAdded.subscribe(() => {
      this.notificationService.getAllNotifications().subscribe((data) => {
        this.notifications = data;
      });
    });
  }

 
  
  // Method to update notifications array
  updateNotifications(newNotification: Notificationrania) {
    this.notifications.push(newNotification);
  }

  onNotificationIconClick(): void {
    this.projetService.allNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
        // Vous pouvez ici traiter les notifications et afficher une liste déroulante ou une fenêtre modale pour les afficher à l'utilisateur
      },
      (error) => {
        // Gérer les erreurs, si nécessaire
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}