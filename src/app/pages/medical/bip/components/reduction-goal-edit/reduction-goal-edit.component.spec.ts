import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionGoalEditComponent } from './reduction-goal-edit.component';

describe('ReductionGoalEditComponent', () => {
  let component: ReductionGoalEditComponent;
  let fixture: ComponentFixture<ReductionGoalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReductionGoalEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReductionGoalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
