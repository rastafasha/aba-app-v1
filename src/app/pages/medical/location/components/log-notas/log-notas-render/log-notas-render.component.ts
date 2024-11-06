import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NoteBcba } from 'src/app/shared/models/note-bcba';
import { NoteRbt } from 'src/app/shared/models/note-rbt';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { environment } from 'src/environments/environment';
import {
  Insurance,
  InsuranceModifier,
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
  @Input() note: NoteRbt | NoteBcba;
  @Input() insurances: Insurance[] = [];
  @Input() patients: LocationPatient[] = [];
  @Input() modifiers: InsuranceModifier[] = [];
  @Output() save = new EventEmitter<NoteRbt | NoteBcba>();

  routes = AppRoutes;
  hasChanges = false;
  unitPrice = 10;

  readonly statusOptions = ['pending', 'ok'];

  onSave() {
    if (!this.hasChanges) return;
    this.save.emit(this.note);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    // This is only for testing purposes
    if (!environment.production && this.note) {
      this.note.insurance_id = this.insurances?.[0]?.id ?? 1;
    }
  }
}
