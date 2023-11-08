import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tache } from '../class/tache';
import { ProjetService } from './projet.service';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
 
  private  API_URL = environment.urlBack+'/project/tache';

  constructor(private http:HttpClient, private projetService: ProjetService) { 





  }
  deactiverTache(idTache: any): Observable<any> {
    const url = `${this.API_URL}/${idTache}/deactiver`;
    return this.http.put<any>(url, {});
  }
  ajouterTache(tache:Tache , idActivite: any): Observable<any> {

    return this.http.post(`${this.API_URL}/add-tache/${idActivite}`,tache);}
    deleteTache(idTache: any): Observable<Object>{
      return this.http.delete(`${this.API_URL}/${idTache}`);
    }
    updateTache(idTache: any, tache : Tache): Observable<Object>{
      return this.http.put(`${this.API_URL}/${idTache}`, tache);
    }
    getTacheById(idTache: any): Observable<Tache>{
      return this.http.get<Tache>(`${this.API_URL}/${idTache}`);
    }

    getTacheWithProjet(): Observable<any[]> {
      return this.http.get<any[]>(`${this.API_URL}`).pipe(
        map(taches => {
          return taches.map(tache => ({
            tache,
            projet: this.projetService.getProjetById(tache.projetId)
          }));
        })
      );
    }

    getAllTachesAvecProjet(): Observable<any[]> {
      return this.http.get<Tache[]>(`${this.API_URL}/withProjet`);
    }
}
