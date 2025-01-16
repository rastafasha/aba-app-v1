import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbtTrainingGoalFormComponent } from './rbt-training-goal-form.component';

describe('RbtTrainingGoalFormComponent', () => {
  let component: RbtTrainingGoalFormComponent;
  let fixture: ComponentFixture<RbtTrainingGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbtTrainingGoalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbtTrainingGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
