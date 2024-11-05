import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSettingsComponent } from './social-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('SocialSettingsComponent', () => {
  let component: SocialSettingsComponent;
  let fixture: ComponentFixture<SocialSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [SocialSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
