import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageSelection, ApiResponse, StaffHolidays } from 'src/app/core/models';
import { DataService } from 'src/app/shared/data/data.service';

@Component({
  selector: 'app-staff-holiday',
  templateUrl: './staff-holiday.component.html',
  styleUrls: ['./staff-holiday.component.scss'],
})
export class StaffHolidayComponent implements OnInit {
  routes = AppRoutes;

  staffHoliday: Array<StaffHolidays> = [];
  dataSource!: MatTableDataSource<StaffHolidays>;

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
  pageSelection: PageSelection[] = [];
  totalPages = 0;

  constructor(public data: DataService) {}
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.staffHoliday = [];
    this.serialNumberArray = [];

    this.data.getStaffHoliday().subscribe((data: ApiResponse) => {
      this.totalData = data.total;
      data.data.map((res: StaffHolidays, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.staffHoliday.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<StaffHolidays>(
        this.staffHoliday
      );
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.staffHoliday = this.dataSource.filteredData;
  }

  sortData(sort: Sort) {
    const data = this.staffHoliday.slice();

    if (!sort.active || sort.direction === '') {
      this.staffHoliday = data;
    } else {
      this.staffHoliday = data.sort((a, b) => {
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
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
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
    this.getTableData();
  }

  PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
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
}
