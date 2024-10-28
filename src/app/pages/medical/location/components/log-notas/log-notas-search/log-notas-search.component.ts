import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  LocationInsurance,
  LocationLogFilter,
  LocationPatient,
} from '../../../models/locations.model';

@Component({
  selector: 'app-log-notas-search[insurances][patients]',
  templateUrl: './log-notas-search.component.html',
  styleUrls: ['./log-notas-search.component.scss'],
})
export class LogNotasSearchComponent {
  @Input() insurances: LocationInsurance[] = [];
  @Input() patients: LocationPatient[] = [];
  @Output() refresh = new EventEmitter<void>();
  @Output() search = new EventEmitter<LocationLogFilter>();

  selectedValueInsurance: LocationInsurance;
  selectedValuePatient: LocationPatient;

  noteType: 'rbt' | 'bcba' | null;
  statusType: string;

  date_start: number | string;
  date_end: number | string;

  onRefresh(): void {
    this.selectedValueInsurance = null;
    this.selectedValuePatient = null;
    this.noteType = null;
    this.statusType = null;
    this.date_start = null;
    this.date_end = null;
    this.refresh.emit();
  }

  onSearch(): void {
    const searchFilter: LocationLogFilter = {
      insurance_id: this.selectedValueInsurance?.id || null,
      patient_id: this.selectedValuePatient?.patient_id || null,
      note_type: this.noteType || null,
      status_type: this.statusType || null,
      date_start: this.date_start || null,
      date_end: this.date_end || null,
    };
    this.search.emit(searchFilter);
  }
}
