import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { NoteRbtService } from '../../../../core/services/notes-rbt.service';
import { NotesRbtV2Service } from '../../../../core/services/notes-rbt.v2.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppUser } from 'src/app/core/models/users.model';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';

interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
}
export interface POSModel {
  id: number;
  name: string;
  code: string;
}
@Component({
  selector: 'app-note-rbt',
  templateUrl: './note-rbt.component.html',
  styleUrls: ['./note-rbt.component.scss'],
})
export class NoteRbtComponent implements OnInit {
  routes = AppRoutes;

  url_media: any;
  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  selectedValueMaladaptive!: string;
  selectedValueProviderCredential!: string;
  option_selected = 0;
  isGeneratingSummary = false;
  totalMinutos = 0;
  total_hour_session = '';


  selectedValueRBT!: string;
  selectedValueRenderingProvider!: string;
  selectedValueProviderRBT_id!: number;

  selectedValueBcba_id!: string;
  selectedValueAbaSupervisor!: string;
  selectedValueBcba_id_id!: number;

  client_id: number;
  patient_identifier: string;
  patient_id: number;
  doctor_id: number;
  insurer_id: number;
  patient_selected: any;
  client_selected: any;
  bip_id: any;
  user: AppUser;

  first_name = '';
  last_name = '';
  diagnosis_code = '';

  provider_name_g = '';
  provider_credential = '';
  pos: POSModel;
  session_date = '';
  time_in = '';
  time_out = '';
  time_in2 = '';
  time_out2 = '';
  session_length_total = '';
  session_length_total2 = '';
  environmental_changes = '';


  sumary_note = '';
  meet_with_client_at = '';
  client_appeared = '';
  as_evidenced_by = '';
  rbt_modeled_and_demonstrated_to_caregiver = '';
  client_response_to_treatment_this_session = '';
  progress_noted_this_session_compared_to_previous_session = '';
  next_session_is_scheduled_for = '';
  provider_name = '';
  supervisor_name = '';

  number_of_occurrences: number;
  number_of_correct_responses: number;
  total_trials: number;
  number_of_correct_response: number;
  maladaptive = '';
  replacement = '';
  interventions: any;
  provider_signature: any;
  supervisor_signature: any;

  pairing: any;
  response_block: any;
  DRA: any;
  DRO: any;
  redirection: any;
  errorless_teaching: any;
  NCR: any;
  shaping: any;
  chaining: any;
  token_economy: any;
  extinction: any;
  natural_teaching: any;

  FILE_SIGNATURE_RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA = 'assets/img/user-06.jpg';
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = 'assets/img/user-06.jpg';

  rbt_id: any;
  bcba_id: any;
  maladaptivename: any;
  replacementName: any;
  note_rbt_id: any;
  goal: any;
  note_id: any;
  porcentage_diario: any;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  maladaptives = [];
  replacementGoals: any;
  replacements = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  maladp_added = [];
  replacement_added = [];
  maladaptive_behavior: any = null;
  electronic_signature: any;
  doctor: any;
  full_name: any;
  pa_assessments: any;
  pa_assessmentsgroup: any;
  n_un: any;
  stoGoalinProgress: any;
  target: any;
  provider: any;
  stoInprogressGoal: any;
  location_id: number;
  patientLocation_id: any;
  insuranceId: string;
  insurance_id: number;
  insurance_identifier: string;



  intervention_added = [];
  interventionsSelected = {};
  interventionsList = [
    { id: 'pairing', name: 'Pairing', value: false },
    { id: 'response_block', name: 'Response Block', value: false },
    { id: 'DRA', name: 'DRA', value: false },
    { id: 'DRO', name: 'DRO', value: false },
    { id: 'redirection', name: 'Redirection', value: false },
    { id: 'errorless_teaching', name: 'Errorless Teaching', value: false },
    { id: 'NCR', name: 'NCR', value: false },
    { id: 'shaping', name: 'Shaping', value: false },
    { id: 'chaining', name: 'Chaining', value: false },
    { id: 'token_economy', name: 'Token Economy', value: false },
    { id: 'extinction', name: 'Extinction', value: false },
    { id: 'natural_teaching', name: 'Natural Teaching', value: false },
  ];

  pa_services: PaService[] = [];
  selectedPaService: PaService | null = null;

  selectedValueCode = '';

  projectedUnits = 0;

  constructor(
    private bipService: BipService,
    private goalService: GoalService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteRbtService: NoteRbtService,
    private notesRbtV2Service: NotesRbtV2Service,
    private doctorService: DoctorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
    this.getDoctor();

    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id'];
    });

    this.getConfig();
    this.getProfileBip();

    this.specialistData();

    this.updateInterventions();

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

  onInterventionsChange(updatedInterventions: any[]) {
    this.intervention_added = updatedInterventions;
  }



  goBack() {
    this.location.back();
  }

  getDoctor() {
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp) => {
      this.doctor = resp.user;
      this.electronic_signature = resp.user.electronic_signature;
      this.full_name = resp.user.full_name;
    });
  }

  getConfig() {
    this.noteRbtService.listConfigNote().subscribe((resp) => {
      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.selectedValueProviderCredential = resp.roles_rbt.certificate_number;
    });
  }

  getProfileBip() {
    this.bipService.showBipProfile(this.patient_identifier).subscribe((resp) => {
      this.client_selected = resp.patient;
      this.first_name = this.client_selected.first_name;
      this.last_name = this.client_selected.last_name;
      this.patient_identifier = this.client_selected.patient_identifier;
      this.patient_id = this.client_selected.id;
      this.insurance_id = this.client_selected.insurer_id;
      this.insurance_identifier = this.client_selected.insurance_identifier;
      this.patientLocation_id = this.client_selected.location_id;
      this.selectedValueProviderRBT_id = this.client_selected.rbt_id;
      this.selectedValueBcba_id = this.client_selected.bcba_id;
      this.pos = this.client_selected.pos_covered;
      this.diagnosis_code = this.client_selected.diagnosis_code;

      console.log(resp.patient.pa_services);
      this.pa_services = resp.patient.pa_services;

      this.selectedPaService = resp.patient.pa_services.find(service => service.cpt === '97153') || null;
      console.log('Selected Service:', this.selectedPaService);

      this.getMaladaptivesBipByPatientId();
      this.getReplacementsByPatientId();
    });
  }



  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
    }
    console.log('Servicio seleccionado:', event.value);
  }

  selectCpt(event: { value: string }) {
    event.value = this.selectedValueCode;
  }

  getMaladaptivesBipByPatientId() {
    this.bipService
      .getBipProfilePatient_id(this.patient_identifier)
      .subscribe((resp) => {
        this.maladaptives = resp.maladaptives;
        this.bip_id = resp.id;
      });
  }
  getReplacementsByPatientId() {
    this.noteRbtService
      .showReplacementbyPatient(this.patient_identifier)
      .subscribe((resp) => {
        this.replacementGoals = [];
        resp['replacementGoals'].forEach((element) => {
          const goalSto = JSON.parse(element.goalstos).find(
            (item) => item.sustitution_status_sto_edit === 'inprogress'
          );
          if (goalSto) {
            this.replacementGoals.push({ ...element, target: goalSto.target });
          }
        });
      });
  }

  specialistData() {
    this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp) => {
      this.provider_credential = resp.doctor.certificate_number;
    });
  }

  speciaFirmaDataRbt(selectedValueRBT) {
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp) => {
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        resp.doctor.electronic_signature;
    });
  }
  selectFirmaSpecialistRbt() {
    this.speciaFirmaDataRbt(this.selectedValueProviderRBT_id);
  }

  speciaFirmaDataBcba(selectedValueBCBA: string) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp) => {
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
      });
  }

  selectFirmaSpecialistBcba(event) {
    this.speciaFirmaDataBcba(this.selectedValueBcba_id);
    console.log(this.selectedValueBcba_id);
  }

  calculateUnitsFromTime(startTime: string, endTime: string): number {
    if (!startTime || !endTime) return 0;

    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);

    if (!start || !end) return 0;

    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return Math.ceil(durationMinutes / 15);
  }

  parseTime(timeStr: string): Date | null {
    if (!timeStr) return null;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  calculateProjectedUnits(): void {
    let totalUnits = 0;

    if (this.selectedValueTimeIn && this.selectedValueTimeOut) {
      const morningUnits = this.calculateUnitsFromTime(
        this.selectedValueTimeIn,
        this.selectedValueTimeOut
      );
      totalUnits += morningUnits;
    }

    if (this.selectedValueTimeIn2 && this.selectedValueTimeOut2) {
      const afternoonUnits = this.calculateUnitsFromTime(
        this.selectedValueTimeIn2,
        this.selectedValueTimeOut2
      );
      totalUnits += afternoonUnits;
    }

    this.projectedUnits = totalUnits;
  }

  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
    this.calculateProjectedUnits();
    console.log(this.selectedValueTimeIn);
    // this.sumarHoras(this.selectedValueTimeIn);
    this.calculateTotalHours();

  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
    this.calculateProjectedUnits();
    console.log(this.selectedValueTimeOut);
    // this.sumarHoras(this.selectedValueTimeOut);
    this.calculateTotalHours();
  }
  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.calculateProjectedUnits();
    console.log(this.selectedValueTimeIn2);
    // this.sumarHoras(this.selectedValueTimeIn2);
    this.calculateTotalHours();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.calculateProjectedUnits();
    console.log(this.selectedValueTimeOut2);
    // this.sumarHoras(this.selectedValueTimeOut2);
    this.calculateTotalHours();
  }

  calculateTotalHours() {
    const timeIn1 = this.convertToMinutes(this.selectedValueTimeIn);
    const timeOut1 = this.convertToMinutes(this.selectedValueTimeOut);
    const timeIn2 = this.convertToMinutes(this.selectedValueTimeIn2);
    const timeOut2 = this.convertToMinutes(this.selectedValueTimeOut2);

    const totalMinutes = (timeOut1 - timeIn1) + (timeOut2 - timeIn2);
    const totalHours = this.convertToHours(totalMinutes);
    this.total_hour_session = totalHours;
    console.log(`Total hours: ${totalHours}`);
    console.log('para el html', this.total_hour_session);
}

convertToMinutes(time: string): number {
  if (!time || !time.includes(':')) {
    console.error(`Invalid time format: ${time}`);
        return 0; // O manejar el error de otra manera
    }

    const [hours, minutes] = time.split(':').map(Number);

    // Validar que hours y minutes sean números válidos
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        console.error(`Invalid time values: hours=${hours}, minutes=${minutes}`);
        return 0; // O manejar el error de otra manera
    }

    return hours * 60 + minutes;
}

convertToHours(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}



  selectMaladaptive(behavior: any) {
    this.maladaptiveSelected = behavior;
  }

  selectReplacement(replacemen: any) {
    this.replacementSelected = replacemen;
  }

  back() {
    this.replacementSelected = null;
    this.maladaptiveSelected = null;
    this.total_trials = null;
    this.number_of_correct_response = null;
  }

  addMaladaptive(behavior, i) {
    this.maladaptiveSelected = behavior;
    this.maladaptives[i] = behavior;

    if (this.maladaptiveSelected.number_of_occurrences === undefined) {
      Swal.fire('Warning', `Must add less one`, 'warning');
      return;
    } else {
      Swal.fire(
        'Added',
        ` Maladaptive - ${this.maladaptives[i].maladaptive_behavior} - Added`,
        'success'
      );

      this.maladaptiveSelected = null;
      this.maladaptive_behavior = '';
      this.number_of_occurrences = null;
    }
  }

  addReplacement(replacemen) {
    this.replacementSelected = replacemen;

    if (this.replacementSelected.number_of_correct_response === undefined) {
      Swal.fire('Warning', `Must add less one`, 'warning');
      return;
    } else {
      this.replacementGoals.push({
        goal: this.replacementSelected.goal,
        total_trials: this.replacementSelected.total_trials,
        number_of_correct_response:
          this.replacementSelected.number_of_correct_response,
      });
      this.replacementGoals.splice(this.replacementGoals, 1);
      Swal.fire(
        'Updated',
        ` Replacement - ${this.replacementSelected.goal} - Added`,
        'success'
      );
      this.replacementSelected = null;
      this.total_trials = null;
      this.number_of_correct_response = null;
    }
  }

  deleteMaladaptive(i: any) {
    this.replacementGoals.splice(i, 1);
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
      (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        reader.result as string);
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

  countValue() {
    const countElement = document.querySelector('.count') as HTMLInputElement;
    countElement.disabled = true;

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('plus')) {
        countElement.value = (parseInt(countElement.value, 10) + 1).toString();
      } else if (target.classList.contains('minus')) {
        let currentValue = parseInt(countElement.value, 10);
        if (currentValue === 0) {
          currentValue = 1;
        } else {
          currentValue -= 1;
        }
        countElement.value = currentValue.toString();
      }
    });
  }

  validateMaladaptives(): boolean {
    return this.maladaptives.every(
      (behavior) =>
        behavior.number_of_occurrences !== undefined &&
        behavior.number_of_occurrences >= 0
    );
  }

  isValidCorrectResponse(replacement: any): boolean {
    return (
      replacement.number_of_correct_response !== undefined &&
      replacement.number_of_correct_response >= 0 &&
      replacement.number_of_correct_response <= replacement.total_trials
    );
  }

  validateReplacements(): boolean {
    return this.replacementGoals.every(
      (replacement) =>
        replacement.total_trials > 0 && this.isValidCorrectResponse(replacement)
    );
  }

  save() {
    const validation = this.checkDataSufficient();
    if (!validation.isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Required Fields',
        text: `Please fill in the following fields: ${validation.missingFields.join(', ')}`,
      });
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
      provider_name_g: this.provider_name_g,
      provider_credential: this.provider_credential,
      provider_signature: this.provider_signature,
      provider_name: this.provider_name,
      supervisor_signature: this.supervisor_signature,
      supervisor_name: this.supervisor_name,
      supervisor_id: this.selectedValueBcba_id_id,
      session_date: this.session_date,
      time_in: this.selectedValueTimeIn,
      time_out: this.selectedValueTimeOut,
      time_in2: this.selectedValueTimeIn2,
      time_out2: this.selectedValueTimeOut2,
      session_length_morning_total: this.session_length_total,
      session_length_afternon_total: this.session_length_total2,
      total_hours: this.total_hour_session,
      total_minutes: this.totalMinutos,
      total_units: this.projectedUnits,
      environmental_changes: this.environmental_changes,
      maladaptives: this.maladp_added,
      replacements: this.replacement_added,
      interventions: this.intervention_added,
      summary_note: this.sumary_note,
      meet_with_client_at: this.meet_with_client_at,
      client_appeared: this.client_appeared,
      as_evidenced_by: this.as_evidenced_by,
      rbt_modeled_and_demonstrated_to_caregiver: this.rbt_modeled_and_demonstrated_to_caregiver,
      client_response_to_treatment_this_session: this.client_response_to_treatment_this_session,
      progress_noted_this_session_compared_to_previous_session: this.progress_noted_this_session_compared_to_previous_session,
      next_session_is_scheduled_for: this.next_session_is_scheduled_for,
      status: 'pending',
      cpt_code: this.selectedValueCode,
      location_id: this.location_id,
      insurance_id: this.insurance_id,
      pa_service_id: this.selectedPaService?.id
    };

    this.notesRbtV2Service.create(noteData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'RBT Note saved successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate([this.routes.noteRbt.list, this.patient_identifier]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error saving the note. Please try again.',
          });
        }
      },
      error: (error) => {
        console.error('Error saving RBT note:', error);
        let errorMessage = 'There was an error saving the note.';

        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.errors) {
          const errors = Object.values(error.error.errors).flat();
          errorMessage = errors.join('\n');
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    this.next_session_is_scheduled_for = nextDate.toISOString().split('T')[0];
  }

  onMaladaptivesChange(updatedMaladaptives: any[]) {
    this.maladaptives = updatedMaladaptives;
  }

  onReplacementsChange(updatedReplacements: any[]) {
    this.replacementGoals = updatedReplacements;
  }

  generateAISummary() {
    const validationResult = this.checkDataSufficient();

    if (!validationResult.isValid) {
      const missingFieldsList = validationResult.missingFields.join('\n• ');
      Swal.fire('Warning', `Please fill all the required fields:\n\n• ${missingFieldsList}`, 'warning');
      return;
    }

    this.isGeneratingSummary = true;
    const data = {
      diagnosis: this.diagnosis_code,
      birthDate: this.client_selected?.birth_date
        ? this.client_selected.birth_date
        : null,
      startTime: this.selectedValueTimeIn ? this.selectedValueTimeIn : null,
      endTime: this.selectedValueTimeOut ? this.selectedValueTimeOut : null,
      startTime2: this.selectedValueTimeIn2 ? this.selectedValueTimeIn2 : null,
      endTime2: this.selectedValueTimeOut2 ? this.selectedValueTimeOut2 : null,
      progressNotedThisSessionComparedToPreviousSession: this.progress_noted_this_session_compared_to_previous_session,
      mood: this.client_appeared,
      pos: this.getPos(this.meet_with_client_at),
      maladaptives: this.maladaptives.map((m) => ({
        behavior: m.maladaptive_behavior,
        frequency: m.number_of_occurrences,
      })),
      replacements: this.replacementGoals.map((r) => ({
        name: r.goal,
        totalTrials: r.total_trials,
        correctResponses: r.number_of_correct_response,
      })),
      interventions:
        this.intervention_added.length > 0
          ? Object.keys(this.intervention_added[0]).filter(
              (key) => this.intervention_added[0][key]
            )
          : [],
    };

    this.noteRbtService.generateAISummary(data).subscribe(
      (response: any) => {
        this.client_response_to_treatment_this_session = response.summary;
        this.isGeneratingSummary = false;
      },
      (error) => {
        Swal.fire(
          'Error',
          'Error generating AI summary. Please try again.',
          'error'
        );
        this.isGeneratingSummary = false;
      }
    );
  }

  checkDataSufficient(): ValidationResult {
    const missingFields: string[] = [];

    if (!this.client_selected) {
      missingFields.push('Client information');
    }

    const hasTime1 = this.selectedValueTimeIn && this.selectedValueTimeOut;
    const hasTime2 = this.selectedValueTimeIn2 && this.selectedValueTimeOut2;
    if (!hasTime1 && !hasTime2) {
      missingFields.push('At least one session time period (Time In/Out)');
    }

    if (!this.meet_with_client_at) {
      missingFields.push('POS');
    }

    if (!this.progress_noted_this_session_compared_to_previous_session || this.progress_noted_this_session_compared_to_previous_session === '') {
      missingFields.push('Progress noted this session compared to previous session');
    }

    if (!this.maladaptives || this.maladaptives.length === 0) {
      missingFields.push('Maladaptive behaviors');
    } else {
      const allMaladaptivesValid = this.maladaptives.every(
        (m) =>
          m.maladaptive_behavior &&
          m.number_of_occurrences !== undefined &&
          m.number_of_occurrences !== null
      );
      if (!allMaladaptivesValid) {
        missingFields.push('Complete maladaptive behavior information (occurrences)');
      }
    }

    if (!this.replacementGoals || this.replacementGoals.length === 0) {
      missingFields.push('Replacement goals');
    } else {
      const allReplacementsValid = this.replacementGoals.every(
        (r) =>
          r.total_trials !== undefined &&
          r.total_trials !== null &&
          r.number_of_correct_response !== undefined &&
          r.number_of_correct_response !== null
      );
      if (!allReplacementsValid) {
        missingFields.push('Complete replacement goal information (trials and correct responses)');
      }
    }

    if (!this.intervention_added || this.intervention_added.length === 0) {
      missingFields.push('Interventions');
    }

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
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
