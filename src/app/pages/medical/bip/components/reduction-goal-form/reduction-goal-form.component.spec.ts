import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionGoalFormComponent } from './reduction-goal-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReductionGoalFormComponent', () => {
  let component: ReductionGoalFormComponent;
  let fixture: ComponentFixture<ReductionGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReductionGoalFormComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ReductionGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
