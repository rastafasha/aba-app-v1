import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorAnalysisAssessmentFormComponent } from './behavior-analysis-assessment-form.component';

describe('BehaviorAnalysisAssessmentFormComponent', () => {
  let component: BehaviorAnalysisAssessmentFormComponent;
  let fixture: ComponentFixture<BehaviorAnalysisAssessmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviorAnalysisAssessmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorAnalysisAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
