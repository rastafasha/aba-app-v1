import { TestBed } from '@angular/core/testing';

import { LogReportsUseCasesService } from './log-reports-use-cases.service';

describe('LogReportsUseCasesService', () => {
  let service: LogReportsUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogReportsUseCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
