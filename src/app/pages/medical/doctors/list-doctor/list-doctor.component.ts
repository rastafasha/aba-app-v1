import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as jsPDF from 'jspdf';
import { FileSaverService } from 'ngx-filesaver';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { DoctorService } from '../service/doctor.service';
import { AppUser } from 'src/app/shared/models/users.models';
import { PageService } from 'src/app/shared/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss'],
})
export class ListDoctorComponent implements OnInit {
  routes = AppRoutes;

  doctorList = [];
  dataSource!: MatTableDataSource<any>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalDatadoctor = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  doctor_generals = [];
  doctorEmployeesList = [];
  role: string;
  doctor_id: any;
  doctor_selected: any;
  text_validation: any;
  user: AppUser;
  locationId: any;

  constructor(
    private doctorService: DoctorService,
    private fileSaver: FileSaverService,
    private authService: AuthService,
    private pageService: PageService,
    private location: Location
  ) {}
  ngOnInit() {
    this.pageService.onInitPage();
    this.getTableData();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.role = this.user.roles[0];
    this.locationId = this.user.location_id;

    this.user = this.authService.user as AppUser;
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

  getPatiensByLocation() {
    this.doctorService
      .getEmployeesByLocation(this.locationId)
      .subscribe((resp) => {
        // console.log(resp);
        this.doctorEmployeesList = resp.patients.data;
      });
  }

  private getTableData(): void {
    this.doctorList = [];
    this.serialNumberArray = [];

    this.doctorService.listDoctors().subscribe((resp) => {
      // console.log(resp);

      this.totalDatadoctor = resp.users.data.length;
      this.doctor_generals = resp.users.data;
      this.doctor_id = resp.users.id;
      this.getTableDataGeneral();
    });
  }

  getTableDataGeneral() {
    this.doctorList = [];
    this.serialNumberArray = [];

    this.doctor_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.doctorList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.doctorList);
    this.calculateTotalPages(this.totalDatadoctor, this.pageSize);
  }
  selectUser(doctor: any) {
    this.doctor_selected = doctor;
  }
  deleteRol() {
    this.doctorService
      .deleteDoctor(this.doctor_selected.id)
      .subscribe((resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          const INDEX = this.doctorList.findIndex(
            (item) => item.id === this.doctor_selected.id
          );
          if (INDEX !== -1) {
            this.doctorList.splice(INDEX, 1);

            $('#delete_patient').hide();
            $('#delete_patient').removeClass('show');
            $('.modal-backdrop').remove();
            $('body').removeClass();
            $('body').removeAttr('style');
            this.doctor_selected = null;
          }
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.doctorList = this.dataSource.filteredData;
  }

  sortData(sort: any) {
    const data = this.doctorList.slice();

    if (!sort.active || sort.direction === '') {
      this.doctorList = data;
    } else {
      this.doctorList = data.sort((a, b) => {
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

  private calculateTotalPages(totalDatadoctor: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalDatadoctor / pageSize;
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
    const worksheet = XLSX.utils.json_to_sheet(this.doctor_generals);

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

    this.fileSaver.save(blobData, 'employers_db_aba_therapy');
  }
  csvExport() {
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.doctor_generals);

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

    this.fileSaver.save(
      blobData,
      'employers_db_aba_therapy_csv',
      CSV_EXTENSION
    );
  }

  txtExport() {
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.doctor_generals);

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

    this.fileSaver.save(blobData, 'employers_db_aba_therapy', TXT_EXTENSION);
  }

  pdfExport() {
    var doc = new jsPDF.jsPDF();

    const worksheet = XLSX.utils.json_to_sheet(this.doctor_generals);

    const workbook = {
      Sheets: {
        testingSheet: worksheet,
      },
      SheetNames: ['testingSheet'],
    };

    doc.html(document.body, {
      callback: function (doc) {
        doc.save('doctors_db_aba_project.pdf');
      },
    });
  }

  cambiarStatus(data: any) {
    const VALUE = data.status;
    console.log(VALUE);

    this.doctorService.updateStatus(data, data.id).subscribe((resp) => {
      // console.log(resp);
      Swal.fire('Updated', `Employee Status Updated successfully!`, 'success');
      this.getTableData();
    });
  }
}
