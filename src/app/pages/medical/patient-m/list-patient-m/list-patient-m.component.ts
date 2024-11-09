import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ActionModalComponent } from 'src/app/shared/components/action-modal/action-modal.component';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { BipService } from '../../bip/service/bip.service';
import { PatientMService } from '../service/patient-m.service';

declare var $: any;
@Component({
  selector: 'app-list-patient-m',
  templateUrl: './list-patient-m.component.html',
  styleUrls: ['./list-patient-m.component.scss'],
})
export class ListPatientMComponent implements OnInit {
  isLoading = true;
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
  totalData = 0;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  patient_generals = [];
  patient_id: any;
  patientid: any;
  patient_selected: any;
  text_validation: any;
  user: AppUser;
  roles: string;
  permissions = [];
  maladaptives = [];
  doctorPatientList = [];
  locationPatientList = [];
  search: any = null;
  status: any = null;
  location_id: any;

  constructor(
    private pageService: PageService,
    private patientService: PatientMService,
    private fileSaver: FileSaverService,
    private authService: AuthService,
    private bipService: BipService,
    private location: Location,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this.pageService.onInitPage();
    this.getTableData();

    this.user = this.authService.user as AppUser;
    this.roles = this.user.roles[0];
    this.location_id = this.user.location_id;

    this.user = this.authService.user as AppUser;
    this.getPatiensByDoctor();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getPatiensByDoctor() {
    this.patientService.getPatientsByDoctor(this.user.id).subscribe((resp) => {
      // console.log(resp);
      this.doctorPatientList = resp.patients.data;
    });
    this.getPatiensByLocation();
  }
  getPatiensByLocation() {
    this.patientService
      .getPatientByLocations(this.location_id)
      .subscribe((resp) => {
        // console.log(resp);
        this.locationPatientList = resp.patients.data;
      });
  }

  isMaladaptiveBip() {
    this.bipService.getBipByPatient_id(this.patient_id).subscribe((resp) => {
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
    this.isLoading = true;
    this.patientList = [];
    this.serialNumberArray = [];

    this.patientService
      .listPatients(this.search, this.status, this.location_id)
      .subscribe(
        (resp: any) => {
          this.totalDatapatient = resp.patients.data.length;
          this.patient_generals = resp.patients.data;
          this.patientid = resp.patients.data.id;
          this.patient_id = resp.patients.data.patient_id;
          this.getTableDataGeneral();
          this.isLoading = false;
          //  this.isMaladaptiveBip();
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
        }
      );
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
      .subscribe((resp) => {
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
  searchDataLocation(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.locationPatientList = this.dataSource.filteredData;
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

  sortDataDoctorLocation(sort: any) {
    const data = this.locationPatientList.slice();

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
    this.getPatiensByLocation();
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

  cambiarStatus(data: any) {
    const VALUE = data.status;
    // console.log(VALUE);

    this.patientService.updateStatus(data, data.id).subscribe((resp) => {
      // console.log(resp);
      Swal.fire('Updated', `Client Status Updated successfully!`, 'success');
      this.getTableData();
    });
  }

  openActionModal(patient: any) {
    const actions = this.getActionsForPatient(patient);
    console.log('Actions before opening modal:', actions);
    this.dialog.open(ActionModalComponent, {
      width: '300px',
      data: { patient, actions },
    });
  }

  getActionsForPatient(patient: any): any[] {
    const allActions = [
      {
        title: 'BIP Create',
        icon: 'fa fa-address-book',
        buttonClass: 'btn-outline-success',
        onClick: () =>
          this.router.navigate([AppRoutes.bip.attention, patient.patient_id]),
      },
      {
        title: 'BIP View',
        icon: 'fa fa-eye',
        buttonClass: 'btn-outline-dark',
        onClick: () =>
          this.router.navigate([AppRoutes.bip.profile, patient.patient_id]),
      },
      {
        title: 'Create RBT Note',
        icon: 'fa fa-id-card',
        buttonClass: 'btn-outline-success',
        onClick: () =>
          this.router.navigate([AppRoutes.noteRbt.noteRbt, patient.patient_id]),
      },
      {
        title: 'RBT Note list',
        icon: 'fa fa-bars',
        buttonClass: 'btn-outline-primary',
        onClick: () =>
          this.router.navigate([AppRoutes.noteRbt.list, patient.patient_id]),
      },
      {
        title: 'Create BCBA Note',
        icon: 'fa fa-id-badge',
        buttonClass: 'btn-outline-secondary',
        onClick: () =>
          this.router.navigate([
            AppRoutes.noteBcba.noteBcba,
            patient.patient_id,
          ]),
      },
      {
        title: 'BCBA Note list',
        icon: 'fa fa-bars',
        buttonClass: 'btn-outline-primary',
        onClick: () =>
          this.router.navigate([AppRoutes.noteBcba.list, patient.patient_id]),
      },
      // {
      //   title: 'Log Report',
      //   icon: 'fa fa-check-circle',
      //   buttonClass: 'btn-outline-warning',
      //   onClick: () =>
      //     this.router.navigate([
      //       AppRoutes.clientReport.byClient,
      //       patient.patient_id,
      //     ]),
      // },
    ];
    const filteredActions = allActions.filter((action) =>
      this.canShowAction(action, patient)
    );
    return filteredActions;
  }

  canShowAction(action: any, patient: any): boolean {
    if (patient.status !== 'active') {
      return false;
    }

    switch (action.title) {
      case 'BIP Create':
        return ['SUPERADMIN', 'MANAGER', 'LM', 'BCBA'].includes(this.roles);
      case 'BIP View':
        return this.isPermission('view_bip');
      case 'Create RBT Note':
      case 'RBT Note list':
        return ['SUPERADMIN', 'MANAGER', 'LM', 'RBT'].includes(this.roles);
      case 'Create BCBA Note':
      case 'BCBA Note list':
        return ['SUPERADMIN', 'MANAGER', 'LM', 'BCBA'].includes(this.roles);
      case 'Log Report':
        return ['SUPERADMIN', 'MANAGER'].includes(this.roles);
      default:
        return false;
    }
  }
}
