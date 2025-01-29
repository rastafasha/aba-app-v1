import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { NoteBcbaService } from '../../../../core/services/notes-bcba.service';
import { NotesBcbaV2Service } from '../../../../core/services/notes-bcba.v2.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import {
  interventionsList,
  interventionsListDoble,
  newList,
  outcomeList,
  show97151List,
} from '../listasSelectData';

import { AuthService } from 'src/app/core/auth/auth.service';
import { NoteBcbaV2, PaServiceV2, PatientV2 } from 'src/app/core/models';
import { BipsV2Service } from 'src/app/core/services/bips.v2.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { show97151L, ValidationResult } from '../interfaces';
import { AISummaryData } from 'src/app/shared/components/generate-ai-summary/generate-ai-summary.component';
import { convertToHours, convertToMinutes } from 'src/app/utils/time-functions';


@Component({
  selector: 'app-note-bcba',
  templateUrl: './note-bcba.component.html',
  styleUrls: ['./note-bcba.component.scss'],
})
export class NoteBcbaComponent implements OnInit {
  Number(arg0: string) {
    throw new Error('Method not implemented.');
  }
  routes = AppRoutes;
  summary_note = '';
  isGeneratingSummary = false;
  show97156 = false;
  show97155 = false;
  show97151 = false;
  show971511 = false;
  show971512 = false;
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
  selectedValueRendering!: string;
  selectedValueAba!: number;
  selectedValueCode!: string;
  selectedValueCode1!: string;
  option_selected = 0;
  totalMinutos = 0;
  total_hour_session = '';

  selectedValueProviderRBT_id: number;
  selectedValueBcba_id: number;

  client_id: number;
  patient_id: number;
  patient_identifier: string;
  doctor_id: number;
  patient_selected: any;
  client_selected: PatientV2;
  bip_id: number;
  user: AppUser;

  patientLocation_id: number;
  insurance_id: number;
  insurance_identifier: string;

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

  porcent_of_occurrences = 0;
  porcent_of_correct_response = 0;
  maladaptive = '';
  replacement = '';
  interventions: any;
  interventions2: any;
  provider_signature: any;
  supervisor_signature: any;

  token_economy = false;
  generalization = false;
  NCR = false;
  behavioral_momentum = false;
  DRA = false;
  DRI = false;
  DRO = false;
  DRL = false;
  response_block = false;
  errorless_teaching = false;
  extinction = false;
  chaining = false;
  natural_teaching = false;
  redirection = false;
  shaping = false;
  pairing = false;

  FILE_SIGNATURE_RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED: any = 'assets/img/user-06.jpg';

  rbt_id: number;
  bcba_id: number;
  maladaptivename: string;
  replacementName: string;
  note_rbt_id: number;
  goal: any;
  note_id: number;
  location: any;
  birth_date: any;
  rendering_provider: number;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  specialists = [];
  maladaptives = [];
  replacementGoals = [];
  replacements = [];

  intervention_added: object;
  intervention2_added: object;
  replacements_added: object;
  replacements2_added: object;
  intakeoutcome_added: object;
  newlist_added: object;
  behaviorsList_added: object;

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  lto: any = null;
  caregiver_goal: any = null;

  pa_assessments: string;
  pa_assessmentsgroup = [];

  familiEnvolments = [];
  monitoringEvaluating = [];
  caregivers_training_goals = [];
  caregivers_training_goalsgroup = [];
  caregivers_training = [];
  rbt_training_goals = [];

  posGruoup = [];
  note_description: string;
  insurer_name: string;
  services: any;
  insurer_id: number;
  cpt: number;
  roles: string[];
  electronic_signature: string;
  doctor: any;
  full_name: string;

  pa_services: PaService[] = [];
  selectedPaService: PaServiceV2 | null = null;
  selectedPaService1: show97151L;
  projectedUnits = 0;
  start_date: Date; // Fecha de inicio
  end_date: Date; // Fecha de fin
  showPosWarning = false;

  participants = '';
  additional_goals_or_interventions = '';
  asked_and_clarified_questions_about_the_implementation_of = '';
  reinforced_caregiver_strengths_in = '';
  gave_constructive_feedback_on = '';
  recomended_more_practice_on = '';
  type = '';
  BCBA_conducted_client_observations = false;
  BCBA_conducted_assessments = false;

  demostrated = false;
  modifications_needed_at_this_time = false;
  cargiver_participation = false;
  was_the_client_present = false;

  interventionsSelected = {};

  interventionsList = interventionsList;
  interventionsListDoble = interventionsListDoble;
  behaviorList: any[];
  newList = newList;
  outcomeList = outcomeList;
  show97151List = show97151List;
  obj_inprogress = [];
  obj_inprogress1 = [];
  public textSchoolAlarm = 'It looks like the session time you entered is outside the standard school hours of Monday through Friday, 8:00 AM to 3:00 PM. Please double-check the time or update the POS as needed';
  public textTelehealtWarning = "You've selected POS 51 (Telehealth). Please make sure all telehealth requirements are met and confirm that this session complies with telehealth regulations before proceeding";

  constructor(
    private bipV2Service: BipsV2Service,
    private patientService: PatientMService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteBcbaService: NoteBcbaService,
    private noteBcbaV2Service: NotesBcbaV2Service,
    private doctorService: DoctorService,
    private locations: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id'];
    });
    this.getConfig();
    this.start_date = new Date(); //  fecha actual
    this.end_date = new Date(); // fecha actual

    this.user = this.authService.user as AppUser;
    this.roles = this.user.roles;
    this.doctor_id = this.user.id;
    this.getDoctor();
    this.specialistData();
    this.getPatient();
  }

  goBack() {
    this.locations.back(); // <-- go back to previous location on cancel
  }

  getDoctor() {
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp) => {
      this.doctor = resp.user;
      this.electronic_signature = resp.user.electronic_signature;
      this.full_name = resp.user.full_name;
    });
  }

  getConfig() {
    this.noteBcbaService.listConfigNote().subscribe((resp) => {
      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.specialists = resp.specialists;
      this.FILE_SIGNATURE_RBT = resp.roles_rbt.electronic_signature;
      this.FILE_SIGNATURE_BCBA = resp.roles_bcba.electronic_signature;
    });
  }
  getPatient() {
    this.patientService
      .getPatientByPatientId(this.patient_identifier)
      .subscribe((resp) => {
        // console.log('patient',resp);
        this.client_selected = resp.patient;
        this.patient_id = resp.patient.id;
        this.patientLocation_id = this.client_selected.location_id;
        this.patient_identifier = this.client_selected.patient_identifier;
        this.insurance_id = this.client_selected.insurer_id;
        this.insurance_identifier = this.client_selected.insurance_identifier;

        this.first_name = this.client_selected.first_name;
        this.last_name = this.client_selected.last_name;
        this.patient_identifier = this.client_selected.patient_identifier;
        this.diagnosis_code = this.client_selected.diagnosis_code;
        this.birth_date = this.client_selected.birth_date;

        this.diagnosis_code = this.client_selected.diagnosis_code;
        this.insurer_id = this.client_selected.insurer_id;

        this.selectedValueAba = resp.patient.clin_director_id;
        this.selectedValueRendering = resp.patient.bcba_id;
        this.selectedValueBCBA = resp.patient.clin_director_id;
        this.selectedValueRBT = resp.patient.bcba_id;

        this.pa_services = resp.patient.pa_services;
        this.start_date = resp.patient.start_date;
        this.end_date = resp.patient.end_date;

        // console.log(this.pa_services);

        //filtramos lo pa_services usando star_date y end_date comparado con el dia de hoy
        this.pa_services = this.pa_services.filter((pa) => {
          const dateStart = new Date(pa.start_date).getTime();
          const dateEnd = new Date(pa.end_date).getTime();
          const dateToday = new Date().getTime();
          return dateStart <= dateToday && dateEnd >= dateToday;
        });
        //devolvemos la respuesta da los pa_services disponibles
        this.getBipV2();
      });
  }

  getBipV2() {
    this.bipV2Service.list({ client_id: this.patient_id }).subscribe((resp) => {
      console.log('BIP', resp);
      this.bip_id = resp.data[0].id;
      this.caregivers_training_goalsgroup = resp.data[0].caregiver_trainings;
      console.log(this.caregivers_training_goalsgroup);

      this.behaviorList = resp.data[0].maladaptives;

      // Filtrar la lista replacementList por estado
      const replacementList = resp.data[0].replacements.filter(
        (goal) => goal.status === 'active'
      );

      // Map through replacements to add the name to each objective and transform the structure
      const objectives = replacementList.flatMap(replacement =>
        replacement.objectives.map(objective => ({
          status: objective.status,
          name: replacement.name,
          id: objective.id,
          description: objective.description,
          assessed: true,
          modified: false
        }))
      );

      // filtrado los que estan en status in progress
      const objetivosEnProgreso = objectives.filter(
        (objetivo) => objetivo.status === 'in progress'
      );

      this.obj_inprogress = objetivosEnProgreso;
      this.obj_inprogress1 = objetivosEnProgreso;
    });
  }

  specialistData() {
    this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp) => {
      this.provider_credential = resp.doctor.certificate_number;
    });
  }

  specialistDataSupervisor(selectedValueAba) {
    this.doctorService.showDoctorProfile(selectedValueAba).subscribe((resp) => {
      this.provider_credential = resp.doctor.certificate_number;
    });
  }

  selectSpecialistab(event) {
    this.selectedValueAba = event.value;
    this.specialistDataSupervisor(this.selectedValueAba);
  }

  speciaFirmaData(selectedValueRBT) {
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp) => {
      console.log(resp);
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        resp.doctor.electronic_signature;
    });
  }

  selectFirmaSpecialistRbt(event) {
    event = this.selectedValueProviderRBT_id;
    this.speciaFirmaData(this.selectedValueProviderRBT_id);
    console.log(this.selectedValueProviderRBT_id);
  }

  speciaFirmaDataBcba(selectedValueBCBA) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp) => {
        console.log(resp);
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
      });
  }

  selectFirmaSpecialistBcba(event) {
    this.speciaFirmaDataBcba(this.selectedValueBcba_id);
  }

  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }
  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }

  calculateTotalHours() {
    const timeIn1 = convertToMinutes(this.selectedValueTimeIn);
    const timeOut1 = convertToMinutes(this.selectedValueTimeOut);
    const timeIn2 = convertToMinutes(this.selectedValueTimeIn2);
    const timeOut2 = convertToMinutes(this.selectedValueTimeOut2);

    const totalMinutes = timeOut1 - timeIn1 + (timeOut2 - timeIn2);
    const totalHours = convertToHours(totalMinutes);
    this.total_hour_session = totalHours;
  }

  updateCaregiverGoal(id: number) {
    console.log('Caregiver goal updated:', this.caregivers_training[id]);
  }

  updateRbtGoal(id: number) {
    console.log('RBT goal updated:', this.rbt_training_goals[id]);
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
      (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = reader2.result);
  }

  onInterventionsChange(updatedInterventions: object) {
    this.intervention_added = updatedInterventions;
  }
  onInterventions2Change(updatedInterventions2: object) {
    this.intervention2_added = updatedInterventions2;
  }

  onReplacementChange(updatedReplacements: object) {
    this.replacements_added = updatedReplacements;
  }
  onReplacement2Change(updatedReplacements2: object) {
    this.replacements2_added = updatedReplacements2;
    console.log(updatedReplacements2, 'updatedReplacements2');
  }

  onIntakeoutcomeChange(updatedIntakeoutcome: object) {
    this.intakeoutcome_added = updatedIntakeoutcome;
  }

  onNewListChange(updatedNewList: object) {
    this.newlist_added = updatedNewList;
  }

  onBehaviorChange(updatedbehaviorsList: object) {
    this.behaviorsList_added = updatedbehaviorsList;
  }

  save() {
    console.log(this.getAISummaryData());
    this.text_validation = '';
    if (
      // !this.rbt_training_goals ||
      // !this.caregivers_training_goals ||
      !this.meet_with_client_at ||
      !this.session_date
    )
      if (!this.selectedValueAba) {
        // {
        //   this.text_validation = 'All Fields (*) are required';
        //   return;
        // }
        // this.text_validation = 'ABA Supervisor must be selected';
        // return;
        Swal.fire('Warning', 'ABA Supervisor must be selected ', 'warning');
        return;
      }

    if (!this.selectedPaService) {
      // this.text_validation = 'Please select a service';
      // return;
      Swal.fire('Warning', 'Please select a service ', 'warning');
      return;
    }
    if (!this.meet_with_client_at) {
      // this.text_validation = 'Please select a POS';
      // return;
      Swal.fire('Warning', 'Please select a POS ', 'warning');
      return;
    }
    if (!this.session_date) {
      // this.text_validation = 'Please select a session date';
      // return;
      Swal.fire('Warning', 'Please select a session date ', 'warning');
      return;
    }

    const bcbaData: Partial<NoteBcbaV2> = {
      patient_id: this.patient_id,
      patient_identifier: this.patient_identifier,
      summary_note: this.summary_note,
      doctor_id: this.doctor_id,
      bip_id: this.bip_id,
      diagnosis_code: this.diagnosis_code,
      location_id: this.patientLocation_id,
      birth_date: this.birth_date,
      rendering_provider: this.doctor_id,
      provider_id: this.doctor_id,
      supervisor_id: this.selectedValueAba,
      // aba_supervisor: this.selectedValueAba,
      pa_service_id: this.selectedPaService?.id,
      cpt_code: this.selectedPaService?.cpt,
      meet_with_client_at: this.meet_with_client_at,
      pos: this.meet_with_client_at,
      provider_name: this.doctor_id,
      supervisor_name: this.selectedValueBcba_id,
      insurance_id: this.insurance_id,
      insurance_identifier: this.insurance_identifier,
      participants: this.participants,
      environmental_changes: this.environmental_changes,
      caregiver_goals: this.caregivers_training_goalsgroup,
      // interventions: this.interventionsList,
      // interventions2: this.interventionsListDoble,
      // replacements: this.obj_inprogress,
      // replacements2: this.obj_inprogress1,
      // behaviors: this.behaviorList,
      // modifications_needed_at_this_time: this.modifications_needed_at_this_time,
      // cargiver_participation: this.cargiver_participation,
      // was_the_client_present: this.was_the_client_present,
      // additional_goals_or_interventions: this.additional_goals_or_interventions,
      // asked_and_clarified_questions_about_the_implementation_of: this.asked_and_clarified_questions_about_the_implementation_of,
      // reinforced_caregiver_strengths_in: this.reinforced_caregiver_strengths_in,
      // gave_constructive_feedback_on: this.gave_constructive_feedback_on,
      // recomended_more_practice_on: this.recomended_more_practice_on,
      // type: this.selectedPaService1?.cpt?.toString(),
      session_date: this.session_date,
      time_in: this.selectedValueTimeIn || null,
      time_out: this.selectedValueTimeOut || null,
      time_in2: this.selectedValueTimeIn2 || null,
      time_out2: this.selectedValueTimeOut2 || null,
      provider_signature: this.doctor?.electronic_signature,
      supervisor_signature: this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED,
    };

    if (this.selectedPaService?.cpt === '97151') {
      bcbaData.subtype = this.selectedPaService1?.cpt;
      bcbaData.assessment_tools = this.newList.reduce<string[]>((prev, cur) => {
        if (cur.value) prev.push(cur.name);
        return prev;
      }, []);
      bcbaData.intake_outcome = this.outcomeList.reduce<string[]>((prev, cur) => {
        if (cur.value) prev.push(cur.name);
        return prev;
      }, []);
      bcbaData.BCBA_conducted_client_observations = this.BCBA_conducted_client_observations;
      bcbaData.BCBA_conducted_assessments = this.BCBA_conducted_assessments;
    }

    if (this.selectedPaService?.cpt === '97155') {
      // bcbaData.rbt_training_goals = this.rbt_training_goals;
      bcbaData.replacement_protocols = Object.values(this.replacements2_added).map(item => ({
        id: item.id,
        description: item.description,
        assessed: item.assessed,
        modified: item.modified
      }));
      bcbaData.intervention_protocols = this.interventionsListDoble.map(item => ({
        name: item.name,
        assessed: item.value,
        modified: item.value2
      }));
      bcbaData.modifications_needed_at_this_time = this.modifications_needed_at_this_time;
      bcbaData.additional_goals_or_interventions = this.additional_goals_or_interventions;
    }

    console.log('BCBA Data:', bcbaData);

    this.noteBcbaV2Service.create(bcbaData).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          Swal.fire('Success', 'Note BCBA created', 'success');
          this.router.navigate([
            AppRoutes.noteBcba.list,
            this.patient_identifier,
          ]);
        } else {
          Swal.fire('Error', 'There was an error saving the note.', 'error');
        }
      },
      error: (error) => {
        console.error('Error saving RBT note:', error);
        let errorMessage = 'There was an error saving the note.';

        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        if (error.error?.errors) {
          const errors = Object.values(error.error.errors).flat();
          errorMessage += '<br>' + errors.join('<br>');
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: errorMessage,
        });
      }
      // if (resp.message === 403) {
      //   this.text_validation = resp.message_text;
      // } else {
      //   this.text_success = 'Note BCBA created';
      //   Swal.fire('Created', ` Note BCBA Created`, 'success');
      //   this.router.navigate([
      //     AppRoutes.noteBcba.list,
      //     this.patient_identifier,
      //   ]);
      // }
    });
  }

  getAISummaryData(): AISummaryData {
    console.log(this.replacements2_added, 'replacements2_added');
    if (!this.selectedPaService || !this.selectedPaService.cpt) {
      return null;
    }

    return {
      diagnosis: this.diagnosis_code,
      birthDate: this.birth_date || null,
      startTime: this.selectedValueTimeIn || null,
      endTime: this.selectedValueTimeOut || null,
      startTime2: this.selectedValueTimeIn2 || null,
      endTime2: this.selectedValueTimeOut2 || null,
      pos: this.meet_with_client_at,
      cptCode: this.selectedPaService.cpt,
      // Common fields
      clientResponse: this.client_response_to_treatment_this_session,
      progressNoted: this.progress_noted_this_session_compared_to_previous_session,
      nextSession: this.next_session_is_scheduled_for,
      reinforcedCaregiverStrengths: this.reinforced_caregiver_strengths_in,
      constructiveFeedback: this.gave_constructive_feedback_on,
      recommendedPractice: this.recomended_more_practice_on,
      environmentalChanges: this.environmental_changes,
      clientAppeared: this.client_appeared,
      evidencedBy: this.as_evidenced_by,
      // 97151
      cpt51type: this.selectedPaService1?.cpt === 'Observation' ? 'observation' :
                 this.selectedPaService1?.cpt === 'Report' ? 'report' : undefined,
      procedure: [
        ...(this.BCBA_conducted_client_observations ? ['BCBA conducted client observations'] : []),
        ...(this.BCBA_conducted_assessments ? ['BCBA conducted assessments'] : [])
      ].join(', '),
      instruments: this.newList?.filter(item => item.value).map(item => item.name).join(', '),
      intakeAndOutcomeMeasurements: this.outcomeList?.filter(item => item.value).map(item => item.name).join(', '),
      // 97155
      interventionProtocols: this.interventionsListDoble ? Object.values(this.interventionsListDoble)
        .filter(item => item.value2)
        .map(item => item.name)
        .join(', ') : '',
      replacementProtocols: this.replacements2_added ? Object.values(this.replacements2_added)
        .filter(item => item.modified)
        .map(item => item.description)
        .join(', ') : '',

      modificationsNeededAtThisTime: this.modifications_needed_at_this_time,
      additionalGoalsOrInterventions: this.additional_goals_or_interventions,
      // pending
      rbtTrainingGoals: this.rbt_training_goals?.map(g => ({
        goal: g.lto,
        percentCorrect: g.porcent_of_correct_response
      })),
      caregiverGoals: this.caregivers_training_goals?.map(g => ({
        goal: g.caregiver_goal,
        percentCorrect: g.porcent_of_correct_response
      })),
    };
  }


  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
      this.show97155 = false;
      this.show97156 = false;
      this.show97151 = false;
      this.show971511 = false;
      this.show971512 = false;

      if (service.cpt === '97155') {
        this.show97155 = true;
      }
      if (service.cpt === '97156') {
        this.show97156 = true;
      }
      if (service.cpt === '97151') {
        this.show97151 = true;
      }
      this.checkPosWarning();
    }
  }

  onPaServiceSelect2(event: any) {
    const type = event.value;
    if (type) {
      this.selectedValueCode1 = type.cpt;

      this.show97151 = true;
      this.show971511 = false;
      this.show971512 = false;

      if (type.cpt === 'Observation') {
        this.show971511 = true;
        this.show97151 = true;
      }
      if (type.cpt === 'Report') {
        this.show971512 = true;
        this.show97151 = true;
      }
      this.checkPosWarning();
    }
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

  checkPosWarning() {
    const isCpt97151 = this.selectedPaService?.cpt === '97151';
    const isTelehealth = this.meet_with_client_at === '02';
    this.showPosWarning = isCpt97151 && isTelehealth;
  }

  checkDataSufficient(): ValidationResult {
    const missingFields: string[] = [];

    // Basic required fields
    if (!this.client_selected) {
      missingFields.push('Client information');
    }

    if (!this.selectedPaService || !this.selectedPaService.cpt) {
      missingFields.push('CPT Code selection');
      return { isValid: false, missingFields }; // Return early as CPT is required for further validation
    }

    const hasTime1 = this.selectedValueTimeIn && this.selectedValueTimeOut;
    const hasTime2 = this.selectedValueTimeIn2 && this.selectedValueTimeOut2;
    if (!hasTime1 && !hasTime2) {
      missingFields.push('At least one session time period (Time In/Out)');
    }

    if (!this.meet_with_client_at) {
      missingFields.push('POS');
    }

    // CPT specific validations
    switch (this.selectedPaService.cpt) {
      case '97151':
        if (!this.selectedPaService1 || !this.selectedPaService1.cpt) {
          missingFields.push('Assessment type (Observation or Report)');
        }
        break;

      case '97155':
        if (!this.rbt_training_goals || this.rbt_training_goals.length === 0) {
          missingFields.push('RBT training goals');
        }
        break;

      case '97156':
        if (!this.caregivers_training_goals || this.caregivers_training_goals.length === 0) {
          missingFields.push('Caregiver training goals');
        }
        break;
    }

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  }
  public showAlarmSchool(): boolean {
    let [horas, minutos] = this.selectedValueTimeIn.split(':').map(Number);
    const selectedValueTimeIn = horas + minutos / 60;

    [horas, minutos] = this.selectedValueTimeOut.split(':').map(Number);
    const selectedValueTimeOut = horas + minutos / 60;

    return (selectedValueTimeIn < 8 || selectedValueTimeOut > 15) &&
            this.meet_with_client_at==='03' &&
            this.selectedValueTimeIn.trim() !== '' &&
            this.selectedValueTimeOut.trim() !== ''
  }
}
