import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevalentSettingEventAndAntecedentComponent } from './prevalent-setting-event-and-antecedent.component';

describe('PrevalentSettingEventAndAntecedentComponent', () => {
  let component: PrevalentSettingEventAndAntecedentComponent;
  let fixture: ComponentFixture<PrevalentSettingEventAndAntecedentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrevalentSettingEventAndAntecedentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      PrevalentSettingEventAndAntecedentComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
