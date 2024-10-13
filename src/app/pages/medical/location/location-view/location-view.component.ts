import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { url_media } from 'src/app/config/config';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss'],
})
export class LocationViewComponent {
  routes = AppRoutes;
  selectedValue!: string;
  option_selected: number = 1;

  dataSource!: MatTableDataSource<any>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  totalDatapatient = 0;
  totalDatadoctor = 0;
  skip = 0;
  limit: number = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  pageNumberArray: number[] = [];
  pageSelection: any[] = [];
  totalPages = 0;

  title: string = '';

  URLMedia = `${url_media}`;
  services: any[] = [];
  patients: any[] = [];
  specialists: any[] = [];
  location_info: any;

  code: any;
  provider: any;
  description: any;
  unit_prize: any;
  hourly_fee: any;
  max_allowed: any;

  location_id: any;
  location_iddd: any;
  user: any;
  roles: any[] = [];
  location_selected: any;

  patient_generals: any[] = [];

  valid_form = false;
  valid_form_success = false;

  text_success: string = '';
  text_validation: string = '';

  patientList: any[] = [];
  specialistList: any[] = [];
  patientid: any;
  patient_id: any;
  doctor_generals: any;
  doctor_id: any;
  search: any = null;
  status: any = null;

  constructor(
    private doctorService: DoctorService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((resp: any) => {
      this.location_id = resp.id;
      // console.log(resp);
    });
    this.getLocation();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.roles = this.user.roles[0];

    this.doctorService.closeMenuSidebar();
  }

  isPermission(permission: string) {
    if (this.user.roles.includes('SUPERADMIN')) {
      return true;
    }
    if (this.user.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  optionSelected(value: number) {
    this.option_selected = value;
    console.log(value);
  }

  getLocation() {
    this.locationService
      .getLocation(this.location_id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.location_selected = resp.location;

        this.location_info = this.location_selected.location;
        // this.title= this.location_selected.location.title;
        this.patients = resp.patients;
        this.specialists = resp.specialists;

        this.totalDatapatient = resp.specialists.length;

        this.locationService
          .listLocationPatients(this.search, this.status, this.location_id)
          .subscribe((resp: any) => {
            this.totalDatapatient = resp.patients.data.length;
            this.patient_generals = resp.patients.data;
            this.patientid = resp.patients.data.id;
            this.patient_id = resp.patients.data.patient_id;
            //  this.getTableDataGeneralPatient();
          });

        this.doctorService.listDoctors().subscribe((resp: any) => {
          // console.log(resp);

          this.totalDatadoctor = resp.users.data.length;
          this.doctor_generals = resp.users.data;
          this.doctor_id = resp.users.id;
          // this.getTableDataGeneralSpecialist();
        });
      });
  }
}
