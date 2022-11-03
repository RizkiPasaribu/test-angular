import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthResponse, ProfileMe } from './auth-type';
import { clientId, clientSecret } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // DI http client for comunication rest api (backend and fornt end)
  constructor(private http: HttpClient) {}

  //user login
  isLogin = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(payload: {
    username?: string | null;
    password?: string | null;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://dev.xtend.my.id/oauth', {
      username: payload.username,
      password: payload.password,
      grant_type: 'password',
      client_id: clientId,
      client_secret: clientSecret,
    });
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get<ProfileMe>('https://dev.xtend.my.id/api/me', {
      headers,
    });
  }
}
