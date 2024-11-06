import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNotasTotalComponent } from './log-notas-total.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogNotasTotalComponent', () => {
  let component: LogNotasTotalComponent;
  let fixture: ComponentFixture<LogNotasTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogNotasTotalComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LogNotasTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
