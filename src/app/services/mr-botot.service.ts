import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MrBototService {

  private apiUrl = environment.urlBotBack;

  constructor(private http: HttpClient) { }


  /*sendMessage(message: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { message }, { responseType: 'text' as 'json' });
  }*/
  sendMessage(message: any): Observable<any> {
    const url = `${this.apiUrl}/get_response`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded', // Ou 'application/json' si vous préférez envoyer en JSON
    });
    const data = new URLSearchParams();
    data.set('message', message);

    return this.http.post(url, data.toString(), { headers });
  }

  /*sendMessage(message: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { message }, { responseType: 'text' as 'json' });
  }*/
  
  /*getVoiceResponse(): Observable<any> {
    const url = `${this.apiUrl}/get_voice_response`;
    return this.http.post(url, {});
  }*/
  getVoiceResponse(): Observable<any> {
    const url = `${this.apiUrl}/get_voice_response`;
    
    // Vous pouvez ajuster les en-têtes selon vos besoins
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Utilisation de la méthode HTTP POST
    return this.http.post(url, null, { headers });
  }

  
}
