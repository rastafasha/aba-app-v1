import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TangibleFormComponent } from './tangible-form.component';

describe('TangibleFormComponent', () => {
  let component: TangibleFormComponent;
  let fixture: ComponentFixture<TangibleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TangibleFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TangibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
