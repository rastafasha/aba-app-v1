import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileComponent } from './doctor-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('DoctorProfileComponent', () => {
  let component: DoctorProfileComponent;
  let fixture: ComponentFixture<DoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [DoctorProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
