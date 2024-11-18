import { TestBed } from '@angular/core/testing';

import { LoginUseCasesService } from './login-use-cases.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginUseCasesService', () => {
  let service: LoginUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    });
    service = TestBed.inject(LoginUseCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
