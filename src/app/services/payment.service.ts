import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../class/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.urlBack+'/payment/payment';
  
 /* memberString = localStorage.getItem('member');
  member = JSON.parse(this.memberString ?? 'null');
  memberId = this.member?.memberId ?? null;
  memberId =this.ac.snapshot.params['id']*/


  constructor(private httpClient: HttpClient,private ac: ActivatedRoute) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  postPayment(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/create`,data)
    
  }
  //saveOrUpdate(info:Object):Observable<Object>{
    //return this.httpClient.put(`${this.api}`,info);
  //}
  /*getPaymentListAdmin(page:any, itemsPerPage:any):Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(`${this.apiUrl}/payments?page=${page}&size=${itemsPerPage}&sort=date,desc`).pipe(
      map(response => response)
    );
  }*/
   getPaymentList():Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(`${this.apiUrl}/payments`).pipe(
      map(response => response)
    );
  } 
  getPaymentListParMembre(page:any, itemsPerPage:any, memberId:any ):Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(`${this.apiUrl}/parMembre/${memberId}?page=${page}&size=${itemsPerPage}&sort=date,desc`).pipe(
      map(response => response)
    );
  }

  createPayment(payment:Payment):Observable<Object>{
    return this.httpClient.post(`${this.apiUrl}/create`,payment);
  }
  successPayment():Observable<Object>{
    return this.httpClient.post(`${this.apiUrl}/sucess`,null, { responseType: 'text' });
  }

  

}
