import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from '../../shared/routes/routes';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
    const authenticated = this.auth.isAuthenticated();
    if (!authenticated)
      return this.router.navigate([AppRoutes.auth.login]).then(() => false);
    return authenticated;
  }
}
