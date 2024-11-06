import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryComponent } from './add-salary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddSalaryComponent', () => {
  let component: AddSalaryComponent;
  let fixture: ComponentFixture<AddSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSalaryComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
