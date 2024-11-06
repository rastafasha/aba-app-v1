import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404Component } from './error404.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [Error404Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
