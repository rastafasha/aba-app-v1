import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringEvaluatingEditComponent } from './monitoring-evaluating-edit.component';

describe('MonitoringEvaluatingEditComponent', () => {
  let component: MonitoringEvaluatingEditComponent;
  let fixture: ComponentFixture<MonitoringEvaluatingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringEvaluatingEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringEvaluatingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
