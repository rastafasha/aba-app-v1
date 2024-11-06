import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryViewComponent } from './salary-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('SalaryViewComponent', () => {
  let component: SalaryViewComponent;
  let fixture: ComponentFixture<SalaryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryViewComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
