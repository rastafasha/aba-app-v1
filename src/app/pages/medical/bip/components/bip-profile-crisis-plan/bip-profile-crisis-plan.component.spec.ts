import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileCrisisPlanComponent } from './bip-profile-crisis-plan.component';

describe('BipProfileCrisisPlanComponent', () => {
  let component: BipProfileCrisisPlanComponent;
  let fixture: ComponentFixture<BipProfileCrisisPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileCrisisPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileCrisisPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
