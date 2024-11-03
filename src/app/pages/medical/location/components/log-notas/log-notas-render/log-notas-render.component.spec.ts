import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNotasRenderComponent } from './log-notas-render.component';

describe('LogNotasRenderComponent', () => {
  let component: LogNotasRenderComponent;
  let fixture: ComponentFixture<LogNotasRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogNotasRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogNotasRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
