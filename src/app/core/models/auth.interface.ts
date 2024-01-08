export interface AuthRouteResponse {
  id: number;
  username: string;
  accessToken: string;
}

export interface RegisterBodyProps {
  username: string;
  email: string;
  password: string;
}

export interface LoginBodyProps {
  username: string;
  password: string;
}

export interface AuthStateInterface {
  username: string;
  id: number;
  accessToken: string;
  isLoggedIn: boolean;
}
