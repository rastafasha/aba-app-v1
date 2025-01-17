import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhisicalAndMedicalComponent } from './phisical_and_medical.component';

describe('PhisicalAndMedicalComponent', () => {
  let component: PhisicalAndMedicalComponent;
  let fixture: ComponentFixture<PhisicalAndMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhisicalAndMedicalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhisicalAndMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
