import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PermisionInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401 || e.status === 403 || e.status === 423) {
          this.authService.logout();
          this.router.navigate([AppRoutes.auth.login]);
        }
        return throwError(() => e);
      })
    );
  }
}
