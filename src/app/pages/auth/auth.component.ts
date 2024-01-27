import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/state/auth.service';
import { Subscription, of, switchMap, tap } from 'rxjs';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
type AuthPage = 'login' | 'signup';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  public activePage: AuthPage = 'login';
  public authSubscription: Subscription;
  public constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private router: Router
  ) {
    this.authSubscription = this.authService.isLoggedIn$
      .pipe(
        tap((value) => {
          if (value) {
            this.router.navigate(['']);
          }
          return value;
        })
      )
      .subscribe();
  }
  public ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
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
    this.authService
      .handleLogin({
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      })
      .pipe(
        tap((value) => {
          this.router.navigate(['']);
          return value;
        }),
        switchMap((value) => {
          if (value.success) return this.tasksService.loadTasks();
          else return of(null);
        })
      )
      .subscribe();
  }

  public onRegisterSubmit() {
    this.authService
      .handleRegister({
        username: this.registerForm.value.username!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      })
      .pipe(
        tap((value) => {
          this.router.navigate(['']);
          return value;
        }),
        switchMap((value) => {
          if (value.success) return this.tasksService.loadTasks();
          else return of(null);
        })
      )
      .subscribe();
  }

  public setActivePage(page: AuthPage) {
    this.activePage = page;
  }
}
