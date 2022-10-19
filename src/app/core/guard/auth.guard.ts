import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    let isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      window.location.href = environment.Base_Url;
      return false;
    }
    else {
      return true;
    }  
  }
}
