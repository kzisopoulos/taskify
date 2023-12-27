import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { RouteResponse } from '../models/response.interface';
import {
  AuthRouteResponse,
  LoginBodyProps,
  RegisterBodyProps,
} from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private id: number | undefined = undefined;
  private username: string | undefined = undefined;

  constructor(private http: HttpClient) {}

  register(
    body: RegisterBodyProps
  ): Observable<RouteResponse<AuthRouteResponse>> {
    return this.http.post<RouteResponse<AuthRouteResponse>>(
      'http://localhost:3001/api/register',
      body
    );
  }

  login(body: LoginBodyProps): Observable<RouteResponse<AuthRouteResponse>> {
    return this.http.post<RouteResponse<AuthRouteResponse>>(
      'http://localhost:3001/api/login',
      body
    );
  }

  private logout(): Observable<RouteResponse<AuthRouteResponse>> {
    return this.http.get<RouteResponse<AuthRouteResponse>>(
      'http://localhost:3001/api/logout'
    );
  }

  private refreshToken(): Observable<RouteResponse<AuthRouteResponse>> {
    return this.http.get<RouteResponse<AuthRouteResponse>>(
      'http://localhost:3001/api/refresh'
    );
  }

  checkAuth(): Observable<boolean> {
    return this.refreshToken().pipe(
      map((res) => {
        this.setState(res);
        return res.success;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  setState(res: RouteResponse<AuthRouteResponse>) {
    this.isLoggedInSubject.next(true);
    this.id = res.data?.id;
    this.username = res.data?.username;
  }

  currentAuthStatus() {
    return this.isLoggedInSubject.getValue();
  }

  getUsername() {
    return this.username;
  }

  getUserId() {
    return this.id;
  }

  logoutUser() {
    this.logout().subscribe(() => location.reload());
  }
}
