import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageService } from '../storage/storage.service';
import { Auth, AuthUser } from './auth.interface';
import { AuthService } from './auth.service';
import { AUTH_CONSTS, AUTH_URLS } from './auth.const';
import { ErrorHandlerService } from '../error/error-handler.service';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storageServiceMock: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StorageService', [
      'get',
      'set',
      'remove',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        ErrorHandlerService,
        { provide: StorageService, useValue: spy },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    storageServiceMock = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserFromStorage', () => {
    it('should retrieve the user and token from storage', () => {
      const token = 'dummy-token';
      const user: AuthUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };

      storageServiceMock.get.and.callFake((key: string): any => {
        switch (key) {
          case AUTH_CONSTS.token:
            return token;
          case AUTH_CONSTS.user:
            return user;
          default:
            return null;
        }
      });

      service.getUserFromStorage();

      expect(service.token).toBe(token);
      expect(service.user).toEqual(user);
      expect(storageServiceMock.get).toHaveBeenCalledWith(AUTH_CONSTS.token);
      expect(storageServiceMock.get).toHaveBeenCalledWith(AUTH_CONSTS.user);
    });
  });

  describe('setUserToStorage', () => {
    it('should store the user and token in storage', () => {
      const auth: Auth = {
        access_token: {
          original: { access_token: 'dummy-access-token' },
        },
        user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      };

      const result = service.setUserToStorage(auth);

      expect(result).toBeTrue();
      expect(storageServiceMock.set).toHaveBeenCalledWith(
        AUTH_CONSTS.token,
        'dummy-access-token'
      );
      expect(storageServiceMock.set).toHaveBeenCalledWith(
        AUTH_CONSTS.user,
        auth.user
      );
      expect(storageServiceMock.set).toHaveBeenCalledWith(
        AUTH_CONSTS.auth,
        'true'
      );
    });

    it('should return false if auth is invalid', () => {
      const result = service.setUserToStorage(null);
      expect(result).toBeFalse();
    });
  });

  describe('login', () => {
    it('should perform login and store user data on success', () => {
      const auth: Auth = {
        access_token: {
          original: { access_token: 'dummy-access-token' },
        },
        user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      };

      service.login('john@example.com', 'password').subscribe((result) => {
        expect(result).toBeTrue();
        expect(storageServiceMock.set).toHaveBeenCalledWith(
          AUTH_CONSTS.token,
          'dummy-access-token'
        );
        expect(storageServiceMock.set).toHaveBeenCalledWith(
          AUTH_CONSTS.user,
          auth.user
        );
        expect(storageServiceMock.set).toHaveBeenCalledWith(
          AUTH_CONSTS.auth,
          'true'
        );
      });

      const req = httpMock.expectOne(AUTH_URLS.login);
      expect(req.request.method).toBe('POST');
      req.flush(auth);
    });

    it('should handle login failure and return undefined', () => {
      service.login('john@example.com', 'password').subscribe((result) => {
        expect(result).toBeUndefined();
      });

      const req = httpMock.expectOne(AUTH_URLS.login);
      expect(req.request.method).toBe('POST');
      req.flush('Login failed', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('logout', () => {
    it('should remove user and token from storage', () => {
      service.logout();
      expect(storageServiceMock.remove).toHaveBeenCalledWith(AUTH_CONSTS.token);
      expect(storageServiceMock.remove).toHaveBeenCalledWith(AUTH_CONSTS.user);
      expect(storageServiceMock.remove).toHaveBeenCalledWith(AUTH_CONSTS.token);
    });
  });

  describe('getUserRomoto', () => {
    it('should send a POST request with authorization headers', () => {
      const data = { id: 1 };

      service.getUserRomoto(data).subscribe();

      const req = httpMock.expectOne(AUTH_URLS.me);
      expect(req.request.method).toBe('POST');
    });
  });
});
