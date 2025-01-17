import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReviewedFormComponent } from './document-reviewed-form.component';

describe('DocumentReviewedFormComponent', () => {
  let component: DocumentReviewedFormComponent;
  let fixture: ComponentFixture<DocumentReviewedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentReviewedFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentReviewedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
