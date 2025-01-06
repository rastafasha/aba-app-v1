import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorAnalysisAssessmentComponent } from './behavior-analysis-assessment.component';

describe('BehaviorAnalysisAssessmentComponent', () => {
  let component: BehaviorAnalysisAssessmentComponent;
  let fixture: ComponentFixture<BehaviorAnalysisAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviorAnalysisAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorAnalysisAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
