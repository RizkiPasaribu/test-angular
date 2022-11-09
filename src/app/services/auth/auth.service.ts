import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse, ProfileMe } from './auth-type';
import { clientId, clientSecret } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // DI http client for comunication rest api (backend and fornt end)
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  //user login
  isLogin = false;

  login(payload: {
    username?: string | null;
    password?: string | null;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://dev.xtend.my.id/oauth',
      {
        username: payload.username,
        password: payload.password,
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
      },
      this.httpOptions
    );
  }

  logout(): Observable<{ revoked: boolean }> {
    return this.http.post<{ revoked: true }>(
      'https://dev.xtend.my.id/api/v1/authrevoke',
      JSON.stringify({
        token_type_hint: 'access_token',
        token: localStorage.getItem('access_token'),
      }),
      this.httpOptions
    );
  }

  getMe(): Observable<ProfileMe> {
    return this.http.get<ProfileMe>('https://dev.xtend.my.id/api/me');
  }
}
