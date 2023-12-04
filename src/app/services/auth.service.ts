import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

interface RouteResponse<T> {
  success: boolean;
  code: number;
  message: string;
  error: string | null;
  data: T | null;
}
interface AuthRouteResponse {
  id: number;
  username: string;
  accessToken: string;
}

interface RegisterBodyProps {
  username: string;
  email: string;
  password: string;
}

interface LoginBodyProps {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private id: number | undefined = undefined;
  private username: string | undefined = undefined;
  private accessToken: string | undefined = undefined;

  constructor(private http: HttpClient, private router: Router) {}

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

  logout(): Observable<RouteResponse<AuthRouteResponse>> {
    return this.http.get<RouteResponse<AuthRouteResponse>>(
      'http://localhost:3001/api/logout'
    );
  }

  refreshToken(): Observable<RouteResponse<AuthRouteResponse>> {
    return this.http.get<RouteResponse<AuthRouteResponse>>(
      'http://localhost:3001/api/refresh'
    );
  }

  checkAuth(): Observable<boolean> {
    return this.refreshToken().pipe(
      map((res) => {
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
    this.accessToken = res.data?.accessToken;
  }
}
