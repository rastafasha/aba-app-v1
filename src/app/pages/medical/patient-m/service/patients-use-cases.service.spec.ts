import { TestBed } from '@angular/core/testing';

import { PatientsUseCasesService } from './patients-use-cases.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PatientsUseCasesService', () => {
  let service: PatientsUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PatientsUseCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
