import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEditComponent } from './plan-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

xdescribe('ReductionGoalEditComponent', () => {
  let component: PlanEditComponent;
  let fixture: ComponentFixture<PlanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanEditComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanEditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
