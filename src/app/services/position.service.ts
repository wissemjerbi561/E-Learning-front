import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Position } from '../class/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private apiUrl = environment.urlBack+'/member/position';




  constructor(private httpClient: HttpClient) { }

  getListPositions(): Observable<Position[]>{
    return this.httpClient.get<any>(`${this.apiUrl}/positions`)
  }
  postPositions(data: any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/create`,data);
  }
  createPosition(position: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/create`, position);
  }
  getPositionById(positionId: number): Observable<Position> {
    return this.httpClient.get<Position>(`${this.apiUrl}/${positionId}`);
  }
  deactiverPosition(positionId: number): Observable<any> {
    const url = `${this.apiUrl}/desactiver/${positionId}`;
   // return this.httpClient.put<any>(`${this.apiUrl}/desactiver`, positionId);
   return this.httpClient.put<any>(url, {});
  }
  obtenirPositionsStatusFalse(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/positions/statusFalse`);
  }









  createPositionn(position: Position): Observable<Position> {
    return this.httpClient.post<Position>(`${this.apiUrl}/create`, position);
  }


}
