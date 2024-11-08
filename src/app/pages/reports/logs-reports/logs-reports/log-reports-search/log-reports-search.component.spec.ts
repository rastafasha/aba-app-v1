import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogReportsSearchComponent } from './log-reports-search.component';

describe('LogReportsSearchComponent', () => {
  let component: LogReportsSearchComponent;
  let fixture: ComponentFixture<LogReportsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogReportsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogReportsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
