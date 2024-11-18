import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogReportsDownloadComponent } from './log-reports-download.component';

describe('LogReportsDownloadComponent', () => {
  let component: LogReportsDownloadComponent;
  let fixture: ComponentFixture<LogReportsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogReportsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogReportsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
