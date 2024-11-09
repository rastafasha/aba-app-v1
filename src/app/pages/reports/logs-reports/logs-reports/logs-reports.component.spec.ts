import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsReportsComponent } from './logs-reports.component';

describe('LogsReportsComponent', () => {
  let component: LogsReportsComponent;
  let fixture: ComponentFixture<LogsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
