import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationDetailsComponent } from './localization-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LocalizationDetailsComponent', () => {
  let component: LocalizationDetailsComponent;
  let fixture: ComponentFixture<LocalizationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [LocalizationDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
