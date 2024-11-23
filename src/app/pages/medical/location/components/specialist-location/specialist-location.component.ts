import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { url_media } from 'src/app/config/config';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../doctors/service/doctor.service';
import { LocationService } from '../../services/location.service';
import {
  LocationApi,
  LocationPatient,
  LocationSpecialist,
} from '../../models/locations.model';

@Component({
  selector: 'app-specialist-location',
  templateUrl: './specialist-location.component.html',
  styleUrls: ['./specialist-location.component.scss'],
})
export class SpecialistLocationComponent implements OnInit {
  @Input() locationId: any;

  routes = AppRoutes;
  selectedValue!: string;
  option_selected = 1;

  dataSource!: MatTableDataSource<any>;

  showFilter = false;
  searchDataValue = '';
  lastIndex = 0;
  pageSize = 10;
  total = 0;
  totalDatadoctor = 0;
  skip = 0;
  limit = this.pageSize;
  pageIndex = 0;
  serialNumberArray: number[] = [];
  currentPage = 1;
  totalData = 1;
  pageNumberArray: number[] = [];
  pageSelection = [];
  totalPages = 0;

  title = '';

  URLMedia = `${url_media}`;
  services = [];
  patients: LocationPatient[] = [];
  list: LocationSpecialist[] = [];

  code: any;
  provider: any;
  description: any;
  unit_prize: any;
  hourly_fee: any;
  max_allowed: any;

  location_id: any;
  location_iddd: any;
  user: AppUser;
  role: string;
  location_selected: LocationApi;

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
  status: any = null;

  constructor(
    private doctorService: DoctorService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.locationId;

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.role = this.user.roles[0];

    this.pageService.onInitPage();

    this.activatedRoute.params.subscribe((resp) => {
      this.location_id = resp['id'];
      console.log(resp);
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

      this.patients = resp.patients;
      this.list = resp.specialists;

      this.total = resp.specialists.length;

      this.doctorService.list().subscribe((resp) => {
        // console.log(resp);

        this.totalDatadoctor = resp.users.data.length;
        this.doctor_generals = resp.users.data;
        this.doctor_id = resp.users.data[0]?.id;
        this.getTableDataGeneralSpecialist();
      });
    });
  }

  getTableDataGeneralSpecialist() {
    this.specialistList = [];
    this.serialNumberArray = [];

    this.doctor_generals.map((res, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.specialistList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource(this.specialistList);
    this.calculateTotalPages(this.totalDatadoctor, this.pageSize);
  }

  getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneralSpecialist();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneralSpecialist();
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
    this.getTableDataGeneralSpecialist();
  }

  PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneralSpecialist();
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

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  search(value): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.specialistList = this.dataSource.filteredData;
  }

  cambiarStatusDoctor(specialist) {
    const VALUE = specialist.status;
    console.log(VALUE);

    this.doctorService
      .updateStatus(specialist, specialist.id)
      .subscribe((resp) => {
        console.log(resp);
        Swal.fire(
          'Updated',
          `Employee Status Updated successfully!`,
          'success'
        );
        this.getLocation();
      });
  }
}
