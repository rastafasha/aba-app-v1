import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ChartData,
  ChartOptions,
} from 'src/app/core/models/chart-options.model';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import {
  DashboardDoctorYear,
  DashboardService,
} from '../service/dashboard.service';
import { DoctorV2 } from 'src/app/core/models';
import {
  CHART_OPTIONS_1,
  CHART_OPTIONS_2,
  CHART_OPTIONS_3,
} from './doctor-dashboard.const';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  routes = AppRoutes;
  @ViewChild('chart') chart!: ChartComponent;
  chartOptionsIncome: Partial<ChartOptions>;
  chartOptionsTwo: Partial<ChartOptions>;
  chartOptionsThree: Partial<ChartOptions>;
  currentYear = new Date().getFullYear();

  doctors: DoctorV2[] = [];
  doctor_id: number;

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
    this.chartOptionsIncome = JSON.parse(JSON.stringify(CHART_OPTIONS_1));
    this.chartOptionsTwo = JSON.parse(JSON.stringify(CHART_OPTIONS_2));
    this.chartOptionsThree = JSON.parse(JSON.stringify(CHART_OPTIONS_3));
  }

  ngOnInit(): void {
    this.pageService.onInitPage();

    this.getDoctors();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
  }

  getDoctors() {
    this.dashboardService.getConfigDashboard().subscribe((resp) => {
      this.doctors = resp.doctors;
    });
  }

  dashboardDoctor(doctor_id: number) {
    this.dashboardService.dashboardDoctor({ doctor_id }).subscribe((resp) => {
      console.log(resp);

      // no encuentro este dato
      this.appointments = [];

      this.num_appointments_current = resp.num_bips_attention_current;
      this.num_appointments_before = resp.num_bips_attention_before;
      this.porcentaje_d = resp.porcentaje_d;

      this.num_appointments_attention_current = resp.num_bips_attention_current;
      this.num_appointments_attention_before = resp.num_bips_attention_before;
      this.porcentaje_da = resp.porcentaje_da;

      this.num_appointments_total_pay_current = 0;
      // resp.num_appointments_total_pay_current;
      this.num_appointments_total_pay_before = 0;
      // resp.num_appointments_total_pay_before;
      this.porcentaje_dtp = 0;
      // resp.porcentaje_dtp;

      this.num_appointments_total_pending_current = 0;
      //  resp.num_appointments_total_pending_current;
      this.num_appointments_total_pending_before = 0;
      // resp.num_appointments_total_pending_before;
      this.porcentaje_dtpn = 0;
      //  resp.porcentaje_dtpn;
    });
  }
  dashboardDoctorYear(doctor_id: number, year: number): void {
    const data = {
      year,
      doctor_id,
    };
    this.query_income_year = null;
    this.query_n_appointment_year = null;
    this.query_n_appointment_year_before = null;
    this.dashboardService.dashboardDoctorYear(data).subscribe((resp) => {
      console.log(resp);
      this.setChartOptionsIncome(resp);

      //start
      /*
      this.query_patient_by_genders = resp.query_patients_by_gender ?? [];
      const data_by_gender = [];

      this.query_patient_by_genders.forEach((item) => {
        data_by_gender.push(parseInt(item.hombre));
        data_by_gender.push(parseInt(item.mujer));
      });

      this.chartOptionsTwo.series = data_by_gender;
      //end
      //start
      this.query_n_appointment_year = []; // resp.query_n_appointment_year ?? [];
      this.query_n_appointment_year_before = []; //        resp.query_n_appointment_year_before ?? [];

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
            name: this.currentYear + '',
            color: '#2E37A4',
            data: n_appointment_year,
          },
          {
            name: this.currentYear - 1 + '',

            color: '#D5D7ED',
            data: n_appointment_year_before,
          },
        ],
        xaxis: {
          categories: resp.months_name,
        },
      };
      //end
      */
    });
  }

  setChartOptionsIncome(resp: DashboardDoctorYear) {
    //start
    this.query_income_year = resp.query_patients_by_gender ?? [];
    const data_income = [];
    this.query_income_year.forEach((element) => {
      data_income.push(element.income);
    });

    this.chartOptionsIncome = {
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

    this.chartOptionsIncome.xaxis.categories = resp.months_name;
    this.chartOptionsIncome.series = [
      {
        name: 'Income',
        color: '#2E37A4',
        data: data_income,
      },
    ];
  }

  selectDoctor(doctor_id: number) {
    this.dashboardDoctor(doctor_id);
    this.dashboardDoctorYear(doctor_id, this.currentYear);
  }

  selectedYear(year: number) {
    this.dashboardDoctorYear(this.doctor_id, year);
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
