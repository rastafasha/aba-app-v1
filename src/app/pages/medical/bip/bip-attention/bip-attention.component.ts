import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../service/bip.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { GoalService } from '../service/goal.service';
import { Location } from '@angular/common';
import { AppUser } from 'src/app/core/models/users.model';

interface Patient {
  id: number;
  patient_identifier: string;
  location_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  parent_guardian_name: string;
  relationship: string;
  address: string;
  age: number;
  birth_date: string; // Se puede cambiar a Date si se prefiere manejar como objeto Date
  pos_covered: string[];
  pa_assessments: string; // Si se desea, se puede cambiar a un objeto que represente la estructura del JSON
  pa_services: PaService[];
  diagnosis_code: string;
  insurer_id: number;
  insuranceId: string | null; // Puede ser string o null
}

interface PaService {
  id: number;
  pa_services: string;
  cpt: string;
  n_units: number;
  available_units: number;
  start_date: string; // Se puede cambiar a Date si se prefiere manejar como objeto Date
  end_date: string; // Se puede cambiar a Date si se prefiere manejar como objeto Date
}



@Component({
  selector: 'app-bip-attention',
  templateUrl: './bip-attention.component.html',
  styleUrls: ['./bip-attention.component.scss'],
})
export class BipAttentionComponent implements OnInit {
  routes = AppRoutes;
  valid_form_success = false;
  text_validation = '';
  text_success = '';
  option_selected = 1;

  first_name = '';
  last_name = '';
  phone = '';
  parent_guardian_name = '';
  relationship = '';
  address = '';
  age = 0;
  birth_date = '';

  client_id: any;
  patient_identifier: string;
  doctor_id: any;
  user: AppUser;

  type_of_assessment: any;
  background_information: any;
  client_selected: any;

  patient_selected: any;
  bip_id: number;

  current_status: any;
  status: any;
  goal: any;
  date: any;
  decription_goal: any;
  goals = [];

  bip_selected: any;
  bip_selectedid: any;
  previus_treatment_and_result: any;
  current_treatment_and_progress: any;
  education_status: any;
  phisical_and_medical_status: any;
  assestment_conducted: any;
  documents = [];
  maladaptives = [];
  maladaptive_behavior = [];
  assesstments = [];
  assesstmentsDocuments = [];
  prevalent_setting_event_and_atecedents = [];
  interventions = [];

  constructor(
    private bipService: BipService,
    private patientService: PatientMService,
    private goalService: GoalService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id'];
      // this.patient_id= resp.id
      console.log(this.patient_identifier);
    });
    this.getProfileBip();
    this.getBip();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  optionSelected(value: number) {
    if(!this.maladaptives){
      return
    }
    this.option_selected = value;

  }

  getBip() {
    this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
      this.bip_selected = resp;
    });
  }

  getProfileBip() {
    this.bipService.showBipProfile(this.patient_identifier).subscribe((resp:Patient) => {
      this.client_selected = resp;
      console.log(this.client_selected);

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_identifier = this.client_selected.patient.patient_identifier;
      this.phone = this.client_selected.patient.phone;
      this.parent_guardian_name =
        this.client_selected.patient.parent_guardian_name;
      this.relationship = this.client_selected.patient.relationship;
      this.address = this.client_selected.patient.address;
      this.age = this.client_selected.patient.age;

      this.birth_date = this.client_selected.patient.birth_date
        ? new Date(this.client_selected.patient.birth_date).toISOString()
        : '';
    });
  }
}
