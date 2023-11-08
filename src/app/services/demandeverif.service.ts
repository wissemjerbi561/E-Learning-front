import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeverifService {

  private  API_URL = environment.urlBack+'/project/demandeverif';


  constructor(private http:HttpClient) { }
 
  addDemandeverif(d: any): Observable<any> {

    return this.http.post<any>(`${this.API_URL}/adddemandeverif`, d);
  }
}