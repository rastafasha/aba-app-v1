import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSettingsComponent } from './email-settings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('EmailSettingsComponent', () => {
  let component: EmailSettingsComponent;
  let fixture: ComponentFixture<EmailSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [EmailSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
