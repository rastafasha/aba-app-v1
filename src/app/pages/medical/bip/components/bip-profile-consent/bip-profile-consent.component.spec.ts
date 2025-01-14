import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileConsentComponent } from './bip-profile-consent.component';

describe('BipProfileConsentComponent', () => {
  let component: BipProfileConsentComponent;
  let fixture: ComponentFixture<BipProfileConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
