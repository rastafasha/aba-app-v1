import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { forkJoin, of } from 'rxjs';
import {
  InsuranceV2,
  isNoteBcbaV2,
  isNoteRbtV2,
  LocationV2,
  NoteBcbaV2,
  NoteRbtV2,
  PatientV2,
} from 'src/app/core/models';
import {
  InsurancesV2Service,
  LocationsV2Service,
  NotesBcbaV2Service,
  NotesRbtV2Service,
  PatientsV2Service,
} from 'src/app/core/services';
import { TableHeader } from 'src/app/shared/components/table/models';
import { TableUtilsService } from 'src/app/shared/components/table/table-utils.service';
import Swal from 'sweetalert2';
import { LogFilter } from '../models/log-filter.model';

@Component({
  selector: 'app-logs-reports',
  templateUrl: './logs-reports.component.html',
  styleUrls: ['./logs-reports.component.scss'],
})
export class LogsReportsComponent implements OnInit {
  headers: TableHeader[] = [
    { key: 'role', name: 'Type of Note' },
    { key: 'date_note', name: 'Date of Note' },
    { key: 'status', name: 'Status' },
    { key: 'pos', name: 'POS' },
    { key: 'time_in', name: 'Time in (M)' },
    { key: 'time_out', name: 'Time Out (M)' },
    { key: 'time_in2', name: 'Time in (A)' },
    { key: 'time_out2', name: 'Time Out (A)' },
    { key: 'totalHours', name: 'Total Hours' },
    { key: 'cpt', name: 'CPT' },
    { key: 'insurance', name: 'Insurance' },
    { key: 'client_name', name: 'Client Name' },
    { key: 'md', name: 'Modifier 1' },
    { key: 'md2', name: 'Modifier 2' },
    { key: 'totalunits', name: 'Total Units' },
    { key: 'units', name: 'Units Price' },
    { key: 'charges', name: 'Charges' },
    { key: 'sponsor_id', name: 'Provider' },
    { key: 'billed', name: 'Billed' },
    { key: 'pay', name: 'Pay' },
  ];

  notes: (NoteRbtV2 | NoteBcbaV2)[] = null;
  insurances: InsuranceV2[] = null;
  patients: PatientV2[] = null;
  locations: LocationV2[] = null;
  notesRbt: NoteRbtV2[] = null;
  notesBcba: NoteBcbaV2[] = null;
  total = 0;
  pageSize = 30;
  currentPage = 1;

  constructor(
    private tableUtilsService: TableUtilsService,
    private insurancesService: InsurancesV2Service,
    private patientsService: PatientsV2Service,
    private notesRbtService: NotesRbtV2Service,
    private notesBcbaService: NotesBcbaV2Service,
    private locationsService: LocationsV2Service
  ) {
    //
  }

  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    forkJoin([
      this.locationsService.list(),
      this.insurancesService.list(),
      this.patientsService.list(),
      this.notesRbtService.list({ per_page: Math.ceil(this.pageSize / 2) }),
      this.notesBcbaService.list({ per_page: Math.ceil(this.pageSize / 2) }),
    ]).subscribe(([locations, insurances, patients, notesRbt, notesBcba]) => {
      this.locations = locations.data;
      this.insurances = insurances.data;
      this.patients = patients.data;
      this.patients = patients.data;
      this.notesRbt = notesRbt.data;
      this.notesBcba = notesBcba.data;
      this.updateData();
    });
  }

  updateData(hadFixData = true) {
    if (hadFixData) this.fixData();
    this.notes = [...this.notesRbt, ...this.notesBcba].sort((a, b) =>
      a.session_date < b.session_date ? 1 : -1
    );
    this.total = this.notes.length;
  }

  fixData() {
    // Agregamos informacion faltante
    this.notesRbt = this.notesRbt.map((item) => {
      item.patient_id = !isNaN(item.patient_id)
        ? item.patient_id
        : this.patients.find(
            (patient) => patient.patient_id === item.patient_code
          )?.id;
      // falta agregar la informacion del "tecnico"
      // basa en provider_id o provider_name_g

      return item;
    });
    // Agregamos informacion faltante
    this.notesBcba = this.notesBcba.map((item) => {
      //patiend_id (id)
      const patient = this.patients.find(
        (patient) => patient.patient_id === item.patient_code
      );
      item.patient_id = patient?.id;
      // falta agregar la informacion del "tecnico"
      // basa en provider_id o provider_name_g

      //insurer
      item.insurance_id = patient?.insurer_id;
      return item;
    });
  }

  onFilter(filter: Partial<LogFilter>) {
    forkJoin([
      this.notesRbtService.list({
        per_page: Math.ceil(this.pageSize / 2),
        ...filter,
      }),
      this.notesBcbaService.list({
        per_page: Math.ceil(this.pageSize / 2),
        ...filter,
      }),
    ]).subscribe(([notesRbt, notesBcba]) => {
      this.notesRbt = notesRbt.data;
      this.notesBcba = notesBcba.data;
      this.fixData();
      let combineNotes = [...this.notesRbt, ...this.notesBcba];
      if (filter.note_type === 'rbt')
        combineNotes = combineNotes.filter((note) => note.type === 'rbt');
      if (filter.note_type === 'bcba')
        combineNotes = combineNotes.filter((note) => note.type === 'bcba');
      if (filter.insurance_id)
        combineNotes = combineNotes.filter(
          (note) => note.insurance_id === filter.insurance_id
        );
      if (filter.patient_id)
        combineNotes = combineNotes.filter(
          (note) => note.patient_id === filter.patient_id
        );
      if (filter.status_type)
        combineNotes = combineNotes.filter(
          (note) => note.status === filter.status_type
        );
      this.notesRbt = combineNotes.filter(isNoteRbtV2);
      this.notesBcba = combineNotes.filter(isNoteBcbaV2);
      this.updateData(false);
    });
  }

  onSortChange(sort: Sort) {
    this.notes = this.tableUtilsService.orderData(this.notes, sort);
  }
  onPageChange($event: number) {
    // throw new Error('Method not implemented.');
  }
  onSave(data: NoteRbtV2 | NoteBcbaV2) {
    const update$ = isNoteRbtV2(data)
      ? this.notesRbtService.update(data, data.id)
      : isNoteBcbaV2(data)
      ? this.notesBcbaService.update(data, data.id)
      : of(null);

    update$.subscribe({
      next: () => {
        console.log('se actualizo la nota');
        Swal.fire('Updated', `Saved successfully!`, 'success');
        this.onRefresh();
      },
      error: (err) => {
        console.log('no se actualizo la nota', err);
        Swal.fire('Error', `Can't update!`, 'error');
        this.onRefresh();
      },
    });
  }
}
