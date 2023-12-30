import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthRouteResponse,
  LoginBodyProps,
  RegisterBodyProps,
} from '../../../models/auth.interface';
import { Observable } from 'rxjs';
import { RouteResponse } from '../../../models/response.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  private url = environment.apiUrl;

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

  logout(): Observable<RouteResponse<AuthRouteResponse>> {
    const logoutUrl = this.url + '/logout';
    return this.http.get<RouteResponse<AuthRouteResponse>>(logoutUrl);
  }

  refreshToken(): Observable<RouteResponse<AuthRouteResponse>> {
    const refreshTokenUrl = this.url + '/refresh';
    return this.http.get<RouteResponse<AuthRouteResponse>>(refreshTokenUrl);
  }
}
