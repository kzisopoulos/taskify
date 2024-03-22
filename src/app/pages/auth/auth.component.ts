import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../../core/services/auth/state/auth-state.service';
import { Observable, tap } from 'rxjs';
import { LetDirective } from '@ngrx/component';
type AuthPage = 'login' | 'signup';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LetDirective],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  public activePage: AuthPage = 'login';
  public isLoggedIn$!: Observable<boolean>;
  public constructor(
    private authStateService: AuthStateService,
    private router: Router
  ) {}
  public ngOnInit(): void {
    this.isLoggedIn$ = this.authStateService.isLoggedIn$.pipe(
      tap((value) => {
        if (value) this.router.navigate(['']);
      })
    );
  }

  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public onLoginSubmit() {
    this.authStateService.handleLogin({
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    });
  }

  public onRegisterSubmit() {
    this.authStateService.handleRegister({
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    });
  }

  public setActivePage(page: AuthPage) {
    this.activePage = page;
  }
}
