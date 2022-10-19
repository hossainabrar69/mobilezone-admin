import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


interface LoginContextInterface {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router:Router
    ) { }
  login(loginContext: LoginContextInterface): Observable<any> {
    return this.http.post(`${environment.API_Url}/users/login`,loginContext);
  }
  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  isAuthenticated() {
   return localStorage.getItem('token') ? true : false;
  }
}
