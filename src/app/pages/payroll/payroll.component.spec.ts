import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponent } from './payroll.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('PayrollComponent', () => {
  let component: PayrollComponent;
  let fixture: ComponentFixture<PayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayrollComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
