import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReportsComponent } from './invoice-reports.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InvoiceReportsComponent', () => {
  let component: InvoiceReportsComponent;
  let fixture: ComponentFixture<InvoiceReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceReportsComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
