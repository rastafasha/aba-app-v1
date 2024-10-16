import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileSaverService } from 'ngx-filesaver';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import * as XLSX from 'xlsx';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { PatientMService } from '../service/patient-m.service';
import { PageService } from 'src/app/shared/services/pages.service';
import { AppUser } from 'src/app/shared/models/users.models';

declare var $: any;
@Component({
  selector: 'app-client-log-report',
  templateUrl: './client-log-report.component.html',
  styleUrls: ['./client-log-report.component.scss'],
})
export class ClientLogReportComponent {
  routes = AppRoutes;

  patientList = [];
  dataSource!: MatTableDataSource<any>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalDatapatient = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  patient_generals = [];
  patient_id: any;
  patientid: any;
  patient_selected: any;
  text_validation: any;
  user: AppUser;
  insurer_id: any;
  roles: string;
  permissions = [];
  maladaptives = [];
  doctorPatientList = [];
  pa_assessmentgroup = [];
  paAssestment: any;
  paAssestments = [];
  paAssestmentsinter = [];
  insurances = [];

  graphData = [];

  search: any = null;
  status: any = null;

  constructor(
    private pageService: PageService,
    private patientService: PatientMService,
    private fileSaver: FileSaverService,
    private bipService: BipService,
    private location: Location,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.pageService.onInitPage();
    this.getTableData();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.roles = this.user.roles[0];

    this.user = this.authService.user as AppUser;
    // this.getPatiensByDoctor();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getPatiensByDoctor() {
    this.patientService
      .getPatientsByDoctor(this.user.id)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.doctorPatientList = resp.patients;
      });
  }

  isMaladaptiveBip() {
    this.bipService
      .getBipByPatient_id(this.patient_id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.maladaptives = resp.maladaptives;
      });
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

  private getTableData(): void {
    this.patientList = [];
    this.serialNumberArray = [];
    // this.search, this.status
    this.patientService
      .listPatientLogReport(this.search, this.status)
      .subscribe((resp: any) => {
        console.log(resp);

        // trae el ultimo
        // if (i > 0) {
        //   if (resp.patients[i - 1]) {
        //     this.paAssestments = JSON.parse(resp.patients[i - 1].pa_assessments);
        //     console.log(this.paAssestments);
        //   } else {
        //     console.error(`Patient with index ${i - 1} is undefined`);
        //     this.paAssestments = '[]';
        //   }
        // } else {
        //   console.error('No patients found');
        //   this.paAssestments = [];
        // }

        //fechas junto con la baseline del maladaptive
        this.paAssestments = resp.map((patient) => patient.pa_assessments);

        // for (var i = 0; i < resp.patients.length; i++) {
        //   if (resp.patients[i].pa_assessments) {
        //     const parsedAssessments = JSON.parse(resp.patients[i].pa_assessments);
        //     this.paAssestments.push(parsedAssessments);
        //   }
        // }
        console.log(this.paAssestments);

        this.totalDatapatient = resp.length;
        this.patient_generals = resp;
        this.patientid = resp.id;
        this.patient_id = resp.patient_id;
        this.getTableDataGeneral();
        //  this.isMaladaptiveBip();
      });
  }

  getTableDataGeneral() {
    this.patientList = [];
    this.serialNumberArray = [];

    this.patient_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.patientList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.patientList);
    this.calculateTotalPages(this.totalDatapatient, this.pageSize);
  }
  selectUser(patient: any) {
    this.patient_selected = patient;
  }
  deleteRol() {
    this.patientService
      .deletePatient(this.patient_selected.id)
      .subscribe((resp: any) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          const INDEX = this.patientList.findIndex(
            (item: any) => item.id === this.patient_selected.id
          );
          if (INDEX !== -1) {
            this.patientList.splice(INDEX, 1);

            $('#delete_patient').hide();
            $('#delete_patient').removeClass('show');
            $('.modal-backdrop').remove();
            $('body').removeClass();
            $('body').removeAttr('style');
            this.patient_selected = null;
          }
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientList = this.dataSource.filteredData;
  }

  searchDataDoct(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.doctorPatientList = this.dataSource.filteredData;
  }

  sortData(sort: any) {
    const data = this.patientList.slice();

    if (!sort.active || sort.direction === '') {
      this.patientList = data;
    } else {
      this.patientList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  sortDataDoctor(sort: any) {
    const data = this.doctorPatientList.slice();

    if (!sort.active || sort.direction === '') {
      this.patientList = data;
    } else {
      this.patientList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
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
    this.getTableDataGeneral();
    this.searchDataValue = '';
  }

  private calculateTotalPages(
    totalDatapatient: number,
    pageSize: number
  ): void {
    this.pageNumberArray = [];
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

  excelExport() {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.getTableDataGeneral();
    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.patient_generals);

    const workbook = {
      Sheets: {
        testingSheet: worksheet,
      },
      SheetNames: ['testingSheet'],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });

    this.fileSaver.save(blobData, 'clients_db_aba_therapy');
  }
  csvExport() {
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.patient_generals);

    const workbook = {
      Sheets: {
        testingSheet: worksheet,
      },
      SheetNames: ['testingSheet'],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'csv',
      type: 'array',
    });

    const blobData = new Blob([excelBuffer], { type: CSV_TYPE });

    this.fileSaver.save(blobData, 'clients_db_aba_therapy_csv', CSV_EXTENSION);
  }

  txtExport() {
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.patient_generals);

    const workbook = {
      Sheets: {
        testingSheet: worksheet,
      },
      SheetNames: ['testingSheet'],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blobData = new Blob([excelBuffer], { type: TXT_TYPE });

    this.fileSaver.save(blobData, 'clients_db_aba_therapy', TXT_EXTENSION);
  }

  pdfExport() {
    // var doc = new jspdf();
    // const worksheet = XLSX.utils.json_to_sheet(this.patient_generals);
    // const workbook = {
    //   Sheets:{
    //     'testingSheet': worksheet
    //   },
    //   SheetNames:['testingSheet']
    // }
    // doc.html(document.body, {
    //   callback: function (doc) {
    //     doc.save('clients_db_aba_therapy.pdf');
    //   }
    // });
  }

  cambiarStatus(data: any) {
    const VALUE = data.status;
    console.log(VALUE);

    this.patientService.updateStatus(data, data.id).subscribe((resp) => {
      // console.log(resp);
      this.getTableData();
    });
  }
}
