import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
type AuthPage = 'login' | 'signup';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  activePage: AuthPage = 'login';
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.checkAuth()) {
      router.navigate(['']);
    }
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onLoginSubmit() {
    this.authService
      .login({
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      })
      .subscribe((res) => {
        this.authService.setState(res);
        this.router.navigate(['']);
      });
  }

  onRegisterSubmit() {
    this.authService
      .register({
        username: this.registerForm.value.username!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      })
      .subscribe((res) => {
        this.authService.setState(res);
        this.router.navigate(['']);
      });
  }

  setActivePage(page: AuthPage) {
    this.activePage = page;
  }
}
