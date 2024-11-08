import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogReportsRenderComponent } from './log-reports-render.component';

describe('LogReportsRenderComponent', () => {
  let component: LogReportsRenderComponent;
  let fixture: ComponentFixture<LogReportsRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogReportsRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogReportsRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
