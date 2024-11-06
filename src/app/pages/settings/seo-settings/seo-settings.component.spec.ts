import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoSettingsComponent } from './seo-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('SeoSettingsComponent', () => {
  let component: SeoSettingsComponent;
  let fixture: ComponentFixture<SeoSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [SeoSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
