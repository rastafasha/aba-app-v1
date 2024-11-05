import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSettingsComponent } from './payment-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('PaymentSettingsComponent', () => {
  let component: PaymentSettingsComponent;
  let fixture: ComponentFixture<PaymentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [PaymentSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
