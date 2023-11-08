import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AviCours } from '../class/avi-cours';
import { Categorie } from '../class/categorie';
import { Chapitre } from '../class/chapitre';
import { Cours } from '../class/cours';
import { Inscription } from '../class/inscription';
import { Seance } from '../class/seance';
import { Session } from '../class/session';
import { SousCategorie } from '../class/sousCategorie';
import { Tarif } from '../class/tarif';
import { Theme } from '../class/theme';

@Injectable({
  providedIn: 'root'
})
export class GetCorsService {
  private apiUrl =  environment.urlBack+'/cours'
  
  constructor(private http: HttpClient) {
  }

  getCours() {
    return this.http.get(`${this.apiUrl}/affichertoutCr`)
  }

  postCours(cr: Cours) {
    return this.http.post(`${this.apiUrl}/ajoutaffectcrsi`, cr);
  }

 
  postCoursWithImage(cours: any, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('nom', cours.nom);
    formData.append('description', cours.description);
    //formData.append('nbrDesInscrits', cours.nbreDesInscrits.toString());
   // formData.append('nbrDesCertifiés', cours.nbreDesCertifies.toString());
   // formData.append('dateDebut', cours.dateDebut.toISOString());
    //formData.append('dateFin', cours.dateFin.toISOString());
   // formData.append('noteMoyenneSatisfaction', cours.noteMoyenneSatisfaction.toString());
    formData.append('idTheme', cours.idTheme.toString());
    formData.append('idCategorie', cours.idCategorie.toString());
    formData.append('idSousCategorie', cours.idSousCategorie.toString());

    return this.http.post<any>(`${this.apiUrl}/ajoutaffectcr`, formData);
  }

  postChapitre(ch: Chapitre) {
    return this.http.post(`${this.apiUrl}/ajoutaffectch`, ch);
  }

  getChapitre() {
    return this.http.get<Chapitre[]>(`${this.apiUrl}/affichallch`);
  }

  /*postSeance(s: Seance) {
    return this.http.post(`${this.apiUrl}/ajoutsc', s);
  }*/

  postAvi(av: AviCours) {
    return this.http.post(`${this.apiUrl}/ajoutaffectAvicr`, av);
  }

  getAvis() {
    return this.http.get<AviCours[]>(`${this.apiUrl}/affichallav`);
  }

  deleteCours(idCours: number) {
    this.http.delete(`${this.apiUrl}/supprimercr/${idCours}`);
  }

  postTheme(th: Theme) {
    return this.http.post(`${this.apiUrl}/ajouttheme`, th);
  }

  getThemes() {
    return this.http.get<Theme[]>(`${this.apiUrl}/affichertoutth`)
  }

  postSession(ses: Session) {
    return this.http.post(`${this.apiUrl}/ajoutaffectsession`, ses);
  }

  getSessions() {
    return this.http.get<Session[]>(`${this.apiUrl}/affichallsession`)
  }
  postTarif(tr:Tarif) {
    return this.http.post(`${this.apiUrl}/ajoutaffecttarif`, tr);
  }
  getTarifCourant(idcr: number){
    return this.http.get<Tarif>(`${this.apiUrl}/affichtarifCourant/${idcr}`);
  }
  ajouterCoursAuSession(idSession: number, idCours: number): Observable<any> {
    const url = `${this.apiUrl}/ajouterCoursAuSession/${idSession}/${idCours}`;
    return this.http.put(url, null);
  }
  postSeance(sc:Seance) {
    return this.http.post(`${this.apiUrl}/ajoutaffectsc`, sc);
  }
  postInscription(ins:Inscription) {
    return this.http.post(`${this.apiUrl}/ajoutaffectins`, ins);
  }
  sendEmail(to: string, subject: string, body: string): Observable<any> {
    const emailRequest = {
      to: to,
      subject: subject,
      body: body
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this.http.post<any>(`${this.apiUrl}/send-email`, emailRequest, httpOptions);
  }
  postCategorie(cat:Categorie) {
    return this.http.post(`${this.apiUrl}/ajoutcategorie`, cat);
  }
  getCategories() {
    return this.http.get<Categorie[]>(`${this.apiUrl}/affichertoutcategories`);
  }
  postSousCategorie(souscat:SousCategorie) {
    return this.http.post(`${this.apiUrl}/ajoutsouscategorie`, souscat);
  }
  getSousCategories() {
    return this.http.get<SousCategorie[]>(`${this.apiUrl}/affichertoutsouscategories`);
  }
  getCoursByNomCategorie(nomCategorie: string): Observable<Cours[]> {
    const url = `${this.apiUrl}/afficherCrParCtegorie/${nomCategorie}`;
    return this.http.get<Cours[]>(url);
  }
  getCoursByNomSousCategorie(nomSousCategorie: string): Observable<Cours[]> {
    const url = `${this.apiUrl}/afficherCrParSousCtegorie/${nomSousCategorie}`;
    return this.http.get<Cours[]>(url);
  }
  getCoursByNoteMoyenneSatisfaction(): Observable<Cours[]> {
    const url = `${this.apiUrl}/note-moyenne`;
    return this.http.get<Cours[]>(url);
  }


  getCourseById(idCours: number): Observable<Cours> {
    const url = `${this.apiUrl}/courses/${idCours}`;
    return this.http.get<Cours>(url);
  }
}
