import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReportComponent } from './employee-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('EmployeeReportComponent', () => {
  let component: EmployeeReportComponent;
  let fixture: ComponentFixture<EmployeeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeReportComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
