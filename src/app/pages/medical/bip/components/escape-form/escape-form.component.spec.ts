import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscapeFormComponent } from './escape-form.component';

describe('EscapeFormComponent', () => {
  let component: EscapeFormComponent;
  let fixture: ComponentFixture<EscapeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EscapeFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscapeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
