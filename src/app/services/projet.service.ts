import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TypeNotification } from '../class/type-notification';

import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Affectationtache } from '../class/affectationtache';
import { Cours } from '../class/cours';
import { Phase } from '../class/phase';
import { Probleme } from '../class/probleme';
import { Projet } from '../class/projet';
import { Tache } from '../class/tache';
import { Page } from '../interface/page';
import { NotificationsService } from './notifications.service';

import { Notificationrania } from '../class/notificationrania';

import { Affectatinprojet } from '../class/affectationprojet';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  
 private  API_URL = environment.urlBack+'/project/projet';

 private urlBack= environment.urlBack;
 memberString = localStorage.getItem('member');
 member = JSON.parse(this.memberString ?? 'null');
 memberId = this.member?.memberId ?? null;
  constructor(private http:HttpClient,private notificationsService: NotificationsService,private toastr: ToastrService) { 


  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  addProjet(projet:Projet){
    return this.http.post(this.API_URL +'/create',projet);
   }
   
   
   public AddProjett(projet: Projet, idCours: any): Observable<Projet[]> {
    return this.http.post<Projet[]>(this.API_URL+'/add-projet/' + idCours, projet).pipe(
      tap((projets: Projet[]) => {
        const message = `Un nouveau projet a été ajouté (${projets.length} ajout(s))`;
        this.toastr.success(message);
      })
    );
  }
  
  ajouterNotification(notification: Notificationrania, typeId: any): Observable<any> {
    return this.http.post(`${this.API_URL}/add-notification/${typeId}`, notification);}

    allNotifications():Observable<Notificationrania[]> {
      return this.http.get<Notificationrania[]>(this.API_URiL);
     }
  
  affecterPhaseProjet(idProjet:any) {
    const url = `${this.API_URL}/${idProjet}/affecterPhase`;
    return this.http.post(url, null);
  }
  affecterdeuxiemePhaseProjet(idProjet:any) {
    const url = `${this.API_URL}/${idProjet}/affecterPhase2`;
    return this.http.post(url, null);
  }
  affectertroixiemePhaseProjet(idProjet:any) {
    const url = `${this.API_URL}/${idProjet}/affecterPhase3`;
    return this.http.post(url, null);
  }
  affecterquateriemePhaseProjet(idProjet:any) {
    const url = `${this.API_URL}/${idProjet}/affecterPhase4`;
    return this.http.post(url, null);
  }
  affecterdernierPhaseProjet(idProjet:any) {
    const url = `${this.API_URL}/${idProjet}/affecterPhase5`;
    return this.http.post(url, null);
  }
  terminerDernierePhasee(idProjet: any) {
    const url = `${this.API_URL}/${idProjet}/terminerDernierePhase`;
    return this.http.put(url, {});
  }
  allProjets():Observable<Projet[]> {
    return this.http.get<Projet[]>(this.API_URL);
   }
   ajouterProjet(projet: Projet, idCours: any): Observable<any> {
    return this.http.post(`${this.API_URL}/add-projet/${idCours}`, projet);}
    ajouterProjett(projet: Projet, idProjet: number): Observable<any> {
      return this.http.post(`${this.API_URL}/add-projett/${idProjet}`, projet);}
  
      
    
   updateProjet(idProjet: any, projet : Projet): Observable<Object>{
    return this.http.put(`${this.API_URL}/${idProjet}`, projet);
  }
  terminerDernierePhase(idProjet: any) {
    const url = `${this.API_URL}/${idProjet}/terminerDernierePhase`;
    return this.http.put(url, {});
  }
  terminerDernierePhaseee(idProjet: number): Observable<void> {
    const url = `${this.API_URL}/${idProjet}/terminerDernierePhaseee`;
    return this.http.put<void>(url, {});
  }

 
  deactiverProjet(idProjet: number): Observable<any> {
    const url = `${this.API_URL}/${idProjet}/deactiver`;
    return this.http.put<any>(url, {});
  }
  getProjetById(idProjet: any): Observable<Projet>{
    return this.http.get<Projet>(`${this.API_URL}/${idProjet}`);
  }
  deleteProjet(idProjet: any): Observable<Object>{
    return this.http.delete(`${this.API_URL}/${idProjet}`);
  }
  getProblemes(idProjet: any): Observable<Probleme[]> {
    const url = `${this.API_URL}/${idProjet}/problemes`;
    return this.http.get<Probleme[]>(url);
  }
  obtenirProjetsStatusFalse(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/projets/statusFalse`);
  }

  getProjetsWithTypePhases() {
    const url = `${this.API_URL}/listprojetavecphase`;

    return this.http.get<any[]>(url);
  }
  getPhases(idProjet: any): Observable<Phase[]> {
    const url = `${this.API_URL}/${idProjet}/phases`;
    return this.http.get<Phase[]>(url);
  }
  
  searchProjects(description: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/search/${description}`);
  }
 // startProjet(idProjet: any): Observable<Projet> {
  //  return this.http.put<Projet>(`${this.API_URL}/${idProjet}/start`, {}); }
  getTachesDuProjet(idProjet: any): Observable<Tache[]> {
    const url = `${this.API_URL}/${idProjet}/taches`;
    return this.http.get<Tache[]>(url);
  }
  getTachenonAffectessDuProjet(idProjet: any): Observable<Tache[]> {
    const url = `${this.API_URL}/${idProjet}/tachesnonaffectes`;
    return this.http.get<Tache[]>(url);
  }
  getAfeectationTachesduProjet(idProjet: any): Observable<Affectationtache[]> {
    const url = `${this.API_URL}/${idProjet}/affectationtaches`;
    return this.http.get<Affectationtache[]>(url);
  }

  countNotActiveProjects() {
    const url = this.API_URL+'/count/notactiveproject';
  
    return this.http.get<number>(url);
  }
  countActiveProjects() {
    const url = this.API_URL +'/count/activeproject';
  
    return this.http.get<number>(url);
  }


  countnombretotalprojet(){
    const url = this.API_URL +'/count/nombretotalprojet';
    return this.http.get<number>(url);



  }
  countProjetsByMember(memberId: number): Observable<number> {
    const url = `${this.API_URL}/count/${memberId}`;
    return this.http.get<number>(url);
  }
  

  obtenirNombreProblemesParProjet(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }
  getProjetsWithTypePhasess(page: number, size: number): Observable<Page<Projet>> {
    const url = `${this.API_URL}/projets/pp`;  
    const params = new HttpParams()


    .set('page', page.toString())
    .set('size', size.toString());

    return this.http.get<Page<Projet>>(url, { params });
  }
 // getProjetByIdPhase(idProjet: any): Observable<Projet>{
   // return this.http.get<Projet>(`${this.API_URL}/${idProjet}/phasesss`);
  //}
  getProjetListParMembre(page: any, itemsPerPage: any, memberId:any): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.API_URL}/parMembre/${memberId}?page=${page}&size=${itemsPerPage}&sort=date,desc`).pipe(
      map(response => response)
    );
  }
 

  getCoursListParMembre(page: any, itemsPerPage: any,memberId:any): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.API_URL}/parMembree/${memberId}?page=${page}&size=${itemsPerPage}&sort=date,desc`).pipe(
      map(response => response)
    );
  }

  
 

  searchProjectsByDescription(description: string): Observable<Projet[]> {
    const url = `${this.API_URL}/search/${description}`;
    return this.http.get<Projet[]>(url);
  }

  rateCourse(courseId: number, rating: number) {
    const url = `${this.API_URL}/rateCourse/${courseId}`;
    const body = { rating: rating };
    return this.http.post(url, body).toPromise();
  }
  getNotificationCount(): Observable<number> {
   
    return this.http.get<number>('http://localhost:9090/notification-count');
  }

  private apiUrrl = 'http://localhost:9090/notification';
  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrrl}/create`, notification);
  }


  createType(type: TypeNotification): Observable<TypeNotification> {
    return this.http.post<TypeNotification>(`${this.API_URL}/type/create`, type, this.httpOptions);
  }

  getTypeById(typeId: number): Observable<TypeNotification> {
    return this.http.get<TypeNotification>(`${this.API_URL}/type/${typeId}`);
  }

  getAllTypes(): Observable<TypeNotification[]> {
    return this.http.get<TypeNotification[]>(`${this.API_URrL}/type/types`);
  }
  

  readonly API_URiL =environment.urlBack+'/project/cours/type';
  

  alltypes():Observable<TypeNotification[]> {
    return this.http.get<TypeNotification[]>(this.API_URiL);
   }

  private API_URrL = 'http://localhost:9090';

  updateType(typeId: number, type: TypeNotification): Observable<TypeNotification> {
    return this.http.put<TypeNotification>(`${this.API_URL}/type/update/${typeId}`, type, this.httpOptions);
  }

  deleteType(typeId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/type/delete/${typeId}`);
  }

 
  getMembersduProjet(idProjet: any): Observable<Affectatinprojet[]> {
    const url = `${this.API_URL}/${idProjet}/membersprojet`;
    return this.http.get<Affectatinprojet[]>(url);
  }

}