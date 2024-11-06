import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersSettingsComponent } from './others-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('OthersSettingsComponent', () => {
  let component: OthersSettingsComponent;
  let fixture: ComponentFixture<OthersSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [OthersSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OthersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
