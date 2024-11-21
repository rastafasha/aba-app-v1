import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileSaverService } from 'ngx-filesaver';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as XLSX from 'xlsx';
import { InsuranceService } from '../../../../core/services/insurances.service';
import { Location } from '@angular/common';
import { PageService } from 'src/app/shared/services/pages.service';
declare var $: any;

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss'],
})
export class InsuranceListComponent {
  routes = AppRoutes;

  insuranceList = [];
  dataSource!: MatTableDataSource<any>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalDataInsurance = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  insurance_generals = [];
  insurance_id: any;
  insurance_selected: any;
  text_validation: any;

  constructor(
    private pageService: PageService,
    private fileSaver: FileSaverService,
    private insuranceService: InsuranceService,
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
    this.insuranceList = [];
    this.serialNumberArray = [];

    this.insuranceService.listData().subscribe((resp) => {
      // console.log(resp);

      this.totalDataInsurance = resp.insurances.data.length;
      this.insurance_generals = resp.insurances.data;
      this.insurance_id = resp.insurances.id;
      this.getTableDataGeneral();
    });
  }

  getTableDataGeneral() {
    this.insuranceList = [];
    this.serialNumberArray = [];

    this.insurance_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.insuranceList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.insuranceList);
    this.calculateTotalPages(this.totalDataInsurance, this.pageSize);
  }
  selectInsurance(insurance: any) {
    this.insurance_selected = insurance;
  }
  deleteInsurance() {
    this.insuranceService
      .delete(this.insurance_selected.id)
      .subscribe((resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          const INDEX = this.insuranceList.findIndex(
            (item) => item.id === this.insurance_selected.id
          );
          if (INDEX !== -1) {
            this.insuranceList.splice(INDEX, 1);

            $('#delete_insurance').hide();
            $('#delete_insurance').removeClass('show');
            $('.modal-backdrop').remove();
            $('body').removeClass();
            $('body').removeAttr('style');
            this.insurance_selected = null;
          }
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.insuranceList = this.dataSource.filteredData;
  }

  sortData(sort: any) {
    const data = this.insuranceList.slice();

    if (!sort.active || sort.direction === '') {
      this.insuranceList = data;
    } else {
      this.insuranceList = data.sort((a, b) => {
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
    const worksheet = XLSX.utils.json_to_sheet(this.insurance_generals);

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

    this.fileSaver.save(blobData, 'insurance_db_aba_therapy');
  }
  csvExport() {
    const CSV_TYPE = 'csv/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.insurance_generals);

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
      'insurance_db_aba_therapy_csv',
      CSV_EXTENSION
    );
  }

  txtExport() {
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.insurance_generals);

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

    this.fileSaver.save(blobData, 'insurance_db_aba_therapy', TXT_EXTENSION);
  }

  pdfExport() {
    // var doc = new jspdf();
    // const worksheet = XLSX.utils.json_to_sheet(this.insurance_generals);
    // const workbook = {
    //   Sheets:{
    //     'testingSheet': worksheet
    //   },
    //   SheetNames:['testingSheet']
    // }
    // doc.html(document.body, {
    //   callback: function (doc) {
    //     doc.save('doctors_db_aba_project.pdf');
    //   }
    // });
  }
}
