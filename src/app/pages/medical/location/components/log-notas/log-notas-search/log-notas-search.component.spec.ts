import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNotasSearchComponent } from './log-notas-search.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogNotasSearchComponent', () => {
  let component: LogNotasSearchComponent;
  let fixture: ComponentFixture<LogNotasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogNotasSearchComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LogNotasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
