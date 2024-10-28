import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileSaverService } from 'ngx-filesaver';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import * as XLSX from 'xlsx';
import { LocationService } from '../services/location.service';
import { LocationApi } from '../models/locations.model';

declare var $: any;
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent implements OnInit {
  routes = AppRoutes;

  locationList = [];
  dataSource!: MatTableDataSource<LocationApi[]>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalDataLocation = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  location_generals = [];
  location_id: any;
  location_selected: any;
  text_validation: any;

  constructor(
    private locationService: LocationService,
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

  private getTableData(page = 1): void {
    this.locationList = [];
    this.serialNumberArray = [];

    this.locationService.getLocations().subscribe((resp) => {
      this.totalDataLocation = resp.total;
      this.locationList = resp.locations.data;
      this.location_id = resp.locations.id;
      this.dataSource = new MatTableDataSource(this.locationList);
      this.calculateTotalPages(this.totalDataLocation, this.pageSize);
    });
  }

  getTableDataGeneral() {
    this.locationList = [];
    this.serialNumberArray = [];

    this.location_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.locationList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.locationList);
    this.calculateTotalPages(this.totalDataLocation, this.pageSize);
  }
  selectUser(staff: any) {
    this.location_selected = staff;
  }

  deletePatient() {
    this.locationService
      .deleteLocation(this.location_selected.id)
      .subscribe((resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          const INDEX = this.locationList.findIndex(
            (item: any) => item.id === this.location_selected.id
          );
          if (INDEX !== -1) {
            this.locationList.splice(INDEX, 1);

            $('#delete_patient').hide();
            $('#delete_patient').removeClass('show');
            $('.modal-backdrop').remove();
            $('body').removeClass();
            $('body').removeAttr('style');
            this.location_selected = null;
            this.getTableData();
          }
        }
      });
  }

  searchData() {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  sortData(sort: any) {
    const data = this.locationList.slice();

    if (!sort.active || sort.direction === '') {
      this.locationList = data;
    } else {
      this.locationList = data.sort((a, b) => {
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
      this.getTableData(this.currentPage);
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
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
    this.getTableData(this.currentPage);
  }

  PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
    this.searchDataValue = '';
  }

  private calculateTotalPages(
    totalDataPatient: number,
    pageSize: number
  ): void {
    this.pageNumberArray = [];
    this.totalPages = totalDataPatient / pageSize;
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
    const worksheet = XLSX.utils.json_to_sheet(this.locationList);

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
    const worksheet = XLSX.utils.json_to_sheet(this.locationList);

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
    const worksheet = XLSX.utils.json_to_sheet(this.locationList);

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
    // const worksheet = XLSX.utils.json_to_sheet(this.locationList);
    // const workbook = {
    //   Sheets:{
    //     'testingSheet': worksheet
    //   },
    //   SheetNames:['testingSheet']
    // }
    // doc.html(document.body, {
    //   callback: function (doc) {
    //     doc.save('patients_db_aba_project.pdf');
    //   }
    // });
  }

  cambiarStatus(data: any) {
    // const VALUE = data.eligibility;
    // console.log(VALUE);
    // this.locationService.(data, data.id).subscribe(
    //   resp =>{
    //     console.log(resp);
    //     this.getTableData();
    //   }
    // )
  }
}
