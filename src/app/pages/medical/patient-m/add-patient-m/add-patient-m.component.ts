import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';
import { PatientMService } from '../service/patient-m.service';
import { InsuranceService } from '../../../../core/services/insurances.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageService } from 'src/app/shared/services/pages.service';
import { AppUser } from 'src/app/core/models/users.model';
import { PatientsUseCasesService } from '../service/patients-use-cases.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { AuthService } from 'src/app/core/auth/auth.service';

/** Principios SOLID
 * Single reposonsablity: que la cosa, haga una sola cosa y bien
 * O
 * L
 * I
 * D
 */

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
  selector: 'app-add-patient-m',
  templateUrl: './add-patient-m.component.html',
  styleUrls: ['./add-patient-m.component.scss'],
})
export class AddPatientMComponent implements OnInit {
  routes = AppRoutes;
  patient_identifier: string;
  selectedValueLocation!: number;
  selectedValueCode!: string;
  selectedValueUnitPrize!: string;
  option_selected = 0;

  public form: FormGroup;
  public enabledPaButton = false;

  pos_covered: any;
  deductible_individual_I_F: any;
  balance: any;
  coinsurance: any;
  copayments: any;
  oop: any;
  eqhlid: any;
  roles_doctor: any;

  pa_assessments = [];
  showLocationSelected = false;
  

  intakeOptions = [
    {value: "waiting", label: "Waiting"},
    {value: "requested", label: "Requested"},
    {value: "reviewing", label: "Reviewing"},
    {value: "psycho eval", label: "Psycho Eval"},
    {value: "need new", label: "Need New"},
    {value: "2 insurance", label: "2 insurance"},
    {value: "yes", label: "Yes"},
    {value: "no", label: "No"}
  ]

  specialists = [];
  locations = [];
  roles_rbt = [];
  roles_bcba = [];
  insurances = [];


  insurance_id: any;
  id: number;

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

  pa_services = [];
  pa_service :string;
  insurer_name: any;
  notes = [];
  services = [];
  services_code = [];
  poscoveredList: any[] = [];

  user: AppUser;
  roles = [];
  doctor_id: number;
  location: any=[];
  location_id: number;
  emailExists: boolean;

  text_validation: any = null;

  constructor(
    private patientsUseCasesService: PatientsUseCasesService,
    private patientService: PatientMService,
    private pageService: PageService,
    private insuranceService: InsuranceService,
    private router: Router,
    private locationBack: Location,
    private http: HttpClient,
    private fb: FormBuilder,
    private useCases: PatientsUseCasesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
    this.setForm();
    this.getPoscoveredList();
    this.user = this.authService.user as AppUser;
    
    this.doctor_id = this.user.id;
    this.location_id = this.user.location_id;
    this.roles = this.user.roles;

    console.log(this.user);

    if (this.user.roles[0] === 'SUPERADMIN') {
      this.showLocationSelected = true;
    }
    this.getConfig();
  }



  private setForm(): void {
    this.form = this.fb.group({
      id: [0],
      patient_id: [0],
      patient_identifier: ['0'],
      insurer_id: ['', Validators.required],
      insurer_secondary_id: [''],
      insurance_identifier: ['', Validators.required],
      insurance_secondary_identifier: [''],
      location_id: [''],
      rbt_home_id: ['', Validators.required],
      rbt2_school_id: ['', Validators.required],
      bcba_home_id: ['', Validators.required],
      bcba2_school_id: ['', Validators.required],
      clin_director_id: ['', Validators.required],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      parent_guardian_name: ['',Validators.required],
      relationship: ['',Validators.required],
      language: ['',Validators.required],
      phone: ['',Validators.required],
      home_phone: ['',Validators.required],
      work_phone: ['',Validators.required],
      zip: ['',Validators.required],
      state: ['',Validators.required],
      email: ['',Validators.required],
      education: ['',Validators.required],
      profession: ['',Validators.required],
      school_name: ['',Validators.required],
      school_number: ['',Validators.required],
      birth_date: [null,Validators.required],
      parent_birth_date: [null,Validators.required],
      gender: [null, Validators.required],
      parent_gender: [null, Validators.required],
      address: ['',Validators.required],
      special_note: ['',Validators.required],
      city: ['',Validators.required],
      patient_control: [null, Validators.required],
      schedule: ['',Validators.required],
      summer_schedule: ['',Validators.required],
      diagnosis_code: ['',Validators.required],
      eqhlid: ['', Validators.required],
      elegibility_date: ['', Validators.required],
      pos_covered: this.fb.control<string[]>([]),
      deductible_individual_I_F: ['', Validators.required],
      balance: ['', Validators.required],
      coinsurance: ['', Validators.required],
      copayments: ['', Validators.required],
      oop: ['', Validators.required],
      welcome: ['', Validators.required],
      consent: ['', Validators.required],
      insurance_card: ['', Validators.required],
      eligibility: ['', Validators.required],
      mnl: ['', Validators.required],
      referral: ['', Validators.required],
      ados: ['', Validators.required],
      iep: ['', Validators.required],
      asd_diagnosis: ['', Validators.required],
      cde: ['', Validators.required],
      submitted: ['', Validators.required],
      interview: ['', Validators.required],
      telehealth: this.fb.control(false),
      pay: this.fb.control(false),
      emmployment: this.fb.control(false),
      auto_accident: this.fb.control(false),
      other_accident: this.fb.control(false),
      is_self_subscriber: this.fb.control(false),
      
      pa_services: ['', this.fb.control<string[]>([]),],
      pa_service: ['', this.fb.control<string[]>([]),],
      pa_services_start_date: ['', Validators.required],
      pa_services_end_date: ['', Validators.required],
      selectedValueCode: ['', Validators.required],
      n_units: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(() => {
      this.isValidPa();
    })

    
  }

  goBack() {
    this.locationBack.back(); // <-- go back to previous location on cancel
  }

  checkEmailExistence(): void {
    this.useCases
      .checkEmailExistense(this.form.get('email').value)
      .subscribe((result) => (this.emailExists = result));
  }

  getPoscoveredList() {
    this.patientService.getPosCovered().subscribe((res: any) => {
      this.poscoveredList = res.data;
    });
  }

  getConfig() {
    this.patientService
      .listConfig(this.location_id)
      .subscribe((resp: ResponseBackend) => {
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
      });
  }

  selectLocation(event) {
    const VALUE = event;
    this.location_id = VALUE;
    this.getConfig();
  }

  insuranceData(insurer_id) {
    this.insuranceService.get(insurer_id).subscribe((resp) => {
      this.insurer_name = resp.insurer_name;
      this.services = resp.services;
    });
  }

  selectInsurance(event) {
    this.insuranceData(this.form.value.insurer_id);
  }
  insuranceData2(insurer_secondary_id) {
    this.insuranceService.get(insurer_secondary_id).subscribe((resp) => {
      this.insurer_name = resp.insurer_name;
      this.services = resp.services;
    });
  }

  selectInsurance2(event) {
    this.insuranceData2(this.form.value.insurer_secondary_id);
  }

  addPAAssestment() {
    // if(!this.enabledPaButton) {
    //   this.text_validation = 'Invalid data for PA';
    //   return ;
    // }
    this.pa_assessments.push({
      patient_id: this.id,
      pa_service: this.form.value.pa_service,
      start_date: this.form.value.pa_services_start_date.toISOString().split('T')[0],
      end_date: this.form.value.pa_services_end_date.toISOString().split('T')[0],
      cpt: this.form.value.selectedValueCode,
      n_units: this.form.value.n_units || 0,
    });
    this.form.get('pa_service').setValue(null)
    this.form.get('pa_services_start_date').setValue(null);
    this.form.get('pa_services_end_date').setValue(null);
    this.form.get('selectedValueCode').setValue(null);
    this.form.get('n_units').setValue(null);
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

  // eslint-disable-next-line no-debugger
  public save(): void {debugger
    if(!this.form.valid) {
      this.text_validation = 'All the fields are required';
      return;
    }

    const data = this.mapData();
    if(!data) return;
    this.patientService.createPatient({...data, pa_services: this.pa_assessments}).subscribe((resp) => {
      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        Swal.fire('Created', `Client Created successfully!`, 'success');
        if(this.user.roles[0] === 'MANAGER') {
          this.router.navigate([
            AppRoutes.location.view,
            this.user.location_id,
          ]);
        }
        if (this.user.roles[0] === 'SUPERADMIN') {
          this.router.navigate([AppRoutes.patients.list]);
        }
      }
    });
  }

  public isValidPa(): void {
    this.enabledPaButton = (
      !!this.form.value.pa_services && this.form.value.pa_services?.trim() !== '' &&
      !!this.form.value.pa_services_start_date &&
      !!this.form.value.pa_services_end_date &&
      !!this.form.value.selectedValueCode && this.form.value.selectedValueCode.trim() !== ''
    );
  }

  private mapData(): FormGroup {
    const data = {...this.form.value}
    let year, month, day;
    if (data.birth_date?.getFullYear()) {
      year = data.birth_date.getFullYear();
      month = (data.birth_date.getMonth() + 1).toString().padStart(2, '0');
      day = data.birth_date.getDate().toString().padStart(2, '0'); 
      data.birth_date = `${year}-${month}-${day}`;
    }
    if (data.parent_birth_date?.getFullYear()) {
      year = data.parent_birth_date.getFullYear();
      month = (data.parent_birth_date.getMonth() + 1).toString().padStart(2, '0');
      day = data.parent_birth_date.getDate().toString().padStart(2, '0'); 
      data.parent_birth_date = `${year}-${month}-${day}`;
    }
    else {
      this.text_validation = 'Add birth date';
      return null;
    }
    if (data.elegibility_date?.getFullYear()) {
      year = data.elegibility_date.getFullYear();
      month = (data.elegibility_date.getMonth() + 1).toString().padStart(2, '0');
      day = data.elegibility_date.getDate().toString().padStart(2, '0'); 
      data.elegibility_date = `${year}-${month}-${day}`;
    }
    else {
      this.text_validation = 'Add elegibility date';
      return null;
    }
    if(!this.showLocationSelected){
      data.location_id = this.location_id;
    }
    
    return data;
  }

  seleccionarParaEdit(paService: any) {
    const selectedPaservice = this.services.find(
      (item) => item.index === paService.index
    );
    console.log(paService);
    // if (selectedCaregiver) {
    //   this.family_edit = selectedCaregiver;
    //   this.selectedCaregiver = selectedCaregiver;
    //   // Ahora puedes editar el objeto selectedCaregiver
    //   selectedCaregiver.nombre = 'Nuevo nombre'; // Por ejemplo
    //   console.log('Objeto seleccionado:', this.selectedCaregiver);
    // }
  }

  updatePaService(paService: any) {
    const selectedPaservice = this.services.find(
      (item) => item.index === paService.index
    );
    console.log(paService);
    // if (index !== -1) {
    //   this.training_goals[index] = monito;
    //   Swal.fire(
    //     'Updated',
    //     `Updated item List successfully, if you finish the list, now press button save!`,
    //     'success'
    //   );
    // }
  }
}
