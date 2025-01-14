import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileInterventionsComponent } from './bip-profile-interventions.component';

describe('BipProfileInterventionsComponent', () => {
  let component: BipProfileInterventionsComponent;
  let fixture: ComponentFixture<BipProfileInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileInterventionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
