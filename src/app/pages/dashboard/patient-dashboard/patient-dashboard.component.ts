import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { DataService } from 'src/app/shared/data/data.service';
import {
  ChartData,
  ChartOptions,
} from 'src/app/core/models/chart-options.model';
import {
  ApiResponse,
  PageSelection,
  PatientDashboard,
} from 'src/app/core/models';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent implements OnInit {
  routes = AppRoutes;
  @ViewChild('chart') chart!: ChartComponent;
  chartOptionsOne: Partial<ChartOptions>;
  chartOptionsTwo: Partial<ChartOptions>;
  chartOptionsThree: Partial<ChartOptions>;
  chartOptionsFour: Partial<ChartOptions>;
  chartOptionsFive: Partial<ChartOptions>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carousel1 = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carousel2 = [];
  selected!: Date | null;
  selectedValue!: string;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '30px',
  };

  patientDashboard: PatientDashboard[] = [];
  dataSource!: MatTableDataSource<PatientDashboard>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalData = 0;
  skip = 0;
  limit = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection: PageSelection[] = [];
  totalPages = 0;

  patientProfile: any[];
  option_selected = 1;
  patient_id: any;

  doctors = [];
  doctor_id: any;

  appointments = [];
  num_appointments_current = 0;
  num_appointments_before = 0;
  porcentaje_d = 0;
  num_appointments_attention_current = 0;
  num_appointments_attention_before = 0;
  porcentaje_da = 0;
  num_appointments_total_pay_current = 0;
  num_appointments_total_pay_before = 0;
  porcentaje_dtp = 0;
  num_appointments_total_pending_current = 0;
  num_appointments_total_pending_before = 0;
  porcentaje_dtpn = 0;

  query_income_year = [];
  query_patient_by_genders = [];
  query_n_appointment_year = [];
  query_n_appointment_year_before = [];

  user: AppUser;
  patients = [];

  text_success = '';
  text_validation = '';

  constructor(
    private data: DataService,
    private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService
  ) {
    this.carousel1 = this.data.carousel1;
    this.carousel2 = this.data.carousel2;

    this.chartOptionsOne = {
      chart: {
        height: 170,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'Health',
          color: '#00D3C7',
          data: [20, 40, 85, 25, 50, 30, 50, 20, 50, 40, 30, 20],
        },
      ],
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };
    this.chartOptionsTwo = {
      chart: {
        height: 200,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'Health',
          color: '#FF3667',
          data: [20, 20, 85, 35, 60, 30, 20],
        },
      ],
      xaxis: {
        categories: ['0', '1', '2', '3', '4', '5', '6'],
      },
    };
    this.chartOptionsThree = {
      chart: {
        height: 230,
        type: 'bar',
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '90%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 6,
        colors: ['transparent'],
      },
      series: [
        {
          name: 'Low',
          color: '#D5D7ED',
          data: [10, 30, 10, 30, 10, 30, 30],
        },
        {
          name: 'High',
          color: '#2E37A4',
          data: [20, 20, 20, 20, 20, 20, 20],
        },
      ],
      xaxis: {
        categories: ['1', '10', '20', '30', '40', '50', '60'],
      },
    };
    this.chartOptionsFour = {
      chart: {
        height: 220,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
      },
      series: [
        {
          name: 'High',
          color: '#2E37A4',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Low',
          color: 'rgba(46, 55, 164, 0.05)',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
      ],
      tooltip: {
        y: {
          formatter: function (val: string) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
    this.chartOptionsFive = {
      chart: {
        height: 200,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'Sleep',
          color: '#2E37A4',
          data: [20, 21, 20, 21, 20, 21, 22],
        },
      ],
      xaxis: {
        categories: ['0', '1', '2', '3', '4', '5', '6'],
      },
    };
  }

  ngOnInit() {
    this.pageService.onInitPage();
    this.getTableData();
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');

    this.activatedRoute.params.subscribe((resp) => {
      // console.log(resp);
      this.patient_id = resp['id'];
    });
    // this.getPatient();
    this.getPatients();
  }

  selectPatient() {
    this.getPatient();
  }

  selectedYear() {
    this.dashboardDoctorYear();
  }

  getPatients() {
    this.dashboardService.getConfigDashboardPatient().subscribe((resp) => {
      console.log(resp);
      this.patients = resp.patients;
    });
  }

  dashboardDoctor() {
    const data = {
      doctor_id: this.doctor_id,
    };
    this.dashboardService.dashboardDoctor(data).subscribe((resp) => {
      // console.log(resp);

      this.appointments = resp.appointments.data;

      this.num_appointments_current = resp.num_appointments_current;
      this.num_appointments_before = resp.num_appointments_before;
      this.porcentaje_d = resp.porcentaje_d;

      this.num_appointments_attention_current =
        resp.num_appointments_attention_current;
      this.num_appointments_attention_before =
        resp.num_appointments_attention_before;
      this.porcentaje_da = resp.porcentaje_da;

      this.num_appointments_total_pay_current =
        resp.num_appointments_total_pay_current;
      this.num_appointments_total_pay_before =
        resp.num_appointments_total_pay_before;
      this.porcentaje_dtp = resp.porcentaje_dtp;

      this.num_appointments_total_pending_current =
        resp.num_appointments_total_pending_current;
      this.num_appointments_total_pending_before =
        resp.num_appointments_total_pending_before;
      this.porcentaje_dtpn = resp.porcentaje_dtpn;
    });
  }
  dashboardDoctorYear() {
    const data = {
      year: this.selectedValue,
      doctor_id: this.doctor_id,
    };
    this.query_income_year = null;
    this.query_n_appointment_year = null;
    this.query_n_appointment_year_before = null;
    this.dashboardService.dashboardDoctorYear(data).subscribe((resp) => {
      // console.log(resp);

      //start
      this.query_income_year = resp.query_income_year;
      const data_income = [];
      this.query_income_year.forEach((element) => {
        data_income.push(element.income);
      });

      this.chartOptionsOne = {
        chart: {
          height: 200,
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        series: [
          {
            name: 'Income',
            color: '#2E37A4',
            data: data_income,
          },
        ],
        xaxis: {
          categories: resp.months_name,
        },
      };

      // this.chartOptionsOne.xaxis.categories = resp.months_name
      // this.chartOptionsOne.series = [
      //   {
      //     name: 'Income',
      //     color: '#2E37A4',
      //     data: data_income,
      //   },
      // ]
      //end

      //start
      this.query_patient_by_genders = resp.query_patients_by_gender;
      const data_by_gender = [];

      this.query_patient_by_genders.forEach((item) => {
        data_by_gender.push(parseInt(item.hombre));
        data_by_gender.push(parseInt(item.mujer));
      });

      this.chartOptionsTwo.series = data_by_gender;
      //end
      //start
      this.query_n_appointment_year = resp.query_n_appointment_year;
      this.query_n_appointment_year_before =
        resp.query_n_appointment_year_before;

      const n_appointment_year = [];
      this.query_n_appointment_year.forEach((item: any) => {
        n_appointment_year.push(item.count_appointments);
      });
      const n_appointment_year_before = [];
      this.query_n_appointment_year_before.forEach((item: any) => {
        n_appointment_year_before.push(item.count_appointments);
      });

      this.chartOptionsThree = {
        chart: {
          height: 230,
          type: 'bar',
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 6,
          colors: ['transparent'],
        },
        series: [
          {
            name: parseInt(this.selectedValue) + '',
            color: '#2E37A4',
            data: n_appointment_year,
          },
          {
            name: parseInt(this.selectedValue) - 1 + '',

            color: '#D5D7ED',
            data: n_appointment_year_before,
          },
        ],
        xaxis: {
          categories: resp.months_name,
        },
      };
      //end
    });
  }

  getPatient() {
    this.dashboardService
      .dashboardPatient(this.patient_id)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
  private getTableData(): void {
    this.patientDashboard = [];
    this.serialNumberArray = [];

    this.data.getPatientDashboard().subscribe((data: ApiResponse) => {
      this.totalData = data.total;
      data.data.map((res: PatientDashboard, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.patientDashboard.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<PatientDashboard>(
        this.patientDashboard
      );
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientDashboard = this.dataSource.filteredData;
  }

  sortData(sort: Sort) {
    const data = this.patientDashboard.slice();

    if (!sort.active || sort.direction === '') {
      this.patientDashboard = data;
    } else {
      this.patientDashboard = data.sort((a, b) => {
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

  selecedList: ChartData[] = [
    { value: '2025' },
    { value: '2024' },
    { value: '2023' },
    { value: '2022' },
    { value: '2021' },
    { value: '2020' },
    { value: '2019' },
  ];
}
