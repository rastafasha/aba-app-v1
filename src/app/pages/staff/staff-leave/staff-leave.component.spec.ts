import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLeaveComponent } from './staff-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffLeaveComponent', () => {
  let component: StaffLeaveComponent;
  let fixture: ComponentFixture<StaffLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffLeaveComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
