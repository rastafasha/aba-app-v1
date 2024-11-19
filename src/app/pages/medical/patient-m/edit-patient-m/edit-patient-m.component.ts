import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DoctorV2,
  InsuranceV2,
  LocationV2,
  PatientV2,
} from 'src/app/core/models';
import {
  InsurancesV2Service,
  LocationsV2Service,
  PatientsV2Service,
} from 'src/app/core/services';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { PatientsUseCasesService } from '../service/patients-use-cases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-patient-m',
  templateUrl: './edit-patient-m.component.html',
  styleUrls: ['./edit-patient-m.component.scss'],
})
export class EditPatientMComponent implements OnInit {
  routes = AppRoutes;
  id: number;
  patient: PatientV2;
  locations: LocationV2[] = [];
  paServices: PaService[] = [];
  providers: DoctorV2[] = [];
  rbts: DoctorV2[] = [];
  bcbas: DoctorV2[] = [];
  insurances: InsuranceV2[] = [];

  services = [];
  newPaService: PaService = {
    pa_services: '',
    cpt: '',
    n_units: 0,
    start_date: '',
    end_date: '',
  };
  form: FormGroup;
  paForm: FormGroup;
  constructor(
    private useCases: PatientsUseCasesService,
    private patientsService: PatientsV2Service,
    private locationsService: LocationsV2Service,
    private providersService: DoctorService,
    private insurancesService: InsurancesV2Service,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group<PatientV2>({
      id: null,
      first_name: '',
      last_name: '',
      full_name: '',
      avatar: '',
      status: '',

      patient_id: '',
      insurer_id: null,
      birth_date: null,
      age: 0,
      gender: 0,
      education: '',
      profession: '',
      school_name: '',
      school_number: '',
      parent_guardian_name: '',
      relationship: '',
      language: '',
      phone: '',
      home_phone: '',
      work_phone: '',
      email: '',
      city: '',
      zip: '',
      state: '',
      address: '',
      special_note: '',
      diagnosis_code: '',
      schedule: '',
      summer_schedule: '',
      location_id: null,

      insuranceId: '',

      eqhlid: '',
      elegibility_date: '',
      pos_covered: [],
      deductible_individual_I_F: '',
      balance: '',
      coinsurance: '',
      copayments: '',
      oop: '',
      patient_control: '',

      welcome: '',
      consent: '',
      insurance_card: '',
      eligibility: '',
      mnl: '',
      referral: '',
      ados: '',
      iep: '',
      asd_diagnosis: '',
      cde: '',
      submitted: '',
      interview: '',

      pa_services: [],
      pa_assessments: '',
      compayment_per_visit: '',
      insurer_secundary: '',

      rbt_home_id: null,
      rbt2_school_id: null,
      bcba_home_id: null,
      bcba_school_id: null,
      bcba2_school_id: null,
      clin_director_id: null,
      telehealth: false,
      pay: false,

      created_at: null,
      updated_at: null,
      delete_at: null,
    });

    this.paForm = this.fb.group({
      pa_services: [''],
      cpt: [''],
      n_units: [''],
      start_date: [''],
      end_date: [''],
    });
  }

  ngOnInit(): void {
    this.useCases.init();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.patientsService.get(this.id).subscribe((resp) => {
        this.patient = resp.data;
        this.form.patchValue(this.patient);
      });
    });
    this.locationsService
      .list()
      .subscribe((resp) => (this.locations = resp.data));

    this.providersService.list().subscribe((resp) => {
      this.providers = resp.users.data;

      this.rbts = this.providers.filter(
        (provider) => provider.roles.name.toLowerCase() === 'rbt'
      );
      this.bcbas = this.providers.filter(
        (provider) => provider.roles.name.toLowerCase() === 'bcba'
      );
    });

    this.insurancesService
      .list()
      .subscribe((res) => (this.insurances = res.data));
  }

  onSave() {
    if (this.form.invalid) return;
    this.patientsService.update(this.form.getRawValue(), this.id).subscribe({
      next: (resp) => {
        Swal.fire('Updated', `Saved successfully!`, 'success');
        this.patient = resp.data;
        this.form.patchValue(this.patient);
      },
      error: () => {
        Swal.fire('Error', `Can't update!`, 'error');
      },
    });
  }

  ////////////////////////////////////////////////////////////////
  goBack() {
    this.useCases.goBack();
  }

  loadFile(event) {
    this.useCases.loadFile(event);
  }
}
