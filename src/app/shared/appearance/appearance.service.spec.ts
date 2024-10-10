import { TestBed } from '@angular/core/testing';
import { AppearanceService } from './appearance.service';
import { StorageService } from '../storage/storage.service';
import { DARMODE_TOKEN } from './appearance.conts';

describe('AppearanceService', () => {
  let service: AppearanceService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StorageService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        AppearanceService,
        { provide: StorageService, useValue: spy },
      ],
    });

    service = TestBed.inject(AppearanceService);
    storageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  it('should add dark mode class to the body when dark mode is enabled', (done) => {
    // Mock the storage service to return a truthy value for dark mode
    storageServiceSpy.get.and.returnValue(true);

    // Call the method
    service.getLocalDarkMode();

    // Wait for the setTimeout to complete
    setTimeout(() => {
      expect(document.body.classList.contains(DARMODE_TOKEN)).toBeTrue();
      done();
    }, 500);
  });

  it('should not add dark mode class to the body when dark mode is not enabled', (done) => {
    // Mock the storage service to return falsy value for dark mode
    storageServiceSpy.get.and.returnValue(null);

    // Call the method
    service.getLocalDarkMode();

    // Wait for the setTimeout to complete
    setTimeout(() => {
      expect(document.body.classList.contains(DARMODE_TOKEN)).toBeFalse();
      done();
    }, 500);
  });
});
