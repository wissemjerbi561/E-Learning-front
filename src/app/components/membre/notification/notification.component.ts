import { Component, OnInit } from '@angular/core';
import { Notificationrania } from 'src/app/class/notificationrania';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications:Notificationrania[] =[];

  constructor(private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.listNotifications
  }

  listNotifications(){
    this.notificationService.getAllNotifications().subscribe(data =>{
      
      }
    )
  }

  

}
