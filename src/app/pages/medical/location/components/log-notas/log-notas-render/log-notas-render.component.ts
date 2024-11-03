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
  @Output() statusChange = new EventEmitter<NoteRbt | NoteBcba>();
  @Output() save = new EventEmitter<NoteRbt | NoteBcba>();

  routes = AppRoutes;
  unitPrize = 0;
  statusOptions = ['pending', 'ok'];

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
