import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DoctorService } from '../service/doctor.service';
import { AppUser } from 'src/app/shared/models/users.models';
import { PageService } from 'src/app/shared/services/pages.service';

const url_servicios = environment.url_servicios;
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent implements OnInit {
  routes = AppRoutes;
  selectedValue!: string;
  selectedValueLocation!: number;

  name = '';
  surname = '';
  phone = '';
  email = '';
  password = '';
  password_confirmation = '';
  birth_date = '';
  gender = 1;
  education = '';
  designation = '';
  address = '';

  currently_pay_through_company = '';
  llc = '';
  ien = '';
  wc = '';
  agency_location = '';
  city = '';
  languages = '';
  dob = '';
  ss_number = '';
  date_of_hire = '';
  start_pay = '';
  driver_license_expiration = '';
  cpr_every_2_years = '';
  background_every_5_years = '';
  e_verify = '';
  national_sex_offender_registry = '';
  certificate_number = '';
  bacb_license_expiration = '';
  liability_insurance_annually = '';
  local_police_rec_every_5_years = '';
  npi = '';
  medicaid_provider = '';

  ceu_hippa_annually = '';
  ceu_domestic_violence_no_expiration = '';
  ceu_security_awareness_annually = '';
  ceu_zero_tolerance_every_3_years = '';
  ceu_hiv_bloodborne_pathogens_infection_control_no_expiration = '';
  ceu_civil_rights_no_expiration = '';

  school_badge = '';
  w_9_w_4_form = '';
  contract = '';
  two_four_week_notice_agreement = '';
  credentialing_package_bcbas_only = '';
  caqh_bcbas_only = '';
  contract_type = '';
  salary = 0;

  role: string;
  roles: { id: number; name: string }[] = [];
  locations = [];

  FILE_AVATAR: Blob;
  IMAGE_PREVISUALIZA = 'assets/img/user-06.jpg';
  FILE_SIGNATURE: Blob;
  IMAGE_PREVISUALIZA_SIGNATURE = 'assets/img/user-06.jpg';

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';
  locations_selected: number[] = [];
  user: AppUser;
  doctor_id: number;
  location: any;
  emailExists: boolean;

  constructor(
    private doctorService: DoctorService,
    private pageService: PageService,
    private router: Router,
    private locationBack: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //
    this.pageService.onInitPage();
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.role = this.user.roles[0];
    this.doctor_id = this.user.id;
    if (this.user.roles[0] === 'MANAGER') {
      this.selectedValueLocation = this.user.location_id;
      this.getConfigLocation();
    } else {
      this.getConfig();
    }
  }

  checkEmailExistence(): void {
    this.http
      .get<any>(`${url_servicios}/doctors/check-email-exist/${this.email}`)
      .subscribe((response) => {
        this.emailExists = response.exist.email;
        console.log(this.emailExists);
        if (this.emailExists === null) {
          this.emailExists = false;
        } else {
          this.emailExists = true;
        }
      });
  }

  goBack() {
    this.locationBack.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.doctorService.listConfig().subscribe((resp: any) => {
      // console.log(resp);
      this.roles = resp.roles;

      this.locations = resp.locations;
      this.location = resp.location;
    });
  }
  getConfigLocation() {
    this.doctorService
      .listConfigLocation(this.selectedValueLocation)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.roles = resp.roles;

        this.locations = resp.locations;
        this.location = resp.location;
      });
  }

  loadFile($event: any) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA = reader.result as string);
  }

  loadFileSignature($event: any) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_SIGNATURE);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE = reader.result as string);
  }

  save() {
    this.text_validation = '';
    if (
      !this.name ||
      !this.email ||
      !this.surname ||
      !this.phone ||
      !this.birth_date ||
      !this.address ||
      !this.gender ||
      !this.currently_pay_through_company ||
      !this.llc ||
      !this.ien ||
      !this.wc ||
      !this.agency_location ||
      !this.city ||
      !this.languages ||
      !this.ss_number ||
      !this.date_of_hire ||
      !this.cpr_every_2_years ||
      !this.background_every_5_years ||
      !this.ceu_hippa_annually ||
      !this.e_verify ||
      !this.national_sex_offender_registry ||
      !this.ceu_security_awareness_annually ||
      !this.certificate_number ||
      !this.bacb_license_expiration ||
      !this.liability_insurance_annually ||
      !this.local_police_rec_every_5_years ||
      !this.ceu_security_awareness_annually ||
      !this.ceu_domestic_violence_no_expiration ||
      !this.ceu_zero_tolerance_every_3_years ||
      !this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration ||
      !this.ceu_civil_rights_no_expiration ||
      !this.local_police_rec_every_5_years ||
      !this.ceu_civil_rights_no_expiration ||
      !this.school_badge ||
      !this.w_9_w_4_form ||
      !this.contract ||
      !this.two_four_week_notice_agreement ||
      !this.credentialing_package_bcbas_only ||
      !this.caqh_bcbas_only ||
      !this.contract_type ||
      !this.salary
    ) {
      this.text_validation = 'All the fields are required';
      // return;
    }

    if (this.password !== this.password_confirmation) {
      this.text_validation = 'Las contraseña debe ser igual';
      // return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('phone', this.phone);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender + '');

    formData.append('address', this.address);
    formData.append('role_id', this.selectedValue);

    formData.append('imagen', this.FILE_AVATAR);
    formData.append('imagenn', this.FILE_SIGNATURE);

    formData.append(
      'currently_pay_through_company',
      this.currently_pay_through_company
    );
    formData.append('llc', this.llc);
    formData.append('ien', this.ien);
    formData.append('wc', this.wc);
    formData.append('agency_location', this.agency_location);
    formData.append('city', this.city);
    formData.append('languages', this.languages);
    formData.append('ss_number', this.ss_number);
    formData.append('date_of_hire', this.date_of_hire);
    formData.append('start_pay', this.start_pay);
    formData.append(
      'driver_license_expiration',
      this.driver_license_expiration
    );
    formData.append('cpr_every_2_years', this.cpr_every_2_years);
    formData.append('background_every_5_years', this.background_every_5_years);
    formData.append('e_verify', this.e_verify);
    formData.append(
      'national_sex_offender_registry',
      this.national_sex_offender_registry
    );
    formData.append('certificate_number', this.certificate_number);
    formData.append('bacb_license_expiration', this.bacb_license_expiration);
    formData.append(
      'liability_insurance_annually',
      this.liability_insurance_annually
    );
    formData.append(
      'local_police_rec_every_5_years',
      this.local_police_rec_every_5_years
    );
    formData.append('npi', this.npi);
    formData.append('medicaid_provider', this.medicaid_provider);

    formData.append('ceu_hippa_annually', this.ceu_hippa_annually);
    formData.append(
      'ceu_security_awareness_annually',
      this.ceu_security_awareness_annually
    );
    formData.append(
      'ceu_domestic_violence_no_expiration',
      this.ceu_domestic_violence_no_expiration
    );
    formData.append(
      'ceu_zero_tolerance_every_3_years',
      this.ceu_zero_tolerance_every_3_years
    );
    formData.append(
      'ceu_hiv_bloodborne_pathogens_infection_control_no_expiration',
      this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration
    );
    formData.append(
      'ceu_civil_rights_no_expiration',
      this.ceu_civil_rights_no_expiration
    );

    formData.append('school_badge', this.school_badge);
    formData.append('w_9_w_4_form', this.w_9_w_4_form);
    formData.append('contract', this.contract);
    formData.append(
      'two_four_week_notice_agreement',
      this.two_four_week_notice_agreement
    );
    formData.append(
      'credentialing_package_bcbas_only',
      this.credentialing_package_bcbas_only
    );
    formData.append('caqh_bcbas_only', this.caqh_bcbas_only);
    formData.append('contract_type', this.contract_type);
    formData.append('salary', this.salary + '');
    let locations = '';
    this.locations_selected.forEach((location, index) => {
      if (index !== 0) {
        locations += `,${location.toString()}`;
      } else {
        locations += location.toString();
      }
    });
    if (this.user.roles[0] === 'SUPERADMIN') {
      formData.append('locations_selected', locations);
    }
    if (this.user.roles[0] === 'MANAGER') {
      formData.append('locations_selected', this.user.location_id.toString());
    }

    if (this.user.roles[0] === 'SUPERADMIN') {
      this.doctorService.storeDoctor(formData).subscribe((resp) => {
        // console.log(resp);

        if (resp.status === 500) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', resp.message_text, 'warning');
        }
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', resp.message_text, 'warning');
        } else {
          // this.text_success = 'Employer created';
          // this.ngOnInit();
          Swal.fire('Created', `Employee Created successfully!`, 'success');
          this.router.navigate([AppRoutes.doctors.list]);
          // this.ngOnInit();
          //
        }
      });
    }
    if (this.user.roles[0] === 'MANAGER') {
      this.doctorService.storeDoctor(formData).subscribe((resp: any) => {
        // console.log(resp);

        if (resp.status === 500) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', resp.message_text, 'warning');
        }
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', resp.message_text, 'warning');
        } else {
          Swal.fire('Created', `Employee Created successfully!`, 'success');
          this.router.navigate([
            AppRoutes.location.view,
            this.user.location_id,
          ]);
        }
      });
    }
  }
}
