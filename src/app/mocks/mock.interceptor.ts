import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthMock } from './auth.mock';

@Injectable({
  providedIn: 'root',
})
export class MockInterceptor implements HttpInterceptor {
  constructor(private authMock: AuthMock) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!environment.mock) {
      return next.handle(request);
    }
    const url = request.url.replace(environment.url_servicios, '');
    const urlSegments = url.split('/');
    const resource = urlSegments[1]; // Obtiene el primer segmento de la URL

    switch (resource) {
      case 'login':
        return this.authMock.handleRequest(url);
      case 'me':
        return this.authMock.handleRequest(url);
      default:
        return next.handle(request);
    }
  }
}
