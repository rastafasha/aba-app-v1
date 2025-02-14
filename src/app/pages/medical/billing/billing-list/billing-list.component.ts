import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as jsPDF from 'jspdf';
import { FileSaverService } from 'ngx-filesaver';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import * as XLSX from 'xlsx';
import { DoctorService } from '../../doctors/service/doctor.service';
import { BillingService } from '../billing.service';
import { AppUser } from 'src/app/core/models/users.model';
import { PageService } from 'src/app/shared/services/pages.service';

declare var $: any;
@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.scss'],
})
export class BillingListComponent implements OnInit {
  routes = AppRoutes;

  billingList = [];
  dataSource!: MatTableDataSource<any>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalBilling = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  billing_generals: any;
  billing_id: any;
  billing_selected: any;
  text_validation: any;
  user: AppUser;
  doctor_selected: any;

  constructor(
    private billingService: BillingService,
    private pageService: PageService,
    private fileSaver: FileSaverService,
    private authService: AuthService,
    private location: Location
  ) {}
  ngOnInit() {
    this.pageService.onInitPage();
    this.getTableData();
    this.user = this.authService.user as AppUser;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  isPermission(permission: string) {
    if (this.user.roles.includes('SUPERADMIN')) {
      return true;
    }
    if (this.user.roles.includes('ADMIN')) {
      return true;
    }
    if (this.user.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  selectUser(user: any) {
    throw new Error('Method not implemented');
  }

  private getTableData(): void {
    this.billingList = [];
    this.serialNumberArray = [];

    this.billingService.listBillings().subscribe((resp) => {
      // console.log(resp);

      this.totalBilling = resp.billings.data.length;
      this.billing_generals = resp.billings.data;
      this.billing_id = resp.billings.id;
      this.getTableDataGeneral();
    });
  }

  getTableDataGeneral() {
    this.billingList = [];
    this.serialNumberArray = [];

    this.billing_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.billingList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.billingList);
    this.calculateTotalPages(this.totalBilling, this.pageSize);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.billingList = this.dataSource.filteredData;
  }

  sortData(sort: any) {
    const data = this.billingList.slice();

    if (!sort.active || sort.direction === '') {
      this.billingList = data;
    } else {
      this.billingList = data.sort((a, b) => {
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

  deleteRol() {
    throw new Error('Method not implemented');
  }
  PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneral();
    this.searchDataValue = '';
  }

  private calculateTotalPages(totalBilling: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalBilling / pageSize;
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
    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

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

    this.fileSaver.save(blobData, 'billing_db_aba_therapy');
  }
  csvExport() {
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

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

    this.fileSaver.save(blobData, 'billing_db_aba_therapy_csv', CSV_EXTENSION);
  }

  txtExport() {
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

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

    this.fileSaver.save(blobData, 'billing_db_aba_therapy', TXT_EXTENSION);
  }

  pdfExport() {
    var doc = new jsPDF.jsPDF();

    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

    const workbook = {
      Sheets: {
        testingSheet: worksheet,
      },
      SheetNames: ['testingSheet'],
    };

    doc.html(document.body, {
      callback: function (doc) {
        doc.save('billing_db_aba_project.pdf');
      },
    });
  }
}
