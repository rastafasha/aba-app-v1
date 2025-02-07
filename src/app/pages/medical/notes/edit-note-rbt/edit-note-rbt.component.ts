import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { NoteRbtService } from '../../../../core/services/notes-rbt.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { PaServiceV2 } from 'src/app/core/models';
import { PatientsV2Service } from 'src/app/core/services';
import { PaServicesV2Service } from 'src/app/core/services/pa-services.v2.service';
import { interventionsList } from '../listaInterventionData';
import { getPos, posCodes } from 'src/app/shared/utils/getPos';

@Component({
  selector: 'app-edit-note-rbt',
  templateUrl: './edit-note-rbt.component.html',
  styleUrls: ['./edit-note-rbt.component.scss'],
})
export class EditNoteRbtComponent implements OnInit {
  routes = AppRoutes;
  target: number;
  posCodes = posCodes;


  changeTime() {
    this.selectedValueTimeIn = this.formatTime('11:00:00');
  }

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  selectedValueCode!: string;
  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  selectedValueProviderName!: string;
  selectedValueMaladaptive!: string;
  option_selected = 0;
  isGeneratingSummary = false;

  selectedValueRBT!: string;
  selectedValueRenderingProvider!: string;
  selectedValueProviderRBT_id!: number;

  selectedValueBCBA!: string;
  selectedValueAbaSupervisor!: string;
  selectedValueBcba_id!: number;

  client_id: any;
  patient_identifier: string;
  patient_id: number;
  doctor_id: any;
  patient_selected: any;
  client_selected: any;
  note_selected: any;
  user: AppUser;
  bip_id: any;
  insurance_identifier: string;
  insurance_id: number;

  first_name = '';
  last_name = '';
  diagnosis_code = '';

  provider_name_g = '';
  provider_credential = '';
  pos = '';
  session_date = '';
  time_in = '';
  time_out = '';
  time_in2 = '';
  time_out2 = '';
  session_length_morning_total = '';
  session_length_afternon_total = '';
  session_length_total = '';
  environmental_changes = '';
  totalMinutos = 0;
  total_hour_session = '';
  participants = '';
  projectedUnits = 0;

  summary_note = '';
  meet_with_client_at = '';
  client_appeared = '';
  as_evidenced_by = '';
  rbt_modeled_and_demonstrated_to_caregiver = '';
  progress_noted_this_session_compared_to_previous_session = '';
  next_session_is_scheduled_for = '';
  provider_name = '';
  supervisor_name = '';

  number_of_occurrences = 0;
  number_of_correct_responses = 0;
  total_trials = 0;
  number_of_correct_response = 0;
  maladaptive = '';
  replacement = '';
  name = '';
  interventions: any;
  provider_signature: any;
  supervisor_signature: any;

  token_economy: boolean;
  generalization: boolean;
  NCR: boolean;
  behavioral_momentum: boolean;
  DRA: boolean;
  DRI: boolean;
  DRO: boolean;
  DRL: boolean;
  response_block: boolean;
  errorless_teaching: boolean;
  extinction: boolean;
  chaining: boolean;
  natural_teaching: boolean;
  redirection: boolean;
  shaping: boolean;
  pairing: boolean;

  FILE_SIGNATURE_RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any;
  FILE_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED: string | Blob =
    'assets/img/user-06.jpg';

  rbt_id: number;
  note_id: number;
  patientLocation_id: number;
  note_selectedId: number;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  replacementGoals = [];
  intervention_added = [];
  interventionsgroup :any = [];
  replacements = [];
  replacementgroup :any = [];

  maladaptivegroup :any = [];
  maladaptives: any [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  pa_assessments: any = null;
  pa_assessmentsgroup: any = null;
  cpt_code: string;
  status: string;

  paServices: PaServiceV2[] = [];
  selectedPaService: PaServiceV2 | null = null;

  fromParam: string | null = null;
  noteServiceId:number;
  pa_services: PaServiceV2[] = [];
  interventionsList=interventionsList;
  // interventionsList: any[] = [];

  constructor(
    private bipService: BipService,
    private paServicesService: PaServicesV2Service,
    private patientService: PatientsV2Service,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteRbtService: NoteRbtService,
    private doctorService: DoctorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((resp) => {
      this.note_id = resp['id'];
    });

    this.ativatedRoute.queryParams.subscribe((params) => {
      this.fromParam = params['from'];
    });

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
    this.noteRbtService.listConfigNote().subscribe((resp) => {
      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.getNote();
    });
  }

  updateInterventions() {
    const interventionsObj = this.interventionsList
      .filter((intervention) => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = true;
        return acc;
      }, {});
    this.intervention_added = [interventionsObj];
  }


  // private convertToInterventions(input: { [x: string]: boolean }) {
  //   return [
  //     {
  //       id: 'token_economy',
  //       name: 'Token Economy',
  //       value: input['token_economy'] || false,
  //     },
  //     {
  //       id: 'generalization',
  //       name: 'Generalization',
  //       value: input['generalization'] || false,
  //     },
  //     { id: 'NCR', name: 'NCR', value: input['NCR'] || false },
  //     {
  //       id: 'behavioral_momentum',
  //       name: 'Behavioral Momentum',
  //       value: input['Behavioral Momentum'] || false,
  //     },
  //     { id: 'DRA', name: 'DRA', value: input['DRA'] || false },
  //     { id: 'DRI', name: 'DRI', value: input['DRI'] || false },
  //     { id: 'DRO', name: 'DRO', value: input['DRO'] || false },
  //     { id: 'DRL', name: 'DRL', value: input['DRL'] || false },

  //     {
  //       id: 'response_block',
  //       name: 'Response Block',
  //       value: input['response_block'] || false,
  //     },
  //     {
  //       id: 'errorless_teaching',
  //       name: 'Errorless Teaching',
  //       value: input['errorless_teaching'] || false,
  //     },
  //     {
  //       id: 'extinction',
  //       name: 'Extinction',
  //       value: input['extinction'] || false,
  //     },
  //     { id: 'chaining', name: 'Chaining', value: input['chaining'] || false },
  //     {
  //       id: 'natural_teaching',
  //       name: 'Natural Teaching',
  //       value: input['natural_teaching'] || false,
  //     },
  //     {
  //       id: 'redirection',
  //       name: 'Redirection',
  //       value: input['redirection'] || false,
  //     },
  //     { id: 'shaping', name: 'Shaping', value: input['shaping'] || false },
  //     { id: 'pairing', name: 'Pairing', value: input['pairing'] || false },
  //   ];
  // }

  // private convertToInterventionsGroup(
  //   interventions: { id: string; name: string; value: boolean }[]
  // ) {
  //   const group = {};
  //   for (const intervention of interventions) {
  //     if (intervention.value) {
  //       group[intervention.id] = true;
  //     }
  //   }
  //   return group;
  // }

  getNote() {
    this.noteRbtService.getNote(this.note_id).subscribe((resp) => {
      console.log('Response from getNote:', resp);

      this.target = resp.target;
      this.note_selected = resp.noteRbt;
      this.note_selectedId = resp.noteRbt.id;
      this.bip_id = this.note_selected.bip_id;
      this.insurance_identifier = this.note_selected.insurance_identifier;
      this.patient_identifier = this.note_selected.patient_identifier;
      this.patient_id = this.note_selected.patient_id;
      this.participants = this.note_selected.participants;
      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.summary_note = this.note_selected.summary_note;
      this.environmental_changes = this.note_selected.environmental_changes;
      this.status = this.note_selected.status;

      this.selectedValueCode = this.note_selected.cpt_code;

      // if (Array.isArray(this.note_selected.interventions)) {
      //   this.interventionsList[0] = this.note_selected.interventions;
      // } else if (this.note_selected.interventions && typeof this.note_selected.interventions === 'object') {
      //   this.interventionsList = [this.note_selected.interventions];
      // } else {
      //   this.interventionsList = [];
      // }
      // console.log(this.interventionsList);

      this.interventions = this.note_selected.interventions;
      this.interventions = this.convertToInterventions(
        this.interventions[0]
      );

      // Transform maladaptives data to match component expectations
      this.maladaptives = this.note_selected.maladaptives.map(m => ({
        ...m,
        number_of_occurrences: m.ocurrences
      }));

      // Transform replacements data to match component expectations
      this.replacements = this.note_selected.replacements.map(r => ({
        ...r,
        number_of_correct_response: r.correct_responses
      }));

      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.progress_noted_this_session_compared_to_previous_session =
        this.note_selected.progress_noted_this_session_compared_to_previous_session;

      this.rbt_modeled_and_demonstrated_to_caregiver =
        this.note_selected.rbt_modeled_and_demonstrated_to_caregiver;

      this.session_date = this.note_selected.session_date
        ? new Date(this.note_selected.session_date).toISOString()
        : '';

      this.next_session_is_scheduled_for = this.note_selected
        .next_session_is_scheduled_for
        ? new Date(
            this.note_selected.next_session_is_scheduled_for
          ).toISOString()
        : '';

      this.session_length_morning_total =
        this.note_selected.session_length_morning_total;
      this.session_length_afternon_total =
        this.note_selected.session_length_afternon_total;

      this.session_length_total = this.note_selected.session_length_total;

      this.selectedValueTimeIn = this.formatTime(this.note_selected.time_in);
      this.selectedValueTimeOut = this.formatTime(this.note_selected.time_out);
      this.selectedValueTimeIn2 = this.formatTime(this.note_selected.time_in2);
      this.selectedValueTimeOut2 = this.formatTime(
        this.note_selected.time_out2
      );

      const noteServiceId = resp.noteRbt.pa_service_id;
      if (this.paServices?.length && noteServiceId) {
        this.selectedPaService =
          this.paServices.find((service) => service.id === noteServiceId) ||
          null;
      }

      this.selectedValueRBT = this.note_selected.provider.name;
      this.selectedValueProviderRBT_id =this.note_selected.provider.id;
      this.provider_name =this.note_selected.provider.name;

      this.selectedValueBCBA = this.note_selected.supervisor.name;
      this.selectedValueBcba_id = this.note_selected.supervisor.id;

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;
      // console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      this.getProfileBip(noteServiceId);
    });
  }

  private formatTime(timeString: string | null): string {
    // console.log('formatting time: ', timeString);
    if (!timeString) return '';
    const [hours, minutes] = timeString.replace(/ /g, '').split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  private convertToInterventions(input: { [x: string]: boolean }) {
    return [
      {
        id: 'token_economy',
        name: 'Token Economy',
        value: input['token_economy'] || false,
      },
      {
        id: 'generalization',
        name: 'Generalization',
        value: input['generalization'] || false,
      },
      { id: 'NCR', name: 'NCR', value: input['NCR'] || false },
      {
        id: 'behavioral_momentum',
        name: 'Behavioral Momentum',
        value: input['Behavioral Momentum'] || false,
      },
      { id: 'DRA', name: 'DRA', value: input['DRA'] || false },
      { id: 'DRI', name: 'DRI', value: input['DRI'] || false },
      { id: 'DRO', name: 'DRO', value: input['DRO'] || false },
      { id: 'DRL', name: 'DRL', value: input['DRL'] || false },

      {
        id: 'response_block',
        name: 'Response Block',
        value: input['response_block'] || false,
      },
      {
        id: 'errorless_teaching',
        name: 'Errorless Teaching',
        value: input['errorless_teaching'] || false,
      },
      {
        id: 'extinction',
        name: 'Extinction',
        value: input['extinction'] || false,
      },
      { id: 'chaining', name: 'Chaining', value: input['chaining'] || false },
      {
        id: 'natural_teaching',
        name: 'Natural Teaching',
        value: input['natural_teaching'] || false,
      },
      {
        id: 'redirection',
        name: 'Redirection',
        value: input['redirection'] || false,
      },
      { id: 'shaping', name: 'Shaping', value: input['shaping'] || false },
      { id: 'pairing', name: 'Pairing', value: input['pairing'] || false },
    ];
  }


  getProfileBip(noteServiceId?: number) {

    this.bipService
      .getBipProfilePatient_id(this.patient_identifier)
      .subscribe((resp) => {
        console.log('client', resp);
        this.client_selected = resp.patient;
        this.first_name = this.client_selected.first_name;
      this.last_name = this.client_selected.last_name;
      this.patient_identifier = this.client_selected.patient_identifier;
      this.diagnosis_code = this.client_selected.diagnosis_code;
      this.insurance_id = this.client_selected.insurer_id;
      this.insurance_identifier = this.client_selected.insurance_identifier;
      this.patientLocation_id = this.client_selected.location_id;

        this.paServices = this.client_selected.pa_services;
        if (noteServiceId) {
          this.setPaService(noteServiceId);
        }
        this.selectedPaService =
          resp.patient.pa_services.find((service) => service.cpt === '97153') ||
          null;
      });
  }



  onPosChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.meet_with_client_at = target.value.toString();
    console.log(this.meet_with_client_at);
  }

  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
    }
  }

  private setPaService(noteServiceId: number) {
    if (this.paServices?.length && noteServiceId) {
      this.selectedPaService =
        this.paServices.find((service) => service.id === noteServiceId) || null;
      if (this.selectedPaService) {
        this.selectedValueCode = this.selectedPaService.cpt;
      }
    }
  }

  selectCpt(event) {
    event = this.selectedValueCode;
  }

  specialistData(selectedValueInsurer) {
    this.doctorService
      .showDoctorProfile(selectedValueInsurer)
      .subscribe((resp) => {
        this.provider_credential = resp.doctor.certificate_number;
      });
  }

  selectSpecialist(event) {
    event = this.selectedValueProviderRBT_id;
    this.specialistData(this.selectedValueProviderRBT_id);
  }

  onInterventionsChange(updatedInterventions: any[]) {
    this.intervention_added = updatedInterventions;
  }




  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
    this.recalculateSessionLength();
    this.calculateTotalHours();
  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
    this.recalculateSessionLength();
    this.calculateTotalHours();
  }

  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.recalculateSessionLength();
    this.calculateTotalHours();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.recalculateSessionLength();
    this.calculateTotalHours();
  }

  calculateTotalHours() {
    const timeIn1 = this.convertToMinutes(this.selectedValueTimeIn);
    const timeOut1 = this.convertToMinutes(this.selectedValueTimeOut);
    const timeIn2 = this.convertToMinutes(this.selectedValueTimeIn2);
    const timeOut2 = this.convertToMinutes(this.selectedValueTimeOut2);

    const totalMinutes = timeOut1 - timeIn1 + (timeOut2 - timeIn2);
    const totalHours = this.convertToHours(totalMinutes);
    this.total_hour_session = totalHours;
    // console.log(`Total hours: ${totalHours}`);
    // console.log('para el html', this.total_hour_session);
  }

  convertToMinutes(time: string): number {
    if (!time || !time.includes(':')) {
      // console.error(`Invalid time format: ${time}`);
      return 0; // O manejar el error de otra manera
    }

    const [hours, minutes] = time.split(':').map(Number);

    // Validar que hours y minutes sean números válidos
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      minutes < 0 ||
      minutes >= 60
    ) {
      // console.error(`Invalid time values: hours=${hours}, minutes=${minutes}`);
      return 0; // O manejar el error de otra manera
    }

    return hours * 60 + minutes;
  }

  convertToHours(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  private recalculateSessionLength() {
    this.session_length_morning_total =
      this.selectedValueTimeIn && this.selectedValueTimeOut
        ? this.calculateSessionLength(
            this.selectedValueTimeIn,
            this.selectedValueTimeOut
          )
        : '00:00';
    this.session_length_afternon_total =
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
  }

  selectReplacement(replacemen: any) {
    this.replacementSelected = replacemen;
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
  }

  speciaFirmaDataRbt(selectedValueRBT) {
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp) => {
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        resp.doctor.electronic_signature;
    });
  }
  selectFirmaSpecialistRbt(event) {
    event = this.selectedValueProviderRBT_id;
    this.speciaFirmaDataRbt(this.selectedValueProviderRBT_id);
    // console.log(this.selectedValueProviderRBT_id);
  }

  speciaFirmaDataBcba(selectedValueBCBA) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp) => {
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
      });
  }


  selectFirmaSpecialistBcba(event) {
    event = this.selectedValueBcba_id;
    this.speciaFirmaDataBcba(this.selectedValueBcba_id);
  }

  addMaladaptive(behavior: any, i) {
    this.maladaptiveSelected = behavior;
    this.maladaptives[i] = behavior;

    if (this.maladaptives.length > 1) {
      this.maladaptives.splice(this.maladaptives.length, 1);
    }
    this.maladaptiveSelected = null;
    this.name = '';
    this.number_of_occurrences = null;
  }

  addReplacement(replacemen) {
    this.replacementSelected = replacemen;
    this.replacementGoals.push({
      name: this.replacementSelected.name,
      total_trials: this.replacementSelected.total_trials,
      number_of_correct_response:
        this.replacementSelected.number_of_correct_response,
    });
    if (this.replacementGoals.length > 1) {
      this.replacementGoals.splice(this.replacementGoals.length, 1);
    }
    this.replacementSelected = null;
    this.name = '';
    this.total_trials = null;
    this.number_of_correct_response = null;
  }

  deleteLTOGoal(i: any) {
    this.replacementGoals.splice(i, 1);
  }

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

  //funcion para la primera imagen.. funciona
  loadFile($event) {
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

  loadFileSignature($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_BCBA = $event.target.files[0];
    const reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE_BCBA);
    reader2.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        reader2.result as string);
  }

  // eslint-disable-next-line no-debugger
  save() {debugger

    console.log('Pre-save values:', {
      client_id: this.patient_id,
      provider_id: this.selectedValueProviderRBT_id,
      supervisor_id: this.selectedValueBcba_id,
      patient_id: this.patient_id
    });

    this.text_validation = '';
    if (!this.selectedPaService) {
      this.text_validation = 'Please select a service';
      Swal.fire('Warning', this.text_validation, 'warning');
      return;
    }

    const noteData = {
      type: 'rbt',
      bip_id: this.bip_id,
      patient_id: this.patient_id,
      client_id: this.client_id,
      patient_code: this.patient_identifier,
      patient_identifier: this.patient_identifier,
      insurance_identifier: this.insurance_identifier,
      doctor_id: this.doctor_id,
      provider_id: this.selectedValueProviderRBT_id,
      supervisor_id: this.selectedValueBcba_id,
      provider_name_g: this.provider_name_g,
      provider_credential: this.provider_credential,
      provider_signature: this.provider_signature,
      provider_name: this.provider_name,
      supervisor_signature: this.supervisor_signature,
      supervisor_name: this.selectedValueBcba_id,
      session_date: this.session_date,
      time_in: this.selectedValueTimeIn,
      time_out: this.selectedValueTimeOut,
      time_in2: this.selectedValueTimeIn2,
      time_out2: this.selectedValueTimeOut2,
      participants: this.participants,
      session_length_morning_total: this.session_length_morning_total,
      session_length_afternon_total: this.session_length_afternon_total,
      total_hours: this.total_hour_session,
      total_minutes: this.totalMinutos,
      total_units: this.projectedUnits,
      environmental_changes: this.environmental_changes,
      // Transform maladaptives data back to API format
      maladaptives: this.maladaptives.map(m => ({
        id: m.id,
        name: m.name,
        ocurrences: m.number_of_occurrences
      })),
      // Transform replacements data back to API format
      replacements: this.replacements.map(r => ({
        id: r.id,
        name: r.name,
        total_trials: r.total_trials,
        correct_responses: r.number_of_correct_response
      })),
      interventions: this.intervention_added,
      summary_note: this.summary_note,
      meet_with_client_at: this.meet_with_client_at,
      client_appeared: this.client_appeared,
      as_evidenced_by: this.as_evidenced_by,
      rbt_modeled_and_demonstrated_to_caregiver: this.rbt_modeled_and_demonstrated_to_caregiver,
      progress_noted_this_session_compared_to_previous_session: this.progress_noted_this_session_compared_to_previous_session,
      next_session_is_scheduled_for: this.next_session_is_scheduled_for,
      status: 'pending',
      cpt_code: this.selectedValueCode,
      location_id: this.patientLocation_id,
      insurance_id: this.insurance_id,
      pa_service_id: this.selectedPaService?.id,
      pos: this.meet_with_client_at,
    };

    console.log('Final noteData:', noteData);


    this.noteRbtService.update(noteData as any, this.note_selectedId).subscribe(
      (resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', this.text_validation, 'warning');
        } else {
          Swal.fire('Updated', 'Note RBT Updated', 'success');
          this.router.navigate([
            AppRoutes.noteRbt.list,
            this.patient_identifier,
          ]);
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

  generateAISummary() {
    if (!this.checkDataSufficient()) {
      Swal.fire('Warning', 'Please fill all the required fields', 'warning');
      return;
    }
    this.isGeneratingSummary = true;
    // console.log(this.client_selected.patient, 'patient');
    // console.log(this.maladaptivegroup, 'maladaptives');
    const data = {
      diagnosis: this.diagnosis_code,
      birthDate: this.client_selected.patient?.birth_date
        ? this.client_selected.patient.birth_date
        : null,
      participants: this.participants ? `${this.participants}`.trim() : null,
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
      pos: getPos(this.meet_with_client_at),
      maladaptives: this.maladaptivegroup.map((m) => ({
        behavior: m.name,
        frequency: m.number_of_occurrences,
      })),
      replacements: this.replacementgroup.map((r) => ({
        name: r.name,
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
        this.summary_note = response.summary;
        this.isGeneratingSummary = false;
      },
      (error) => {
        // console.error('Error generating AI summary:', error);
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
        m.name &&
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


}
