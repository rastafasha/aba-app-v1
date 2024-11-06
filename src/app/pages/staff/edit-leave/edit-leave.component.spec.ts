import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveComponent } from './edit-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditLeaveComponent', () => {
  let component: EditLeaveComponent;
  let fixture: ComponentFixture<EditLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLeaveComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
