import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileMaladaptivesComponent } from './bip-profile-maladaptives.component';

describe('BipProfileMaladaptivesComponent', () => {
  let component: BipProfileMaladaptivesComponent;
  let fixture: ComponentFixture<BipProfileMaladaptivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileMaladaptivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileMaladaptivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
