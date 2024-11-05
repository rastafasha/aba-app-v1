import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import Swal from 'sweetalert2';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { NoteBcbaService } from '../../../../core/services/note-bcba.service';
import { NoteRbtService } from '../../../../core/services/note-rbt.service';
import { ClientReportModel } from '../client-report.model';
import { ClientReportService } from '../client-report.service';
import { AppUser } from 'src/app/shared/models/users.models';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { LocationInsurance } from '../../location/models/locations.model';

export interface InsuranceCptPrizeResponse {
  unit_prize: number;
}

export interface NoteBcba {
  cpt_code: string;
}

export interface NoteRbt {
  cpt_code: string;
}

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss'],
})
export class EmployeeReportComponent implements OnInit {
  routes = AppRoutes;
  searchDataDoctor = '';
  date_start: any;
  date_end: any;

  patient_id: any;
  billing_selected: any;
  sponsor_id: any;
  noterbt_id: any;
  user: AppUser;

  clientReport: ClientReportModel;

  clientReportList: any;
  clientReport_generals: any;
  dataSource!: MatTableDataSource<any>;
  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 7;
  totalDataClientReport = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;
  text_validation: any;

  roles = [];
  permissions = [];
  patientID: any;
  patientId: any;

  pa_assessments: string;
  pa_assessmentsgroup = [];
  cpt: any;
  n_units: any;
  pa_number: any;
  insurances: LocationInsurance[] = [];
  insurance_id: any;
  insuranceiddd: any;
  insurer_name: any;
  modifiers = [];
  noteRbt: any;
  pos_covered = [];
  pa_assessmentgroup = [];
  noteBcba: any;
  patient: any;

  patientName: any;
  doctor_selected_full_name: any;
  billing_total = 0;
  week_total_hours: string;
  week_total_units = 0;
  total_hours = 0;
  total_units = 0;
  charges = 0;
  unitPrize = 0;
  unitPrizeCpt = 0;
  xe = 0;
  is_xe: boolean;

  session_date: any;
  time_in: any;
  time_out: any;
  time_in2: any;
  time_out2: any;
  pos: any;
  billed: boolean;
  pay: boolean;
  billedbcba: boolean;
  paybcba: boolean;
  md: any;
  md2: any;
  mdbcba: any;
  md2bcba: any;
  pay_selected: any;
  billed_selected: any;
  total: any;
  totalPorPagar: any;
  resultconFactor: any;
  unidades: any;
  porPagar: any;
  horaTrabajada: any;
  factHoras: any;
  totalHoras: any;
  totalUnidades: any;
  units: any;
  hoursPerUnit: any;
  timePerUnit: any;

  tecnicoRbts: any;
  supervisor: any;
  npi: any;
  rbt_id: any;
  rbt2_id: any;
  bcba_id: any;
  bcba2_id: any;
  doctor_selected_bcba: any;
  full_name: any;
  doctors: any;
  tecnicoDoctorNames: any;

  services: any;
  provider: any;
  selectedCpt: any;
  //data: any;
  noteType: string;

  providersSponsorsList: any;
  factorPorcentual = 1.66666666666667;

  doctor_selected: any = null;
  combinedList: any[];
  unitPrizeCptBcba: any;
  unitPrizeCptRbt: any;
  bcbaCptCode: string;
  rbtCptCode: string;

  constructor(
    private ativatedRoute: ActivatedRoute,
    private clientReportService: ClientReportService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private insuranceService: InsuranceService,
    private noteRbtService: NoteRbtService,
    private noteBCbaService: NoteBcbaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_id = resp['patient_id'];
      this.patientId = resp['patient_id'];
      console.log(this.patient_id);
    });

    this.getConfig();
    this.billed = false;
    this.pay = false;
    this.billedbcba = false;
    this.paybcba = false;

    this.user = this.authService.user as AppUser;
    this.getTableData();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  isPermission(permission: string) {
    if (this.user.roles.includes('SUPERADMIN')) {
      return true;
    }
    if (this.user.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  getConfig() {
    this.clientReportService.config().subscribe((resp) => {
      this.insurances = resp.insurances;
    });
  }

  getTableData(page = 1): void {
    this.clientReportList = [];
    this.serialNumberArray = [];
    this.currentPage = page;

    // this.patientId = patient_id
    // // this.patientId = 'cliente3243';

    this.clientReportService
      .getAllClientReportEmployeeByPatient(
        this.user.id.toString(),
        this.patientId,
        page,
        this.date_start,
        this.date_end,
        this.noteType
      )
      .subscribe((resp) => {
        console.log('todo', resp);
        const pa = resp.arrayPages;
        // const pa = [1,2,3,4,5,6,7,8,9,10]
        this.pageNumberArray = [];
        if (pa.length > 5) {
          if (this.currentPage > 2 && this.currentPage < pa.length - 2) {
            for (
              let index = this.currentPage - 2;
              index < this.currentPage + 3;
              index++
            ) {
              this.pageNumberArray.push(index);
            }
          } else if (this.currentPage <= 2) {
            for (let index = 1; index < 6; index++) {
              this.pageNumberArray.push(index);
            }
          } else if (this.currentPage >= pa.length - 2) {
            for (let index = pa.length - 4; index <= pa.length; index++) {
              this.pageNumberArray.push(index);
            }
          }
        } else {
          this.pageNumberArray = pa;
        }
        // traemos la info necesaria del paciente
        this.patientName = resp.patient.full_name;
        this.patientID = resp.patient.patient_id;
        this.insurance_id = resp.patient.insurer_id;
        this.billed = resp.noteRbts;
        this.pay = resp.noteRbts;
        this.billedbcba = resp.noteBcbas;
        this.paybcba = resp.noteBcbas;
        this.pos_covered = resp.pos_covered;

        // obtengo la info resumida de las notas rbt
        this.noteRbt = resp.noteRbts;

        // aqui traigo los nombres de los doctores relacionados al paciente
        this.doctors = resp.doctors;
        this.supervisor =
          resp.noteRbts.length > 0 ? resp.noteRbts[0].supervisor : '';
        this.tecnicoRbts =
          resp.noteRbts.length > 0 ? resp.noteRbts[0].tecnicoRbts : '';

        this.noteBcba = resp.noteBcbas;

        //unimos las notas rbt y bcba para mostrarlas en la misma tabla
        const clientReportList =
          this.noteRbt.length > this.noteBcba.length
            ? this.noteRbt
            : this.noteBcba;

        this.combinedList = [];
        clientReportList.forEach((item, index) => {
          console.log(this.noteRbt[index]);
          console.log(this.noteBcba[index]);
          if (this.noteRbt[index] && this.noteBcba[index])
            this.combinedList.push({
              rbt: this.noteRbt[index],
              bcba: this.noteBcba[index],
            });
          else if (this.noteRbt[index])
            this.combinedList.push({ rbt: this.noteRbt[index], bcba: null });
          else if (this.noteBcba[index])
            this.combinedList.push({ rbt: null, bcba: this.noteBcba[index] });
        });

        //fin union

        this.rbt_id = resp.patient.rbt_id;
        this.rbt2_id = resp.patient.rbt2_id;
        this.bcba_id = resp.patient.bcba_id;
        this.bcba2_id = resp.patient.bcba2_id;

        this.pa_assessments = resp.pa_assessments;
        const jsonObj = JSON.parse(this.pa_assessments);

        jsonObj.sort((a, b) => {
          const dateA = new Date(a.pa_services_start_date);
          const dateB = new Date(b.pa_services_start_date);
          return dateA.getTime() - dateB.getTime();
        });

        this.pa_assessmentsgroup = jsonObj;

        this.totalDataClientReport = resp.noteRbts.length;
        this.clientReport_generals = resp.noteRbts;

        this.patient_id = resp.patient_id;

        for (let i = 0; i < this.pa_assessmentsgroup.length; i++) {
          if (
            !this.serialNumberArray.includes(
              this.pa_assessmentsgroup[i].serial_number
            )
          ) {
            this.serialNumberArray.push(
              this.pa_assessmentsgroup[i].serial_number
            );
          }
          //aqui se agrega pa assestment al total
          // this.clientReportList.push(this.pa_assessmentsgroup[i]);
        }

        this.getTableDataGeneral();
        this.getInsurer();
        this.getDoctorRBT();
        //  this.getDoctorBcba();
        //  this.extractDataHours();
      });
  }

  getInsurer() {
    //sacamos los detalles insurance seleccionado
    this.insuranceService.get(this.insurance_id).subscribe(
      (resp: any) => {
        console.log('insurer', resp);
        this.insuranceiddd = resp.id;

        this.insurer_name = resp.insurer_name;
        this.modifiers = resp.notes;
        this.services = resp.services;

        this.provider = resp.services[0].provider;
        this.cpt = resp.services[0].code;
        // el valor de la unidad que viene desde el seguro,
        // ahora debe ser desde la funcion mas abajo
        this.unitPrize = resp.services[0].unit_prize;
        console.log('cpt', this.cpt);

        // Call getPrizeCptNote with the correct parameters from noterbta list and notebcba list
        this.getPrizeCptNote(
          this.insurer_name,
          this.noteBcba.cpt_code,
          this.noteRbt.cpt_code,
          this.provider
        ).subscribe();
      },
      (error: any) => {
        console.error('Error fetching insurance data:', error);
      }
    );
  }
  // funcion para obtener el valor de la unidad del cpt
  getPrizeCptNoteRbt(cptCode: string) {
    this.getPrizeCptNote(
      this.insurer_name,
      cptCode,
      this.noteRbt.cpt_code,
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

  // fin funcion para obtener el valor de la unidad del cpt

  // selectCpt(value:any){
  //   this.selectedCpt = this.combinedList
  //   this.getPrizeCptNote();

  // }

  //trae el nombre del doctor quien hizo la nota rbt
  getDoctorRBT() {
    this.doctorService.showDoctor(this.tecnicoRbts).subscribe((resp) => {
      console.log('doctor rbt y location', resp);
      this.doctor_selected = resp.user;
      this.full_name = resp.user.full_name;
    });
  }
  // supervisor del tecnico solo sacamos el npi
  getDoctorBcba() {
    this.doctorService.showDoctor(this.supervisor).subscribe((resp) => {
      console.log('bcba', resp);
      this.npi = resp.user.npi;
    });
  }

  extractDataHours() {
    // recorrer el array de billing_general para extraer la data
    const hours_group: string[] = [];
    const units_group: string[] = [];
    const extractedData = this.clientReport_generals;

    const array = this.clientReport_generals;
    for (this.clientReport_generals of array) {
      hours_group.push(this.clientReport_generals.total_hours);
      units_group.push(this.clientReport_generals.total_units);
    }
    // console.log(hours_group);
    // console.log(units_group);
    // obtenemos el total de las horas en un rango de 7 dias  atras
    var suma = 0;
    for (
      var i = hours_group.length - 1;
      i >= Math.max(0, hours_group.length - 7);
      i--
    ) {
      suma += parseInt(hours_group[i], 10) || 0;
    }
    // this.week_total_hours = suma / Math.min(7, hours_group.length);// saca el promedio
    // this.week_total_hours = suma ; // saca la suma
    console.log('total semanal ' + this.week_total_hours);

    // obtenemos el total de las unidades en un rango de 7 dias  atras
    var sumaunit = 0;
    for (
      var i = units_group.length - 1;
      i >= Math.max(0, units_group.length - 7);
      i--
    ) {
      sumaunit += parseInt(units_group[i], 10) || 0;
    }
    // this.week_total_units = sumaunit / Math.min(7, units_group.length);// saca el promedio
    this.week_total_units = sumaunit; // saca la suma
    console.log('total semanal ' + this.week_total_units);

    // saco el valor de charges multiplicando el total de unidades por semana por el valor del cpt o n_units
    // this.getCharges();
  }

  sortData(sort: any) {
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

  searchData(patientId: any) {
    // this.dataSource.filter = value.trim().toLowerCase();
    // this.patientList = this.dataSource.filteredData;
    this.combinedList = [];
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    patientId;
    this.getTableData();
  }

  getTableDataGeneral() {
    this.clientReportList = [];
    this.serialNumberArray = [];
    this.totalDataClientReport = 0;

    this.clientReport_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.clientReportList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.clientReportList);
    // this.calculateTotalPages(this.totalDataClientReport, this.pageSize);

    this.calculateUnitsAndHours();
  }

  calculateUnitsAndHours() {
    console.log('notas rbt', this.clientReportList);
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
    console.log(
      'horas totales - minutos totales',
      horasTotales,
      minutosTotales
    );
    if (minutosTotales === 0) stringMinutos = '00';
    else if (minutosTotales < 10) stringMinutos = `0${minutosTotales}`;
    else stringMinutos = minutosTotales.toString();

    this.week_total_hours = `${horasTotales} : ${stringMinutos}`;
    this.week_total_units = totalUnits;
  }

  onPaginateChange(event) {
    this.skip = event.pageIndex * this.pageSize;
    this.totalDataClientReport += this.getPageTotal();
    this.getTableDataGeneral();
  }

  getPageTotal(): number {
    const endIndex = Math.min(
      this.skip + this.pageSize,
      this.clientReportList.length
    );
    return this.clientReportList
      .slice(this.skip, endIndex)
      .reduce((acc, cur) => acc + cur.amount, 0);
  }

  getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    }
  }

  moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneral();
  }

  PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.date_start = '';
    this.date_end = '';
    this.ngOnInit();
    this.getTableData();
  }

  private calculateTotalPages(
    totalDatapatient: number,
    pageSize: number
  ): void {
    // this.pageNumberArray = [];
    this.totalPages = totalDatapatient / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  selectUser(biilling: any) {
    this.billing_selected = biilling;
  }

  addXe(value: any) {
    this.xe = value;
    console.log(this.xe);
  }

  isSelectedModifier(value: string) {
    this.md = value;
    console.log(this.md);
  }

  isSelectedModifierBcba(value: string) {
    this.mdbcba = value;
    console.log(this.mdbcba);
  }

  isSelectedModifier2(value: string) {
    this.md2 = value;
    console.log(this.md2);
  }

  isSelectedModifier2Bcba(value: string) {
    this.md2bcba = value;
    console.log(this.md2bcba);
  }

  isCheckedBilled() {
    this.billed = !this.billed;
    console.log(this.billed);
    // if ( event.target.checked ) {
    // }
  }
  isCheckedBilledBcba() {
    this.billedbcba = !this.billedbcba;
    console.log(this.billedbcba);
  }

  isCheckedPay() {
    this.pay = !this.pay;
    console.log(this.pay);
    // if ( event.target.checked ) {
    // }
  }
  isCheckedPayBcba() {
    this.paybcba = !this.paybcba;
    console.log(this.paybcba);
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
      xe: this.xe,

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

    console.log(VALUE);

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
          console.log(resp);
        });
      this.noteBCbaService
        .noteBCBAUpdateModifier(VALUE3, data.bcba.id)
        .subscribe((resp) => {
          console.log(resp);
        });
    } else {
      //crear
      this.clientReportService.create(VALUE).subscribe((resp) => {
        // console.log(resp);
        // this.text_success = 'Se guardó la informacion de la cita médica'
        Swal.fire('Created', `Created successfully!`, 'success');
        this.ngOnInit();
      });

      this.noteRbtService
        .noteUpdateModifier(VALUE2, data.rbt.id)
        .subscribe((resp) => {
          console.log(resp);
        });
      this.noteBCbaService
        .noteBCBAUpdateModifier(VALUE3, data.bcba.id)
        .subscribe((resp) => {
          console.log(resp);
        });
    }
  }
}
