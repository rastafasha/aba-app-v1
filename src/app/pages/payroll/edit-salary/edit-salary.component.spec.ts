import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaryComponent } from './edit-salary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditSalaryComponent', () => {
  let component: EditSalaryComponent;
  let fixture: ComponentFixture<EditSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSalaryComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
