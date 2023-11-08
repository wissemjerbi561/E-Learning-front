import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activite } from '../class/activite';
import { Tache } from '../class/tache';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
 
 private  API_URL = environment.urlBack+'/project/Activity';
 private  apiUrl = environment.urlBack;

  constructor(private http:HttpClient) { 





  }

  deactiverActivite(idActivite: any): Observable<any> {
    const url = `${this.API_URL}/${idActivite}/deactiver`;
    return this.http.put<any>(url, {});
  }
  ajouterActivity(activate:Activite , idProbleme: any): Observable<any> {
    return this.http.post(`${this.API_URL}/add-activity/${idProbleme}`, activate);}
    deleteActivite(idActivite: any): Observable<Object>{
      return this.http.delete(`${this.API_URL}/${idActivite}`);
    }
    updateActivite(idActivite: any, activite : Activite): Observable<Object>{
      return this.http.put(`${this.API_URL}/${idActivite}`, activite);
    }
    deactiverProbleme(idProbleme: any): Observable<any> {
      const url = `${this.apiUrl}/project/probleme/${idProbleme}/deactiver`;
      return this.http.put<any>(url, {});
    }
    getTaches(idActivite: any): Observable<Tache[]> {
      const url = `${this.API_URL}/${idActivite}/taches`;
      return this.http.get<Tache[]>(url);
    }
    getActiviteById(idActivite: any): Observable<Activite>{
      return this.http.get<Activite>(`${this.API_URL}/${idActivite}`);
    }
}
