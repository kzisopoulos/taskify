import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
type AuthPage = 'login' | 'signup';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  activePage: AuthPage = 'login';
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.checkAuth()) {
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
    this.auth
      .login({
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      })
      .subscribe((res) => {
        this.auth.setState(res);
        this.router.navigate(['']);
      });
  }

  onRegisterSubmit() {
    this.auth
      .register({
        username: this.registerForm.value.username!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      })
      .subscribe((res) => {
        this.auth.setState(res);
        this.router.navigate(['']);
      });
  }

  setActivePage(page: AuthPage) {
    this.activePage = page;
  }
}
