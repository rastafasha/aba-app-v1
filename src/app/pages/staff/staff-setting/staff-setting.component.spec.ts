import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSettingComponent } from './staff-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('StaffSettingComponent', () => {
  let component: StaffSettingComponent;
  let fixture: ComponentFixture<StaffSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffSettingComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
