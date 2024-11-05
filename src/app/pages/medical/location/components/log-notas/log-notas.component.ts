import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map, tap } from 'rxjs';
import {
  isNoteBcba,
  isNoteRbt,
  NoteBcba,
  NoteRbt,
} from 'src/app/shared/models/notes.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { ClientReportService } from '../../../client-report/client-report.service';
import { InsuranceCptPrizeResponse } from '../../../client-report/report-by-client/report-by-client.component';
import { InsuranceService } from '../../../insurance/service/insurance.service';
import { NoteBcbaService } from '../../../notes-bcba/services/note-bcba.service';
import { NoteRbtService } from '../../../notes/services/note-rbt.service';
import { PatientMService } from '../../../patient-m/service/patient-m.service';
import {
  LocationApi,
  LocationInsurance,
  LocationLogFilter,
  LocationPatient,
} from '../../models/locations.model';
import { LocationService } from '../../services/location.service';
import { TableUtilsService } from 'src/app/shared/components/table/table-utils.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-log-notas',
  templateUrl: './log-notas.component.html',
  styleUrls: ['./log-notas.component.scss'],
})
export class LogNotasComponent implements OnInit {
  routes = AppRoutes;

  private patient_id: number;
  private location_id: number;
  private billing_selected: any;

  private clientReport_generals: (NoteRbt | NoteBcba)[];
  private clientReportList: (NoteRbt | NoteBcba)[];

  pageSize = 50;
  total = 0;
  skip = 0;
  currentPage = 1;

  insurances: LocationInsurance[] = [];

  private pa_number: number;
  private insurance_id: number;
  private insurer_name: string;
  private noteRbts: NoteRbt[];
  private noteBcbas: NoteBcba[];
  notes: (NoteRbt | NoteBcba)[];

  weekTotalHours = ':';
  weekTotalUnits = 0;

  private npi: any;
  private provider: any;

  patients: LocationPatient[];

  selectedValueInsurer!: string;
  selectedValuePatient!: string;
  location_selected: LocationApi;

  constructor(
    private ativatedRoute: ActivatedRoute,
    private clientReportService: ClientReportService,
    private insuranceService: InsuranceService,
    private patientService: PatientMService,
    private noteRbtService: NoteRbtService,
    private noteBCbaService: NoteBcbaService,
    private locationService: LocationService,
    private tableUtilsService: TableUtilsService
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((resp) => {
      this.location_id = resp['id'];
      this.onRefresh();
    });
  }

  onRefresh() {
    this.getLocation();
    this.getConfig();
    this.getTableData();
  }

  onFilter(filter: LocationLogFilter) {
    this.getTableData(1, filter);
  }

  getLocation() {
    this.locationService.getLocation(this.location_id).subscribe((resp) => {
      this.location_selected = resp.location;
      this.patients = resp.patients;
    });
  }

  getConfig() {
    this.clientReportService.config().subscribe((resp) => {
      this.insurances = resp.insurances;
    });
  }

  getTableData(page = 1, filter: Partial<LocationLogFilter> = {}): void {
    this.clientReportList = [];
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

        this.noteRbts = combineNotes.filter(isNoteRbt);
        this.noteBcbas = combineNotes.filter(isNoteBcba);

        this.notes = combineNotes.sort((a, b) =>
          a.session_date > b.session_date ? -1 : 1
        );

        this.total = combineNotes.length;
        this.clientReport_generals = [...this.noteRbts, ...this.noteBcbas];

        this.getTableDataGeneral();
      });
  }

  // funcion para obtener el valor de la unidad del cpt
  getPrizeCptNoteRbt(cptCode: string) {
    this.getPrizeCptNote(
      this.insurer_name,
      cptCode,
      this.noteRbts[0].cpt_code,
      this.provider
    ).subscribe((result) => {
      return result;
    });
  }

  getUnitPrizes(
    insurerName: string,
    bcbaCptCode: string,
    rbtCptCode: string,
    provider: any
  ): Observable<InsuranceCptPrizeResponse[]> {
    const bcbaObservable = this.insuranceService.showInsuranceCptPrize(
      insurerName,
      bcbaCptCode,
      provider
    );
    const rbtObservable = this.insuranceService.showInsuranceCptPrize(
      insurerName,
      rbtCptCode,
      provider
    );

    return forkJoin([bcbaObservable, rbtObservable]).pipe(
      map(
        ([bcbaResponse, rbtResponse]: [
          InsuranceCptPrizeResponse,
          InsuranceCptPrizeResponse
        ]) => {
          return [
            { unit_prize: bcbaResponse.unit_prize },
            { unit_prize: rbtResponse.unit_prize },
          ];
        }
      )
    );
  }

  getPrizeCptNote(
    insurer_name: string,
    bcbaCptCode: string,
    rbtCptCode: string,
    provider: any
  ): Observable<InsuranceCptPrizeResponse[]> {
    return this.getUnitPrizes(
      insurer_name,
      bcbaCptCode,
      rbtCptCode,
      provider
    ).pipe(
      tap((result: InsuranceCptPrizeResponse[]) => {
        console.log('Precios unidad', result);
        const unitPrizeCptBcba = result[0].unit_prize;
        const unitPrizeCptRbt = result[1].unit_prize;
      })
    );
  }

  extractDataHours() {
    // recorrer el array de billing_general para extraer la data
    const hours_group: string[] = [];
    const units_group: string[] = [];

    const array = this.clientReport_generals;
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
    const totalUnits = this.clientReportList.reduce(
      (total, objeto) => total + objeto.session_units_total,
      0
    );
    let minutes = 0;
    this.clientReportList.forEach((element) => {
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

    update$.subscribe(() => {
      console.log('Se actualizo la notificacion');
      Swal.fire('Updated', `Saved successfully!`, 'success');
      this.onRefresh();
    });
  }
}
