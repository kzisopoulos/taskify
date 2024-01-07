import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';
import {
  AuthRouteResponse,
  LoginBodyProps,
  RegisterBodyProps,
} from '../../../models/auth.interface';
import { RouteResponse } from '../../../models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authApiService: AuthApiService) {}

  private username: string | undefined = undefined;
  private id: number | undefined = undefined;
  private accessToken: string | undefined = undefined;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public checkAuth$ = this.authApiService.refreshToken().pipe(
    tap((value) => {
      this.setState(value);
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
        this.setState(value);
        return value;
      })
    );
  }
  public handleRegister(body: RegisterBodyProps) {
    return this.authApiService.register(body).pipe(
      tap((value) => {
        this.setState(value);
        return value;
      })
    );
  }

  private setState(value: RouteResponse<AuthRouteResponse>) {
    if (value.success) {
      this.isLoggedInSubject.next(true);
      this.username = value.data?.username;
      this.id = value.data?.id;
      this.accessToken = value.data?.accessToken;
    } else {
      this.isLoggedInSubject.next(false);
      this.username = undefined;
      this.id = undefined;
      this.accessToken = undefined;
    }
  }
}
