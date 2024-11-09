import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogReportsSummaryComponent } from './log-reports-summary.component';

describe('LogReportsSummaryComponent', () => {
  let component: LogReportsSummaryComponent;
  let fixture: ComponentFixture<LogReportsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogReportsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogReportsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
