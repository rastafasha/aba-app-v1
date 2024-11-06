import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleComponent } from './doctor-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('DoctorScheduleComponent', () => {
  let component: DoctorScheduleComponent;
  let fixture: ComponentFixture<DoctorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorScheduleComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
