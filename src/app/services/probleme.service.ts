import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activite } from '../class/activite';
import { Probleme } from '../class/probleme';


@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
 
  private  API_URL = environment.urlBack+'/project/probleme';

  constructor(private http:HttpClient) { 





  }
  ajouterProjett(probleme:Probleme , idProjet: any): Observable<any> {
    return this.http.post(`${this.API_URL}/add-probleme/${idProjet}`, probleme);}
  
 
    getProblemesByProjet(idProjet: any): Observable<Probleme[]> {
      return this.http.get<Probleme[]>(this.API_URL + '/listeProblemes/' + idProjet);
    }
    allProblemes():Observable<Probleme[]> {
      return this.http.get<Probleme[]>(this.API_URL);
     }
     updateProbleme(idProbleme: any, probeleme : Probleme): Observable<Object>{
      return this.http.put(`${this.API_URL}/${idProbleme}`, probeleme);
    }
   
    getProblemeById(idProbleme: any): Observable<Probleme>{
      return this.http.get<Probleme>(`${this.API_URL}/${idProbleme}`);
    }
    deleteProbleme(idProbleme: any): Observable<Object>{
      return this.http.delete(`${this.API_URL}/${idProbleme}`);
    }
    deactiverProbleme(idProbleme: any): Observable<any> {
      const url = `${this.API_URL}/${idProbleme}/deactiver`;
      return this.http.put<any>(url, {});
    }

    obtenirProblemesStatusFalse(): Observable<any[]> {
      return this.http.get<any[]>(`${this.API_URL}/problemes/statusFalse`);
    }

    public getProblemeByProjet(idProjet:any):Observable<Probleme>{
      return this.http.get<Probleme>(this.API_URL+'/retrieve-probleme/projet/'+idProjet);
    }
    getActivites(idProbleme: any): Observable<Activite[]> {
      const url = `${this.API_URL}/${idProbleme}/activites`;
      return this.http.get<Activite[]>(url);
    }
    uploadFile(file: File) {
      const formData = new FormData();
      formData.append('file', file);
  
      return this.http.post(this.API_URL+'/uploadfilee', formData);
    }
  }