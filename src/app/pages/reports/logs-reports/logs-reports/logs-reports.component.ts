import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { forkJoin, Observable, of } from 'rxjs';
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
import { TableUtilsService } from 'src/app/shared/components/table/table-utils.service';
import Swal from 'sweetalert2';
import { LogFilter } from '../models/log-filter.model';
import { LogReportsDownloadOptions } from './log-reports-download/LogReportsDownloadOptions';
import { LogReportsUseCasesService } from '../log-reports-use-cases.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';

type Note = NoteRbtV2 | NoteBcbaV2;

@Component({
  selector: 'app-logs-reports',
  templateUrl: './logs-reports.component.html',
  styleUrls: ['./logs-reports.component.scss'],
})
export class LogsReportsComponent implements OnInit {
  headers: KeyValue<keyof Note, string>[] = [
    { key: 'type', value: 'Type of Note' },
    { key: 'session_date', value: 'Date of Note' },
    { key: 'status', value: 'Status' },
    { key: 'provider', value: 'Provider' },
    { key: 'patient_id', value: 'Client Name' },
    { key: 'insurance_id', value: 'Insurance' },
    { key: 'pos', value: 'POS' },
    { key: 'time_in', value: 'Time in (M)' },
    { key: 'time_out', value: 'Time Out (M)' },
    { key: 'time_in2', value: 'Time in (A)' },
    { key: 'time_out2', value: 'Time Out (A)' },
    { key: 'total_hours', value: 'Total Hours' },
    { key: 'cpt_code', value: 'CPT' },
    { key: 'md', value: 'Modifier 1' },
    { key: 'md2', value: 'Modifier 2' },
    { key: 'total_units', value: 'Total Units' },
    { key: 'bip_id', value: 'Units Price' },
    { key: 'total_minutes', value: 'Charges' },
    { key: 'billed', value: 'Billed' },
    { key: 'paid', value: 'Paid' },
  ];

  notes: Note[] = [];
  insurances: InsuranceV2[] = [];
  patients: PatientV2[] = [];
  locations: LocationV2[] = [];
  notesRbt: NoteRbtV2[] = [];
  notesBcba: NoteBcbaV2[] = [];

  currentPage = 1;
  pageSize = 30;
  totalItems = 0;
  currentFilter: Partial<LogFilter> = {};

  isAllSelected = false;
  isSomeSelected = false;
  selectedNotes: Set<Note> = new Set<Note>();

  downloadOptions: LogReportsDownloadOptions = {
    buttons: [
      {
        title: 'Generate Claim',
        type: 'forward',
        alt: 'Generate Claim',
      },
    ],
  };

  constructor(
    private router: Router,
    private tableUtilsService: TableUtilsService,
    private logReportsUseCases: LogReportsUseCasesService,
    private insurancesService: InsurancesV2Service,
    private patientsService: PatientsV2Service,
    private notesRbtService: NotesRbtV2Service,
    private notesBcbaService: NotesBcbaV2Service,
    private locationsService: LocationsV2Service
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    forkJoin([
      this.locationsService.list(),
      this.insurancesService.list(),
      this.patientsService.list(),
    ]).subscribe(([locations, insurances, patients]) => {
      this.locations = locations.data;
      this.insurances = insurances.data;
      this.patients = patients.data;
      this.loadData();
    });
  }

  updateData(hadFixData = true) {
    if (hadFixData) this.fixData();
    this.notes = [...this.notesRbt, ...this.notesBcba].sort((a, b) =>
      a.session_date < b.session_date ? 1 : -1
    );
  }

  fixData() {
    this.notesRbt =
      this.notesRbt?.map((item) => {
        const patient = this.patients.find(
          (patient) => patient.patient_id === item.patient_code
        );
        item.insurance_id = !isNaN(item.insurance_id)
          ? item.insurance_id
          : patient?.insurer_id;
        return item;
      }) ?? [];
    this.notesBcba =
      this.notesBcba?.map((item) => {
        const patient = this.patients.find(
          (patient) => patient.patient_id === item.patient_code
        );
        item.insurance_id = patient?.insurer_id;
        return item;
      }) ?? [];
  }

  onFilter(filter: Partial<LogFilter>) {
    this.currentFilter = filter;
    this.currentPage = 1;
    this.loadData();
  }

  onSortChange(sort: Sort) {
    this.notes = this.tableUtilsService.orderData(this.notes, sort);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  private loadData() {
    const filter = {
      ...this.currentFilter,
      page: this.currentPage,
      per_page: this.pageSize,
    };

    forkJoin([
      this.notesRbtService.list(filter),
      this.notesBcbaService.list(filter),
    ]).subscribe(([notesRbt, notesBcba]) => {
      this.notesRbt = notesRbt.data;
      this.notesBcba = notesBcba.data;
      this.totalItems = notesRbt.total + notesBcba.total;

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

  onSelectAll($event: boolean) {
    if ($event) this.selectedNotes = new Set<Note>(this.notes);
    else this.selectedNotes = new Set<Note>();

    this.isAllSelected = $event;
    this.isSomeSelected = $event;
  }

  onSelectNote(note: Note, add: boolean) {
    add ? this.selectedNotes.add(note) : this.selectedNotes.delete(note);
    this.isAllSelected = this.selectedNotes.size === this.notes.length;
    this.isSomeSelected = this.selectedNotes.size > 0;
  }

  onSave(data: NoteRbtV2 | NoteBcbaV2) {
    const update$: Observable<unknown> = isNoteRbtV2(data)
      ? this.notesRbtService.update(data, data.id)
      : isNoteBcbaV2(data)
      ? this.notesBcbaService.update(data, data.id)
      : of(null);

    update$.subscribe({
      next: () => {
        Swal.fire('Updated', `Saved successfully!`, 'success');
        this.loadData();
      },
      error: () => {
        Swal.fire('Error', `Can't update!`, 'error');
        this.loadData();
      },
    });
  }

  onExport() {
    const rbtExports = Array.from(this.selectedNotes.values())
      .filter(isNoteRbtV2)
      .map((note) => note.id);
    const bcbaExports = Array.from(this.selectedNotes.values())
      .filter(isNoteBcbaV2)
      .map((note) => note.id);
    const filname = new Date().toISOString().replace('T', '_') + '.dat';
    this.logReportsUseCases
      .generateClaim(rbtExports, bcbaExports, filname)
      .subscribe({
        next: () => {
          Swal.fire('Updated', `Claim generated successfully!`, 'success');
          this.router.navigate([AppRoutes.claims.claims]);
        },
        error: () => {
          Swal.fire('Error', `Claim Error, try again`, 'error');
        },
      });
  }

  trackByNoteId(_: number, note: Note): string {
    return note.id + note.type;
  }
}
