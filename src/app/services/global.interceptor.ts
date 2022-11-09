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
    const globalReq = request.clone({
      headers: request.headers.set(
        `Authorization`,
        `Bearer ${localStorage.getItem('access_token')}`
      ),
    });
    return next.handle(globalReq);
  }
}
