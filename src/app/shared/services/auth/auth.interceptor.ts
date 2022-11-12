import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // cara pertama
    const url = 'https://dev.xtend.my.id';
    let params = request.urlWithParams.replace(url, '');

    if (params == '/api/v1/authrevoke') {
      return next.handle(
        request.clone({
          headers: request.headers.set('Content-Type', 'application/json'),
        })
      );
    }

    return next.handle(
      request.clone({
        headers: request.headers.set(
          `Authorization`,
          `Bearer ${localStorage.getItem('access_token')}`
        ),
      })
    );
  }
}
