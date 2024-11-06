import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHolidayComponent } from './staff-holiday.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffHolidayComponent', () => {
  let component: StaffHolidayComponent;
  let fixture: ComponentFixture<StaffHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffHolidayComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
