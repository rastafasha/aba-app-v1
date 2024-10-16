import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../service/bip.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { GoalService } from '../service/goal.service';
import { Location } from '@angular/common';
import { AppUser } from 'src/app/shared/models/users.models';

@Component({
  selector: 'app-bipattention',
  templateUrl: './bipattention.component.html',
  styleUrls: ['./bipattention.component.scss'],
})
export class BipattentionComponent {
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
  patient_id: any;
  doctor_id: any;
  user: AppUser;

  type_of_assessment: any;
  background_information: any;
  client_selected: any;

  patient_selected: any;
  bip_id: any;

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
    this.ativatedRoute.params.subscribe((resp: any) => {
      this.patient_id = resp.patient_id;
      // this.patient_id= resp.id
      console.log(this.patient_id);
    });
    this.getProfileBip();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }

  getProfileBip() {
    this.bipService.showBipProfile(this.patient_id).subscribe((resp: any) => {
      // console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_id = this.client_selected.patient.patient_id;
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
