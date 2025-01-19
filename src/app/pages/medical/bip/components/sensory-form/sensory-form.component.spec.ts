import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoryFormComponent } from './sensory-form.component';

describe('SensoryFormComponent', () => {
  let component: SensoryFormComponent;
  let fixture: ComponentFixture<SensoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SensoryFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
