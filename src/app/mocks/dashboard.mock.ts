import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dashboardData } from './data/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardMock {
  handleRequest(
    request: HttpRequest<unknown>
  ): Observable<HttpResponse<unknown>> {
    const url = request.url.replace(
      environment.url_servicios + '/dashboard',
      ''
    );
    switch (url) {
      case '/admin':
        return of(new HttpResponse({ body: this.admin() }));
      case '/admin-year':
        return of(new HttpResponse({ body: this.adminYear() }));
      default:
        return of(
          new HttpResponse({
            body: { error: 'Endpoint no encontrado', endpoint: url },
          })
        );
    }
  }

  private admin() {
    return dashboardData.admin;
  }
  private adminYear() {
    return dashboardData.adminYear;
  }
}
