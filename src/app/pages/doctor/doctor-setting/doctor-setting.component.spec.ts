import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSettingComponent } from './doctor-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('DoctorSettingComponent', () => {
  let component: DoctorSettingComponent;
  let fixture: ComponentFixture<DoctorSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [DoctorSettingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
