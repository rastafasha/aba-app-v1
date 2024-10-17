import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';

import { MatTableDataSource } from '@angular/material/table';
import { url_media } from 'src/app/config/config';
import Swal from 'sweetalert2';
import { LocationService } from '../../services/location.service';
import { DoctorService } from '../../../doctors/service/doctor.service';
import { PatientMService } from '../../../patient-m/service/patient-m.service';
import { AppUser } from 'src/app/shared/models/users.models';
import { PageService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-clients-location',
  templateUrl: './clients-location.component.html',
  styleUrls: ['./clients-location.component.scss'],
})
export class ClientsLocationComponent {
  @Input() locationId: any;

  routes = AppRoutes;
  selectedValue!: string;
  option_selected = 1;

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
  totalData = 0;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  title = '';

  URLMedia = `${url_media}`;
  services = [];
  patients = [];
  specialists = [];
  location_info: any;

  code: any;
  provider: any;
  description: any;
  unit_prize: any;
  hourly_fee: any;
  max_allowed: any;

  location_id: any;
  location_iddd: any;
  user: AppUser;
  roles: string;
  location_selected: any;

  patient_generals = [];

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  patientList = [];
  specialistList = [];
  patientid: any;
  patient_id: any;
  doctor_generals: any;
  doctor_id: any;
  search: any = null;
  status: any = null;

  constructor(
    private pageService: PageService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientMService
  ) {}

  ngOnInit(): void {
    this.locationId;

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.roles = this.user.roles[0];

    this.pageService.onInitPage();

    this.activatedRoute.params.subscribe((resp) => {
      console.log(resp);
      this.location_id = resp['id'];
    });

    this.activatedRoute.params.subscribe((params) => {
      this.location_iddd = params['location_id'];
    });

    this.getLocation();
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
  }

  getLocation() {
    this.locationService.getLocation(this.location_id).subscribe((resp) => {
      console.log(resp);
      this.location_selected = resp.location;

      this.location_info = this.location_selected.location;
      // this.title= this.location_selected.location.title;
      this.patients = resp.patients;
      this.specialists = resp.specialists;

      this.totalDatapatient = resp.specialists.length;

      this.locationService
        .listLocationPatients(this.search, this.status, this.location_id)
        .subscribe((resp) => {
          this.totalDatapatient = resp.patients.data.length;
          this.patient_generals = resp.patients.data;
          this.patientid = resp.patients.data.id;
          this.patient_id = resp.patients.data.patient_id;
          this.getTableDataGeneralPatient();
        });
    });
  }

  getTableDataGeneralPatient() {
    this.patientList = [];
    this.serialNumberArray = [];

    this.patients.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.patientList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.patientList);
    this.calculateTotalPages(this.totalDatapatient, this.pageSize);
  }

  getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneralPatient();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneralPatient();
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
    this.getTableDataGeneralPatient();
  }

  PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneralPatient();
    this.searchDataValue = '';
  }

  private calculateTotalPages(
    totalDatapatient: number,
    pageSize: number
  ): void {
    this.pageNumberArray = [];
    this.totalPages = totalDatapatient / pageSize;
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

  searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientList = this.dataSource.filteredData;
  }

  searchDataDoct(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.specialistList = this.dataSource.filteredData;
  }

  cambiarStatusCliente(patient: any) {
    this.patientService.updateStatus(patient, patient.id).subscribe((resp) => {
      // console.log(resp);
      Swal.fire('Updated', `Client Status Updated successfully!`, 'success');
      this.getLocation();
    });
  }
}
