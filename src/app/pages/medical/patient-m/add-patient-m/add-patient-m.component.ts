import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';
import { PatientMService } from '../service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../../../../core/services/insurances.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageService } from 'src/app/shared/services/pages.service';
import { AppUser } from 'src/app/core/models/users.model';
import { PatientsUseCasesService } from '../service/patients-use-cases.service';

export interface ResponseBackend {
  users: User[];
  doctores: any[];
  locations: any[];
  location: any;
  insurances: any[];
}
export interface User {
  id: string;
  full_name: string;
  status: string;
  roles: any[];
  insurances: string;
}

export interface Service {
  code: string;
  provider: string;
  // Add other service properties here
}

const url_servicios = environment.url_servicios;
@Component({
  selector: 'app-add-patient-m',
  templateUrl: './add-patient-m.component.html',
  styleUrls: ['./add-patient-m.component.scss'],
})
export class AddPatientMComponent implements OnInit {
  routes = AppRoutes;
  patient_id: any;
  selectedValueLocation!: number;
  selectedValueCode!: string;
  selectedValuePosCovered!: string;
  selectedValueUnitPrize!: string;
  option_selected = 0;

  first_name: string;
  last_name = '';
  parent_guardian_name = '';
  relationship: any;
  language = '';
  phone = '';
  home_phone = '';
  work_phone = '';
  zip = '';
  state = '';
  email = '';
  education = '';
  profession = '';
  school_name = '';
  school_number = '';
  birth_date = '';
  age = 0;
  gender = 1;
  address = '';
  special_note: any;
  city: any;
  patient_control: any;
  schedule: any;
  summer_schedule: any;
  diagnosis_code: any;

  insurer: any;
  insuranceId: any;
  insurer_secundary: any;
  insuranceId_secundary: any;
  elegibility_date: any;
  pos_covered: any;
  deductible_individual_I_F: any;
  balance: any;
  coinsurance: any;
  copayments: any;
  oop: any;
  eqhlid: any;
  roles_doctor: any;

  pa_assessments = [];
  pa_assessment: any;
  pa_assessment_start_date: Date;
  pa_assessment_end_date: Date;
  pa_services: any;
  pa_services_start_date: Date;
  pa_services_end_date: Date;
  cpt: any;
  n_units = 0;

  welcome:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  consent:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  insurance_card:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  mnl:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  referral:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  ados:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  iep:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  asd_diagnosis:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  cde:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  submitted:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  eligibility:
    | 'waiting'
    | 'reviewing'
    | 'psycho eval'
    | 'requested'
    | 'need new'
    | 'yes'
    | 'no'
    | '2 insurance';
  interview: 'pending' | 'send' | 'receive' | 'no apply';

  specialists = [];
  locations = [];
  roles_rbt = [];
  roles_bcba = [];
  insurances = [];
  insurance_codes = [];
  insurance: any;
  code: any;
  provider: any;

  selectedValue_rbt!: string;
  selectedValue_rbt2!: string;
  selectedValue_bcba!: string;
  selectedValue_bcba2!: string;
  selectedValue_clind!: string;
  selectedValueInsurer!: string;

  rbt_id: any;
  rbt2_id: any;
  bcba_id: any;
  bcba2_id: any;
  clin_director_id: any;

  insurance_id: any;
  id: any;

  FILE_AVATAR: any;
  IMAGE_PREVISUALIZA = 'assets/img/user-06.jpg';

  FILE_ADITIONAL_DOCS: any;
  IMAGE_PREVISUALIZA_ADITIONAL_DOCS = 'assets/img/user-06.jpg';
  FILE_MEDICAL_NOTES: any;
  IMAGE_PREVISUALIZA_MEDICAL_NOTES = 'assets/img/user-06.jpg';
  FILE_CDE: any;
  IMAGE_PREVISUALIZA_CDE = 'assets/img/user-06.jpg';
  FILE_IEP: any;
  IMAGE_PREVISUALIZA_IEP = 'assets/img/user-06.jpg';
  FILE_MNL: any;
  IMAGE_PREVISUALIZA_MNL = 'assets/img/user-06.jpg';
  FILE_REFERAL: any;
  IMAGE_PREVISUALIZA_REFERAL = 'assets/img/user-06.jpg';

  insurer_name: any;
  notes = [];
  services = [];
  services_code = [];
  poscoveredList: any[] = [];

  telehealth: boolean;
  pay: boolean;
  user: AppUser;
  doctor: any;
  roles = [];
  doctor_id: any;
  locationId: any;
  location: any;
  emailExists: boolean;

  valid_form = false;
  valid_form_success = false;
  text_validation: any = null;

  constructor(
    private patientsUseCasesService: PatientsUseCasesService,
    private patientService: PatientMService,
    private pageService: PageService,
    private insuranceService: InsuranceService,
    private router: Router,
    private locationBack: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //
    this.pageService.onInitPage();

    this.getPoscoveredList();
    // this.insuranceData();
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
    this.locationId = this.user.location_id;
    this.roles = this.user.roles;
    // console.log(this.locationId);

    if (this.user.roles[0] === 'MANAGER') {
      this.selectedValueLocation = this.user.location_id;
    }
    this.getConfig();
  }

  goBack() {
    this.locationBack.back(); // <-- go back to previous location on cancel
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

  getPoscoveredList() {
    this.patientService.getPosCovered().subscribe((res: any) => {
      console.log('pos covered list', res);
      this.poscoveredList = res.data;
    });
  }

  getConfig() {
    this.patientService
      .listConfig(this.selectedValueLocation)
      .subscribe((resp: ResponseBackend) => {
        console.log(resp);
        this.locations = resp.locations;
        this.location = resp.location;
        this.specialists = resp.users;
        this.insurances = resp.insurances;

        this.roles_rbt = this.specialists.filter(
          (user) => user.roles[0].name === 'RBT'
        );
        this.roles_bcba = this.specialists.filter(
          (user) => user.roles[0].name === 'BCBA'
        );
        console.log(this.roles_bcba);
      });
  }

  selectCategory(event) {
    const VALUE = event;
    this.selectedValueLocation = VALUE;
    console.log(this.selectedValueLocation);
    this.getConfig();
  }

  // insuranceData(){
  //   this.option_selected=this.option_selected
  //   this.insuranceService.showInsurance(this.option_selected).subscribe((resp:any)=>{
  //     console.log(resp);
  //     this.insurance = resp;
  //     this.insurer_name = resp.insurer_name;
  //     this.notes = resp.notes;
  //     this.services_code = resp.services;
  //   })
  // }
  // selectInsurance(id:any){debugger
  //   // this.insuranceData();
  //   // this.insurance_id='1';
  //   this.option_selected = id;
  //   this.insuranceService.showInsurance(this.option_selected).subscribe((resp:any)=>{
  //     console.log(resp);
  //     this.insurance = resp;
  //     this.insurer_name = resp.insurer_name;
  //     this.notes = resp.notes;
  //     this.services = resp.services;
  //     this.insuranceData();
  //   })

  // }

  insuranceData(selectedValueInsurer) {
    this.insuranceService.get(selectedValueInsurer).subscribe((resp) => {
      console.log(resp);
      this.insurer_name = resp.insurer_name;
      // this.notes = resp.notes;
      this.services = resp.services;
      this.provider = resp.services[0].provider;
    });
  }

  selectProviderCpt(event) {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    const cptservice = this.services.find(
      (service: Service) => service.code === selectedValue
    );
    if (cptservice) {
      this.provider = cptservice.provider;
      console.log(this.provider);
    } else {
      console.log('No se encontró el proveedor');
    }
  }

  selectInsurance(event) {
    event = this.selectedValueInsurer;
    this.insuranceData(this.selectedValueInsurer);
  }

  // addService(){
  //   this.services.push({
  //     n_code: this.n_code,
  //     s_unit: this.s_unit
  //   })
  //   this.n_code = '';
  //   this.s_unit = '';
  // }

  // deleteService(i:any){
  //   this.services.splice(i,1);
  // }

  addPAAssestment() {
    this.pa_assessments.push({
      pa_services: this.pa_services,
      pa_services_start_date: this.pa_services_start_date,
      pa_services_end_date: this.pa_services_end_date,
      cpt: this.selectedValueCode,
      n_units: this.n_units,
      provider: this.provider,
    });
    this.pa_services = '';
    this.pa_services_start_date = null;
    this.pa_services_end_date = null;
    this.selectedValueCode = null;
    this.n_units = 0;
    this.provider = '';
  }

  deletePAAssestment(i: any) {
    this.pa_assessments.splice(i, 1);
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
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA = reader.result as string);
  }
  loadFileDoctorR($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo pdf';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA = reader.result as string);
  }
  loadFileMedicalNote($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo pdf';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA = reader.result as string);
  }

  save() {
    this.text_validation = '';
    if (
      !this.first_name ||
      !this.last_name ||
      !this.patient_id ||
      !this.birth_date ||
      !this.parent_guardian_name ||
      !this.relationship ||
      !this.language ||
      !this.gender ||
      !this.phone ||
      !this.state ||
      !this.address ||
      !this.city ||
      !this.diagnosis_code ||
      !this.insuranceId ||
      !this.eligibility ||
      !this.welcome ||
      !this.consent ||
      !this.insurance_card ||
      !this.mnl ||
      !this.referral ||
      !this.ados ||
      !this.iep ||
      !this.asd_diagnosis ||
      !this.cde ||
      !this.submitted ||
      !this.eqhlid ||
      !this.interview
    ) {
      this.text_validation = 'All the fields are required';
      return;
    }

    // this.valid_form = false;
    const formData = new FormData();

    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('parent_guardian_name', this.parent_guardian_name);
    formData.append('relationship', this.relationship);
    formData.append('language', this.language);
    formData.append('home_phone', this.home_phone);
    formData.append('work_phone', this.work_phone);
    formData.append('phone', this.phone);
    formData.append('gender', this.gender + '');
    formData.append('zip', this.zip);
    formData.append('state', this.state);
    formData.append('address', this.address);
    formData.append('city', this.city);
    formData.append('education', this.education);
    formData.append('profession', this.profession);
    formData.append('school_name', this.school_name);
    formData.append('school_number', this.school_number);
    formData.append('age', this.age + '');
    formData.append('patient_id', this.patient_id);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('schedule', this.schedule);
    formData.append('summer_schedule', this.summer_schedule);
    formData.append('patient_control', this.patient_control);
    formData.append('special_note', this.special_note);

    formData.append('insurer_id', this.selectedValueInsurer);
    formData.append('insuranceId', this.insuranceId);
    // formData.append('insurer_secundary', this.insurer_secundary);
    // formData.append('insuranceId_secundary', this.insuranceId_secundary);
    formData.append('elegibility_date', this.elegibility_date);
    // formData.append('pos_covered', this.pos_covered);
    formData.append(
      'deductible_individual_I_F',
      this.deductible_individual_I_F
    );
    formData.append('balance', this.balance);
    formData.append('coinsurance', this.coinsurance);
    formData.append('copayments', this.copayments);
    formData.append('oop', this.oop);

    formData.append('pos_covered', this.poscoveredList.toString());

    if (this.user.roles[0] === 'SUPERADMIN') {
      formData.append('location_id', this.selectedValueLocation + '');
    }
    if (this.user.roles[0] === 'MANAGER') {
      formData.append('location_id', this.user.location_id + '');
    }
    // formData.append('location_id', this.locationId);

    formData.append('welcome', this.welcome);
    formData.append('consent', this.consent);
    formData.append('insurance_card', this.insurance_card);
    formData.append('mnl', this.mnl);
    formData.append('referral', this.referral);
    formData.append('ados', this.ados);
    formData.append('iep', this.iep);
    formData.append('asd_diagnosis', this.asd_diagnosis);
    formData.append('cde', this.cde);
    formData.append('submitted', this.submitted);
    formData.append('eligibility', this.eligibility);

    // formData.append('rbt_home_id', this.selectedValue_rbt);
    // formData.append('rbt2_school_id', this.selectedValue_rbt2);
    // formData.append('bcba_home_id', this.selectedValue_bcba);
    // formData.append('bcba2_school_id', this.selectedValue_bcba2);
    formData.append('clin_director_id', this.selectedValue_clind);

    if (this.eqhlid) {
      formData.append('eqhlid', this.eqhlid);
    }
    if (this.pay) {
      formData.append('pay', this.pay + '');
    }
    if (this.telehealth) {
      formData.append('telehealth', this.telehealth + '');
    }

    if (this.interview) {
      formData.append('interview', this.interview);
    }

    if (this.birth_date) {
      formData.append('birth_date', this.birth_date);
    }
    if (this.email) {
      formData.append('email', this.email);
    }
    if (this.FILE_AVATAR) {
      formData.append('imagen', this.FILE_AVATAR);
    }

    formData.append('pa_assessments', JSON.stringify(this.pa_assessments));

    this.valid_form_success = false;
    this.text_validation = '';

    if (this.user.roles[0] === 'SUPERADMIN') {
      this.patientService.createPatient(formData).subscribe((resp) => {
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          Swal.fire('Created', `Client Created successfully!`, 'success');
          this.router.navigate([AppRoutes.patients.list]);
        }
      });
    }
    if (this.user.roles[0] === 'MANAGER') {
      this.patientService.createPatient(formData).subscribe((resp) => {
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          Swal.fire('Created', `Client Created successfully!`, 'success');
          this.router.navigate([
            AppRoutes.location.view,
            this.user.location_id,
          ]);
        }
      });
    }
  }
}
