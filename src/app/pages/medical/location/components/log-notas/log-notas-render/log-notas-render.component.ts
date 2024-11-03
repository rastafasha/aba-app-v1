import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NoteBcba, NoteRbt } from 'src/app/shared/models/notes.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import {
  LocationInsurance,
  LocationPatient,
} from '../../../models/locations.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[appNotasRender]',
  templateUrl: './log-notas-render.component.html',
  styleUrls: ['./log-notas-render.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LogNotasRenderComponent {
  @Input() note: NoteRbt | NoteBcba = null;
  @Input() insurances: LocationInsurance[] = [];
  @Input() patients: LocationPatient[] = [];
  @Input() unitPrice = 10;
  @Output() statusChange = new EventEmitter<NoteRbt | NoteBcba>();
  @Output() save = new EventEmitter<NoteRbt | NoteBcba>();
  routes = AppRoutes;

  readonly statusOptions = ['pending', 'ok'];
  readonly modifiers = [
    { value: 'HM', description: 'RBT', porcent: 0.9 },
    {
      value: 'XE',
      description: '2 sessions same day, same provider, different POS',
      porcent: 0.5,
    },
    { value: 'XP', description: 'RBT overlap Not reimbursed', porcent: 0 },
    { value: 'HO', description: 'BCBA', porcent: 0.3 },
    { value: 'GT', description: 'Telehealth', porcent: 0.2 },
    { value: 'TS', description: 'Reassessment', porcent: 0.1 },
    { value: '95', description: 'Telehealth (only AETNA)', porcent: 0.3 },
  ];

  onStatusChange(): void {
    this.statusChange.emit(this.note);
  }
  isSelectedModifier(): void {
    //
  }
  isSelectedModifier2(): void {
    //
  }

  isCheckedBilled() {
    //
  }
  isCheckedPay() {
    //
  }

  onSave() {
    this.save.emit(this.note);
  }
}
