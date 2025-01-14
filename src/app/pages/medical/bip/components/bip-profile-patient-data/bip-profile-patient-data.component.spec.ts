import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfilePatientDataComponent } from './bip-profile-patient-data.component';

describe('BipProfilePatientDataComponent', () => {
  let component: BipProfilePatientDataComponent;
  let fixture: ComponentFixture<BipProfilePatientDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfilePatientDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfilePatientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
