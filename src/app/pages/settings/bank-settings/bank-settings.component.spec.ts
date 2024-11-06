import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSettingsComponent } from './bank-settings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('BankSettingsComponent', () => {
  let component: BankSettingsComponent;
  let fixture: ComponentFixture<BankSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [BankSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BankSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
