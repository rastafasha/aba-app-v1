import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ChartData,
  ChartOptions,
} from 'src/app/shared/models/chart-options.model';
import { AppUser } from 'src/app/shared/models/users.models';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  routes = AppRoutes;
  @ViewChild('chart') chart!: ChartComponent;
  chartOptionsOne: Partial<ChartOptions>;
  chartOptionsTwo: Partial<ChartOptions>;
  chartOptionsThree: Partial<ChartOptions>;
  selectedValue = new Date().getFullYear().toString();

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

  constructor(
    private dashboardService: DashboardService,
    private pageService: PageService
  ) {
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
      series: [],
      xaxis: {
        categories: [], //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    };
    this.chartOptionsTwo = {
      chart: {
        height: 250,
        width: 330,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },

      series: [44, 55],
      labels: ['Male', 'Female'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        position: 'bottom',
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
          name: 'Low',
          color: '#D5D7ED',
          data: [20, 30, 41, 67, 22, 43, 40, 10, 30, 20, 40],
        },
        {
          name: 'High',
          color: '#2E37A4',
          data: [13, 23, 20, 8, 13, 27, 30, 25, 10, 15, 20],
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
  }

  ngOnInit(): void {
    this.pageService.onInitPage();

    this.getDoctors();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
  }

  getDoctors() {
    this.dashboardService.getConfigDashboard().subscribe((resp) => {
      // console.log(resp);
      this.doctors = resp.doctors;
    });
  }

  dashboardDoctor() {
    const data = {
      doctor_id: this.doctor_id,
    };
    this.dashboardService.dashboardDoctor(data).subscribe((resp) => {
      // console.log(resp);

      this.appointments = resp.appointments?.data;

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
      this.query_income_year = resp.query_income_year ?? [];
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
      this.query_patient_by_genders = resp.query_patients_by_gender ?? [];
      const data_by_gender = [];

      this.query_patient_by_genders.forEach((item) => {
        data_by_gender.push(parseInt(item.hombre));
        data_by_gender.push(parseInt(item.mujer));
      });

      this.chartOptionsTwo.series = data_by_gender;
      //end
      //start
      this.query_n_appointment_year = resp.query_n_appointment_year ?? [];
      this.query_n_appointment_year_before =
        resp.query_n_appointment_year_before ?? [];

      const n_appointment_year = [];
      this.query_n_appointment_year.forEach((item) => {
        n_appointment_year.push(item.count_appointments);
      });
      const n_appointment_year_before = [];
      this.query_n_appointment_year_before.forEach((item) => {
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

  selectDoctor() {
    this.dashboardDoctor();
    this.dashboardDoctorYear();
  }

  selectedYear() {
    this.dashboardDoctorYear();
  }

  selecedList: ChartData[] = [
    { value: '2022' },
    { value: '2023' },
    { value: '2024' },
    { value: '2025' },
    { value: '2026' },
  ];
  selecedLists: ChartData[] = [
    { value: 'This Week' },
    { value: 'Last Week' },
    { value: 'This Month' },
    { value: 'Last Month' },
  ];
}
