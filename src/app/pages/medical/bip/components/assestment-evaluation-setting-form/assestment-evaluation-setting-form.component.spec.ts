import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestmentEvaluationSettingFormComponent } from './assestment-evaluation-setting-form.component';

describe('AssestmentEvaluationSettingFormComponent', () => {
  let component: AssestmentEvaluationSettingFormComponent;
  let fixture: ComponentFixture<AssestmentEvaluationSettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssestmentEvaluationSettingFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssestmentEvaluationSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
