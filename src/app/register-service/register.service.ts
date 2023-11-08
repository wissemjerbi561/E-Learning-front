import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiUrl=environment.urlBack;
  REG_URL = this.apiUrl+'/keycloak/users/signup';
  REG_URL_ajoutUser= this.apiUrl+'/keycloak/users/ajoutUser';
  addUser_URL = this.apiUrl+'/api/keycloak/users/addUser';

  constructor(private httpClient: HttpClient) {}

  register(user: User): Observable<any> {
    console.log(user, 'user');
    return this.httpClient.post(`${this.REG_URL}`, user);
  }
  ajoutUser(user: User): Observable<any> {
    console.log(user, 'user');
    return this.httpClient.post(`${this.REG_URL_ajoutUser}`, user);
  }

  addUser(user: User): Observable<any> {
    console.log(user, 'user');
    return this.httpClient.post(`${this.addUser_URL}`, user);
  }

  getRoles(): Observable<any>{
    const url = this.apiUrl+'/keycloak/roles/getAllRoles';
   return this.httpClient.get(url)
  }
  
}
