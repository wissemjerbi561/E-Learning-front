import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './class/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUrl = environment.urlBack+'/keycloak/auth/login';
  private userId = Number(localStorage.getItem('userId'));
  private apiUrl = environment.urlBack+'/keycloak/users/findById';
  private isAuthenticated = false;

  private tokenExpirationTime = 30;

  constructor(private http: HttpClient) {
    /*  window.addEventListener('beforeunload', () => {
      // Remove the token from local storage
      localStorage.removeItem('token');
    });*/
  }

  login(username: string, password: string): Promise<boolean> {
    // Perform the login API call and set the authentication status based on the response
    
    return this.http
      .post(this.loginUrl, { username, password })
      .toPromise()
      .then((response: any) => {
        // Assuming successful login
        this.isAuthenticated = true;

        //get admin role

        const roles = response.roles;

        // Find the role object with name "ADMIN"
     const adminRole = roles.find((role: { name: any }) => role.name === "ADMIN");
const role = roles.find((role: { name: any }) => role);

if (adminRole !== undefined) {
  localStorage.setItem('role', adminRole.name);
} else if (role !== undefined) {
  localStorage.setItem('role', role.name);
} else {
  // Handle the case when no role is found
  console.log("no role found");
  
}
       
        // Save the token or other relevant data from the response if needed

       
      

        localStorage.setItem('token', response.access_token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('username', response.username);

      
        // Set the timer for token expiration
        // this.setTokenExpirationTimer();
        return true;
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
        return false;
      });
  }

  /*

  private setTokenExpirationTimer(): void {
    const durationInMilliseconds = this.tokenExpirationTime * 60 * 1000;

    setTimeout(() => {
      // Remove the token from local storage
      this.logout();
    }, durationInMilliseconds);
  }
*/
  logout(): void {
    // Perform any necessary cleanup or API calls to invalidate the session
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

  }

  isAuthenticatedUser(): boolean {
    const tk = localStorage.getItem('token');
    if (tk) {
      return (this.isAuthenticated = true);
    }

    return (this.isAuthenticated = false);
  }

  getUserById(): Observable<User> {
    const apiUrl = environment.urlBack+`/keycloak/users/findById/${this.userId}`;

    return this.http.get<User>(apiUrl);
  }
}
