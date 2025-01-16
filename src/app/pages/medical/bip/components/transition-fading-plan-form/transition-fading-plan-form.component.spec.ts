import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionFadingPlanFormComponent } from './transition-fading-plan-form.component';

describe('TransitionFadingPlanFormComponent', () => {
  let component: TransitionFadingPlanFormComponent;
  let fixture: ComponentFixture<TransitionFadingPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionFadingPlanFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitionFadingPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
