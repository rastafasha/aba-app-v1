import { Component, OnInit } from '@angular/core';
import {
  InsuranceV2,
  LocationV2,
  NoteBcbaV2,
  NoteRbtV2,
  PatientV2,
} from 'src/app/core/models';
import { LogFilter } from '../models/log-filter.model';
import { Sort } from '@angular/material/sort';
import { TableUtilsService } from 'src/app/shared/components/table/table-utils.service';
import { TableHeader } from 'src/app/shared/components/table/models';
import {
  InsurancesV2Service,
  LocationsV2Service,
  NotesBcbaV2Service,
  NotesRbtV2Service,
  PatientsV2Service,
} from 'src/app/core/services';
import { forkJoin } from 'rxjs';

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
  pageSize = 15;
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
      this.notesRbtService.list(),
      this.notesBcbaService.list(),
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

  updateData() {
    this.notes = [...this.notesRbt, ...this.notesBcba].sort((a, b) =>
      a.session_date > b.session_date ? 1 : -1
    );
    this.total = this.notes.length;
    console.log(this.notes);
  }

  onFilter(filter: LogFilter) {
    throw new Error('Method not implemented.');
  }

  onSortChange(sort: Sort) {
    this.notes = this.tableUtilsService.orderData(this.notes, sort);
  }
  onPageChange($event: number) {
    throw new Error('Method not implemented.');
  }
  onSave($event: NoteRbtV2 | NoteBcbaV2) {
    throw new Error('Method not implemented.');
  }
}
