import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publication } from '../class/publication';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiUrl = environment.urlBack+'/forum/publications';

  constructor(private http: HttpClient) { }

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }
  

  createPublication(publication: Publication): Observable<Publication> {
    console.log('Contenu de la publication:', publication);

    return this.http.post<Publication>(this.apiUrl, publication);
  }

  updatePublication(publication: Publication): Observable<Publication> {
    const url = `${this.apiUrl}/${publication.id}`;
    return this.http.put<Publication>(url, publication);
  }

  deletePublication(publicationId: number): Observable<void> {
    const url = `${this.apiUrl}/${publicationId}`;
    return this.http.delete<void>(url);
  }

  likePublication(publicationId: number, userId: string | null): Observable<void> {
    const url = `${this.apiUrl}/${publicationId}/like`;
    const body = { userId: userId };
    return this.http.post<void>(url, body)
      .pipe(
        tap(() => this.storeLikedPublication([publicationId])) 
      );
  }
  
  storeLikedPublication(publicationIds: number[]): void {
    const likedPublications = this.getLikedPublications();
    likedPublications.push(...publicationIds);
    localStorage.setItem('likedPublications', JSON.stringify(likedPublications));
  }
  
  
  
  getLikedPublications(): number[] {
    const likedPublicationsString = localStorage.getItem('likedPublications');
    return likedPublicationsString ? JSON.parse(likedPublicationsString) : [];
  }
  
  

  unlikePublication(publicationId: number, userId: string | null): Observable<void> {
    const url = `${this.apiUrl}/${publicationId}/unlike`;
    const body = { userId: userId };
    return this.http.post<void>(url, body)
      .pipe(
        tap(() => this.removeLikedPublication(publicationId))
      );
  }
  
  removeLikedPublication(publicationId: number): void {
    const likedPublications = this.getLikedPublications();
    const index = likedPublications.indexOf(publicationId);
    if (index !== -1) {
      likedPublications.splice(index, 1);
      localStorage.setItem('likedPublications', JSON.stringify(likedPublications));
    }
  }
  

  

  // unlikeComment(publicationId: number): Observable<void> {
  //   const url = `${this.apiUrl}/${publicationId}/unlike`;
  //   return this.http.post<void>(url, null);
  // }
  

  addComment(publicationId: number, commentText: string): Observable<Publication> {
    const url = `${this.apiUrl}/${publicationId}/comments`;
    return this.http.post<Publication>(url, { commentText });
  }
  
  getPublicationsByParentId(publicationId:number): Observable<Publication[]> {
    const url = `${this.apiUrl}/byParent/${publicationId}`;

    return this.http.get<Publication[]>(url);
  }

  getPub(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/publication`);
  }
  
}

