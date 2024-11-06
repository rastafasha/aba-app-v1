import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error500Component } from './error500.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('Error500Component', () => {
  let component: Error500Component;
  let fixture: ComponentFixture<Error500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [Error500Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Error500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
