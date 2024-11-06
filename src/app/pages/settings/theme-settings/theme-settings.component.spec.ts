import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSettingsComponent } from './theme-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThemeSettingsComponent', () => {
  let component: ThemeSettingsComponent;
  let fixture: ComponentFixture<ThemeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [ThemeSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
