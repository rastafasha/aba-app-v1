import { TestBed } from '@angular/core/testing';

import { LogReportsUseCasesService } from './log-reports-use-cases.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogReportsUseCasesService', () => {
  let service: LogReportsUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LogReportsUseCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
