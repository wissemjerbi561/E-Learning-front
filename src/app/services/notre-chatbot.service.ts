import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotreChatbotService {
  private apiUrl = environment.urlBotBack+'/get_response';

  constructor(private http: HttpClient) { }


  sendMessage(message: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { message }, { responseType: 'text' as 'json' });
  }


  getChatbotResponse(): Observable<string> {
    return this.http.get<{ response: string }>(this.apiUrl).pipe(
      map(response => decodeURIComponent(JSON.parse('"' + response.response + '"')))
    );
  }

  getResponse(message: string) {
    const url = this.apiUrl;
    return this.http.post(url, { message });
  }
}
