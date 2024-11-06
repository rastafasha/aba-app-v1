import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryComponent } from './salary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SalaryComponent', () => {
  let component: SalaryComponent;
  let fixture: ComponentFixture<SalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
