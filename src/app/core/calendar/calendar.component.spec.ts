import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [CalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
