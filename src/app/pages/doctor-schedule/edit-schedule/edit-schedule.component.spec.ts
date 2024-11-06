import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduleComponent } from './edit-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditScheduleComponent', () => {
  let component: EditScheduleComponent;
  let fixture: ComponentFixture<EditScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditScheduleComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
