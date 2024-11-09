import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { InsuranceService } from '../../../../core/services/insurances.service';
import { PatientMService } from '../service/patient-m.service';
import {
  CreatePaServiceDto,
  PaService,
} from 'src/app/shared/interfaces/pa-service.interface';
import { PaServiceService } from '../service/pa-service.service';
// declare function alertClose():any;
declare let $: any;

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

@Component({
  selector: 'app-edit-patient-m',
  templateUrl: './edit-patient-m.component.html',
  styleUrls: ['./edit-patient-m.component.scss'],
})
export class EditPatientMComponent implements OnInit {
  routes = AppRoutes;
  selectedValue!: string;
  selectedValueLocation!: number;
  selectedValueInsurer!: string;
  selectedValueCode!: any;
  selectedValueCodeProvider!: string;
  selectedValuePosCovered!: string;

  option_selected = 0;

  patient_id: any;
  f = '';

  client_id: any;
  first_name = '';
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
  insurer_id: any;
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

  pa_assessmentss: any = <any>[];
  pa_assessments: any = <any>[];
  pa_assessment: any;
  pa_assessment_start_date: Date;
  pa_assessment_end_date: Date;
  pa_services: any;
  pa_services_start_date: Date;
  pa_services_end_date: Date;
  cpt: any;
  n_units = 0;

  s_unit: any;
  n_code: any;

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

  selectedValue_rbt!: string;
  selectedValue_rbt2!: string;
  selectedValue_bcba!: string;
  selectedValue_bcba2!: string;
  selectedValue_clind!: string;
  selectedValue_insurer!: string;

  rbt_id: any;
  rbt2_id: any;
  bcba_id: any;
  bcba2_id: any;
  clin_director_id: any;

  FILE_AVATAR: any;
  IMAGE_PREVISUALIZA: any = 'assets/img/user-06.jpg';

  valid_form = false;
  valid_form_success = false;
  text_validation: any = null;
  text_success: any = null;

  patient_selected: any;

  specialists = [];
  locations = [];
  insurances = [];
  notes = [];
  insurer_name: string;
  assesstmentlists = [];
  services_code = [];
  services = [];
  pa_assessmentgroup = [];
  posGroup = [];
  poscoveredList = [];

  roles_rbt = [];
  roles_bcba = [];
  roles_manager = [];
  role_localmanager = [];
  insurance_codes = [];
  insurance: any;
  insurances_name: any;
  code: any;
  insuranceiddd: any;
  telehealth: boolean;
  pay: boolean;

  //insurance:any;
  //insurer_name: any;
  insurance_id: any;
  id: any;

  user: AppUser;
  doctor_id: any;
  location_id: any;
  location: any;
  provider: any;

  FILES = [];
  FilesAdded = [];
  file_selected: any;
  doc: any;
  FILE: any;
  datacode: any;

  paServices: PaService[] = [];
  newPaService: Partial<PaService> = {
    pa_services: '',
    cpt: '',
    n_units: 0,
    start_date: '',
    end_date: '',
  };

  constructor(
    private patientService: PatientMService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private insuranceService: InsuranceService,
    private readonly sanitizer: DomSanitizer,
    private _sanitizer: DomSanitizer,
    private locationBack: Location,
    private paServiceService: PaServiceService
  ) {
    this.selectedValueCodeProvider = this.selectedValueCode;
  }

  ngOnInit(): void {
    //
    this.ativatedRoute.params.subscribe((resp) => {
      this.client_id = resp['id'];
    });

    this.showUser();
    this.getPoscoveredList();
    //  setTimeout(()=>{
    //   alertClose();
    // }, 50)
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
    this.location_id = this.user.location_id;

    if (this.user.roles[0] === 'MANAGER') {
      this.selectedValueLocation = this.user.location_id;
    }

    this.loadPaServices();
  }

  loadPaServices() {
    if (this.patient_id) {
      console.log('Loading PA services for patient:', this.patient_id);
      this.paServiceService.getPatientPaServices(this.patient_id).subscribe({
        next: (response) => {
          console.log('PA services loaded:', response);
          this.paServices = response.pa_services;
        },
        error: (error) => {
          console.error('Error loading PA services:', error);
          let errorMessage = 'Error loading PA services';
          if (error.error?.message) {
            errorMessage = error.error.message;
          }
          Swal.fire('Error', errorMessage, 'error');
        },
      });
    }
  }

  addPaService() {
    if (this.patient_id) {
      if (
        !this.newPaService.pa_services ||
        !this.newPaService.cpt ||
        !this.newPaService.n_units ||
        !this.newPaService.start_date ||
        !this.newPaService.end_date
      ) {
        Swal.fire('Error', 'All fields are required', 'error');
        return;
      }

      const paServiceData: CreatePaServiceDto = {
        pa_services: this.newPaService.pa_services,
        cpt: this.newPaService.cpt,
        n_units: this.newPaService.n_units,
        start_date: new Date(this.newPaService.start_date)
          .toISOString()
          .split('T')[0],
        end_date: new Date(this.newPaService.end_date)
          .toISOString()
          .split('T')[0],
      };

      console.log('Sending PA service data:', paServiceData);

      this.paServiceService
        .createPaService(this.patient_id, paServiceData)
        .subscribe({
          next: (response) => {
            console.log('PA service created:', response);
            this.paServices.unshift(response.pa_service);
            this.resetNewPaService();
            Swal.fire('Success', 'PA service added successfully', 'success');
          },
          error: (error) => {
            console.error('Error creating PA service:', error);
            let errorMessage = 'Error creating PA service';
            if (error.error?.messages) {
              errorMessage = Object.values(error.error.messages).join('\n');
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            }
            Swal.fire('Error', errorMessage, 'error');
          },
        });
    } else {
      Swal.fire('Error', 'Patient ID is required', 'error');
    }
  }

  deletePaService(paService: PaService) {
    if (!this.patient_id || !paService.id) {
      Swal.fire('Error', 'Unable to delete PA service', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.paServiceService
          .deletePaService(this.patient_id, paService.id!)
          .subscribe({
            next: () => {
              this.paServices = this.paServices.filter(
                (p) => p.id !== paService.id
              );
              Swal.fire('Deleted!', 'PA service has been deleted.', 'success');
            },
            error: (error) => {
              console.error('Error deleting PA service:', error);
              let errorMessage = 'Error deleting PA service';
              if (error.error?.message) {
                errorMessage = error.error.message;
              }
              Swal.fire('Error', errorMessage, 'error');
            },
          });
      }
    });
  }

  resetNewPaService() {
    this.newPaService = {
      pa_services: '',
      cpt: '',
      n_units: 0,
      start_date: '',
      end_date: '',
    };
  }

  goBack() {
    this.locationBack.back(); // <-- go back to previous location on cancel
  }

  getPoscoveredList() {
    this.patientService.getPosCovered().subscribe((res: any) => {
      console.log('pos covered list', res);
      this.poscoveredList = res.data;
    });
  }

  getInitConfig() {
    this.patientService
      .listConfig(this.patient_selected.location_id)
      .subscribe((resp) => {
        console.log(resp);
        this.specialists = resp.users;
        this.insurances = resp.insurances;
        this.insurance_id =
          resp.insurances.length > 0 ? resp.insurances[0].id : '';

        this.location = resp.location;
        this.locations = resp.locations;
        this.roles_rbt = this.specialists.filter(
          (user) => user.roles[0].name === 'RBT'
        );
        this.roles_bcba = this.specialists.filter(
          (user) => user.roles[0].name === 'BCBA'
        );
      });
  }
  getConfig() {
    this.patientService
      .listConfig(this.selectedValueLocation)
      .subscribe((resp) => {
        console.log(resp);
        this.specialists = resp.users;
        this.insurances = resp.insurances;
        this.insurance_id =
          resp.insurances.length > 0 ? resp.insurances[0].id : '';

        this.locations = resp.locations;
        this.roles_rbt = this.specialists.filter(
          (user) => user.roles[0].name === 'RBT'
        );
        this.roles_bcba = this.specialists.filter(
          (user) => user.roles[0].name === 'BCBA'
        );

        this.insuranceService.get(this.insurance_id).subscribe((resp) => {
          this.insuranceiddd = resp.id;
          this.insurer_name = resp.insurer_name;
        });
      });
  }

  selectCategory(event) {
    const VALUE = event;
    this.selectedValueLocation = VALUE;
    // console.log(this.selectedValueLocation);
    this.getConfig();
  }

  selectPOS(event) {
    const VALUE = event;
    this.selectedValuePosCovered = VALUE;
    // console.log(this.selectedValuePosCovered);
    this.getConfig();
  }

  showUser() {
    this.patientService.getPatient(this.client_id).subscribe((resp) => {
      console.log(resp);
      this.patient_selected = resp.patient;

      //traemos el valor del id del insurer  y lo asignamos a la variable de clase para que sea global
      this.selectedValueInsurer = this.patient_selected.insurer_id;
      // console.log(this.selectedValueInsurer);

      //valore iniciales
      this.first_name = this.patient_selected.first_name;
      this.last_name = this.patient_selected.last_name;
      this.parent_guardian_name = this.patient_selected.parent_guardian_name;
      this.relationship = this.patient_selected.relationship;
      this.language = this.patient_selected.language;
      this.phone = this.patient_selected.phone;
      this.home_phone = this.patient_selected.home_phone;
      this.work_phone = this.patient_selected.work_phone;
      this.zip = this.patient_selected.zip;
      this.email = this.patient_selected.email;
      this.education = this.patient_selected.education;
      this.profession = this.patient_selected.profession;
      this.school_name = this.patient_selected.school_name;
      this.school_number = this.patient_selected.school_number;
      this.age = this.patient_selected.age;
      this.birth_date = new Date(
        this.patient_selected.birth_date
      ).toISOString();
      // this.birth_date = this.patient_selected.birth_date ;
      this.gender = this.patient_selected.gender;
      this.patient_id = this.patient_selected.patient_id;
      this.address = this.patient_selected.address;
      this.city = this.patient_selected.city;
      this.state = this.patient_selected.state;
      this.patient_control = this.patient_selected.patient_control;
      this.special_note = this.patient_selected.special_note;
      this.schedule = this.patient_selected.schedule;
      this.summer_schedule = this.patient_selected.summer_schedule;
      this.diagnosis_code = this.patient_selected.diagnosis_code;

      //valores de los selectores

      this.selectedValueLocation = this.patient_selected.location_id;
      this.selectedValue_rbt = this.patient_selected.rbt_home_id
        ? this.patient_selected.rbt_home_id
        : null;
      this.selectedValue_rbt2 = this.patient_selected.rbt2_school_id
        ? this.patient_selected.rbt2_school_id
        : null;

      this.selectedValue_bcba = this.patient_selected.bcba_home_id
        ? this.patient_selected.bcba_home_id
        : null;
      this.selectedValue_bcba2 = this.patient_selected.bcba2_school_id
        ? this.patient_selected.bcba2_school_id
        : null;

      this.selectedValue_clind = this.patient_selected.clin_director_id
        ? this.patient_selected.clin_director_id
        : null;

      //valores de isurance
      this.insuranceId = this.patient_selected.insuranceId;
      this.insurer_secundary = this.patient_selected.insurer_secundary;
      this.insuranceId_secundary = this.patient_selected.insuranceId_secundary;
      this.elegibility_date = this.patient_selected.elegibility_date
        ? new Date(this.patient_selected.elegibility_date).toISOString()
        : '';
      // this.pos_covered = this.patient_selected.pos_covered;
      this.deductible_individual_I_F =
        this.patient_selected.deductible_individual_I_F;
      this.balance = this.patient_selected.balance;
      this.coinsurance = this.patient_selected.coinsurance;
      this.copayments = this.patient_selected.copayments;
      this.oop = this.patient_selected.oop;
      this.eqhlid = this.patient_selected.eqhlid;
      this.telehealth = this.patient_selected.telehealth;
      this.pay = this.patient_selected.pay;

      //valores de welcome
      this.welcome = this.patient_selected.welcome;
      this.consent = this.patient_selected.consent;
      this.insurance_card = this.patient_selected.insurance_card;
      this.mnl = this.patient_selected.mnl;
      this.referral = this.patient_selected.referral;
      this.ados = this.patient_selected.ados;
      this.iep = this.patient_selected.iep;
      this.asd_diagnosis = this.patient_selected.asd_diagnosis;
      this.cde = this.patient_selected.cde;
      this.submitted = this.patient_selected.submitted;
      this.eligibility = this.patient_selected.eligibility;
      this.interview = this.patient_selected.interview;

      //valores de la imagen y archivos
      this.IMAGE_PREVISUALIZA = this.patient_selected.avatar;
      //  console.log(this.IMAGE_PREVISUALIZA);;

      this.pa_assessmentss = resp.pa_assessments ? resp.pa_assessments : null; // ?
      const jsonObj = JSON.parse(this.pa_assessmentss) || '';
      this.pa_assessmentgroup = jsonObj;

      // this.selectedValuePosCovered = resp.pos_covered ? resp.pos_covered : null;
      // const jsonObj2 = JSON.parse(this.selectedValuePosCovered) || '';
      // this.posGroup= jsonObj2;
      // console.log(this.posGroup);

      this.selectedValuePosCovered = resp.pos_covered;
      console.log(this.selectedValuePosCovered);

      // console.log(this.selectedValue_rbt);

      this.insuranceData(this.selectedValueInsurer); //pide el insurance guardado para el request de la lista inicial

      this.patientService
        .getLaboratoryByPatient(this.patient_id)
        .subscribe((resp) => {
          console.log(resp);
          this.FilesAdded = resp.patientFiles.data
            ? resp.patientFiles.data
            : null;
        });

      this.getInitConfig();
      this.loadPaServices();
    });
  }

  // seleccionas otro si se quiere cambiar trayendo el event como id o como objeto y pasas el valor necesario
  selectInsurance(event) {
    event = this.selectedValueInsurer;
    this.insuranceData(this.selectedValueInsurer); // se envia el insurer para traer los codigos de los servicios
  }
  //recibe el id y muestra la lista
  insuranceData(selectedValueInsurer) {
    this.insuranceService.get(selectedValueInsurer).subscribe((resp) => {
      console.log('desde el insurer seleccionado', resp);
      this.services = resp.services;
      this.code = resp.services[0].code;
      this.provider = resp.services[0].provider;
    });
  }

  selectProviderCpt(event: any) {
    const selectedValue = event.value; // MatSelectChange provides value directly
    console.log('Selected CPT:', selectedValue);

    const cptservice = this.services.find(
      (service: Service) => service.code === selectedValue
    );
    if (cptservice) {
      this.provider = cptservice.provider;
      console.log('Provider:', this.provider);
    } else {
      console.log('No provider found for selected CPT');
    }
  }

  //listas

  addPAAssestment() {
    this.pa_assessmentgroup.push({
      pa_services: this.pa_services,
      pa_services_start_date: this.pa_services_start_date,
      pa_services_end_date: this.pa_services_end_date,
      cpt: this.selectedValueCode,
      n_units: this.n_units,
      // aqui guardo el provider traido del cpt
      // debo extraer de selectedValueCode el cpt para traer el provider
      // provider: this.selectedValueCode ?
      provider: this.provider,
    });
    this.pa_services = '';
    this.pa_services_start_date = null;
    this.pa_services_end_date = null;
    this.selectedValueCode = null;
    this.provider = null;
    this.n_units = 0;
  }

  deletePAAssestment(i: any) {
    this.pa_assessmentgroup.splice(i, 1);
  }

  //listas
  //files

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

  processFile($event) {
    for (const file of $event.target.files) {
      this.FILES.push(file);
    }
    // console.log(this.FILES);
  }

  deleteDocument(i: any) {
    this.FILES.splice(i, 1);
  }

  deleteFile(FILE: any) {
    this.FilesAdded.splice(FILE, 1);
    this.patientService.deleteLaboratory(FILE.id).subscribe((resp) => {
      this.showUser();
    });
  }
  selectDoc(FILE: any) {
    this.file_selected = FILE;
  }
  closeReload() {
    throw new Error('Not implemented');
  }

  getDocumentIframe(url) {
    if (url === null) {
      return '';
    }
    const results = url.match('[\\?&]v=([^&#]*)');
    const document = results === null ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl(document);
  }

  closeModalDoc() {
    $('#view-doc').hide();
    $('#view-doc').removeClass('show');
    $('#view-doc').css('display', 'none !important');
    $('.modal').css('display', 'none !important');
    $('.modal-backdrop').remove();
    $('body').removeClass();
    $('body').removeAttr('style');
    this.file_selected = null;
  }

  //files

  //update function

  saveFiles() {
    this.text_validation = '';
    if (!this.first_name || !this.last_name || !this.client_id) {
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    // this.valid_form = false;
    const formData = new FormData();

    formData.append('patient_id', this.patient_id);

    this.FILES?.forEach((file: any, index: number) => {
      formData.append('files[' + index + ']', file);
    });

    this.valid_form_success = false;
    this.text_validation = '';

    this.patientService.storeLaboratory(formData).subscribe((resp) => {
      // console.log(resp);
      if (resp.message === 403) {
        this.text_validation = resp.message_text;
        // Swal.fire('Error al eliminar', `resp.message_text`, 'error');
      } else {
        // this.text_success = "Patient Has updated";
        Swal.fire('Updated', ` Patient Has updated`, 'success');
        this.ngOnInit();
        // this.router.navigate(['/patients/list']);
      }
    });
  }

  save() {
    this.text_validation = '';
    // if(!this.first_name ||!this.last_name || !this.client_id ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }

    // this.valid_form = false;
    const formData = new FormData();

    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('phone', this.phone);
    formData.append('home_phone', this.home_phone);
    formData.append('work_phone', this.work_phone);
    formData.append('gender', this.gender + '');
    formData.append('address', this.address);
    formData.append('zip', this.zip);

    formData.append('city', this.city);
    formData.append('state', this.state);
    formData.append('education', this.education);
    formData.append('profession', this.profession);
    formData.append('school_name', this.school_name);
    formData.append('school_number', this.school_number);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('age', this.age + '');
    // formData.append('rbt_home_id', this.selectedValue_rbt);
    // formData.append('rbt2_school_id', this.selectedValue_rbt2);
    // formData.append('bcba_home_id', this.selectedValue_bcba);
    // formData.append('bcba2_school_id', this.selectedValue_bcba2);
    formData.append('clin_director_id', this.selectedValue_clind);
    formData.append('pay', this.pay + '');
    formData.append('telehealth', this.telehealth + '');
    // formData.append('insurer', this.selectedValueInsurer);

    if (this.selectedValue_rbt) {
      formData.append('rbt_home_id', this.selectedValue_rbt);
    }
    if (this.selectedValue_rbt2) {
      formData.append('rbt2_school_id', this.selectedValue_rbt2);
    }
    if (this.selectedValue_bcba) {
      formData.append('bcba_home_id', this.selectedValue_bcba);
    }
    if (this.selectedValue_bcba2) {
      formData.append('bcba2_school_id', this.selectedValue_bcba2);
    }

    if (this.pa_assessmentgroup) {
      formData.append(
        'pa_assessments',
        JSON.stringify(this.pa_assessmentgroup)
      );
    }
    if (this.selectedValueLocation) {
      formData.append('location_id', this.selectedValueLocation + '');
    }

    if (this.selectedValueInsurer) {
      formData.append('insurer_id', this.selectedValueInsurer);
    }

    if (this.patient_id) {
      formData.append('patient_id', this.patient_id);
    }

    if (this.diagnosis_code) {
      formData.append('diagnosis_code', this.diagnosis_code);
    }
    if (this.parent_guardian_name) {
      formData.append('parent_guardian_name', this.parent_guardian_name);
    }
    if (this.relationship) {
      formData.append('relationship', this.relationship);
    }
    if (this.language) {
      formData.append('language', this.language);
    }
    if (this.patient_control) {
      formData.append('patient_control', this.patient_control);
    }
    if (this.special_note) {
      formData.append('special_note', this.special_note);
    }

    if (this.schedule) {
      formData.append('schedule', this.schedule);
    }

    if (this.insuranceId) {
      formData.append('insuranceId', this.insuranceId);
    }
    // if(this.insurer_secundary){

    //   formData.append('insurer_secundary', this.insurer_secundary);
    // }
    // if(this.insuranceId_secundary){

    //   formData.append('insuranceId_secundary', this.insuranceId_secundary);
    // }

    if (this.elegibility_date) {
      formData.append('elegibility_date', this.elegibility_date);
    }

    if (this.selectedValuePosCovered) {
      formData.append('pos_covered', this.selectedValuePosCovered);
    }
    if (this.eqhlid) {
      formData.append('eqhlid', this.eqhlid);
    }

    if (this.deductible_individual_I_F) {
      formData.append(
        'deductible_individual_I_F',
        this.deductible_individual_I_F
      );
    }
    if (this.balance) {
      formData.append('balance', this.balance);
    }
    if (this.coinsurance) {
      formData.append('coinsurance', this.coinsurance);
    }
    if (this.copayments) {
      formData.append('copayments', this.copayments);
    }

    if (this.oop) {
      formData.append('oop', this.oop);
    }

    // if(this.selectedValueLocation ){
    //   formData.append('location_id', this.selectedValueLocation+'');
    // }

    if (this.selectedValueLocation || this.user.roles[0] === 'SUPERADMIN') {
      formData.append('location_id', this.selectedValueLocation + '');
    }
    if (this.user.roles[0] === 'MANAGER') {
      formData.append('location_id', this.user.location_id + '');
    }

    if (this.welcome) {
      formData.append('welcome', this.welcome);
    }
    if (this.eligibility) {
      formData.append('eligibility', this.eligibility);
    }
    if (this.consent) {
      formData.append('consent', this.consent);
    }
    if (this.insurance_card) {
      formData.append('insurance_card', this.insurance_card);
    }
    if (this.mnl) {
      formData.append('mnl', this.mnl);
    }
    if (this.referral) {
      formData.append('referral', this.referral);
    }
    if (this.ados) {
      formData.append('ados', this.ados);
    }
    if (this.iep) {
      formData.append('iep', this.iep);
    }
    if (this.asd_diagnosis) {
      formData.append('asd_diagnosis', this.asd_diagnosis);
    }
    if (this.cde) {
      formData.append('cde', this.cde);
    }
    if (this.submitted) {
      formData.append('submitted', this.submitted);
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

    this.valid_form_success = false;
    this.text_validation = '';

    this.patientService
      .editPatient(formData, this.client_id)
      .subscribe((resp) => {
        // console.log(resp);
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
          // Swal.fire('Error al eliminar', `resp.message_text`, 'error');
        } else {
          Swal.fire('Updated', ` Patient Has updated`, 'success');
          this.ngOnInit();
        }
      });
  }
  //update function

  // isCheckedTelehealth(){
  //   this.telehealth = !this.telehealth;
  //   console.log(this.telehealth);
  //   // if ( event.target.checked ) {
  //   // }
  // }

  //   isCheckedPay(){
  //     this.pay = !this.pay;
  //     console.log(this.pay);
  //     // if ( event.target.checked ) {
  //     // }
  //   }
}
