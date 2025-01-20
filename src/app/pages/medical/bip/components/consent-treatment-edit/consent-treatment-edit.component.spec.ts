import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentTreatmentEditComponent } from './consent-treatment-edit.component';

describe('ConsentTreatmentEditComponent', () => {
  let component: ConsentTreatmentEditComponent;
  let fixture: ComponentFixture<ConsentTreatmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentTreatmentEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentTreatmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
