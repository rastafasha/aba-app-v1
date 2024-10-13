import { TestBed } from '@angular/core/testing';

import { PermisionInterceptor } from './permision.interceptor';

fdescribe('PermisionInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [PermisionInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: PermisionInterceptor =
      TestBed.inject(PermisionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
