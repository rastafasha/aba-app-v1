import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { TableUtilsService } from 'src/app/shared/components/table/table-utils.service';
import { NoteBcba } from 'src/app/core/models/note-bcba.model';
import { NoteRbt } from 'src/app/core/models';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { ClientReportService } from '../../../client-report/client-report.service';
import { NoteBcbaService } from '../../../../../core/services/notes-bcba.service';
import { NoteRbtService } from '../../../../../core/services/notes-rbt.service';
import {
  Insurance,
  InsuranceModifier,
  LocationInsurance,
  LocationLogFilter,
  LocationPatient,
} from '../../models/locations.model';
import { LocationService } from '../../services/location.service';
import { InsuranceService } from '../../../../../core/services/insurances.service';

@Component({
  selector: 'app-log-notas',
  templateUrl: './log-notas.component.html',
  styleUrls: ['./log-notas.component.scss'],
})
export class LogNotasComponent implements OnInit {
  routes = AppRoutes;
  // pages
  pageSize = 50;
  total = 0;
  skip = 0;
  currentPage = 1;
  // data
  notes: (NoteRbt | NoteBcba)[];
  patients: LocationPatient[];
  insurances: LocationInsurance[] = [];
  insurancesFull: Insurance[] = [];

  modifiers: InsuranceModifier[] = [];
  // totals
  weekTotalHours = ':';
  weekTotalUnits = 0;
  // private
  private location_id: number;

  constructor(
    private ativatedRoute: ActivatedRoute,
    private clientReportService: ClientReportService,
    private noteRbtService: NoteRbtService,
    private noteBCbaService: NoteBcbaService,
    private locationService: LocationService,
    private insuranceService: InsuranceService,
    private tableUtilsService: TableUtilsService
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((resp) => {
      this.location_id = resp['id'];
      this.onRefresh();
    });
  }

  onRefresh() {
    this.getLocationAndPatients();
    this.getInsurances();
    this.getModifiers();
    this.getTableData();
  }

  onFilter(filter: LocationLogFilter) {
    this.getTableData(1, filter);
  }

  getLocationAndPatients() {
    this.locationService.getLocation(this.location_id).subscribe((resp) => {
      this.patients = resp.patients;
    });
  }

  getInsurances() {
    this.clientReportService.config().subscribe((resp) => {
      this.insurances = resp.insurances;
      this.insuranceService.listData().subscribe((items) => {
        this.insurancesFull = items.insurances.data;
      });
    });
  }

  getModifiers() {
    this.insuranceService.getModifiers().subscribe((items) => {
      this.modifiers = items;
    });
  }

  getTableData(page = 1, filter: Partial<LocationLogFilter> = {}): void {
    this.currentPage = page;

    this.clientReportService
      .getAllClientReportByLocation(this.location_id, {
        page,
        ...filter,
      })
      .subscribe((resp) => {
        let combineNotes = [...resp.noteRbts, ...resp.noteBcbas];
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
            (note) => note.patient_id === filter.patient_id.toString()
          );
        if (filter.status_type)
          combineNotes = combineNotes.filter(
            (note) => note.status === filter.status_type
          );

        this.notes = combineNotes.sort((a, b) =>
          a.session_date > b.session_date ? -1 : 1
        );

        this.total = combineNotes.length;

        this.getTableDataGeneral();
      });
  }

  extractDataHours() {
    // recorrer el array de billing_general para extraer la data
    const hours_group: string[] = [];
    const units_group: string[] = [];

    const array = this.notes;
    for (const report of array) {
      hours_group.push(report.session_length_total);
      units_group.push(report.total_units);
    }
    // obtenemos el total de las horas en un rango de 7 dias  atras
    let suma = 0;
    for (
      let i = hours_group.length - 1;
      i >= Math.max(0, hours_group.length - 7);
      i--
    ) {
      suma += parseInt(hours_group[i], 10) || 0;
    }

    let sumaUnit = 0;
    for (
      let i = units_group.length - 1;
      i >= Math.max(0, units_group.length - 7);
      i--
    ) {
      sumaUnit += parseInt(units_group[i], 10) || 0;
    }
    this.weekTotalUnits = sumaUnit; // saca la suma
  }

  sortData(sort: Sort) {
    this.notes = this.tableUtilsService.orderData(this.notes, sort);
  }

  onPageChange(page: number) {
    this.getTableData(page);
  }

  searchData() {
    this.notes = [];
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private getTableDataGeneral() {
    this.calculateUnitsAndHours();
  }

  calculateUnitsAndHours() {
    // console.log('notas rbt',this.clientReportList)
    const totalUnits = this.notes.reduce(
      (total, objeto) => total + objeto.session_units_total,
      0
    );
    let minutes = 0;
    this.notes.forEach((element) => {
      const [horas, minutos] = element.session_length_total
        .split(':')
        .map(Number);
      minutes += horas * 60 + minutos;
    });
    const horasTotales = Math.floor(minutes / 60);
    const minutosTotales = minutes % 60;
    let stringMinutos: string;
    // console.log('horas totales - minutos totales',horasTotales, minutosTotales)
    if (minutosTotales === 0) stringMinutos = '00';
    else if (minutosTotales < 10) stringMinutos = `0${minutosTotales}`;
    else stringMinutos = minutosTotales.toString();

    this.weekTotalHours = `${horasTotales} : ${stringMinutos}`;
    this.weekTotalUnits = totalUnits;
  }

  onSave(data: NoteRbt | NoteBcba) {
    const update$ =
      data.type === 'rbt'
        ? this.noteRbtService.update(data as NoteRbt, data.id)
        : this.noteBCbaService.update(data as NoteBcba, data.id);

    update$.subscribe({
      next: () => {
        console.log('se actualizo la nota');
        Swal.fire('Updated', `Saved successfully!`, 'success');
        this.onRefresh();
      },
      error: (err) => {
        console.log('no se actualizo la nota');
        Swal.fire('Error', `Don't update!`, 'error');
        this.onRefresh();
      },
    });
  }
}
