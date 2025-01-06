import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisBasedInterventionsComponent } from './hypothesis-based-interventions.component';

describe('HypothesisBasedInterventionsComponent', () => {
  let component: HypothesisBasedInterventionsComponent;
  let fixture: ComponentFixture<HypothesisBasedInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HypothesisBasedInterventionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HypothesisBasedInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
