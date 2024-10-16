import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { authData } from './data/auth';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthMock {
  handleRequest(
    request: HttpRequest<unknown>
  ): Observable<HttpResponse<unknown>> {
    const url = request.url.replace(environment.url_servicios, '');
    switch (url) {
      case '/login':
        return of(new HttpResponse({ body: this.login() }));
      case '/register':
        return of(new HttpResponse({ body: this.register() }));
      case '/logout':
        return of(new HttpResponse({ body: this.logout() }));
      // Agrega más casos según sea necesario
      default:
        return of(
          new HttpResponse({ body: { error: 'Endpoint no encontrado' } })
        );
    }
  }

  private login() {
    return authData.login; // Asegúrate de que la estructura de authData sea correcta
  }

  private register() {
    // Devuelve datos simulados de registro
    return authData.register; // Asegúrate de que la estructura de authData sea correcta
  }

  private logout() {
    // Devuelve datos simulados de logout
    return { message: 'Logout exitoso' };
  }
}
