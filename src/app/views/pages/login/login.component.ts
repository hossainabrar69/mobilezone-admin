import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, delay, finalize, catchError, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  private sub = new Subscription();
  error: string | undefined;
  isLoading: boolean | undefined;
  
  constructor(
    private router: Router,
    private authService: AuthService
    ) { 
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onSubmit(){
    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.sub = this.authService
    .login(credentials)
    .pipe(
      delay(1500),
      map((r)=> localStorage.setItem('token',r.token)),
      tap(() => this.router.navigate(['/dashboard'])),
      finalize(() => (this.isLoading = false)),
      catchError(error => of((this.error = error)))
    )
    .subscribe();
  
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
