import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorV2 } from 'src/app/core/models';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import Swal from 'sweetalert2';
import { DoctorService } from '../service/doctor.service';
import { LocationService } from '../../location/services/location.service';
import { AuthService } from 'src/app/core/auth/auth.service';
@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent implements OnInit {
  routes = AppRoutes;
  selectedValue!: number;
  selectedValueLocation!: number;
  isManager = false;
  name = '';
  surname = '';
  phone: any;
  email = '';
  password = '';
  password_confirmation = '';
  birth_date = '';
  gender = 1;
  address = '';

  currently_pay_through_company = '';
  llc = '';
  ien = '';
  wc = '';
  electronic_signature = '';
  agency_location = '';
  city = '';
  languages = '';
  dob = '';
  ss_number = '';

  date_of_hire: Date;
  initial_pay: number = null;
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
  note = '';
  schedule = '';

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

  roles = [];
  locations = [];
  location: any;

  FILE_AVATAR: any;
  IMAGE_PREVISUALIZA: any = 'assets/img/user-06.jpg';

  FILE_SIGNATURE: any;
  IMAGE_PREVISUALIZA_SIGNATURE: any = 'assets/img/user-06.jpg';

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';
  locations_selected: number[] = [];

  doctor_id: any;
  doctor_selected: DoctorV2;
  user: AppUser;
  // location_id: number;

  constructor(
    private doctorService: DoctorService,
    private pageService: PageService,
    private activatedRoute: ActivatedRoute,
    private locationBack: Location,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    //
    this.pageService.onInitPage();
    this.user = this.authService.user as AppUser;
    this.roles = this.user.roles;
    this.doctor_id = this.user.id;
    this.activatedRoute.params.subscribe((resp) => {
      // console.log(resp);
      this.doctor_id = resp['id'];
    });

    if (this.user.roles[0] === 'MANAGER') {
      this.selectedValueLocation = this.user.location_id;
      this.getConfigLocation();
    } else {
      this.getConfig();
    }

   
  }

  goBack() {
    this.locationBack.back(); // <-- go back to previous location on cancel
  }

  getConfigLocation() {
    this.doctorService
      .listConfigLocation(this.selectedValueLocation)
      .subscribe((resp) => {
        // console.log(resp);
        this.roles = resp.roles;

        this.locations = resp.locations;
        this.location = resp.location;
        this.showDoctortoEdit();
      });
  }
  getConfig() {
    this.doctorService.listConfig().subscribe((resp) => {
      console.log(resp);
      this.roles = resp.roles;
      this.locations = resp.locations;
      this.location = resp.location;
      this.showDoctortoEdit();
    });
  }
  // filtro para el select de MANAGER
  // selectRol(event: any) {
  //   const role = event.value;
  //   if (role) {
  //     this.selectedValue = role;
  //     console.log(this.selectedValue);
  //     this.isManager = false;

  //     if (role === 3 ) {
  //       this.isManager = true;
  //       this.isManager = this.selectedValue === 3;
  //     }
  //   }
  // }

  showDoctortoEdit() {
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp) => {
      console.log(resp);
      this.locations_selected = resp.locations || [];
      this.doctor_selected = resp.user;

      this.selectedValue = this.doctor_selected.roles.id;
      this.name = this.doctor_selected.name;
      this.surname = this.doctor_selected.surname;
      this.phone = this.doctor_selected.phone;
      this.email = this.doctor_selected.email;
      this.gender = this.doctor_selected.gender;
      this.address = this.doctor_selected.address;
      this.IMAGE_PREVISUALIZA = this.doctor_selected.avatar;
      this.IMAGE_PREVISUALIZA_SIGNATURE =
        this.doctor_selected.electronic_signature;

      this.currently_pay_through_company =
        this.doctor_selected.currently_pay_through_company;
      this.llc = this.doctor_selected.llc;
      this.ien = this.doctor_selected.ien;
      this.wc = this.doctor_selected.wc;

      this.agency_location = this.doctor_selected.agency_location;
      this.city = this.doctor_selected.city;
      this.languages = this.doctor_selected.languages;
      this.ss_number = this.doctor_selected.ss_number;

      this.birth_date = new Date(this.doctor_selected.birth_date).toISOString();

      this.initial_pay = this.doctor_selected.start_pay;

      this.cpr_every_2_years = this.doctor_selected.cpr_every_2_years;
      this.background_every_5_years =
        this.doctor_selected.background_every_5_years;
      this.e_verify = this.doctor_selected.e_verify;
      this.national_sex_offender_registry =
        this.doctor_selected.national_sex_offender_registry;
      this.certificate_number = this.doctor_selected.certificate_number;
      this.liability_insurance_annually =
        this.doctor_selected.liability_insurance_annually;
      this.local_police_rec_every_5_years =
        this.doctor_selected.local_police_rec_every_5_years;
      this.npi = this.doctor_selected.npi;
      this.medicaid_provider = this.doctor_selected.medicaid_provider;

      this.ceu_hippa_annually = this.doctor_selected.ceu_hippa_annually;
      this.ceu_domestic_violence_no_expiration =
        this.doctor_selected.ceu_domestic_violence_no_expiration;
      this.ceu_security_awareness_annually =
        this.doctor_selected.ceu_security_awareness_annually;
      this.ceu_zero_tolerance_every_3_years =
        this.doctor_selected.ceu_zero_tolerance_every_3_years;
      this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration =
        this.doctor_selected.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration;
      this.ceu_civil_rights_no_expiration =
        this.doctor_selected.ceu_civil_rights_no_expiration;

      this.school_badge = this.doctor_selected.school_badge;
      this.w_9_w_4_form = this.doctor_selected.w_9_w_4_form;
      this.contract = this.doctor_selected.contract;
      this.two_four_week_notice_agreement =
        this.doctor_selected.two_four_week_notice_agreement;
      this.credentialing_package_bcbas_only =
        this.doctor_selected.credentialing_package_bcbas_only;
      this.caqh_bcbas_only = this.doctor_selected.caqh_bcbas_only;
      this.contract_type = this.doctor_selected.contract_type;
      this.salary = this.doctor_selected.salary;

      // if (this.doctor_selected.roles.name === 'MANAGER') {
      //   this.isManager = true;
      //   // console.log(this.isManager);
      //   this.location_id = this.doctor_selected.location_id;
      // }
      
      
    });
  }

  loadFile($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }

  loadFileSignature($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE = $event.target.files[0];
    const reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE);
    reader2.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE = reader2.result);
  }

  onSave() {
    this.text_validation = '';
    this.text_success = '';
    if (!this.name || !this.email || !this.surname) {
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    // if (this.password) {
    //   if (this.password !== this.password_confirmation) {
    //     this.text_validation = 'Las contraseña debe ser igual';
    //     return;
    //   }
    // }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('phone', this.phone);
    formData.append('email', this.email);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender + '');

    if (this.FILE_AVATAR) {
      formData.append('imagen', this.FILE_AVATAR);
    }
    if (this.FILE_SIGNATURE) {
      formData.append('imagenn', this.FILE_SIGNATURE);
    }

    if (this.selectedValue) {
      formData.append('role_id', this.selectedValue + '');
    }
    if (this.address) {
      formData.append('address', this.address);
    }


    if (this.currently_pay_through_company) {
      formData.append(
        'currently_pay_through_company',
        this.currently_pay_through_company
      );
    }
    if (this.llc) {
      formData.append('llc', this.llc);
    }
    if (this.ien) {
      formData.append('ien', this.ien);
    }
    if (this.wc) {
      formData.append('wc', this.wc);
    }
    if (this.agency_location) {
      formData.append('agency_location', this.agency_location);
    }
    if (this.city) {
      formData.append('city', this.city);
    }
    if (this.languages) {
      formData.append('languages', this.languages);
    }
    if (this.ss_number) {
      formData.append('ss_number', this.ss_number);
    }
    if (this.date_of_hire) {
      formData.append('date_of_hire', this.date_of_hire.toISOString());
    }
    if (this.initial_pay) {
      formData.append('start_pay', this.initial_pay + '');
    }
    if (this.driver_license_expiration) {
      formData.append(
        'driver_license_expiration',
        this.driver_license_expiration
      );
    }
    if (this.cpr_every_2_years) {
      formData.append('cpr_every_2_years', this.cpr_every_2_years);
    }
    if (this.background_every_5_years) {
      formData.append(
        'background_every_5_years',
        this.background_every_5_years
      );
    }
    if (this.e_verify) {
      formData.append('e_verify', this.e_verify);
    }
    if (this.national_sex_offender_registry) {
      formData.append(
        'national_sex_offender_registry',
        this.national_sex_offender_registry
      );
    }
    if (this.certificate_number) {
      formData.append('certificate_number', this.certificate_number);
    }
    if (this.bacb_license_expiration) {
      formData.append('bacb_license_expiration', this.bacb_license_expiration);
    }
    if (this.liability_insurance_annually) {
      formData.append(
        'liability_insurance_annually',
        this.liability_insurance_annually
      );
    }
    if (this.local_police_rec_every_5_years) {
      formData.append(
        'local_police_rec_every_5_years',
        this.local_police_rec_every_5_years
      );
    }
    if (this.npi) {
      formData.append('npi', this.npi);
    }
    if (this.medicaid_provider) {
      formData.append('medicaid_provider', this.medicaid_provider);
    }
    if (this.ceu_hippa_annually) {
      formData.append('ceu_hippa_annually', this.ceu_hippa_annually);
    }
    if (this.ceu_domestic_violence_no_expiration) {
      formData.append(
        'ceu_domestic_violence_no_expiration',
        this.ceu_domestic_violence_no_expiration
      );
    }
    if (this.ceu_security_awareness_annually) {
      formData.append(
        'ceu_security_awareness_annually',
        this.ceu_security_awareness_annually
      );
    }
    if (this.ceu_zero_tolerance_every_3_years) {
      formData.append(
        'ceu_zero_tolerance_every_3_years',
        this.ceu_zero_tolerance_every_3_years
      );
    }
    if (this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration) {
      formData.append(
        'ceu_hiv_bloodborne_pathogens_infection_control_no_expiration',
        this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration
      );
    }
    if (this.ceu_civil_rights_no_expiration) {
      formData.append(
        'ceu_civil_rights_no_expiration',
        this.ceu_civil_rights_no_expiration
      );
    }
    if (this.school_badge) {
      formData.append('school_badge', this.school_badge);
    }
    if (this.w_9_w_4_form) {
      formData.append('w_9_w_4_form', this.w_9_w_4_form);
    }
    if (this.contract) {
      formData.append('contract', this.contract);
    }
    if (this.two_four_week_notice_agreement) {
      formData.append(
        'two_four_week_notice_agreement',
        this.two_four_week_notice_agreement
      );
    }
    if (this.credentialing_package_bcbas_only) {
      formData.append(
        'credentialing_package_bcbas_only',
        this.credentialing_package_bcbas_only
      );
    }
    if (this.caqh_bcbas_only) {
      formData.append('caqh_bcbas_only', this.caqh_bcbas_only);
    }
    if (this.contract_type) {
      formData.append('contract_type', this.contract_type);
    }
    if (this.salary) {
      formData.append('salary', this.salary + '');
    }
    if (this.note) {
      formData.append('note', this.note );
    }
    if (this.schedule) {
      formData.append('schedule', this.schedule);
    }

    // if (this.location_id) {
    //   formData.append('location_id',this.location_id+'' );
    // }

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
    if (this.user.roles[0] === 'ADMIN') {
      formData.append('locations_selected', locations);
    }
    if (this.user.roles[0] === 'MANAGER') {
      formData.append('locations_selected', this.user.location_id.toString());
    }

    this.doctorService.editDoctor(formData, this.doctor_id).subscribe(
      (resp) => {
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          // this.text_success = 'El usuario ha sido actualizado correctamente';
          Swal.fire('Updated', ` Employee Has updated`, 'success');
          this.ngOnInit();
        }
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', ` Employee Can't be updated`, 'error');
        this.ngOnInit();
      }
    );
  }
}