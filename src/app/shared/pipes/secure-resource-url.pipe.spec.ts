import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SecureResourceUrlPipe } from './secure-resource-url.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('SecureResourceUrlPipe', () => {
  let pipe: SecureResourceUrlPipe;
  let sanitizer: DomSanitizer;
  const url = 'https://www.example.com/test.pdf';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => 'safeString',
            bypassSecurityTrustHtml: () => 'safeString',
          },
        },
        SecureResourceUrlPipe,
      ],
    });
  });

  beforeEach(() => {
    pipe = TestBed.inject(SecureResourceUrlPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('debería transformar un recurso seguro', () => {
    const headers = new HttpHeaders({ Accept: 'application/pdf' });
    const result$ = pipe
      .transform(url)
      .subscribe((result) =>
        expect(result).toEqual(sanitizer.bypassSecurityTrustResourceUrl(url))
      );
  });
});