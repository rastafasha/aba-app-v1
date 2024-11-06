import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorComponent } from './add-doctor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddDoctorComponent', () => {
  let component: AddDoctorComponent;
  let fixture: ComponentFixture<AddDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [AddDoctorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
