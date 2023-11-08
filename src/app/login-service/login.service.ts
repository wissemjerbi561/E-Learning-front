import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberService } from '../services/member.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private apiUrl = environment.urlBack ;


   

  constructor(private httpClient: HttpClient, private memberService:MemberService ) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.httpClient.post(`${this.apiUrl}/api/keycloak/auth/login`, body);
    

  }
}
