import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Demandeaide } from '../class/demandeaide';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemandeaideService {
  private  API_URL = environment.urlBack+'/project/demandeaide';


  constructor(private http:HttpClient) { }
 
  addDemandeaide(d: any): Observable<any> {

    return this.http.post<any>(`${this.API_URL}/adddemande`, d);
  }
}