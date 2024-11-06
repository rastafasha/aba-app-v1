import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveComponent } from './add-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddLeaveComponent', () => {
  let component: AddLeaveComponent;
  let fixture: ComponentFixture<AddLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLeaveComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
