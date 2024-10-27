import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { NoteRbtService } from '../services/note-rbt.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppUser } from 'src/app/shared/models/users.models';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';

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

  selectedValueProvider!: string;
  selectedValueRBT!: string;
  selectedValueBCBA!: string;
  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  selectedValueProviderName!: string;
  selectedValueMaladaptive!: string;
  selectedValueProviderCredential!: string;
  option_selected = 0;
  isGeneratingSummary = false;

  client_id: any;
  patient_id: any;
  doctor_id: any;
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

  // session_date: Date;
  // next_session_is_scheduled_for: Date;

  constructor(
    private bipService: BipService,
    private goalService: GoalService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteRbtService: NoteRbtService,
    private doctorService: DoctorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
    this.getDoctor();

    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_id = resp['patient_id'];
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
    this.location.back(); // <-- go back to previous location on cancel
  }

  getDoctor() {
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp) => {
      this.doctor = resp.user;
      console.log(this.doctor);
      this.electronic_signature = resp.user.electronic_signature;
      this.full_name = resp.user.full_name;
    });
  }

  getConfig() {
    this.noteRbtService.listConfigNote().subscribe((resp) => {
      // console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.selectedValueProviderCredential = resp.roles_rbt.certificate_number;
    });
  }

  getProfileBip() {
    this.bipService.showBipProfile(this.patient_id).subscribe((resp) => {
      console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_id = resp.patient.patient_id;
      this.patientLocation_id = resp.patient.location_id;
      this.selectedValueProviderName = resp.patient.rbt_id;
      this.selectedValueRBT = resp.patient.rbt_id;
      this.selectedValueBCBA = resp.patient.bcba_id;
      this.pos = resp.patient.pos_covered;
      // this.pos = JSON.parse(resp.patient.pos_covered) ;

      // console.log( this.pos);
      this.diagnosis_code = this.client_selected.patient.diagnosis_code;

      this.pa_services = resp.patient.pa_services;

      console.log('Mapped PA Services:', this.pa_services);

      // this.n_un = this.pa_assessmentsgroup[0].n_units;
      // this.unitsAsignated = this.pa_assessmentsgroup.n_units;
      // console.log(this.pa_assessments);
      // console.log(this.pa_assessmentsgroup);
      // this.cpt = this.pa_assessmentsgroup[0].cpt;
      // console.log(this.cpt);

      this.getMaladaptivesBipByPatientId();
      this.getReplacementsByPatientId();
    });
  }

  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
    }
  }

  selectCpt(event: { value: string }) {
    event.value = this.selectedValueCode;
  }

  getMaladaptivesBipByPatientId() {
    this.bipService
      .getBipProfilePatient_id(this.patient_id)
      .subscribe((resp) => {
        // console.log(resp);
        this.maladaptives = resp.maladaptives;
        this.bip_id = resp.id;
      });
  }
  getReplacementsByPatientId() {
    this.noteRbtService
      .showReplacementbyPatient(this.patient_id)
      .subscribe((resp) => {
        console.log(resp);
        this.replacementGoals = resp.replacementGoals;
        this.goal = resp.replacementGoals[0].goal;
        console.log(this.goal);
        this.getStoInprogressGoal();
      });
  }

  specialistData() {
    this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp) => {
      this.provider_credential = resp.doctor.certificate_number;
    });
  }

  // traer el target de todos los replacements
  getStoInprogressGoal() {
    this.goalService.getStobyGoalinProgress(this.goal).subscribe((resp) => {
      console.log('getStoInprogressGoal', resp);
      this.stoInprogressGoal = resp.goalstos.in_progress;
      this.stoInprogressGoal.forEach((element: any) => {
        this.stoInprogressGoal.push(element);
      });
      this.stoInprogressGoal.forEach((element: any) => {
        this.stoInprogressGoal.push(element);
      });
    });
  }

  getStoInprogressGoal1() {
    this.goalService.getStobyGoalinProgress(this.goal).subscribe((resp) => {
      console.log(resp);
      if (resp && resp.goalstos && resp.goalstos.in_progress) {
        const inProgress = resp.goalstos.in_progress[this.replacementGoals.id];
        if (inProgress) {
          this.stoGoalinProgress = inProgress.sustitution_status_sto;
          this.target = inProgress.target;
        } else {
          console.log(`in_progress[${this.replacementGoals.id}] is undefined`);
        }
      } else {
        console.log(
          'resp or resp.goalstos or resp.goalstos.in_progress is undefined'
        );
      }
    });
  }


  speciaFirmaDataRbt(selectedValueRBT) {
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp) => {
      console.log(resp);
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        resp.doctor.electronic_signature;
      console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      // this.notes = resp.notes;
      // this.services = resp.services;
    });
  }
  selectFirmaSpecialistRbt() {
    this.speciaFirmaDataRbt(this.selectedValueRBT);
    console.log(this.selectedValueRBT);
  }

  speciaFirmaDataBcba(selectedValueBCBA: string) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp) => {
        console.log(resp);
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
        console.log(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectFirmaSpecialistBcba() {
    this.speciaFirmaDataBcba(this.selectedValueBCBA);
    console.log(this.selectedValueBCBA);
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

  getUsedUnitsPercentage(): number {
    if (!this.selectedPaService) return 0;
    return ((this.selectedPaService.n_units - this.selectedPaService.available_units) / this.selectedPaService.n_units) * 100;
  }

  getProjectedUnitsPercentage(): number {
    if (!this.selectedPaService) return 0;
    return (this.projectedUnits / this.selectedPaService.n_units) * 100;
  }

  hourTimeInSelected(value: string) {
    console.log('hourTimeInSelected', value);
    this.selectedValueTimeIn = value;
    this.calculateProjectedUnits();
  }
  hourTimeOutSelected(value: string) {
    console.log('hourTimeOutSelected', value);
    this.selectedValueTimeOut = value;
    this.calculateProjectedUnits();
  }
  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.calculateProjectedUnits();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.calculateProjectedUnits();
  }

  selectMaladaptive(behavior: any) {
    this.maladaptiveSelected = behavior;
    // console.log(behavior);
    // this.maladp_added.push({
    //   maladaptive : behavior
    // })
  }

  isExceedingAvailableUnits(): boolean {
    if (!this.selectedPaService) return false;
    return this.projectedUnits > this.selectedPaService.available_units;
  }

  selectReplacement(replacemen: any) {
    this.replacementSelected = replacemen;
    // console.log(this.replacementSelected);
    // this.replacement_added.push({
    //   replacement : replacemen
    // })
  }

  back() {
    this.replacementSelected = null;
    this.maladaptiveSelected = null;
    this.total_trials = null;
    this.number_of_correct_response = null;
    // this.ngOnInit();
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
        // number_of_correct_response: this.number_of_correct_response ? this.number_of_correct_response :0 ,
      });
      this.replacementGoals.splice(this.replacementGoals, 1);
      Swal.fire(
        'Updated',
        ` Replacement - ${this.replacementSelected.goal} - Added`,
        'success'
      );
      this.replacementSelected = null;
      this.goal = '';
      this.total_trials = null;
      this.number_of_correct_response = null;
    }
  }

  deleteMaladaptive(i: any) {
    this.replacementGoals.splice(i, 1);
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
      (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        reader.result as string);
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
    this.text_validation = '';
    if (!this.selectedPaService) {
      this.text_validation = 'Please select a service';
      return;
    }
    if (
      this.maladaptives[0].number_of_occurrences === undefined ||
      this.replacementGoals[0].number_of_correct_response === undefined ||
      this.intervention_added.length === 0 ||
      !this.meet_with_client_at ||
      !this.environmental_changes ||
      !this.client_appeared ||
      !this.as_evidenced_by ||
      !this.rbt_modeled_and_demonstrated_to_caregiver ||
      !this.client_response_to_treatment_this_session ||
      !this.progress_noted_this_session_compared_to_previous_session ||
      !this.selectedValueCode
      // || !this.supervisor_name
    ) {
      this.text_validation = 'All Fields (*) are required';
      Swal.fire('Warning', `Must add less one`, 'warning');
      return;
    }

    if (!this.validateMaladaptives()) {
      Swal.fire(
        'Warning',
        'Please ensure all maladaptive behaviors have valid values',
        'warning'
      );
      return;
    }

    if (!this.validateReplacements()) {
      Swal.fire(
        'Warning',
        'Please ensure all replacement goals have valid values',
        'warning'
      );
      return;
    }

    const formData = new FormData();
    formData.append('patient_id', this.patient_id);
    formData.append('doctor_id', this.doctor_id);
    formData.append('bip_id', this.bip_id);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('provider_credential', this.provider_credential);
    formData.append('location_id', this.patientLocation_id);

    formData.append('session_date', this.session_date);

    formData.append('provider_name_g', this.doctor_id);
    formData.append('provider_name', this.doctor_id);
    formData.append('supervisor_name', this.selectedValueBCBA);
    formData.append('cpt_code', this.selectedValueCode);

    formData.append('pa_service_id', this.selectedPaService.id.toString());
    formData.append('cpt_code', this.selectedPaService.cpt);

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

    formData.append('environmental_changes', this.environmental_changes);
    formData.append('replacements', JSON.stringify(this.replacementGoals));
    formData.append('maladaptives', JSON.stringify(this.maladaptives));
    formData.append('interventions', JSON.stringify(this.intervention_added));
    formData.append('meet_with_client_at', this.meet_with_client_at);
    formData.append('client_appeared', this.client_appeared);
    formData.append('as_evidenced_by', this.as_evidenced_by);
    formData.append(
      'client_response_to_treatment_this_session',
      this.client_response_to_treatment_this_session
    );
    formData.append(
      'rbt_modeled_and_demonstrated_to_caregiver',
      this.rbt_modeled_and_demonstrated_to_caregiver
    );
    formData.append(
      'progress_noted_this_session_compared_to_previous_session',
      this.progress_noted_this_session_compared_to_previous_session
    );

    if (this.next_session_is_scheduled_for) {
      formData.append(
        'next_session_is_scheduled_for',
        this.next_session_is_scheduled_for
      );
    }

    formData.append('provider_signature', this.doctor.electronic_signature);

    if (this.FILE_SIGNATURE_RBT) {
      formData.append('imagen', this.FILE_SIGNATURE_RBT);
    }
    if (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED) {
      formData.append(
        'supervisor_signature',
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED
      );
    }

    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });

    this.noteRbtService.createNote(formData).subscribe(
      (resp: any) => {
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', resp.message_text, 'warning');
        } else {
          this.text_success = 'Note created';
          Swal.fire('Created', 'Note RBT Created', 'success');
          this.router.navigate([AppRoutes.noteRbt.list, this.patient_id]);
        }
      },
      (error) => {
        if (error.includes('Time conflict')) {
          this.text_validation =
            'There is a time conflict with an existing note. Please choose a different time.';
        } else {
          this.text_validation =
            'An error occurred while creating the note. Please try again.';
        }
        Swal.fire('Error', this.text_validation, 'error');
      }
    );
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 2);
    this.next_session_is_scheduled_for = nextDate.toISOString().split('T')[0];
  }

  onMaladaptivesChange(updatedMaladaptives: any[]) {
    this.maladaptives = updatedMaladaptives;
  }

  onReplacementsChange(updatedReplacements: any[]) {
    this.replacementGoals = updatedReplacements;
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
      birthDate: this.client_selected.patient.birth_date
        ? this.client_selected.patient.birth_date
        : null,
      startTime: this.selectedValueTimeIn ? this.selectedValueTimeIn : null,
      endTime: this.selectedValueTimeOut ? this.selectedValueTimeOut : null,
      startTime2: this.selectedValueTimeIn2 ? this.selectedValueTimeIn2 : null,
      endTime2: this.selectedValueTimeOut2 ? this.selectedValueTimeOut2 : null,
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

    if (!this.maladaptives || this.maladaptives.length === 0) return false;
    const allMaladaptivesValid = this.maladaptives.every(
      (m) =>
        m.maladaptive_behavior &&
        m.number_of_occurrences !== undefined &&
        m.number_of_occurrences !== null
    );
    if (!allMaladaptivesValid) return false;

    if (!this.replacementGoals || this.replacementGoals.length === 0)
      return false;
    const allReplacementsValid = this.replacementGoals.every(
      (r) =>
        r.total_trials !== undefined &&
        r.total_trials !== null &&
        r.number_of_correct_response !== undefined &&
        r.number_of_correct_response !== null
    );
    if (!allReplacementsValid) return false;

    if (!this.intervention_added || this.intervention_added.length === 0)
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
