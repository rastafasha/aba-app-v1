import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ChartComponent } from 'ng-apexcharts';
import { DataService } from 'src/app/shared/data/data.service';
import {
  ChartData,
  ChartOptions,
} from 'src/app/core/models/chart-options.model';
import { RecentPatients, UpcomingAppointments } from 'src/app/core/models';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { DashboardService } from '../service/dashboard.service';
import {
  chartOptionsOne,
  chartOptionsThree,
  chartOptionsTwo,
} from './admin-dashboard.const';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  routes = AppRoutes;
  selectedValue: string = new Date().getFullYear().toString();
  @ViewChild('chart') chart!: ChartComponent;
  chartOptionsOne: Partial<ChartOptions>;
  chartOptionsTwo: Partial<ChartOptions>;
  chartOptionsThree: Partial<ChartOptions>;

  recentPatients: RecentPatients[] = [];
  upcomingAppointments: UpcomingAppointments[] = [];

  //datos reales
  bips = [];
  appointment_pendings = [];

  num_bips_current = 0;
  num_bips_before = 0;
  porcentaje_d = 0;

  num_patients_current = 0;
  num_patients_before = 0;
  porcentaje_dp = 0;

  num_bips_attention_current = 0;
  num_bips_attention_before = 0;
  porcentaje_da = 0;

  num_bips_total_current = 0;
  num_bips_total_before = 0;
  porcentaje_dt = 0;
  total_patients = 0;

  query_patient_by_genders = [];
  query_patients_specialities = [];
  query_patients_speciality_porcentaje = [];
  query_income_year = [];

  recent_patients = [];
  locations = [];
  user: AppUser;
  total_bips: number;
  total_noteRbts: number;
  total_noteBcbas: number;
  total_employees: number;

  selecedList: ChartData[] = [
    { value: '2022' },
    { value: '2023' },
    { value: '2024' },
    { value: '2025' },
    { value: '2026' },
    { value: '2027' },
    { value: '2028' },
    { value: '2029' },
    { value: '2030' },
  ];

  constructor(
    private data: DataService,
    private dashboardService: DashboardService,
    private pageService: PageService,
    private authService: AuthService,

  ) {
    this.chartOptionsOne = chartOptionsOne;
    this.chartOptionsTwo = chartOptionsTwo;
    this.chartOptionsThree = chartOptionsThree;
    this.recentPatients = this.data.recentPatients;
    this.upcomingAppointments = this.data.upcomingAppointments;
  }

  ngOnInit() {
    this.pageService.onInitPage();

    this.getDashboardAdmin();
    this.getDashboardAdminYear();
    // this.getAppointmentPending();
    this.user = this.authService.user as AppUser;
  }

  getAppointmentPending() {
    // this.appointmentService.pendings().subscribe((resp:any)=>{
    //   // console.log(resp);
    //   this.appointment_pendings = resp.appointments.data;
    // })
  }

  getDashboardAdmin() {
    this.dashboardService.dashboardAdmin({}).subscribe((resp) => {
      // console.log(resp);

      this.bips = resp.bips.data;
      this.total_bips = resp.total_bips;

      this.num_bips_current = resp.num_bips_current;
      this.num_bips_before = resp.num_bips_before;
      this.porcentaje_d = resp.porcentaje_d;

      this.num_patients_current = resp.num_patients_current;
      this.num_patients_before = resp.num_patients_before;
      this.porcentaje_dp = resp.porcentaje_dp;

      this.num_bips_attention_current = resp.num_bips_attention_current;
      this.num_bips_attention_before = resp.num_bips_attention_before;
      this.porcentaje_da = resp.porcentaje_da;

      this.num_bips_total_current = resp.num_bips_total_current;
      this.num_bips_total_before = resp.num_bips_total_before;
      this.porcentaje_dt = resp.porcentaje_dt;
      this.total_patients = resp.total_patients;
      this.total_noteRbts = resp.total_noteRbts;
      this.total_noteBcbas = resp.total_noteBcbas;
      this.total_employees = resp.total_employees;
      this.recent_patients = resp.recent_patients;
      this.locations = resp.locations.data;
    });
  }

  getDashboardAdminYear() {
    const data = {
      year: this.selectedValue,
    };
    this.query_income_year = null;
    this.dashboardService.dashboardAdminYear(data).subscribe((resp) => {
      //start
      this.query_patient_by_genders = resp.query_patients_by_gender;

      const data_male = [];
      const data_female = [];
      this.query_patient_by_genders.forEach((item) => {
        data_male.push(item.hombre);
        data_female.push(item.mujer);
      });

      const patientByGenders = [
        {
          name: 'Male',
          color: '#2E37A4',
          data: data_male,
        },
        {
          name: 'Female',
          color: '#00D3C7',
          data: data_female,
        },
      ];
      this.chartOptionsOne.series = patientByGenders;
      //end

      //start
      this.query_patients_specialities = resp.query_patients_speciality;

      const labels_sp = [];
      const series_sp = [];
      // this.query_patients_specialities.forEach((patients_speciality:any)=>{
      //   labels_sp.push(patients_speciality.name)
      //   series_sp.push(patients_speciality.count)
      // })
      this.chartOptionsTwo.labels = labels_sp;
      this.chartOptionsTwo.series = series_sp;
      //end
      //start
      // this.query_patients_speciality_porcentaje = resp.query_patients_speciality_porcentaje;
      //end
      //start
      this.query_income_year = resp.query_income_year;
      const data_income = [];
      // this.query_income_year.forEach((element:any) => {
      //   data_income.push(element.income);
      // });

      this.chartOptionsThree = {
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

      // this.chartOptionsThree.xaxis.categories = resp.months_name
      // this.chartOptionsThree.series = [
      //   {
      //     name: 'Income',
      //     color: '#2E37A4',
      //     data: data_income,
      //   },
      // ]
      //end
    });
  }

  sortData(sort: Sort) {
    const data = this.recentPatients.slice();
    const datas = this.upcomingAppointments.slice();

    if (!sort.active || sort.direction === '') {
      this.recentPatients = data;
      this.upcomingAppointments = datas;
    } else {
      this.recentPatients = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
      this.upcomingAppointments = datas.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  selectedYear() {
    // console.log(this.selectedValue);
    this.getDashboardAdminYear();
  }
}
