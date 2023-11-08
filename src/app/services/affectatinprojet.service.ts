import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Affectatinprojet } from '../class/affectationprojet';


@Injectable({
  providedIn: 'root'
})
export class AffectatinprojetService {

  private  API_URL = environment.urlBack+'/project/affectation';
  affectationapprenantverification: Affectatinprojet=new Affectatinprojet();
  constructor(private http:HttpClient) { 





  }
  ajouterAffectation(affectationProjet: Affectatinprojet): Observable<any> {
    return this.http.post(`${this.API_URL}/add`, affectationProjet);
  }
  ajouterAffectationtuteuracademique(affectationProjet: Affectatinprojet): Observable<any> {
    return this.http.post(`${this.API_URL}/addtuteuracademique`, affectationProjet);
  }
  ajouterAffectationApprenantVerification(affectationProjet: Affectatinprojet): Observable<any> {
    return this.http.post(`${this.API_URL}/addapprenantverification`, affectationProjet);
  }
  
  ajouterAffectationApprenantDaide(affectationProjet: Affectatinprojet): Observable<any> {
    return this.http.post(`${this.API_URL}/addapprenantaide`, affectationProjet);
  }

}