import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartReplacementComponent } from './chart-replacement.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ChartReplacementComponent', () => {
  let component: ChartReplacementComponent;
  let fixture: ComponentFixture<ChartReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartReplacementComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
