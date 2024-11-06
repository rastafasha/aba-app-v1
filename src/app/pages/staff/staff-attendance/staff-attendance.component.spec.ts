import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceComponent } from './staff-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('StaffAttendanceComponent', () => {
  let component: StaffAttendanceComponent;
  let fixture: ComponentFixture<StaffAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffAttendanceComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
