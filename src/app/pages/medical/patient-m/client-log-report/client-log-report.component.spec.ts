import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLogReportComponent } from './client-log-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('ClientLogReportComponent', () => {
  let component: ClientLogReportComponent;
  let fixture: ComponentFixture<ClientLogReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLogReportComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
