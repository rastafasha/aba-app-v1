import { ReportByClientComponent } from '../../medical/client-report/report-by-client/report-by-client.component';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { GetPrizeCptNotePipe } from './prize-cpt.pipe';

fdescribe('GetPrizeCptNotePipe', () => {
  let pipe: GetPrizeCptNotePipe;
  let mockReportByClientComponent: jasmine.SpyObj<ReportByClientComponent>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ReportByClientComponent', [
      'getPrizeCptNote',
    ]);

    TestBed.configureTestingModule({
      providers: [
        GetPrizeCptNotePipe,
        { provide: ReportByClientComponent, useValue: spy },
      ],
    });

    pipe = TestBed.inject(GetPrizeCptNotePipe);
    mockReportByClientComponent = TestBed.inject(
      ReportByClientComponent
    ) as jasmine.SpyObj<ReportByClientComponent>;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null when cptCode is not provided', () => {
    const result = pipe.transform('', 'RBT');
    expect(result).toBeNull();
  });

  it('should return general price for a CPT code', (done) => {
    const cptCode = '12345';
    pipe.transform(cptCode)?.subscribe((result) => {
      expect(result).toBe(`Precio para el código ${cptCode}`);
      done();
    });
  });

  it('should return the RBT price for a CPT code', (done) => {
    const cptCode = '12345';
    const mockResponse = [{ unit_prize: 100 }, { unit_prize: 150 }];

    mockReportByClientComponent.getPrizeCptNote.and.returnValue(
      of(mockResponse)
    );
    mockReportByClientComponent.insurer_name = 'Insurer A';
    mockReportByClientComponent.noteRbt = { cpt_code: 'RBT_CODE' };
    mockReportByClientComponent.provider = 'Provider A';

    pipe.transform(cptCode, 'RBT')?.subscribe((result) => {
      expect(result).toBe('150');
      done();
    });
  });

  it('should return the BCBA price for a CPT code', (done) => {
    const cptCode = '12345';
    const mockResponse = [{ unit_prize: 200 }, { unit_prize: 150 }];

    mockReportByClientComponent.getPrizeCptNote.and.returnValue(
      of(mockResponse)
    );
    mockReportByClientComponent.insurer_name = 'Insurer B';
    mockReportByClientComponent.noteRbt = { cpt_code: 'BCBA_CODE' };
    mockReportByClientComponent.provider = 'Provider B';

    pipe.transform(cptCode, 'BCBA')?.subscribe((result) => {
      expect(result).toBe('200');
      done();
    });
  });
});
