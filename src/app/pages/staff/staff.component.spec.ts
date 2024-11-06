import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComponent } from './staff.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
