import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralizationTrainingFormComponent } from './generalization-training-form.component';

describe('GeneralizationTrainingFormComponent', () => {
  let component: GeneralizationTrainingFormComponent;
  let fixture: ComponentFixture<GeneralizationTrainingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralizationTrainingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralizationTrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
