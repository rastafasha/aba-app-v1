import { Component, OnInit, ViewChild } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexResponsive,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
} from 'ng-apexcharts';
import { DataService } from 'src/app/shared/data/data.service';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  pageSelection,
  apiResultFormat,
  patientDashboard,
} from 'src/app/shared/models/models';
import { DashboardService } from '../service/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/medical/doctors/service/doctor.service';
interface data {
  value: string;
}
export type ChartOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markers: ApexMarkers | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yaxis: ApexYAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: ApexTitleSubtitle | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip: ApexTooltip | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent implements OnInit {
  public routes = AppRoutes;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsOne: Partial<ChartOptions>;
  public chartOptionsTwo: Partial<ChartOptions>;
  public chartOptionsThree: Partial<ChartOptions>;
  public chartOptionsFour: Partial<ChartOptions>;
  public chartOptionsFive: Partial<ChartOptions>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public carousel1: any = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public carousel2: any = [];
  selected!: Date | null;
  public selectedValue!: string;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '30px',
  };

  public patientDashboard: Array<patientDashboard> = [];
  dataSource!: MatTableDataSource<patientDashboard>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;

  public patientProfile: any[];
  option_selected: number = 1;
  public patient_id: any;

  public doctors: any = [];
  public doctor_id: any;

  public appointments: any = [];
  public num_appointments_current: number = 0;
  public num_appointments_before: number = 0;
  public porcentaje_d: number = 0;
  public num_appointments_attention_current: number = 0;
  public num_appointments_attention_before: number = 0;
  public porcentaje_da: number = 0;
  public num_appointments_total_pay_current: number = 0;
  public num_appointments_total_pay_before: number = 0;
  public porcentaje_dtp: number = 0;
  public num_appointments_total_pending_current: number = 0;
  public num_appointments_total_pending_before: number = 0;
  public porcentaje_dtpn: number = 0;

  public query_income_year: any = [];
  public query_patient_by_genders: any = [];
  public query_n_appointment_year: any = [];
  public query_n_appointment_year_before: any = [];

  public user: any;
  public patients: any = [];

  public text_success: string = '';
  public text_validation: string = '';

  constructor(
    private data: DataService,
    public dashboardService: DashboardService,
    public activatedRoute: ActivatedRoute,
    public doctorService: DoctorService
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
    this.doctorService.closeMenuSidebar();
    this.getTableData();
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');

    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((resp: any) => {
      // console.log(resp);
      this.patient_id = resp.id;
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
    this.dashboardService.getConfigDashboardPatient().subscribe((resp: any) => {
      console.log(resp);
      this.patients = resp.patients;
    });
  }

  dashboardDoctor() {
    let data = {
      doctor_id: this.doctor_id,
    };
    this.dashboardService.dashboardDoctor(data).subscribe((resp: any) => {
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
    let data = {
      year: this.selectedValue,
      doctor_id: this.doctor_id,
    };
    this.query_income_year = null;
    this.query_n_appointment_year = null;
    this.query_n_appointment_year_before = null;
    this.dashboardService.dashboardDoctorYear(data).subscribe((resp: any) => {
      // console.log(resp);

      //start
      this.query_income_year = resp.query_income_year;
      let data_income: any = [];
      this.query_income_year.forEach((element: any) => {
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
      let data_by_gender: any = [];

      this.query_patient_by_genders.forEach((item: any) => {
        data_by_gender.push(parseInt(item.hombre));
        data_by_gender.push(parseInt(item.mujer));
      });

      this.chartOptionsTwo.series = data_by_gender;
      //end
      //start
      this.query_n_appointment_year = resp.query_n_appointment_year;
      this.query_n_appointment_year_before =
        resp.query_n_appointment_year_before;

      let n_appointment_year: any = [];
      this.query_n_appointment_year.forEach((item: any) => {
        n_appointment_year.push(item.count_appointments);
      });
      let n_appointment_year_before: any = [];
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
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }
  private getTableData(): void {
    this.patientDashboard = [];
    this.serialNumberArray = [];

    this.data.getPatientDashboard().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: patientDashboard, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.patientDashboard.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<patientDashboard>(
        this.patientDashboard
      );
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientDashboard = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
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

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
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

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
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

  selecedList: data[] = [
    { value: '2022' },
    { value: '2021' },
    { value: '2020' },
    { value: '2019' },
  ];
}
