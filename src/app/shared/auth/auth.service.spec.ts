import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { url_servicios } from 'src/app/config/config';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocalStorage', () => {
    it('should get user and token from localStorage', () => {
      spyOn(localStorage, 'getItem').and.callFake((key) => {
        if (key === 'token') return 'mockToken';
        if (key === 'user') return JSON.stringify({ id: 1, name: 'testUser' });
        return null;
      });
      service.getLocalStorage();
      expect(service.user).toEqual({ id: 1, name: 'testUser' });
    });

    it('should set user to null if no user or token in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      service.getLocalStorage();
      expect(service.user).toBeNull();
    });
  });

  describe('saveLocalStorage', () => {
    it('should save token and user in localStorage', () => {
      const auth = {
        access_token: { original: { access_token: 'mockAccessToken' } },
        user: { id: 1, name: 'testUser' },
      };
      spyOn(localStorage, 'setItem');
      const result = service.saveLocalStorage(auth);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'token',
        'mockAccessToken'
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(auth.user)
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'authenticated',
        'true'
      );
      expect(result).toBeTrue();
    });

    it('should return false if auth or access_token is invalid', () => {
      const auth = null;
      const result = service.saveLocalStorage(auth);
      expect(result).toBeFalse();
    });
  });

  describe('login', () => {
    it('should perform a login and save data in localStorage', () => {
      const mockResponse = {
        access_token: { original: { access_token: 'mockToken' } },
        user: { id: 1, name: 'testUser' },
      };
      spyOn(service, 'saveLocalStorage').and.returnValue(true);

      service.login('test@test.com', 'password').subscribe((result) => {
        expect(result).toBeTrue();
      });

      const req = httpMock.expectOne(`${url_servicios}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle login error and return undefined', () => {
      service.login('test@test.com', 'password').subscribe((result) => {
        expect(result).toBeUndefined();
      });

      const req = httpMock.expectOne(`${url_servicios}/login`);
      req.flush(
        { error: 'Invalid credentials' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('getUserRomoto', () => {
    it('should make an HTTP POST request with headers', () => {
      const mockData = { someData: 'test' };
      const mockResponse = { id: 1, name: 'testUser' };
      service.token = 'mockToken';

      service.getUserRomoto(mockData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${url_servicios}/me`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should clear localStorage and navigate to login', () => {
      spyOn(localStorage, 'removeItem');

      service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(localStorage.removeItem).toHaveBeenCalledWith('authenticated');
      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  });

  describe('getLocalDarkMode', () => {
    it('should apply dark mode if localStorage has darkmode enabled', (done) => {
      spyOn(localStorage, 'getItem').and.returnValue('true');
      const bodyClassSpy = spyOn(document.body.classList, 'add');

      service.getLocalDarkMode();

      setTimeout(() => {
        expect(bodyClassSpy).toHaveBeenCalledWith('darkmode');
        done();
      }, 500);
    });
  });
});
