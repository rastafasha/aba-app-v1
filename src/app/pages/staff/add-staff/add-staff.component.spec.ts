import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffComponent } from './add-staff.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddStaffComponent', () => {
  let component: AddStaffComponent;
  let fixture: ComponentFixture<AddStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStaffComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
