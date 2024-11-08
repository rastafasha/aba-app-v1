import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  InsuranceV2,
  NoteBcbaV2,
  NoteRbtV2,
  PatientV2,
} from 'src/app/core/models';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[appLogRender]',
  templateUrl: './log-reports-render.component.html',
  styleUrls: ['./log-reports-render.component.scss'],
})
export class LogReportsRenderComponent {
  @Input() note: NoteRbtV2 | NoteBcbaV2;
  @Input() insurances: InsuranceV2[] = [];
  @Input() patients: PatientV2[] = [];
  @Output() save = new EventEmitter<NoteRbtV2 | NoteBcbaV2>();

  routes = AppRoutes;
  hasChanges = false;

  readonly statusOptions = ['pending', 'ok'];

  onSave() {
    if (!this.hasChanges) return;
    this.save.emit(this.note);
  }
}
