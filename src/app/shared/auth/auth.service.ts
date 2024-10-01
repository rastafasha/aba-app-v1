import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ErrorHandlerService } from '../error/error-handler.service';
import { StorageService } from '../storage/storage.service';
import { AUTH_CONSTS, AUTH_URLS } from './auth.const';
import { Auth, AuthUser } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: AuthUser;
  token: string;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private errorHandler: ErrorHandlerService
  ) {
    this.initializeUserSession();
  }
  initializeUserSession() {
    this.getUserFromStorage();
    if (!this.user) {
      this.logout();
    }
  }

  getUserFromStorage() {
    this.token = this.storage.get<string>(AUTH_CONSTS.token);
    this.user = this.storage.get<AuthUser>(AUTH_CONSTS.user);
  }

  setUserToStorage(auth: Auth): boolean {
    if (!auth?.access_token) {
      return false;
    }
    this.storage.set(
      AUTH_CONSTS.token,
      auth.access_token.original.access_token
    );
    this.storage.set(AUTH_CONSTS.user, auth.user);
    this.storage.set(AUTH_CONSTS.auth, 'true');
    return true;
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(AUTH_URLS.login, { email, password }).pipe(
      map((auth) => {
        return this.setUserToStorage(auth);
      }),
      catchError((error: HttpErrorResponse) => {
        try {
          this.errorHandler.handleError(error);
        } catch (error) {
          //
        }
        return of(undefined);
      })
    );
  }

  logout() {
    this.storage.remove(AUTH_CONSTS.token);
    this.storage.remove(AUTH_CONSTS.user);
    this.storage.remove(AUTH_CONSTS.auth);
    // TODO: se usa?
    this.storage.remove(AUTH_CONSTS.authToken);
  }

  getUserRomoto<T>(data: unknown) {
    return this.http.post<T>(AUTH_URLS.me, data);
  }

  isAuthenticated(): boolean {
    return !!this.storage.get<string>(AUTH_CONSTS.token);
  }
}
