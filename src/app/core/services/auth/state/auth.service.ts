import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';
import {
  AuthRouteResponse,
  AuthStateInterface,
  LoginBodyProps,
  RegisterBodyProps,
} from '../../../models/auth.interface';
import { RouteResponse } from '../../../models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private authApiService: AuthApiService) {}

  private authStateSubject = new BehaviorSubject<AuthStateInterface | null>(
    null
  );
  public authState$ = this.authStateSubject.asObservable();

  public checkAuth$ = this.authApiService.refreshToken().pipe(
    tap((value) => {
      this.setState(value);
      return value.success;
    })
  );

  public username$ = this.authState$.pipe(map((state) => state?.username));
  public id$ = this.authState$.pipe(map((state) => state?.id));
  public accessToken$ = this.authState$.pipe(
    map((state) => state?.accessToken)
  );
  public isLoggedIn$ = this.authState$.pipe(
    map((state) => state?.isLoggedIn || false)
  );

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

  public handleLogout() {
    return this.authApiService.logout().pipe(
      tap(() => {
        this.authStateSubject.next(null);
        window.location.reload();
      })
    );
  }

  private setState(value: RouteResponse<AuthRouteResponse>) {
    if (value.success) {
      this.authStateSubject.next({
        username: value.data?.username || '',
        id: value.data?.id || -1,
        accessToken: value.data?.accessToken || '',
        isLoggedIn: true,
      });
    } else {
      this.authStateSubject.next(null);
    }
  }
}
