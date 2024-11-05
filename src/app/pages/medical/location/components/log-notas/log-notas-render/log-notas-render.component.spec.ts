import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNotasRenderComponent } from './log-notas-render.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LogNotasUnitPricePipe } from '../pipes/log-notas-unit-price.pipe';
import { LogNotasSessionTotalPipe } from '../pipes/log-notas-session-total.pipe';
import { NoteRbt } from 'src/app/shared/models/note-rbt';

xdescribe('LogNotasRenderComponent', () => {
  let component: LogNotasRenderComponent;
  let fixture: ComponentFixture<LogNotasRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LogNotasRenderComponent,
        LogNotasUnitPricePipe,
        LogNotasSessionTotalPipe,
      ],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LogNotasRenderComponent);
    component = fixture.componentInstance;
    //
    component.note = {} as NoteRbt;

    //
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
