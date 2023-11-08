
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notificationrania } from '../class/notificationrania';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = environment.urlBack+'/notification';

  constructor(private httpClient: HttpClient) { }

  getAllNotifications(): Observable<Notificationrania[]> {
    return this.httpClient.get<Notificationrania[]>(`${this.apiUrl}/notifications`)
  }



  addNotification(notification: Notification): Observable<Notification> {
    return this.httpClient.post<Notification>(`${this.apiUrl}/create`, notification);
  }
  

  
  @Output() notificationAdded: EventEmitter<any> = new EventEmitter<any>();

  
}
