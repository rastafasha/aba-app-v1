import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { NoteBcbaService } from '../services/note-bcba.service';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-note-bcba-edit',
  templateUrl: './note-bcba-edit.component.html',
  styleUrls: ['./note-bcba-edit.component.scss'],
})
export class NoteBcbaEditComponent {
  public routes = AppRoutes;
  public summary_note = '';
  public isGeneratingSummary = false;

  valid_form = false;
  valid_form_success = false;

  public text_success = '';
  public text_validation = '';

  public selectedValueProvider!: string;
  public selectedValueRBT!: string;
  public selectedValueBCBA!: string;
  public selectedValueTimeIn = '';
  public selectedValueTimeOut = '';
  public selectedValueTimeIn2 = '';
  public selectedValueTimeOut2 = '';
  public selectedValueProviderName!: string;
  public selectedValueMaladaptive!: string;
  public selectedValueRendering!: string;
  public selectedValueAba!: string;
  public selectedValueCode!: string;
  option_selected = 0;

  client_id: any;
  doctor_id: any;
  patient_id: any;
  patientLocation_id: any;
  patient_selected: any;
  client_selected: any;
  note_selected: any;
  bip_id: any;
  user: any;
  public first_name = '';
  public last_name = '';
  public diagnosis_code = '';

  public provider_name_g = '';
  public provider_credential = '';
  public pos = '';
  public session_date = '';
  public time_in = '';
  public time_out = '';
  public time_in2 = '';
  public time_out2 = '';
  public session_length_total = '';
  public session_length_total2 = '';
  public environmental_changes = '';

  public sumary_note = '';
  public meet_with_client_at = '';
  public client_appeared = '';
  public as_evidenced_by = '';
  public rbt_modeled_and_demonstrated_to_caregiver = '';
  public client_response_to_treatment_this_session = '';
  public progress_noted_this_session_compared_to_previous_session = '';
  public next_session_is_scheduled_for = '';
  public provider_name = '';
  public supervisor_name = '';

  public number_of_occurrences = 0;
  public number_of_correct_responses = 0;
  public total_trials = 0;
  public number_of_correct_response = 0;
  public maladaptive = '';
  public replacement = '';
  public maladaptive_behavior = '';
  public interventions: any;
  public provider_signature: any;
  public supervisor_signature: any;

  public pairing: any;
  public response_block: any;
  public DRA: any;
  public DRO: any;
  public redirection: any;
  public errorless_teaching: any;
  public NCR: any;
  public shaping: any;
  public chaining: any;
  public token_economy: any;
  public extinction: any;
  public natural_teaching: any;

  public FILE_SIGNATURE_RBT: any;
  public IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any =
    'assets/img/user-06.jpg';
  public FILE_SIGNATURE_BCBA: any;
  public IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED: any =
    'assets/img/user-06.jpg';

  public rbt_id: any;
  public bcba_id: any;
  public maladaptivename: any;
  public replacementName: any;
  public note_rbt_id: any;
  public goal: any;
  public note_id: any;
  public note_selectedId: any;

  public roles_rbt: any = [];
  public roles_bcba: any = [];

  public hours_days: any = [];
  public specialists: any = [];
  public maladaptives: any = [];
  public replacementGoals: any = [];
  public intervention_added: any = [];
  public replacements: any = [];
  public interventionsgroup: any = [];

  public maladaptivegroup: any = [];
  public replacementgroup: any = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  birth_date: any;
  cpt: any;
  note_description: any;
  caregivers_training_goals: any = [];
  rbt_training_goals: any = [];
  rbt_training_goalsgroup: any = [];
  caregivers_training_goalsgroup: any = [];
  pa_assessmentsgroup: any = [];
  pa_assessments: any = [];
  n_un: any = [];

  public location: any;
  public porcent_of_occurrences = 0;
  public porcent_of_correct_response = 0;
  lto: any = null;
  caregiver_goal: any = null;
  cpt_code: any = null;

  insurer_name: any;
  services: any;
  insurer_id: any;

  constructor(
    public bipService: BipService,
    public patientService: PatientMService,
    public goalService: GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public noteBcbaService: NoteBcbaService,
    public doctorService: DoctorService,
    public insuranceService: InsuranceService,
    public locations: Location
  ) {}

  ngOnInit(): void {
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp: any) => {
      this.note_id = resp.id;
    });
    this.getConfig();
    this.getNote();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
  }

  goBack() {
    this.locations.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.noteBcbaService.listConfigNote().subscribe((resp: any) => {
      console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.specialists = resp.specialists;
    });
  }

  getNote() {
    this.noteBcbaService.getNote(this.note_id).subscribe((resp: any) => {
      console.log('respuesta de getNote', resp);
      this.note_selected = resp.noteBcba;
      this.note_selectedId = resp.noteBcba.id;
      this.patient_id = this.note_selected.patient_id;
      this.bip_id = this.note_selected.bip_id;
      this.location = this.note_selected.location;
      // this.birth_date = this.note_selected.birth_date;
      this.birth_date = this.note_selected.birth_date
        ? new Date(this.note_selected.birth_date).toISOString()
        : '';

      this.summary_note = resp.noteBcba.summary_note || '';

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.diagnosis_code = this.note_selected.diagnosis_code;
      this.selectedValueCode = this.note_selected.cpt_code;
      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.note_description = this.note_selected.note_description;
      this.client_response_to_treatment_this_session =
        this.note_selected.client_response_to_treatment_this_session;
      this.pos = this.note_selected.pos;

      this.caregivers_training_goalsgroup = resp.caregiver_goals;
      const jsonObj = JSON.parse(this.caregivers_training_goalsgroup) || '';
      this.caregivers_training_goals = jsonObj;
      // console.log(this.caregivers_training_goals);

      this.rbt_training_goalsgroup = resp.rbt_training_goals;
      const jsonObj1 = JSON.parse(this.rbt_training_goalsgroup) || '';
      this.rbt_training_goals = jsonObj1;
      // console.log(this.rbt_training_goals);

      this.selectedValueAba = resp.noteBcba.aba_supervisor;
      this.selectedValueRendering = resp.noteBcba.rendering_provider;

      this.selectedValueProviderName = this.note_selected.provider_name_g;
      this.selectedValueRBT = this.note_selected.provider_name;
      this.selectedValueBCBA = this.note_selected.supervisor_name;

      this.session_date = this.note_selected.session_date
        ? new Date(this.note_selected.session_date).toISOString()
        : '';

      this.session_length_total = this.note_selected.session_length_total;
      this.session_length_total2 = this.note_selected.session_length_total2;

      this.selectedValueTimeIn = this.note_selected.time_in;

      this.selectedValueTimeOut = this.note_selected.time_in2;
      this.selectedValueTimeIn2 = this.note_selected.time_out;
      this.selectedValueTimeOut2 = this.note_selected.time_out2;

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;

      this.getProfileBip();
    });
  }

  getProfileBip() {
    this.bipService
      .getBipProfilePatient_id(this.patient_id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.client_selected = resp;

        this.first_name = this.client_selected.patient.first_name;
        this.last_name = this.client_selected.patient.last_name;
        this.patient_id = resp.patient.patient_id;
        this.patientLocation_id = resp.patient.location_id;
        this.insurer_id = resp.patient.insurer_id;
        // this.pos = JSON.parse(resp.patient.pos_covered) ;
        this.pos = resp.patient.pos_covered;
        this.insuranceData();
        this.getReplacementsByPatientId();
      });
  }

  getReplacementsByPatientId() {
    this.noteBcbaService
      .showReplacementbyPatient(this.patient_id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.pa_assessments = resp.pa_assessments;
        const jsonObj = JSON.parse(this.pa_assessments) || '';
        this.pa_assessmentsgroup = jsonObj;
        this.n_un = this.pa_assessmentsgroup[0].n_units;
        // this.unitsAsignated = this.pa_assessmentsgroup.n_units;
        // console.log(this.pa_assessmentsgroup);
        this.cpt = this.pa_assessmentsgroup[0].cpt;
        // console.log(this.cpt);
      });
  }

  insuranceData() {
    this.insuranceService
      .showInsurance(this.insurer_id)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.insurer_name = resp.insurer_name;
        // this.notes = resp.notes;
        this.services = resp.services;
      });
  }

  specialistData(selectedValueInsurer) {
    this.doctorService
      .showDoctorProfile(selectedValueInsurer)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.provider_credential = resp.doctor.certificate_number;
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectSpecialist(event: any) {
    event = this.selectedValueProviderName;
    this.specialistData(this.selectedValueProviderName);
  }

  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
  }
  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
  }

  updateCaregiverGoal(index: number) {
    console.log(
      'Caregiver goal updated:',
      this.caregivers_training_goals[index]
    );
  }

  updateRbtGoal(index: number) {
    console.log('RBT goal updated:', this.rbt_training_goals[index]);
  }

  //funcion para la primera imagen.. funciona
  loadFile($event: any) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_RBT = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_SIGNATURE_RBT);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = reader.result);
  }

  loadFileSignature($event: any) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_BCBA = $event.target.files[0];
    const reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE_BCBA);
    reader2.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = reader2.result);
  }

  speciaFirmaDataRbt(selectedValueRBT) {
    this.doctorService
      .showDoctorProfile(selectedValueRBT)
      .subscribe((resp: any) => {
        console.log(resp);
        this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
          resp.doctor.electronic_signature;
        // console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }
  selectFirmaSpecialistRbt(event: any) {
    event = this.selectedValueRBT;
    this.speciaFirmaDataRbt(this.selectedValueRBT);
    // console.log(this.selectedValueRBT);
  }

  speciaFirmaDataBcba(selectedValueBCBA) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
        // console.log(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectFirmaSpecialistBcba(event: any) {
    event = this.selectedValueBCBA;
    this.speciaFirmaDataBcba(this.selectedValueBCBA);
    // console.log(this.selectedValueBCBA);
  }

  save() {
    this.text_validation = '';
    // if(!this.name||!this.email ||!this.surname ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }

    // if(this.password != this.password_confirmation  ){
    //   this.text_validation = 'Las contraseña debe ser igual';
    //   return;
    // }

    const formData = new FormData();
    formData.append('patient_id', this.patient_id);
    formData.append('doctor_id', this.selectedValueRendering);
    formData.append('bip_id', this.bip_id);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('location', this.location);
    formData.append('birth_date', this.birth_date);
    formData.append('session_date', this.session_date);
    formData.append('location_id', this.patientLocation_id + '');

    if (this.summary_note) {
      formData.append('summary_note', this.summary_note);
    }

    if (this.selectedValueTimeIn) {
      formData.append(
        'time_in',
        this.selectedValueTimeIn + '' ? this.selectedValueTimeIn + '' : '0'
      );
    }
    if (this.selectedValueTimeOut) {
      formData.append(
        'time_out',
        this.selectedValueTimeOut + '' ? this.selectedValueTimeOut + '' : '0'
      );
    }
    if (this.selectedValueTimeIn2) {
      formData.append(
        'time_in2',
        this.selectedValueTimeIn2 + '' ? this.selectedValueTimeIn2 + '' : '0'
      );
    }
    if (this.selectedValueTimeOut2) {
      formData.append(
        'time_out2',
        this.selectedValueTimeOut2 + '' ? this.selectedValueTimeOut2 + '' : '0'
      );
    }

    if (this.selectedValueRendering) {
      formData.append('rendering_provider', this.selectedValueRendering);
    }
    if (this.selectedValueAba) {
      formData.append('aba_supervisor', this.selectedValueAba);
    }
    if (this.selectedValueCode) {
      formData.append('cpt_code', this.selectedValueCode);
    }
    if (this.meet_with_client_at) {
      formData.append('meet_with_client_at', this.meet_with_client_at);
    }
    if (this.selectedValueRBT) {
      formData.append('provider_name', this.selectedValueRBT);
    }
    if (this.selectedValueBCBA) {
      formData.append('supervisor_name', this.selectedValueBCBA);
    }
    if (this.note_description) {
      formData.append('note_description', this.note_description);
    }
    if (this.rbt_training_goals) {
      formData.append(
        'rbt_training_goals',
        JSON.stringify(this.rbt_training_goals)
      );
    }
    if (this.caregivers_training_goals) {
      formData.append(
        'caregiver_goals',
        JSON.stringify(this.caregivers_training_goals)
      );
    }

    if (this.FILE_SIGNATURE_RBT) {
      formData.append('imagen', this.FILE_SIGNATURE_RBT);
    }
    if (this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED) {
      formData.append(
        'provider_signature',
        this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED
      );
    }
    if (this.FILE_SIGNATURE_RBT) {
      formData.append('imagenn', this.FILE_SIGNATURE_RBT);
    }
    if (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED) {
      formData.append(
        'supervisor_signature',
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED
      );
    }

    this.noteBcbaService
      .editNote(formData, this.note_selectedId)
      .subscribe((resp: any) => {
        // console.log(resp);

        if (resp.message == 403) {
          this.text_validation = resp.message_text;
        } else {
          // this.text_success = 'Employer created';
          // this.ngOnInit();
          Swal.fire('Updated', ` Note Rbt Updated`, 'success');
          this.router.navigate(['/note-bcba/listbyclient/', this.patient_id]);
        }
      });
  }

  //   class Calculadora {
  //     sumar(num1, num2) {
  //         return num1 + num2;
  //     }

  //     restar(num1, num2) {
  //         return num1 - num2;
  //     }

  //     dividir(num1, num2) {
  //         return num1 / num2;
  //     }

  //     multiplicar(num1, num2) {
  //         return num1 * num2;
  //     }
  // }
  //
  generateAISummary() {
    if (!this.checkDataSufficient()) {
      Swal.fire('Warning', 'Please fill all the required fields', 'warning');
      return;
    }
    this.isGeneratingSummary = true;
    const data = {
      diagnosis: this.diagnosis_code,
      birthDate: this.birth_date,
      startTime: this.selectedValueTimeIn ? this.selectedValueTimeIn : null,
      endTime: this.selectedValueTimeOut ? this.selectedValueTimeOut : null,
      startTime2: this.selectedValueTimeIn2 ? this.selectedValueTimeIn2 : null,
      endTime2: this.selectedValueTimeOut2 ? this.selectedValueTimeOut2 : null,
      pos: this.getPos(this.meet_with_client_at),
      caregiverGoals: this.caregivers_training_goals.map((g) => ({
        goal: g.caregiver_goal,
        percentCorrect: g.porcent_of_correct_response,
      })),
      rbtTrainingGoals: this.rbt_training_goals.map((g) => ({
        goal: g.lto,
        percentCorrect: g.porcent_of_correct_response,
      })),
      noteDescription: this.note_description,
    };

    this.noteBcbaService.generateAISummary(data).subscribe(
      (response: any) => {
        this.summary_note = response.summary;
        this.isGeneratingSummary = false;
      },
      (error) => {
        console.error('Error generating AI summary:', error);
        Swal.fire(
          'Error',
          'Error generating AI summary. Please try again.',
          'error'
        );
        this.isGeneratingSummary = false;
      }
    );
  }

  checkDataSufficient(): boolean {
    if (!this.note_selected) return false;

    const hasTime = this.selectedValueTimeIn && this.selectedValueTimeOut;
    if (!hasTime) return false;

    if (!this.meet_with_client_at) return false;

    if (
      !this.caregivers_training_goals ||
      this.caregivers_training_goals.length === 0
    )
      return false;
    const allCaregiverGoalsValid = this.caregivers_training_goals.every(
      (g) =>
        g.caregiver_goal &&
        g.porcent_of_correct_response !== undefined &&
        g.porcent_of_correct_response !== null
    );
    if (!allCaregiverGoalsValid) return false;

    if (!this.rbt_training_goals || this.rbt_training_goals.length === 0)
      return false;
    const allRbtGoalsValid = this.rbt_training_goals.every(
      (g) =>
        g.lto &&
        g.porcent_of_correct_response !== undefined &&
        g.porcent_of_correct_response !== null
    );
    if (!allRbtGoalsValid) return false;

    if (!this.note_description) return false;

    return true;
  }

  getPos(posCode: string) {
    switch (posCode) {
      case '03':
        return 'School';
      case '12':
        return 'Home';
      case '02':
        return 'Telehealth';
      case '99':
        return 'Other';
      default:
        return 'Unknown';
    }
  }
}
