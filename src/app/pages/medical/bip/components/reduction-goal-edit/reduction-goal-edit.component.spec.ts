import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionGoalEditComponent } from './reduction-goal-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

xdescribe('ReductionGoalEditComponent', () => {
  let component: ReductionGoalEditComponent;
  let fixture: ComponentFixture<ReductionGoalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReductionGoalEditComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ReductionGoalEditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
