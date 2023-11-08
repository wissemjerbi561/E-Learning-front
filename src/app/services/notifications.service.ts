import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeNotification } from '../class/type-notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
 
  urlBack=environment.urlBack;
  private notifications: string[] = [];
  private notificationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  addNotification(notification: string) {
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
  }

  getNotifications(): Observable<string[]> {
    return this.notificationsSubject.asObservable();
  }
 
  getAllTypes(): Observable<any> {
    return this.http.get<any>(`${this.urlBack}/type/types`);
  }

  getNotificationCount(): Observable<number> {
   
    return this.http.get<number>(this.urlBack+'/notification-count');
  }

  private apiUrrl = this.urlBack+'/notification';
  addNotificationBack(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrrl}/create`, notification);
  }
  createType(type: TypeNotification): Observable<TypeNotification> {
    return this.http.post<TypeNotification>(`${this.urlBack}/type/create`, type, this.httpOptions);
  }

  getTypeById(typeId: number): Observable<TypeNotification> {
    return this.http.get<TypeNotification>(`${this.urlBack}/type/${typeId}`);
  }



 
  


  

  alltypes():Observable<TypeNotification[]> {
    return this.http.get<TypeNotification[]>(this.urlBack+'/project/cours/type');
   }



  updateType(typeId: number, type: TypeNotification): Observable<any> {
    return this.http.put<any>(`${this.urlBack}/type/update/${typeId}`, type, this.httpOptions);
  }

  deleteType(typeId: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBack}/type/delete/${typeId}`);
  }

addType(type:TypeNotification){
    return this.http.post(`${this.urlBack}/type/createType`,type);
   }
   ajouterType(type:TypeNotification){
    return this.http.post(`${this.urlBack}/type/createType`, type);}
   
}