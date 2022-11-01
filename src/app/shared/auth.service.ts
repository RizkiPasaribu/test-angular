import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-type';
import { clientId, clientSecret } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // DI http client for comunication rest api (backend and fornt end)
  constructor(private http: HttpClient) {}

  isLogin = false;

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
}
