import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNotasSearchComponent } from './log-notas-search.component';

fdescribe('LogNotasSearchComponent', () => {
  let component: LogNotasSearchComponent;
  let fixture: ComponentFixture<LogNotasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogNotasSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogNotasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
