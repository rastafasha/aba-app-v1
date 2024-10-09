import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { Location } from '@angular/common';
import { LocationService } from '../services/location.service';
import { url_media } from 'src/app/config/config';
import { MatTableDataSource } from '@angular/material/table';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss'],
})
export class LocationViewComponent {
  public routes = AppRoutes;
  public selectedValue!: string;
  option_selected: number = 1;

  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalDatapatient = 0;
  public totalDatadoctor = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public title: string = '';

  public URLMedia = `${url_media}`;
  public services: any = [];
  public patients: any = [];
  public specialists: any = [];
  public location_info: any;

  public code: any;
  public provider: any;
  public description: any;
  public unit_prize: any;
  public hourly_fee: any;
  public max_allowed: any;

  public location_id: any;
  public location_iddd: any;
  public user: any;
  public roles: any = [];
  public location_selected: any;

  public patient_generals: any = [];

  valid_form: boolean = false;
  valid_form_success: boolean = false;

  public text_success: string = '';
  public text_validation: string = '';

  public patientList: any = [];
  public specialistList: any = [];
  public patientid: any;
  public patient_id: any;
  public doctor_generals: any;
  public doctor_id: any;
  search: any = null;
  status: any = null;

  constructor(
    public doctorService: DoctorService,
    public locationService: LocationService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private location: Location,
    public patientService: PatientMService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((resp: any) => {
      this.location_id = resp.id;
      // console.log(resp);
    });
    this.getLocation();

    let USER = localStorage.getItem('user');
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
