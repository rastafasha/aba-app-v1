import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { RolesService } from '../service/roles.service';

import { Location } from '@angular/common';
import { FileSaverService } from 'ngx-filesaver';
import { PageService } from 'src/app/shared/services/pages.service';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-list-role-user',
  templateUrl: './list-role-user.component.html',
  styleUrls: ['./list-role-user.component.scss'],
})
export class ListRoleUserComponent implements OnInit {
  routes = AppRoutes;

  rolesList = [];
  dataSource!: MatTableDataSource<any>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalData = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  role_generals = [];
  role_id: any;
  role_selected: any;
  text_validation: any;

  constructor(
    private rolesService: RolesService,
    private pageService: PageService,
    private fileSaver: FileSaverService,
    private location: Location
  ) {}

  ngOnInit() {
    this.pageService.onInitPage();
    this.getTableData();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  private getTableData(): void {
    this.rolesList = [];
    this.serialNumberArray = [];

    this.rolesService.listRoles().subscribe((resp) => {
      console.log(resp);

      this.totalData = resp.roles.length;
      this.role_generals = resp.roles;
      this.role_id = resp.roles.id;
      this.getTableDataGeneral();
    });
  }

  getTableDataGeneral() {
    this.rolesList = [];
    this.serialNumberArray = [];

    this.role_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.rolesList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.rolesList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }
  selectRol(rol: any) {
    this.role_selected = rol;
  }
  deleteRol() {
    this.rolesService.deleteRole(this.role_selected.id).subscribe((resp) => {
      // console.log(resp);

      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        const INDEX = this.rolesList.findIndex(
          (item) => item.id === this.role_selected.id
        );
        if (INDEX !== -1) {
          this.rolesList.splice(INDEX, 1);

          $('#delete_patient').hide();
          $('#delete_patient').removeClass('show');
          $('.modal-backdrop').remove();
          $('body').removeClass();
          $('body').removeAttr('style');
          this.role_selected = null;
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.rolesList = this.dataSource.filteredData;
  }

  sortData(sort: any) {
    const data = this.rolesList.slice();

    if (!sort.active || sort.direction === '') {
      this.rolesList = data;
    } else {
      this.rolesList = data.sort((a, b) => {
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

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
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
    const worksheet = XLSX.utils.json_to_sheet(this.role_generals);

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

    this.fileSaver.save(blobData, 'roles_db_aba_therapy');
  }
  csvExport() {
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.role_generals);

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

    this.fileSaver.save(blobData, 'roles_db_aba_therapy_csv', CSV_EXTENSION);
  }

  txtExport() {
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.role_generals);

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

    this.fileSaver.save(blobData, 'roles_db_aba_therapy', TXT_EXTENSION);
  }

  pdfExport() {
    // var doc = new jspdf();
    // const worksheet = XLSX.utils.json_to_sheet(this.role_generals);
    // const workbook = {
    //   Sheets:{
    //     'testingSheet': worksheet
    //   },
    //   SheetNames:['testingSheet']
    // }
    // doc.html(document.body, {
    //   callback: function (doc) {
    //     doc.save('roles_db_aba_therapy_csv.pdf');
    //   }
    // });
  }

  closeMenuSidebar() {
    $('.sidebar').addClass('cerrar');
    $('.menu-opened').remove('menu-opened');
  }
}
