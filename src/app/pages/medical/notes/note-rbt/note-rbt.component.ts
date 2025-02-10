import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { NoteRbtService } from '../../../../core/services/notes-rbt.service';
import { NotesRbtV2Service } from '../../../../core/services/notes-rbt.v2.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppUser } from 'src/app/core/models/users.model';
import { Interventions, PaServiceV2, PatientV2, NoteRbtV2 } from 'src/app/core/models';
import { BipsV2Service } from 'src/app/core/services/bips.v2.service';
import { MaladaptiveRegistry, ReplacementRegistry, ReplacementBehavior, POSModel, MaladaptiveBehavior, ValidationResult } from '../interfaces';
import { AISummaryData } from 'src/app/shared/components/generate-ai-summary/generate-ai-summary.component';
import { GenerateAiSummaryComponent } from 'src/app/shared/components/generate-ai-summary/generate-ai-summary.component';
import { calculateUnitsFromTime, convertToHours, convertToMinutes } from 'src/app/utils/time-functions';
import { PatientsV2Service } from 'src/app/core/services/patients.v2.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Intervention } from 'src/app/core/models/v2/intervention.v2.model';
import { posCodes as basePosCodes } from 'src/app/shared/utils/getPos';

@Component({
  selector: 'app-note-rbt',
  templateUrl: './note-rbt.component.html',
  styleUrls: ['./note-rbt.component.scss'],
})
export class NoteRbtComponent implements OnInit {
  @ViewChild(GenerateAiSummaryComponent) aiSummaryComponent: GenerateAiSummaryComponent;

  routes = AppRoutes;
  posCodes = basePosCodes.filter((pos) => (pos.code !== '10') && (pos.code !== '02'));
  valid_form = false;

  text_validation = '';
  isEditMode = false;
  noteId: number;

  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  selectedValueMaladaptive!: string;
  selectedValueProviderCredential!: string;
  option_selected = 0;
  isGeneratingSummary = false;
  totalMinutos = 0;
  total_hour_session = '0';

  selectedValueRBT!: string;
  selectedValueRenderingProvider!: string;
  selectedValueProviderRBT_id!: number;

  selectedValueBcba_id!: number;
  selectedValueAbaSupervisor!: string;

  client_id!: number;
  patient_identifier!: string;
  patient_id!: number;
  doctor_id!: number;
  insurer_id!: number;
  client_selected: PatientV2;
  bip_id: number | null = null;
  user!: AppUser;

  first_name = '';
  last_name = '';
  diagnosis_code = '';

  provider_name_g = '';
  provider_credential = '';
  pos!: POSModel;
  session_date = '';
  time_in = '';
  time_out = '';
  time_in2 = '';
  time_out2 = '';
  session_length_total = '0';
  session_length_total2 = '0';
  environmental_changes = '';
  participants = '';

  summary_note = '';
  meet_with_client_at = '';
  client_appeared = '';
  as_evidenced_by = '';
  rbt_modeled_and_demonstrated_to_caregiver = '';
  progress_noted_this_session_compared_to_previous_session = '';
  next_session_is_scheduled_for = '';
  provider_name = '';
  // supervisor_name = '';

  number_of_occurrences!: number;
  number_of_correct_responses!: number;
  total_trials!: number;
  number_of_correct_response!: number;
  maladaptive = '';
  replacement = '';
  interventions!: Interventions;
  provider_signature: string | null = null;
  supervisor_signature: string | null = null;


  FILE_SIGNATURE_RBT: File | null = null;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_BCBA: File | null = null;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA = 'assets/img/user-06.jpg';
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = 'assets/img/user-06.jpg';

  roles_rbt: any[] = [];
  roles_bcba: any[] = [];

  hours_days: string[] = [];
  maladaptives: MaladaptiveRegistry[] = [];
  replacementGoals: ReplacementRegistry[] = [];
  replacements: ReplacementBehavior[] = [];

  maladaptiveSelected: MaladaptiveBehavior | null = null;
  replacementSelected: ReplacementBehavior | null = null;
  maladp_added: MaladaptiveBehavior[] = [];
  replacement_added: ReplacementBehavior[] = [];
  maladaptive_behavior: MaladaptiveBehavior | null = null;
  name: MaladaptiveBehavior | null = null;
  electronic_signature: string | null = null;
  doctor: any;
  full_name: string | null = null;

  insurance_id!: number;
  insurance_identifier!: string;

  intervention_added: Interventions = [];
  interventionsSelected: { [key: string]: boolean } = {};
  interventionsList = [];

  pa_services: PaServiceV2[] = [];
  selectedPaService: PaServiceV2 | null = null;

  selectedValueCode = '';

  projectedUnits = 0;
  msjWarningTrialOrObjectives = '';

  constructor(
    private bipV2Service: BipsV2Service,
    private patientService: PatientsV2Service,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteRbtService: NoteRbtService,
    private notesRbtV2Service: NotesRbtV2Service,
    private doctorService: DoctorService,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user as AppUser;
    this.doctor_id = this.user.id;
    this.getDoctor();

    this.ativatedRoute.params.subscribe((resp) => {
      // this.patient_identifier = resp['patient_id'];
      this.patient_id = Number(resp['patient_id']);
      this.noteId = resp['id']; // Get note ID if present
      this.isEditMode = !!this.noteId;
    });

    this.getConfig();
    this.getPatient(this.patient_id || null);

    this.specialistData();

    if (this.isEditMode) {
      this.loadNote();
    }

    // this.updateInterventions();

  }

  // updateInterventions() {
  //   const interventionsObj = this.interventionsList
  //     .filter((intervention) => intervention.value)
  //     .reduce((acc, intervention) => {
  //       acc[intervention.id] = true;
  //       return acc;
  //     }, {});
  //   this.intervention_added = [interventionsObj];
  // }

  onInterventionsChange(updatedInterventions: any) {
    // Convert the object of {id: true} to array of ids
    const interventionIds = Object.keys(updatedInterventions[0]).filter(
      key => updatedInterventions[0][key]
    );
    this.intervention_added = interventionIds;
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
  getPatient(patient_id: number | null): Promise<void> {
    if (!patient_id) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.patientService.get(patient_id).subscribe((resp)=>{
        this.client_selected = resp.data;

        this.first_name = this.client_selected.first_name;
        this.last_name = this.client_selected.last_name;
        this.patient_identifier = this.client_selected.patient_identifier;
        this.patient_id = this.client_selected.id;
        this.client_id = this.client_selected.id;
        this.insurance_id = this.client_selected.insurer_id;
        this.insurance_identifier = this.client_selected.insurance_identifier;
        if (!this.isEditMode) {
          this.selectedValueProviderRBT_id = this.doctor_id;
        }
        this.diagnosis_code = this.client_selected.diagnosis_code;

        this.pa_services = resp.data.pa_services;

        // Filter pa_services by date
        this.pa_services = this.pa_services.filter((pa) => {
          const dateStart = new Date(pa.start_date).getTime();
          const dateEnd = new Date(pa.end_date).getTime();
          const dateToday = new Date().getTime();
          return dateStart <= dateToday && dateEnd >= dateToday;
        });

        this.selectedPaService = resp.data.pa_services.find(service => service.cpt === '97153') || null;
        this.selectedValueCode = this.selectedPaService?.cpt || '';

        this.getBipV2();
        resolve();
      })
    });
  }

  getBipV2() {
    this.bipV2Service.list({ client_id: this.patient_id }).subscribe((resp) => {
      this.bip_id = resp.data[0].id;

      // Store BIP maladaptives and replacements temporarily
      const bipMaladaptives = resp.data[0].maladaptives.map((mal) => ({
        id: mal.id,
        name: mal.name,
        number_of_occurrences: null
      }));

      const bipReplacements = resp.data[0].replacements
        .filter(repl => repl.status === 'active')
        .map((repl) => ({
          status: repl.status,
          id: repl.id,
          name: repl.name,
          total_trials: null,
          number_of_correct_response: null,
          objectives: repl.objectives,
          description: repl.objectives
            .filter(obj => obj.status === 'in progress')[0]
            ?.description || ''
        }));

      this.interventionsList = this.generateInterventionsList(resp.data[0].interventions);


      if (this.isEditMode) {
        // In edit mode, preserve existing values but add any missing items from BIP
        const existingMaladaptiveIds = this.maladaptives.map(m => m.id);
        const newMaladaptives = bipMaladaptives.filter(m => !existingMaladaptiveIds.includes(m.id));
        this.maladaptives = [...this.maladaptives, ...newMaladaptives];

        this.replacementGoals = this.replacementGoals.map(r => {
          const bipReplacement = bipReplacements.find(bip => bip.id === r.id);
          return {
            ...r,
            description: bipReplacement?.description || '',
            objectives: bipReplacement?.objectives || []
          };
        });
      } else {
        // In create mode, use BIP data directly
        this.maladaptives = bipMaladaptives;
        this.replacementGoals = bipReplacements;
      }
    });
  }

  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
    }
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
    this.speciaFirmaDataBcba(event.value);
  }


  calculateProjectedUnits(): void {
    let totalUnits = 0;

    if (this.selectedValueTimeIn && this.selectedValueTimeOut) {
      const morningUnits = calculateUnitsFromTime(
        this.selectedValueTimeIn,
        this.selectedValueTimeOut
      );
      totalUnits += morningUnits;
    }

    if (this.selectedValueTimeIn2 && this.selectedValueTimeOut2) {
      const afternoonUnits = calculateUnitsFromTime(
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

  generateInterventionsList(interventions: Intervention[]) {
    const newInterventions = interventions.map((intervention) => ({
      id: intervention.title,
      name: intervention.title,
      value: false,
    }));

    // filter repeated interventions, prioritize existing interventions
    const mixedInterventions = [...(this.interventionsList || []), ...newInterventions]
      .filter((intervention, index, self) =>
        self.findIndex(t => t.name === intervention.name) === index
      );

    if (mixedInterventions.length === 0) {
      return Intervention.getDefaults().map((intervention) => ({
      id: intervention.title,
      name: intervention.title,
      value: false,
     }));
    }

    return mixedInterventions;
  }

  selectMaladaptive(behavior: MaladaptiveBehavior) {
    this.maladaptiveSelected = behavior;
  }

  selectReplacement(replacement: ReplacementBehavior) {
    this.replacementSelected = replacement;
  }

  back() {
    this.replacementSelected = null;
    this.maladaptiveSelected = null;
    this.total_trials = null;
    this.number_of_correct_response = null;
  }

  addMaladaptive(behavior: MaladaptiveBehavior, index: number) {
    this.maladaptiveSelected = behavior;

    if (behavior.number_of_occurrences === undefined) {
      Swal.fire('Warning', `Must add at least one occurrence`, 'warning');
      return;
    }

    this.maladp_added.push({ ...behavior });
    this.maladaptives.splice(index, 1);

    Swal.fire('Added', `Maladaptive - ${behavior.name} - Added`, 'success');

    this.maladaptiveSelected = null;
    this.name = null;
    this.number_of_occurrences = 0;
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


  validateMaladaptives(): boolean {
    return this.maladp_added.every(
      (m) =>
        m.number_of_occurrences !== undefined && m.number_of_occurrences >= 0
    );
  }

  isValidCorrectResponse(replacement: ReplacementBehavior): boolean {
    return (
      replacement.number_of_correct_response !== undefined &&
      replacement.total_trials !== undefined &&
      replacement.number_of_correct_response <= replacement.total_trials
    );
  }

  validateReplacements(): boolean {
    return this.replacement_added.every((r) => this.isValidCorrectResponse(r));
  }

  onMaladaptivesChange(updatedMaladaptives: any) {
    this.maladaptives = updatedMaladaptives;
  }

  onReplacementsChange(updatedReplacements: any) {
    this.replacementGoals = updatedReplacements;
  }

  onSave() {
    const validation = this.checkDataSufficient();
    if (!validation.isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Required Fields',
        text: `Please fill in the following fields: ${validation.missingFields.join(
          ', '
        )}`,
      });
      return;
    }

    const noteData: Partial<NoteRbtV2> = {
      type: 'rbt' as const,
      id: this.isEditMode ? this.noteId : 0,
      bip_id: this.bip_id,
      patient_id: this.patient_id,
      client_id: this.client_id,
      patient_code: this.patient_identifier,
      patient_identifier: this.patient_identifier,
      insurance_identifier: this.insurance_identifier,
      doctor_id: this.doctor_id,
      provider_id: this.selectedValueProviderRBT_id,
      supervisor_id: Number(this.selectedValueBcba_id),
      provider_name_g: Number(this.provider_name_g),
      provider_credential: this.provider_credential,
      provider_signature: this.provider_signature,
      provider_name: Number(this.provider_name),
      supervisor_signature: this.supervisor_signature,
      // supervisor_name: Number(this.supervisor_name),
      session_date: this.session_date,
      time_in: this.selectedValueTimeIn,
      time_out: this.selectedValueTimeOut,
      time_in2: this.selectedValueTimeIn2,
      time_out2: this.selectedValueTimeOut2,
      participants: this.participants,
      session_length_morning_total: Number(this.session_length_total),
      session_length_afternon_total: Number(this.session_length_total2),
      total_hours: 0,
      total_minutes: 0,
      total_units: 0,
      environmental_changes: this.environmental_changes,
      summary_note: this.summary_note,
      meet_with_client_at: this.meet_with_client_at,
      client_appeared: this.client_appeared,
      as_evidenced_by: this.as_evidenced_by,
      rbt_modeled_and_demonstrated_to_caregiver:
      this.rbt_modeled_and_demonstrated_to_caregiver,
      client_response_to_treatment_this_session: '',
      progress_noted_this_session_compared_to_previous_session:
      this.progress_noted_this_session_compared_to_previous_session,
      next_session_is_scheduled_for: this.next_session_is_scheduled_for,
      status: 'pending' as const,
      cpt_code: this.selectedValueCode,
      location_id: this.client_selected.location_id,
      insurance_id: this.insurance_id,
      pa_service_id: this.selectedPaService?.id,
      pos: this.meet_with_client_at,
      maladaptives: this.maladaptives
        .map((m) => ({
          id: m.id,
          name: m.name,
          ocurrences: m.number_of_occurrences,
        })),
      replacements: this.replacementGoals
        .map((r) => ({
          id: r.id,
          name: r.name,
          total_trials: r.total_trials,
          correct_responses: r.number_of_correct_response,
        })),
      interventions: this.intervention_added,
      billed: false,
      paid: false,
      md: '',
      md2: '',
      md3: '',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    const request = this.isEditMode
      ? this.notesRbtV2Service.update(noteData as unknown as NoteRbtV2, this.noteId)
      : this.notesRbtV2Service.create(noteData as unknown as NoteRbtV2);

    request.subscribe({
      next: (response) => {
        if (response.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `RBT Note ${this.isEditMode ? 'updated' : 'saved'} successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate([
            this.routes.noteRbt.list,
            this.patient_id,
          ]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `There was an error ${this.isEditMode ? 'updating' : 'saving'} the note.`,
          });
        }
      },
      error: (error) => {
        console.error(`Error ${this.isEditMode ? 'updating' : 'saving'} RBT note:`, error);
        let errorMessage = `There was an error ${this.isEditMode ? 'updating' : 'saving'} the note.`;

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
      },
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (!event.value) {
      this.session_date = '';
      return;
    }

    const date = event.value;
    // Set the session date in ISO format YYYY-MM-DD
    this.session_date = date.toISOString().split('T')[0];

    if (!this.next_session_is_scheduled_for) {
      // Set next session date
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      this.next_session_is_scheduled_for = nextDate.toISOString().split('T')[0];
    }
  }

  getAISummaryData(): AISummaryData {
    return {
      diagnosis: this.diagnosis_code,
      birthDate: this.client_selected?.birth_date as unknown as string,
      startTime: this.selectedValueTimeIn ? this.selectedValueTimeIn : null,
      endTime: this.selectedValueTimeOut ? this.selectedValueTimeOut : null,
      startTime2: this.selectedValueTimeIn2 ? this.selectedValueTimeIn2 : null,
      endTime2: this.selectedValueTimeOut2 ? this.selectedValueTimeOut2 : null,
      cptCode: this.selectedValueCode,
      pos: this.meet_with_client_at,
      participants: this.participants,
      environmentalChanges: this.environmental_changes,
      maladaptives: this.maladaptives.map((m) => ({
        behavior: m.name,
        frequency: m.number_of_occurrences,
      })),
      replacements: this.replacementGoals.map((r) => ({
        name: r.name,
        totalTrials: r.total_trials,
        correctResponses: r.number_of_correct_response,
      })),
      interventions: this.intervention_added.length > 0
      ? this.intervention_added
      : [],
      mood: this.client_appeared,
      evidencedBy: this.as_evidenced_by,
      progressNoted: this.progress_noted_this_session_compared_to_previous_session,
      rbtModeledAndDemonstrated: this.rbt_modeled_and_demonstrated_to_caregiver,
      nextSession: this.next_session_is_scheduled_for,
    };
  }

  checkDataSufficient(): ValidationResult {
    const missingFields: string[] = [];

    // Validate session date is not empty and is a valid date
    if (!this.session_date || this.session_date === '') {
      missingFields.push('Session date (DOS)');
    } else {
      const dateValue = new Date(this.session_date);
      if (isNaN(dateValue.getTime()) || dateValue.getFullYear() <= 1970) {
        missingFields.push('Valid session date (DOS)');
      }
    }

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

    if (
      !this.progress_noted_this_session_compared_to_previous_session ||
      this.progress_noted_this_session_compared_to_previous_session === ''
    ) {
      missingFields.push(
        'Progress noted this session compared to previous session'
      );
    }

    if (!this.maladaptives || this.maladaptives.length === 0) {
      missingFields.push('Maladaptive behaviors');
    } else {
      const allMaladaptivesValid = this.maladaptives.every(
        (m) =>
          m.name &&
          m.number_of_occurrences !== undefined &&
          m.number_of_occurrences !== null
      );
      if (!allMaladaptivesValid) {
        missingFields.push(
          'Complete maladaptive behavior information (occurrences)'
        );
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
        missingFields.push(
          'Complete replacement goal information (trials and correct responses)'
        );
      }
    }

    if (!this.intervention_added || this.intervention_added.length === 0) {
      missingFields.push('Interventions');
    }

    if (!this.participants || this.participants === '') {
      missingFields.push('Present this session');
    }

    if (!this.environmental_changes || this.environmental_changes === '') {
      missingFields.push('Environmental changes');
    }

    if (!this.summary_note || this.summary_note === '') {
      missingFields.push('Summary note');
    }

    if (!this.next_session_is_scheduled_for || this.next_session_is_scheduled_for === '') {
      missingFields.push('Next session date');
    }

    if (!this.rbt_modeled_and_demonstrated_to_caregiver || this.rbt_modeled_and_demonstrated_to_caregiver === '') {
      missingFields.push('RBT modeled and demonstrated to caregiver');
    }

    if (!this.progress_noted_this_session_compared_to_previous_session || this.progress_noted_this_session_compared_to_previous_session === '') {
      missingFields.push('Progress noted this session compared to previous session');
    }

    if (!this.as_evidenced_by || this.as_evidenced_by === '') {
      missingFields.push('As evidenced by');
    }

    if (!this.client_appeared || this.client_appeared === '') {
      missingFields.push('Client appeared');
    }

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  }

  onAISummaryRequested() {
    const summaryData = this.getAISummaryData();
    if (summaryData) {
      this.aiSummaryComponent.generateSummary(summaryData);
    }
  }

  loadNote() {
    this.notesRbtV2Service.get(this.noteId).subscribe({
      next: (resp) => {
        if (resp.data) {
          const note = resp.data;
          this.patient_id = note.patient_id;

          // First load the patient to get pa_services and other data
          this.getPatient(this.patient_id).then(() => {
            // Set PA service first since other fields depend on it
            const paService = this.pa_services.find(s => s.id === note.pa_service_id);
            if (paService) {
              this.selectedPaService = new PaServiceV2({
                id: paService.id,
                patient_id: this.patient_id,
                pa_service: paService.pa_service,
                cpt: paService.cpt,
                n_units: paService.n_units,
                spent_units: paService.spent_units,
                start_date: new Date(paService.start_date),
                end_date: new Date(paService.end_date)
              });
              // Trigger CPT code selection
              this.onPaServiceSelect({ value: this.selectedPaService });
            }

            // Handle maladaptives from note
            if (note.maladaptives) {
              this.maladaptives = note.maladaptives
                .filter(m => m.ocurrences !== 0)
                .map(m => ({
                  id: m.id,
                  name: m.name,
                  number_of_occurrences: m.ocurrences || 0,
                  description: m.name // Add description field
                }));
            }

            // Handle replacements from note
            if (note.replacements) {
              this.replacementGoals = note.replacements
                .filter(r => r.total_trials !== 0)
                .map(r => ({
                  id: r.id,
                  name: r.name,
                  total_trials: r.total_trials || 0,
                  number_of_correct_response: r.correct_responses || 0,
                  status: 'active',
                  objectives: [],
                  description: r.name // Add description field
                }));

              // Force change detection by creating a new array reference
              this.replacementGoals = [...this.replacementGoals];
            }

            // Handle interventions from note
            if (note.interventions) {
              this.interventionsList = this.generateInterventionsList(note.interventions.map(title => ({
                id: title,
                title: title,
                description: '',
              })));
            }

            // Time fields - ensure proper format HH:mm
            const formatTime = (time: string) => {
              if (!time) return '';
              const [hours, minutes] = time.split(':');
              return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
            };

            // Time fields - set both variables for each
            this.selectedValueTimeIn = formatTime(note.time_in);
            this.time_in = formatTime(note.time_in);
            this.selectedValueTimeOut = formatTime(note.time_out);
            this.time_out = formatTime(note.time_out);
            this.selectedValueTimeIn2 = formatTime(note.time_in2);
            this.time_in2 = formatTime(note.time_in2);
            this.selectedValueTimeOut2 = formatTime(note.time_out2);
            this.time_out2 = formatTime(note.time_out2);

            // Rest of the fields
            this.selectedValueCode = note.cpt_code;
            this.total_hour_session = String(note.session_length_total || 0);
            this.selectedValueProviderRBT_id = note.provider_id;
            this.selectedValueBcba_id = note.supervisor_id;
            this.session_date = note.session_date as string;
            this.environmental_changes = note.environmental_changes;
            this.participants = note.participants;
            this.summary_note = note.summary_note;
            this.meet_with_client_at = note.meet_with_client_at;
            this.doctor_id = note.provider_id;
            this.client_appeared = note.client_appeared;
            this.as_evidenced_by = note.as_evidenced_by;
            this.rbt_modeled_and_demonstrated_to_caregiver = note.rbt_modeled_and_demonstrated_to_caregiver;
            this.progress_noted_this_session_compared_to_previous_session = note.progress_noted_this_session_compared_to_previous_session;
            this.next_session_is_scheduled_for = note.next_session_is_scheduled_for as string;

            // Convert numeric fields to strings for form display
            this.total_hour_session = String(note.session_length_total || 0);
            this.session_length_total = String(note.session_length_morning_total || 0);
            this.session_length_total2 = String(note.session_length_afternon_total || 0);

            // Handle interventions
            if (note.interventions) {
              // Create a copy of the interventionsList with updated values
              this.interventionsList = this.interventionsList.map(intervention => ({
                ...intervention,
                value: note.interventions.includes(intervention.id)
              }));

              // Set the intervention_added as the array of intervention IDs
              this.intervention_added = note.interventions;
            }

            this.calculateProjectedUnits();
            this.calculateTotalHours();
          });
        }
      },
      error: (error) => {
        console.error('Error loading note:', error);
        Swal.fire('Error', 'There was an error loading the note.', 'error');
      }
    });
  }

  public showWarningTrialsAndObjectives(): boolean {
    const [hoursIn1, minutesIn1] = this.selectedValueTimeIn.split(':').map(Number);
    const [hoursOut1, minutesOut1] = this.selectedValueTimeOut.split(':').map(Number);
    const [hoursIn2, minutesIn2] = this.selectedValueTimeIn2.split(':').map(Number);
    const [hoursOut2, minutesOut2] = this.selectedValueTimeOut2.split(':').map(Number);

    const morningMinutes = hoursOut1 * 60 + minutesOut1 - (hoursIn1 * 60 + minutesIn1);
    const afternoonMinutes = hoursOut2 * 60 + minutesOut2 - (hoursIn2 * 60 + minutesIn2);
    const totalMinutes = morningMinutes || 0 + afternoonMinutes || 0;

    const objectivesIsOk = this.replacementGoals.filter(item => item.total_trials !== 0).length >= 5 ||
                          this.replacementGoals.filter(item => item.total_trials !== 0).length === this.replacementGoals.length;

    const total_trials = this.replacementGoals.reduce((suma, item) => suma + item.total_trials, 0)
    const trialsIsOk = total_trials >= (totalMinutes/60)*10;
    if(!objectivesIsOk) {
      this.msjWarningTrialOrObjectives = 'The number of objectives worked on is very small';
      return true;
    }
    if(!trialsIsOk) {
      this.msjWarningTrialOrObjectives = 'The number of trials worked on is very small';
      return true;
    }

    return false;
  }

}
