import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { NoteRbtService } from '../services/note-rbt.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-note-rbt',
  templateUrl: './edit-note-rbt.component.html',
  styleUrls: ['./edit-note-rbt.component.scss'],
})
export class EditNoteRbtComponent implements OnInit {
  public routes = AppRoutes;
  public target: number;
  public interventionsList: any[] = [];

  changeTime() {
    this.selectedValueTimeIn = this.formatTime('11:00:00');
  }

  valid_form = false;
  valid_form_success = false;

  public text_success = '';
  public text_validation = '';

  public selectedValueProvider!: string;
  public selectedValueRBT!: string;
  public selectedValueBCBA!: string;
  public selectedValueCode!: string;
  public selectedValueTimeIn = '';
  public selectedValueTimeOut = '';
  public selectedValueTimeIn2 = '';
  public selectedValueTimeOut2 = '';
  public selectedValueProviderName!: string;
  public selectedValueMaladaptive!: string;
  option_selected = 0;
  isGeneratingSummary = false;

  client_id: any;
  patient_id: any;
  doctor_id: any;
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
  public IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any;
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
  public porcentage_diario: any;

  public roles_rbt: any = [];
  public roles_bcba: any = [];

  public hours_days: any = [];
  public maladaptives: any = [];
  public replacementGoals: any = [];
  public intervention_added: any = [];
  public replacements: any = [];
  public interventionsgroup: any = [];

  public maladaptivegroup: any = [];
  public replacementgroup: any = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  pa_assessments: any = null;
  pa_assessmentsgroup: any = null;
  cpt_code: any = null;
  provider: any = null;

  constructor(
    public bipService: BipService,
    public patientService: PatientMService,
    public goalService: GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public noteRbtService: NoteRbtService,
    public doctorService: DoctorService,
    public location: Location
  ) {}

  ngOnInit(): void {
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp: any) => {
      this.note_id = resp.id;
    });

    //  this.countValue();

    this.total_trials = 0;
    this.number_of_occurrences = 0;
    this.number_of_correct_response = 0;

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
    this.getNote();
    this.getConfig();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.noteRbtService.listConfigNote().subscribe((resp: any) => {
      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.getNote();
    });
  }

  private convertToInterventions(input: { [x: string]: boolean }) {
    return [
      { id: 'pairing', name: 'Pairing', value: input['pairing'] || false },
      {
        id: 'response_block',
        name: 'Response Block',
        value: input['response_block'] || false,
      },
      { id: 'DRA', name: 'DRA', value: input['DRA'] || false },
      { id: 'DRO', name: 'DRO', value: input['DRO'] || false },
      {
        id: 'redirection',
        name: 'Redirection',
        value: input['redirection'] || false,
      },
      {
        id: 'errorless_teaching',
        name: 'Errorless Teaching',
        value: input['errorless_teaching'] || false,
      },
      { id: 'NCR', name: 'NCR', value: input['NCR'] || false },
      { id: 'shaping', name: 'Shaping', value: input['shaping'] || false },
      { id: 'chaining', name: 'Chaining', value: input['chaining'] || false },
      {
        id: 'token_economy',
        name: 'Token Economy',
        value: input['token_economy'] || false,
      },
      {
        id: 'extinction',
        name: 'Extinction',
        value: input['extinction'] || false,
      },
      {
        id: 'natural_teaching',
        name: 'Natural Teaching',
        value: input['natural_teaching'] || false,
      },
    ];
  }

  private convertToInterventionsGroup(
    interventions: { id: string; name: string; value: boolean }[]
  ) {
    const group = {};
    for (const intervention of interventions) {
      if (intervention.value) {
        group[intervention.id] = true;
      }
    }
    return group;
  }

  getNote() {
    this.noteRbtService.getNote(this.note_id).subscribe((resp: any) => {
      console.log('Response from getNote:', resp);

      this.target = resp.target;
      this.note_selected = resp.noteRbt;
      this.note_selectedId = resp.noteRbt.id;
      this.patient_id = this.note_selected.patient_id;
      this.bip_id = this.note_selected.bip_id;

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.client_response_to_treatment_this_session =
        this.note_selected.client_response_to_treatment_this_session;

      this.selectedValueCode = this.note_selected.cpt_code;

      this.selectedValueProviderName = this.note_selected.provider_name_g
        ? this.note_selected.provider_name_g
        : null;
      this.selectedValueRBT = this.note_selected.provider_name;
      this.selectedValueBCBA = this.note_selected.supervisor_name;

      this.interventions = resp.interventions;
      const jsonObj = JSON.parse(resp.interventions) || '';
      this.interventionsgroup = [...jsonObj];

      this.interventionsList = this.convertToInterventions(
        this.interventionsgroup[0]
      );

      this.maladaptive = resp.maladaptives;
      const jsonObj1 = JSON.parse(this.maladaptive) || '';
      this.maladaptivegroup = [...jsonObj1];

      this.replacement = resp.replacements; // ?
      const jsonObj2 = JSON.parse(this.replacement) || '';
      this.replacementgroup = jsonObj2;
      // console.log(this.replacementgroup);

      // this.pos = this.note_selected.pos;
      this.environmental_changes = this.note_selected.environmental_changes;
      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.progress_noted_this_session_compared_to_previous_session =
        this.note_selected.progress_noted_this_session_compared_to_previous_session;

      this.rbt_modeled_and_demonstrated_to_caregiver =
        this.note_selected.rbt_modeled_and_demonstrated_to_caregiver;
      this.replacement = this.note_selected.replacement;

      // this.session_date = this.note_selected.session_date;
      this.session_date = this.note_selected.session_date
        ? new Date(this.note_selected.session_date).toISOString()
        : '';
      // this.next_session_is_scheduled_for = this.note_selected.next_session_is_scheduled_for;
      this.next_session_is_scheduled_for = this.note_selected
        .next_session_is_scheduled_for
        ? new Date(
            this.note_selected.next_session_is_scheduled_for
          ).toISOString()
        : '';

      this.session_length_total = this.note_selected.session_length_total;
      this.session_length_total2 = this.note_selected.session_length_total2;

      console.log('Setting:', this.formatTime(this.note_selected.time_in));
      this.selectedValueTimeIn = this.formatTime(this.note_selected.time_in);
      this.selectedValueTimeOut = this.formatTime(this.note_selected.time_out);
      this.selectedValueTimeIn2 = this.formatTime(this.note_selected.time_in2);
      this.selectedValueTimeOut2 = this.formatTime(
        this.note_selected.time_out2
      );
      console.log(
        'Times updated:',
        this.selectedValueTimeIn,
        this.selectedValueTimeOut,
        this.selectedValueTimeIn2,
        this.selectedValueTimeOut2
      );

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;
      console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      this.getProfileBip();
    });
  }

  private formatTime(timeString: string | null): string {
    console.log('formatting time: ', timeString);
    if (!timeString) return '';
    const [hours, minutes] = timeString.replace(/ /g, '').split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
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

        // this.pos = JSON.parse(resp.patient.pos_covered) ;
        this.pos = resp.patient.pos_covered;
        this.diagnosis_code = this.client_selected.patient.diagnosis_code;

        this.pa_assessments = resp.patient.pa_assessments;
        const jsonObj = JSON.parse(this.pa_assessments) || '';
        this.pa_assessmentsgroup = jsonObj;
        // this.n_un = this.pa_assessmentsgroup[0].n_units;
        // this.unitsAsignated = this.pa_assessmentsgroup.n_units;
        // console.log(this.pa_assessments);
        console.log(this.pa_assessmentsgroup);
      });
  }

  selectCpt(event: any) {
    event = this.selectedValueCode;
    // this.getCPtLißst(this.selectedValueCode);
    console.log(event);
  }

  specialistData(selectedValueInsurer) {
    this.doctorService
      .showDoctorProfile(selectedValueInsurer)
      .subscribe((resp: any) => {
        console.log(resp);
        this.provider_credential = resp.doctor.certificate_number;
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectSpecialist(event: any) {
    event = this.selectedValueProviderName;
    this.specialistData(this.selectedValueProviderName);
  }

  onInterventionsChange(updatedInterventions: any[]) {
    this.interventionsgroup = [
      this.convertToInterventionsGroup(this.interventionsList),
    ];
    console.log(this.interventionsgroup);
  }

  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
    this.recalculateSessionLength();
  }
  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.recalculateSessionLength();
  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
    this.recalculateSessionLength();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.recalculateSessionLength();
  }

  private recalculateSessionLength() {
    this.session_length_total =
      this.selectedValueTimeIn && this.selectedValueTimeOut
        ? this.calculateSessionLength(
            this.selectedValueTimeIn,
            this.selectedValueTimeOut
          )
        : '00:00';
    this.session_length_total2 =
      this.selectedValueTimeIn2 && this.selectedValueTimeOut2
        ? this.calculateSessionLength(
            this.selectedValueTimeIn2,
            this.selectedValueTimeOut2
          )
        : '00:00';
  }
  private calculateSessionLength(timeIn: string, timeOut: string): string {
    const [hoursIn, minutesIn] = timeIn.split(':').map(Number);
    const [hoursOut, minutesOut] = timeOut.split(':').map(Number);
    const totalMinutes = (hoursOut - hoursIn) * 60 + (minutesOut - minutesIn);
    return `${Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}`;
  }

  selectMaladaptive(behavior: any) {
    this.maladaptiveSelected = behavior;
    console.log(behavior);
    // this.maladp_added.push({
    //   maladaptive : behavior
    // })
  }

  selectReplacement(replacemen: any) {
    this.replacementSelected = replacemen;
    console.log(this.replacementSelected);
    // this.replacement_added.push({
    //   replacement : replacemen
    // })
  }

  onMaladaptivesChange(updatedMaladaptives: any[]) {
    this.maladaptivegroup = updatedMaladaptives;
  }

  onReplacementsChange(updatedReplacements: any[]) {
    this.replacementGoals = updatedReplacements;
  }

  back() {
    this.replacementSelected = null;
    this.maladaptiveSelected = null;
    this.total_trials = 0;
    this.number_of_correct_response = 0;
    // this.ngOnInit();
  }

  speciaFirmaDataRbt(selectedValueRBT) {
    this.doctorService
      .showDoctorProfile(selectedValueRBT)
      .subscribe((resp: any) => {
        this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
          resp.doctor.electronic_signature;
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }
  selectFirmaSpecialistRbt(event: any) {
    event = this.selectedValueRBT;
    this.speciaFirmaDataRbt(this.selectedValueRBT);
  }

  speciaFirmaDataBcba(selectedValueBCBA) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp: any) => {
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectFirmaSpecialistBcba(event: any) {
    event = this.selectedValueBCBA;
    this.speciaFirmaDataBcba(this.selectedValueBCBA);
  }

  addMaladaptive(behavior: any, i) {
    this.maladaptiveSelected = behavior;
    this.maladaptives[i] = behavior;

    if (this.maladaptives.length > 1) {
      this.maladaptives.splice(this.maladaptives, 1);
    }
    this.maladaptiveSelected = null;
    this.maladaptive_behavior = '';
    this.number_of_occurrences = null;
  }

  // addReplacement(replacemen, i){

  //   this.replacementSelected = replacemen;
  //   this.replacementGoals[i] = replacemen;
  //   if(this.maladaptives.length > 1){
  //     this.maladaptives.splice(this.maladaptives,1);
  //   }
  //   this.replacementSelected = null;
  //   this.goal = '';
  //   this.total_trials = null;
  //   this.number_of_correct_response = null;

  // }

  addReplacement(replacemen) {
    this.replacementSelected = replacemen;
    this.replacementGoals.push({
      goal: this.replacementSelected.goal,
      total_trials: this.replacementSelected.total_trials,
      number_of_correct_response:
        this.replacementSelected.number_of_correct_response,
      // number_of_correct_response: this.number_of_correct_response ? this.number_of_correct_response :0 ,
    });
    if (this.replacementGoals.length > 1) {
      this.replacementGoals.splice(this.replacementGoals, 1);
    }
    this.replacementSelected = null;
    this.goal = '';
    this.total_trials = null;
    this.number_of_correct_response = null;
  }

  deleteLTOGoal(i: any) {
    this.replacementGoals.splice(i, 1);
  }

  // countValue(){
  //   const countElement = document.querySelector('.count') as HTMLInputElement;
  //   // const countElement = behavior;
  //   countElement.disabled = false;

  //   document.addEventListener('click', (event) => {
  //     const target = event.target as HTMLElement;
  //     if (target.classList.contains('plus')) {
  //       countElement.value = (parseInt(countElement.value, 10) + 1).toString();
  //     } else if (target.classList.contains('minus')) {
  //       let currentValue = parseInt(countElement.value, 10);
  //       if (currentValue === 0) {
  //         currentValue = 1;
  //       } else {
  //         currentValue -= 1;
  //       }
  //       countElement.value = currentValue.toString();
  //     }
  //   });
  // }

  countValue1() {
    const min = 0; // Minimum of 0
    const max = 10; // Maximum of 10
    const countElement = document.querySelector('.count') as HTMLInputElement;
    countElement.disabled = true;

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('minus')) {
        if (countElement.value > min.toString()) {
          countElement.value = (
            parseInt(countElement.value, 10) - 1
          ).toString();
          const counterElement = document.querySelector(
            '.counter'
          ) as HTMLDivElement;
          counterElement.textContent = (
            parseInt(counterElement.textContent, 10) - 1
          ).toString();
        }
      } else if (target.classList.contains('plus')) {
        if (countElement.value < max.toString()) {
          countElement.value = (
            parseInt(countElement.value, 10) + 1
          ).toString();
          const counterElement = document.querySelector(
            '.counter'
          ) as HTMLDivElement;
          counterElement.textContent = (
            parseInt(counterElement.textContent, 10) + 1
          ).toString();
        }
      }
    });
  }

  cambiarStatus(goalsto: any) {
    // this.status_sto_edit = goalsto;
    // console.log(this.status_sto_edit.status_sto);
    // let data ={
    //   goalstos: this.golsto,
    //   goalltos: this.gollto,
    // }
    // this.goalService.editGoal(data, this.goalmaladaptiveid).subscribe(
    //   resp =>{
    //     // console.log(resp);
    //     // this.getTableData();
    //     Swal.fire('Updated', `Goal Updated successfully!`, 'success');
    //     this.ngOnInit();
    //   }
    // )
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
    formData.append('doctor_id', this.selectedValueProviderName);
    formData.append('bip_id', this.bip_id);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('provider_credential', this.provider_credential);
    formData.append('pos', this.pos);

    formData.append('cpt_code', this.selectedValueCode);
    // formData.append('provider', this.provider); // para el calculo de las unidades

    formData.append('session_date', this.session_date);

    if (this.meet_with_client_at) {
      formData.append('meet_with_client_at', this.meet_with_client_at);
    }
    if (this.selectedValueProviderName) {
      formData.append('provider_name_g', this.selectedValueProviderName);
    }
    if (this.selectedValueTimeIn) {
      formData.append(
        'time_in',
        this.selectedValueTimeIn + '' ? this.selectedValueTimeIn + '' : ''
      );
    }
    if (this.selectedValueTimeOut) {
      formData.append(
        'time_out',
        this.selectedValueTimeOut + '' ? this.selectedValueTimeOut + '' : ''
      );
    }
    if (this.selectedValueTimeIn2) {
      formData.append(
        'time_in2',
        this.selectedValueTimeIn2 + '' ? this.selectedValueTimeIn2 + '' : ''
      );
    }
    if (this.selectedValueTimeOut2) {
      formData.append(
        'time_out2',
        this.selectedValueTimeOut2 + '' ? this.selectedValueTimeOut2 + '' : ''
      );
    }
    if (this.environmental_changes) {
      formData.append('environmental_changes', this.environmental_changes);
    }
    if (this.selectedValueProviderName) {
      formData.append('provider_name_g', this.selectedValueProviderName);
    }
    if (this.selectedValueRBT) {
      formData.append('provider_name', this.selectedValueRBT);
    }
    if (this.selectedValueBCBA) {
      formData.append('supervisor_name', this.selectedValueBCBA);
    }
    if (this.replacementgroup) {
      formData.append('replacements', JSON.stringify(this.replacementgroup));
    }
    if (this.maladaptivegroup) {
      formData.append('maladaptives', JSON.stringify(this.maladaptivegroup));
    }
    if (this.interventionsgroup) {
      formData.append('interventions', JSON.stringify(this.interventionsgroup));
    }
    if (this.as_evidenced_by) {
      formData.append('as_evidenced_by', this.as_evidenced_by);
    }

    if (this.client_appeared) {
      formData.append('client_appeared', this.client_appeared);
    }
    if (this.client_response_to_treatment_this_session) {
      formData.append(
        'client_response_to_treatment_this_session',
        this.client_response_to_treatment_this_session
      );
    }
    if (this.next_session_is_scheduled_for) {
      formData.append(
        'next_session_is_scheduled_for',
        this.next_session_is_scheduled_for
      );
    }

    // if(this.FILE_SIGNATURE_RBT ){
    //   formData.append('imagen', this.FILE_SIGNATURE_RBT);
    // }
    // if(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED ){
    //   formData.append('imagen', this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
    // }
    // if(this.FILE_SIGNATURE_RBT ){
    //   formData.append('imagenn', this.FILE_SIGNATURE_RBT);
    // }
    // if(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED ){
    //   formData.append('imagenn', this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
    // }

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

    this.noteRbtService.editNote(formData, this.note_selectedId).subscribe(
      (resp: any) => {
        // console.log(resp);

        if (resp.message == 403) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', this.text_validation, 'warning');
        } else {
          Swal.fire('Updated', 'Note RBT Updated', 'success');
          this.router.navigate(['/note-rbt/listbyclient/', this.patient_id]);
        }
      },
      (error) => {
        console.error('Error updating note:', error);
        if (
          error.error &&
          error.error.message &&
          error.error.message.includes('Time conflict')
        ) {
          this.text_validation =
            'There is a time conflict with an existing note. Please choose a different time.';
        } else {
          this.text_validation =
            'An error occurred while updating the note. Please try again.';
        }
        Swal.fire('Error', this.text_validation, 'error');
      }
    );
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

  generateAISummary() {
    if (!this.checkDataSufficient()) {
      Swal.fire('Warning', 'Please fill all the required fields', 'warning');
      return;
    }
    this.isGeneratingSummary = true;
    console.log(this.client_selected.patient, 'patient');
    console.log(this.maladaptivegroup, 'maladaptives');
    const data = {
      diagnosis: this.diagnosis_code,
      birthDate: this.client_selected.patient?.birth_date
        ? this.client_selected.patient.birth_date
        : null,
      startTime: this.selectedValueTimeIn
        ? `${this.selectedValueTimeIn}`.trim()
        : null,
      endTime: this.selectedValueTimeOut
        ? `${this.selectedValueTimeOut}`.trim()
        : null,
      startTime2: this.selectedValueTimeIn2
        ? `${this.selectedValueTimeIn2}`.trim()
        : null,
      endTime2: this.selectedValueTimeOut2
        ? `${this.selectedValueTimeOut2}`.trim()
        : null,
      mood: this.client_appeared,
      pos: this.getPos(this.meet_with_client_at),
      maladaptives: this.maladaptivegroup.map((m) => ({
        behavior: m.maladaptive_behavior,
        frequency: m.number_of_occurrences,
      })),
      replacements: this.replacementgroup.map((r) => ({
        name: r.goal,
        totalTrials: r.total_trials,
        correctResponses: r.number_of_correct_response,
      })),
      interventions:
        this.interventionsgroup.length > 0
          ? Object.keys(this.interventionsgroup[0]).filter(
              (key) => this.interventionsgroup[0][key]
            )
          : [],
    };

    this.noteRbtService.generateAISummary(data).subscribe(
      (response: any) => {
        this.client_response_to_treatment_this_session = response.summary;
        this.isGeneratingSummary = false;
      },
      (error) => {
        console.error('Error generating AI summary:', error);
        Swal.fire(
          'Error',
          'Error generating AI summary. Please ensure you have filled all the required fields.',
          'error'
        );
        this.isGeneratingSummary = false;
      }
    );
  }

  checkDataSufficient(): boolean {
    if (!this.client_selected) return false;

    const hasTime1 = this.selectedValueTimeIn && this.selectedValueTimeOut;
    const hasTime2 = this.selectedValueTimeIn2 && this.selectedValueTimeOut2;
    if (!hasTime1 && !hasTime2) return false;

    if (!this.meet_with_client_at) return false;

    if (!this.maladaptivegroup || this.maladaptivegroup.length === 0)
      return false;
    const allMaladaptivesValid = this.maladaptivegroup.every(
      (m) =>
        m.maladaptive_behavior &&
        m.number_of_occurrences !== undefined &&
        m.number_of_occurrences !== null
    );
    if (!allMaladaptivesValid) return false;

    if (!this.replacementgroup || this.replacementgroup.length === 0)
      return false;
    const allReplacementsValid = this.replacementgroup.every(
      (r) =>
        r.total_trials !== undefined &&
        r.total_trials !== null &&
        r.number_of_correct_response !== undefined &&
        r.number_of_correct_response !== null
    );
    if (!allReplacementsValid) return false;

    if (!this.interventionsgroup || this.interventionsgroup.length === 0)
      return false;

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
