import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { NoteBcba, NoteRbt } from 'src/app/shared/models/notes.model';
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

  weekTotalHours = ':';
  weekTotalUnits = 0;
  unitPrize = 0;
  unitPrizeCpt = 0;
  xe = 0;
  xp = 0;

  md: string;
  md2: string;
  mdbcba: string;
  md2bcba: string;

  private npi: any;
  private provider: any;
  unitPrizeCptBcba: any;
  unitPrizeCptRbt: any;

  patients: LocationPatient[];

  combinedList: { rbt: NoteRbt; bcba: NoteBcba }[];

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
    private locationService: LocationService
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
        let combineNotes = [
          ...resp.noteRbts.map((note) => ({ ...note, type: 'rbt' })),
          ...resp.noteBcbas.map((note) => ({ ...note, type: 'bcba' })),
        ];
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

        this.noteRbts = combineNotes.filter(
          (note) => note.type === 'rbt'
        ) as NoteRbt[];
        this.noteBcbas = combineNotes.filter(
          (note) => note.type === 'bcba'
        ) as NoteBcba[];

        this.combinedList = this.combineNotes(this.noteRbts, this.noteBcbas);

        this.total = this.noteRbts.length + this.noteBcbas.length;
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
    ).subscribe((result: any) => {
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
        this.unitPrizeCptBcba = result[0].unit_prize;
        this.unitPrizeCptRbt = result[1].unit_prize;
      })
    );
  }

  extractDataHours() {
    // recorrer el array de billing_general para extraer la data
    const hours_group: string[] = [];
    const units_group: string[] = [];

    const array = this.clientReport_generals;
    for (const report of array) {
      hours_group.push(report.total_hours);
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
    // this.week_total_hours = suma / Math.min(7, hours_group.length);// saca el promedio
    // this.week_total_hours = suma ; // saca la suma
    // console.log("total semanal "+ this.week_total_hours );

    // obtenemos el total de las unidades en un rango de 7 dias  atras
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

  sortData(sort) {
    const data = this.clientReportList.slice();

    if (!sort.active || sort.direction === '') {
      this.clientReportList = data;
    } else {
      this.clientReportList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  onPageChange(page: number) {
    this.getTableData(page);
  }

  searchData() {
    this.combinedList = [];
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
      const [horas, minutos] = element.total_hours.split(':').map(Number);
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

  selectUser(biilling: any) {
    this.billing_selected = biilling;
  }

  addXp(value: any) {
    this.xp = value;
    // console.log(this.xp);
  }

  isSelectedModifier(value: string) {
    this.md = value;
    // console.log(this.md);
  }

  isSelectedModifierBcba(value: string) {
    this.mdbcba = value;
    // console.log(this.mdbcba);
  }

  isSelectedModifier2(value: string) {
    this.md2 = value;
    // console.log(this.md2);
  }

  isSelectedModifier2Bcba(value: string) {
    this.md2bcba = value;
    // console.log(this.md2bcba);
  }

  isCheckedBilled() {
    // this.billed = !this.billed;
    // console.log(this.billed);
    // if ( event.target.checked ) {
    // }
  }
  isCheckedBilledBcba() {
    // this.billedbcba = !this.billedbcba;
    // console.log(this.billedbcba);
  }

  isCheckedPay() {
    // this.pay = !this.pay;
    // console.log(this.pay);
    // if ( event.target.checked ) {
    // }
  }
  isCheckedPayBcba() {
    // this.paybcba = !this.paybcba;
    // console.log(this.paybcba);
  }

  save(data: any) {
    let note_rbt_id: any = null;
    let note_bcba_id: any = null;

    if (data.rbt.id) {
      note_rbt_id = data.rbt.id;
    }

    if (data.bcba.id) {
      note_bcba_id = data.bcba.id;
    }

    const VALUE = {
      session_date: data.rbt.session_date,
      pos: data.pos,
      total_hours: data.total_hours,
      cpt_code: data.rbt.cpt_code,
      md: this.md,
      md2: this.md2,
      mdbcba: this.mdbcba,
      md2bcba: this.md2bcba,
      xe: this.xp,

      // charges: data.session_units_total * this.unitPrize,
      chargesrbt: data.rbt.session_units_total * this.unitPrize,
      chargesbcba: data.bcba.session_units_total * this.unitPrize,
      // total_units: this.n_units,
      total_units: data.bcba.session_units_total
        ? data.rbt.session_units_total
        : null,
      pa_number: this.pa_number,

      patient_id: this.patient_id,
      insurer_id: this.insurance_id,
      npi: this.npi,
      note_rbt_id: note_rbt_id,
      note_bcba_id: note_bcba_id,
      billed: data.rbt.billed,
      pay: data.rbt.pay,
      billedbcba: data.bcba.billedbcba,
      paybcba: data.bcba.paybcba,
    };
    const VALUE2 = {
      session_date: data.rbt.session_date,
      cpt_code: data.rbt.cpt_code,
      pos: data.rbt.pos,
      pa_number: this.pa_number,
      total_hours: data.rbt.total_hours,
      billed: data.rbt.billed,
      pay: data.rbt.pay,
      md: data.rbt.md,
      md2: data.rbt.md2,
      note_rbt_id: data.rbt.id,
      total_units: data.rbt.session_units_total,
      sponsor_id: data.rbt.provider_name_g,
      chargesrbt: data.rbt.session_units_total * this.unitPrize,
      // noterbt_id: data.id,
    };
    const VALUE3 = {
      session_date: data.bcba.session_date,
      cpt_code: data.bcba.cpt_code,
      pos: data.bcba.meet_with_client_at,
      billedbcba: data.bcba.billedbcba,
      paybcba: data.bcba.paybcba,
      mdbcba: data.bcba.mdbcba,
      md2bcba: data.bcba.md2bcba,
      note_bcba_id: data.bcba.id,
      total_units: data.bcba.session_units_total,
      total_hours: data.bcba.total_hours,
      sponsor_id: data.bcba.provider_name_g,
      chargesbcba: data.bcba.session_units_total * this.unitPrize,
      // noterbt_id: data.id,
    };
    // if(this.md2.value === 'XE' ||this.md.value ==='XE')
    //   this.xe= data.total_units * this.unitPrize * this.xe,

    // console.log(VALUE);

    const totalValue = [VALUE, VALUE2, VALUE3];

    if (this.billing_selected) {
      //si  tiene bip se agrega a la informacion de la consulta

      this.clientReportService
        .udpate(VALUE, this.billing_selected)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Bip Updated'
          Swal.fire('Updated', `Bip Updated successfully!`, 'success');
          this.ngOnInit();
        });
      this.noteRbtService
        .noteUpdateModifier(VALUE2, data.rbt.id)
        .subscribe((resp) => {
          // console.log(resp);
        });
      this.noteBCbaService
        .noteBCBAUpdateModifier(VALUE3, data.bcba.id)
        .subscribe((resp) => {
          // console.log(resp);
        });
    } else {
      //crear
      this.clientReportService.create(VALUE).subscribe((resp) => {
        // console.log(resp);
        // this.text_success = 'Se guardó la informacion de la cita médica'
        Swal.fire('Updated', `Added successfully!`, 'success');
        this.ngOnInit();
      });

      this.noteRbtService
        .noteUpdateModifier(VALUE2, data.rbt.id)
        .subscribe((resp) => {
          // console.log(resp);
        });
      this.noteBCbaService
        .noteBCBAUpdateModifier(VALUE3, data.bcba.id)
        .subscribe((resp) => {
          // console.log(resp);
        });
    }
  }

  cambiarStatus(data: any) {
    const VALUE = data.status;
    // console.log(VALUE);

    this.noteRbtService.updateStatus(data, data.id).subscribe((resp) => {
      // console.log(resp);
      // Swal.fire('Updated', `Added successfully!`, 'success');
      this.ngOnInit();
    });
  }

  cambiarStatusBcba(data: any) {
    const VALUE = data.status;
    console.log(VALUE);

    this.noteBCbaService.updateStatus(data, data.id).subscribe((resp) => {
      // console.log(resp);
      // Swal.fire('Updated', `Added successfully!`, 'success');
      this.ngOnInit();
    });
  }

  selectInsurance(event) {
    this.insuranceData(this.selectedValueInsurer);
  }

  insuranceData(selectedValueInsurer) {
    this.insuranceService
      .showInsurance(selectedValueInsurer)
      .subscribe((resp) => {
        console.log(resp);
        this.insurer_name = resp.insurer_name;
        // this.notes = resp.notes;
        // this.services = resp.services;
        this.provider = resp.services[0].provider;
      });
  }

  selectPatient(event) {
    event = this.selectedValueInsurer;
    this.insuranceData(this.selectedValueInsurer);
  }

  private PatientData(selectedValuePatient) {
    this.patientService
      .getPatientByPatientid(selectedValuePatient)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  private combineNotes(notesRbt: NoteRbt[], notesBcba: NoteBcba[]) {
    const combinedList: { rbt: NoteRbt; bcba: NoteBcba }[] = [];
    const clientReportList =
      notesRbt.length > notesBcba.length ? notesRbt : notesBcba;

    clientReportList.forEach((_, index) => {
      if (notesRbt[index] && notesBcba[index])
        combinedList.push({
          rbt: notesRbt[index],
          bcba: notesBcba[index],
        });
      else if (notesRbt[index])
        combinedList.push({ rbt: notesRbt[index], bcba: null });
      else if (notesBcba[index])
        combinedList.push({ rbt: null, bcba: notesBcba[index] });
    });
    return combinedList;
  }
}
