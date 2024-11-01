import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNotasTotalComponent } from './log-notas-total.component';

describe('LogNotasTotalComponent', () => {
  let component: LogNotasTotalComponent;
  let fixture: ComponentFixture<LogNotasTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogNotasTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogNotasTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
