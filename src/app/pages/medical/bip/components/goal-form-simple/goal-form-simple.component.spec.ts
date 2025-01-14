import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalFormSimpleComponent } from './goal-form-simple.component';

describe('GoalFormSimpleComponent', () => {
  let component: GoalFormSimpleComponent;
  let fixture: ComponentFixture<GoalFormSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalFormSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalFormSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
