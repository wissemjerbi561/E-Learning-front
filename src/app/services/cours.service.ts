import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Cours } from '../class/cours';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = environment.urlBack+'/payment/cour';


  readonly API_URL =environment.urlBack+'/project/cours';
  
  

  constructor(private httpClient:HttpClient) { }

  allCours():Observable<Cours[]> {
    return this.httpClient.get<Cours[]>(this.API_URL);
   }

  getCoursList():Observable<Cours[]>{
    return this.httpClient.get<Cours[]>(`${this.apiUrl}/cours`).pipe(
      map(response => response)
    );
  }
}
    

    
    
