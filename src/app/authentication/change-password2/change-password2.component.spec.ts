import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassword2Component } from './change-password2.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ChangePassword2Component', () => {
  let component: ChangePassword2Component;
  let fixture: ComponentFixture<ChangePassword2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePassword2Component],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePassword2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
