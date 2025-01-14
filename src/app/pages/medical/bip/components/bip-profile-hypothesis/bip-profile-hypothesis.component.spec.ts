import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileHypothesisComponent } from './bip-profile-hypothesis.component';

describe('BipProfileHypothesisComponent', () => {
  let component: BipProfileHypothesisComponent;
  let fixture: ComponentFixture<BipProfileHypothesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileHypothesisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileHypothesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
