import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffComponent } from './edit-staff.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditStaffComponent', () => {
  let component: EditStaffComponent;
  let fixture: ComponentFixture<EditStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStaffComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
