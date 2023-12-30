import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';
import {
  AuthRouteResponse,
  LoginBodyProps,
  RegisterBodyProps,
} from '../../../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiService = inject(AuthApiService);

  private username: string | undefined = undefined;
  private id: number | undefined = undefined;
  private accessToken: string | undefined = undefined;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public checkAuth$ = this.authApiService.refreshToken().pipe(
    tap((value) => {
      if (value.success) {
        this.isLoggedInSubject.next(true);
        this.setState(value.data);
      } else {
        this.isLoggedInSubject.next(false);
        this.setState(value.data);
      }
      return value.success;
    })
  );

  public getUsername() {
    return this.username;
  }

  public getUserId() {
    return this.id;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public handleLogin(body: LoginBodyProps) {
    return this.authApiService.login(body).pipe(
      tap((value) => {
        if (value.success) {
          this.isLoggedInSubject.next(true);
          this.setState(value.data);
        } else {
          this.isLoggedInSubject.next(false);
          this.setState(value.data);
        }
        return value;
      })
    );
  }
  public handleRegister(body: RegisterBodyProps) {
    return this.authApiService.login(body).pipe(
      tap((value) => {
        if (value.success) {
          this.isLoggedInSubject.next(true);
          this.setState(value.data);
        } else {
          this.isLoggedInSubject.next(false);
          this.setState(value.data);
        }
        return value;
      })
    );
  }

  private setState(data: AuthRouteResponse | null) {
    if (data) {
      this.username = data?.username;
      this.id = data?.id;
      this.accessToken = data?.accessToken;
    } else {
      this.username = undefined;
      this.id = undefined;
      this.accessToken = undefined;
    }
  }
}
