import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Get the authentication token from local storage or wherever you store it

    if (token) {
      // Clone the request and add the authorization header
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Pass the modified request to the next handler
      return next.handle(authRequest);
    }

    // No token, proceed with the original request
    return next.handle(request);
  }
}
