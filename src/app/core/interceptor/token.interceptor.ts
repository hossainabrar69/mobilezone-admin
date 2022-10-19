import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token:any;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Authorization': 'Bearer ' + this.token
    });
    const tokenizedReq = request.clone({
      headers: headers
    });
    return next.handle(tokenizedReq);
  }
}
