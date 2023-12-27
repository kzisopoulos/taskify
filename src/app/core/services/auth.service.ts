import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { RouteResponse } from '../models/response.interface';
import {
  AuthRouteResponse,
  LoginBodyProps,
  RegisterBodyProps,
} from '../models/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private id: number | undefined = undefined;
  private username: string | undefined = undefined;

  constructor(private http: HttpClient) {}

  register(
    body: RegisterBodyProps
  ): Observable<RouteResponse<AuthRouteResponse>> {
    const registerUrl = this.url + '/register';
    return this.http.post<RouteResponse<AuthRouteResponse>>(registerUrl, body);
  }

  login(body: LoginBodyProps): Observable<RouteResponse<AuthRouteResponse>> {
    const loginUrl = this.url + '/login';
    return this.http.post<RouteResponse<AuthRouteResponse>>(loginUrl, body);
  }

  private logout(): Observable<RouteResponse<AuthRouteResponse>> {
    const logoutUrl = this.url + '/logout';
    return this.http.get<RouteResponse<AuthRouteResponse>>(logoutUrl);
  }

  private refreshToken(): Observable<RouteResponse<AuthRouteResponse>> {
    const refreshTokenUrl = this.url + '/refresh';
    return this.http.get<RouteResponse<AuthRouteResponse>>(refreshTokenUrl);
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
