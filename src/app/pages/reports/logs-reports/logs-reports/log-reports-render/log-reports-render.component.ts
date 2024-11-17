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
  @Output() selectNote = new EventEmitter<boolean>();

  routes = AppRoutes;
  hasChanges = false;
  isSelected = false;

  readonly statusOptions = ['pending', 'ok', 'no'];
  readonly modifiers = [
    { value: 'HM', description: 'RBT', type: 'rbt', multiplier: 1 },
    {
      value: 'XE',
      description: '2 sessions same day, same provider, different POS',
      type: 'all',
      multiplier: 1,
    },
    {
      value: 'XP',
      description: 'RBT overlap Not reimbursed',
      type: 'rbt',
      multiplier: 0,
    },
    { value: 'HO', description: 'BCBA', type: 'bcba', multiplier: 1 },
    { value: 'GT', description: 'Telehealth', type: 'all', multiplier: 1 },
    { value: 'TS', description: 'Reassessment', type: 'all', multiplier: 1 },
    {
      value: '95',
      description: 'Telehealth (only AETNA)',
      type: 'all',
      multiplier: 1,
    },
  ];

  onSave() {
    if (!this.hasChanges) return;
    this.save.emit(this.note);
  }

  onSelect(event) {
    this.selectNote.emit(event);
  }
}
