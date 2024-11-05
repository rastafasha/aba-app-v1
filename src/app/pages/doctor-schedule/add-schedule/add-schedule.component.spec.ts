import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleComponent } from './add-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddScheduleComponent', () => {
  let component: AddScheduleComponent;
  let fixture: ComponentFixture<AddScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddScheduleComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
