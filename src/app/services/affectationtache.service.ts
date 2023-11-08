import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Affectationtache } from '../class/affectationtache';

@Injectable({
  providedIn: 'root'
})
export class AffectationtacheService {

 
  private  API_URL = environment.urlBack+'/project/affectationtache';
  private apiUrl= environment.urlBack;
  memberId = Number(localStorage.getItem('memberId'));


  constructor(private http:HttpClient) { 





  }
  ajouterAffectation(affectationTache: Affectationtache): Observable<any> {
    return this.http.post(`${this.API_URL}/add`, affectationTache);
  }
  verifierAffectationExistante(idTache: any, memberId: any): Observable<boolean> {
    const url = `${this.apiUrl}/affectationtache/exists?idTache=${idTache}&memberId=${memberId}`;
    return this.http.get<boolean>(url);
  }
  getAffectationache(idAffectationTache: any): Observable<Affectationtache[]> {
    const url = `${this.API_URL}/${idAffectationTache}`;
    return this.http.get<Affectationtache[]>(url);
  }

  

  allAffectationTache():Observable<Affectationtache[]> {
    return this.http.get<Affectationtache[]>(this.API_URL);
   }
   getAffectationTacheById(idAffectationTache: any): Observable<Affectationtache>{
    return this.http.get<Affectationtache>(`${this.API_URL}/${idAffectationTache}`);
  }
  getTasksForMember(memberId: any) {
    return this.http.get<Affectationtache[]>(`${this.API_URL}/tachesaffectes/${memberId}`);
  }
}  