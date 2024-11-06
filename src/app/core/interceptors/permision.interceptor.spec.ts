import { TestBed } from '@angular/core/testing';

import { PermisionInterceptor } from './permision.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PermisionInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [PermisionInterceptor],
      imports: [HttpClientTestingModule],
    })
  );

  it('should be created', () => {
    const interceptor: PermisionInterceptor =
      TestBed.inject(PermisionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
