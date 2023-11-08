import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from './class/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  apiUrl = environment.urlBack+'/keycloak/roles/create';
  apiKeyCLoak =
    'https://keycloak.fethi.synology.me/auth/admin/realms/KeyClock-INSY2S-E-LEARING/roles';
  constructor(private http: HttpClient) {}

  createRole(role: Role): Observable<any> {
    return this.http.post(`${this.apiUrl}`, role);
  }

  addRoleToKeycloak(role: Role): Observable<any> {
      return this.http.post(`${this.apiKeyCLoak}`, role);
  }
}
