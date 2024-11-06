import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileComponent } from './staff-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('StaffProfileComponent', () => {
  let component: StaffProfileComponent;
  let fixture: ComponentFixture<StaffProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProfileComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
