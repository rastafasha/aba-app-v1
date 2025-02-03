import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
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
import { AssessmentToolType, NoteBcbaV2, PaServiceV2, PatientV2 } from 'src/app/core/models';
import { BipsV2Service } from 'src/app/core/services/bips.v2.service';
import { show97151L, ValidationResult } from '../interfaces';
import { AISummaryData } from 'src/app/shared/components/generate-ai-summary/generate-ai-summary.component';
import { calculateUnitsFromTime, convertToHours, convertToMinutes } from 'src/app/utils/time-functions';
import { GenerateAiSummaryComponent } from 'src/app/shared/components/generate-ai-summary/generate-ai-summary.component';
import { ReplacementProtocol } from '../interfaces';
import { PatientsV2Service } from 'src/app/core/services/patients.v2.service';


@Component({
  selector: 'app-note-bcba',
  templateUrl: './note-bcba.component.html',
  styleUrls: ['./note-bcba.component.scss'],
})
export class NoteBcbaComponent implements OnInit {
  routes = AppRoutes;
  summary_note = '';
  isGeneratingSummary = false;
  show97156 = false;
  show97155 = false;
  show97151 = false;
  show971511 = false;
  show971512 = false;

  text_validation = '';

  selectedValueRBT!: string;
  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  selectedValueAba!: number;
  selectedValueCode!: string;
  selectedValueCode1!: string;
  total_hour_session = '';

  selectedValueProviderRBT_id: number;
  selectedValueBcba_id: number;

  client_id: number;
  patient_id: number;
  patient_identifier: string;
  doctor_id: number;
  client_selected: PatientV2;
  bip_id: number;
  user: AppUser;

  insurance_id: number;

  first_name = '';
  last_name = '';

  session_date = '';
  time_in = '';
  time_out = '';
  time_in2 = '';
  time_out2 = '';
  session_length_total = '';
  session_length_total2 = '';
  environmental_changes = '';

  FILE_SIGNATURE_RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED: any = 'assets/img/user-06.jpg';

  rbt_id: number;
  bcba_id: number;

  pa_services: PaServiceV2[] = [];
  selectedPaService: PaServiceV2 | null = null;
  selectedPaService1: show97151L;
  projectedUnits = 0;
  start_date: Date;
  end_date: Date;
  showPosWarning = false;

  participants = '';
  additional_goals_or_interventions = '';
  asked_and_clarified_questions_about_the_implementation_of = '';
  reinforced_caregiver_strengths_in = '';
  gave_constructive_feedback_on = '';
  recomended_more_practice_on = '';
  BCBA_conducted_client_observations = false;
  BCBA_conducted_assessments = false;

  modifications_needed_at_this_time = false;
  cargiver_participation = false;
  was_the_client_present = false;

  interventionsList = interventionsList;
  interventionsListDoble = interventionsListDoble;
  behaviorList: any[];
  newList = newList;
  outcomeList = outcomeList;
  show97151List = show97151List;

  // Required for template
  doctor: any;
  electronic_signature: string;
  full_name: string;
  roles_rbt = [];
  roles_bcba = [];
  hours_days = [];
  specialists = [];
  caregivers_training_goalsgroup = [];
  meet_with_client_at = '';
  provider_credential = '';
  caregivers_training = [];
  rbt_training_goals = [];
  intervention_added: object;
  intervention2_added: object;
  intakeoutcome_added: object;
  newlist_added: object;
  behaviorsList_added: object;
  client_response_to_treatment_this_session = '';
  progress_noted_this_session_compared_to_previous_session = '';
  next_session_is_scheduled_for = '';
  client_appeared = '';
  as_evidenced_by = '';
  obj_inprogress = [];

  public textSchoolAlarm = 'It looks like the session time you entered is outside the standard school hours of Monday through Friday, 8:00 AM to 3:00 PM. Please double-check the time or update the POS as needed';
  public textTelehealtWarning = "You've selected POS 51 (Telehealth). Please make sure all telehealth requirements are met and confirm that this session complies with telehealth regulations before proceeding";

  replacementProtocols: ReplacementProtocol[] = [];

  @ViewChild(GenerateAiSummaryComponent) aiSummaryComponent: GenerateAiSummaryComponent;

  isEditMode = false;
  noteId: number;

  constructor(
    private bipV2Service: BipsV2Service,
    private patientService: PatientsV2Service,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteBcbaService: NoteBcbaService,
    private noteBcbaV2Service: NotesBcbaV2Service,
    private doctorService: DoctorService,
    private locations: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id'];
      this.patient_id = Number(resp['patient_id']);
      this.noteId = resp['id']; // Get note ID if present
      this.isEditMode = !!this.noteId;
    });
    this.getConfig();
    this.start_date = new Date(); //  fecha actual
    this.end_date = new Date(); // fecha actual

    this.user = this.authService.user as AppUser;
    this.doctor_id = this.user.id;
    this.getDoctor();
    this.specialistData();
    if (!this.isEditMode) {
      this.getPatient(this.patient_id || null);
    }

    if (this.isEditMode) {
      this.loadNote();
    }
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
  getPatient(patient_id: number | null): Promise<void> {
    if (!patient_id) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.patientService
        .get(patient_id)
        .subscribe((resp) => {
          this.client_selected = resp.data;
          this.patient_id = resp.data.id;
          this.patient_identifier = this.client_selected.patient_identifier;
          this.insurance_id = this.client_selected.insurer_id;

          this.first_name = this.client_selected.first_name;
          this.last_name = this.client_selected.last_name;

          this.insurance_id = this.client_selected.insurer_id;

          this.selectedValueAba = resp.data.clin_director_id;
          // this.selectedValueRBT = resp.data.bcba_id;

          this.pa_services = resp.data.pa_services;
          this.start_date = resp.data.pa_services[0]?.start_date;
          this.end_date = resp.data.pa_services[0]?.end_date;

          //filtramos lo pa_services usando star_date y end_date comparado con el dia de hoy
          this.pa_services = this.pa_services.filter((pa) => {
            const dateStart = new Date(pa.start_date).getTime();
            const dateEnd = new Date(pa.end_date).getTime();
            const dateToday = new Date().getTime();
            return dateStart <= dateToday && dateEnd >= dateToday;
          });

          this.getBipV2();
          resolve();
        });
    });
  }

  getBipV2() {
    this.bipV2Service.list({ client_id: this.patient_id }).subscribe((resp) => {
      console.log('BIP', resp);
      this.bip_id = resp.data[0].id;
      this.caregivers_training_goalsgroup = resp.data[0].caregiver_trainings;
      console.log(this.caregivers_training_goalsgroup);

      this.behaviorList = resp.data[0].maladaptives;

      // Transform replacements into ReplacementProtocol format
      const bipReplacements = resp.data[0].replacements
        .filter(replacement => replacement.status === 'active')
        .flatMap(replacement =>
          replacement.objectives.map(objective => ({
            id: replacement.id,
            name: replacement.name,
            description: objective.description,
            status: objective.status,
            assessed: this.replacementProtocols.find(p => p.id === replacement.id)?.assessed || false,
            modified: this.replacementProtocols.find(p => p.id === replacement.id)?.modified || false,
            demonstrated: this.replacementProtocols.find(p => p.id === replacement.id)?.demonstrated || false,
          }))
        )
        .filter(protocol => protocol.status === 'in progress');

      this.replacementProtocols = bipReplacements;

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

  onInterventionsChange(updatedInterventions: object) {
    this.intervention_added = updatedInterventions;
  }
  onInterventions2Change(updatedInterventions2: object) {
    this.intervention2_added = updatedInterventions2;
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

  loadNote() {
    this.noteBcbaV2Service.get(this.noteId).subscribe({
      next: (resp) => {
        console.log(resp, 'resp loadNote');
        if (resp.data) {
          const note = resp.data;

          // First load the patient to get pa_services and other data
          this.getPatient(note.patient_id).then(() => {
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

            // Populate form fields with note data
            this.patient_id = note.patient_id;
            this.patient_identifier = note.patient_identifier;

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
            this.selectedValueAba = note.supervisor_id;
            this.selectedValueCode = note.cpt_code;
            this.total_hour_session = note.session_length_total?.toString() || '';
            this.selectedValueProviderRBT_id = note.provider_id;
            this.selectedValueBcba_id = note.supervisor_id;
            this.session_date = note.session_date as string;
            this.environmental_changes = note.environmental_changes;
            this.participants = note.participants;
            this.summary_note = note.summary_note;
            this.meet_with_client_at = note.meet_with_client_at;
            this.doctor_id = note.provider_id; // Use the original provider

            // Handle CPT code specific data
            if (note.cpt_code === '97151') {
              this.BCBA_conducted_client_observations = note.BCBA_conducted_client_observations;
              this.BCBA_conducted_assessments = note.BCBA_conducted_assessments;
              // Set assessment tools and intake outcome
              if (note.assessment_tools) {
                this.newList.forEach(item => {
                  item.value = note.assessment_tools.includes(item.name);
                });
              }
              if (note.intake_outcome) {
                this.outcomeList.forEach(item => {
                  item.value = note.intake_outcome.includes(item.name);
                });
              }
              // Set the subtype (Observation/Report)
              if (note.subtype) {
                this.selectedPaService1 = this.show97151List.find(item =>
                  item.cpt.toLowerCase() === note.subtype
                );
                if (this.selectedPaService1) {
                  this.onPaServiceSelect2({ value: this.selectedPaService1 });
                }
              }
            } else if (note.cpt_code === '97155') {
              this.modifications_needed_at_this_time = note.modifications_needed_at_this_time;
              this.additional_goals_or_interventions = note.additional_goals_or_interventions;
              // Handle intervention protocols
              if (note.intervention_protocols) {
                this.interventionsListDoble.forEach(item => {
                  const protocol = note.intervention_protocols.find(p => p.name === item.name);
                  if (protocol) {
                    item.value = protocol.assessed;
                    item.value2 = protocol.modified;
                  }
                });
              }
              // Handle replacement protocols
              if (note.replacement_protocols) {
                this.replacementProtocols = note.replacement_protocols.map(p => ({
                  id: p.plan_id,
                  name: p.name,
                  description: p.name,
                  assessed: p.assessed,
                  modified: p.modified,
                  demonstrated: false,
                  status: 'in progress'
                }));
              }
            } else if (note.cpt_code === '97156') {
              // Handle behavior protocols
              if (note.behavior_protocols) {
                this.behaviorList.forEach(item => {
                  const protocol = note.behavior_protocols.find(p => p.plan_id === item.id);
                  if (protocol) {
                    item.value = protocol.discussed;
                  }
                });
              }
              // Handle caregiver goals
              if (note.caregiver_goals) {
                this.caregivers_training_goalsgroup.forEach(goal => {
                  const savedGoal = note.caregiver_goals.find(g => g.plan_id === goal.id);
                  if (savedGoal) {
                    goal.porcent_of_correct_response = savedGoal.percentage_achieved;
                  }
                });
              }
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

  save() {
    const missingFields = this.checkDataSufficient();
    if (!missingFields.isValid) {
      Swal.fire('Warning', missingFields.missingFields.join(', '), 'warning');
      return;
    }

    if (!this.selectedPaService) {
      Swal.fire('Warning', 'Please select a service ', 'warning');
      return;
    }
    if (!this.session_date) {
      Swal.fire('Warning', 'Please select a session date ', 'warning');
      return;
    }

    const bcbaData: Partial<NoteBcbaV2> = {
      type: 'bcba',
      id: this.isEditMode ? this.noteId : 0,
      client_id: this.patient_id,
      patient_code: this.patient_identifier,
      session_length_total: Number(this.total_hour_session),
      total_hours: '',
      total_minutes: 0,
      total_units: 0,
      note_description: this.summary_note,
      patient_id: this.patient_id,
      patient_identifier: this.patient_identifier,
      summary_note: this.summary_note,
      doctor_id: this.doctor_id,
      bip_id: this.bip_id,
      diagnosis_code: this.client_selected.diagnosis_code,
      location_id: this.client_selected.location_id,
      birth_date: this.client_selected.birth_date,
      rendering_provider: this.doctor_id,
      provider_id: this.doctor_id,
      supervisor_id: this.selectedValueAba,
      pa_service_id: this.selectedPaService?.id,
      cpt_code: this.selectedPaService?.cpt,
      meet_with_client_at: this.meet_with_client_at,
      pos: this.meet_with_client_at,
      provider_name: this.doctor_id,
      supervisor_name: this.selectedValueBcba_id,
      insurance_id: this.insurance_id,
      insurance_identifier: this.client_selected.insurance_identifier,
      participants: this.participants,
      environmental_changes: this.environmental_changes,
      session_date: this.session_date,
      time_in: this.selectedValueTimeIn || null,
      time_out: this.selectedValueTimeOut || null,
      time_in2: this.selectedValueTimeIn2 || null,
      time_out2: this.selectedValueTimeOut2 || null,
      provider_signature: this.doctor?.electronic_signature,
      supervisor_signature: this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED,
    };

    if (this.selectedPaService?.cpt === '97151') {
      bcbaData.subtype = this.selectedPaService1?.cpt.toLowerCase() as AssessmentToolType;
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
      bcbaData.replacement_protocols = this.replacementProtocols
        .map(p => ({
          plan_id: p.id,
          name: p.name,
          assessed: p.assessed,
          modified: p.modified,
        }));
      bcbaData.intervention_protocols = this.interventionsListDoble
        .map((item) => ({
          name: item.name,
          assessed: item.value,
          modified: item.value2,
        }));
      bcbaData.modifications_needed_at_this_time = this.modifications_needed_at_this_time;
      bcbaData.additional_goals_or_interventions = this.additional_goals_or_interventions;
    }

    if (this.selectedPaService?.cpt === '97156') {
      bcbaData.replacement_protocols = this.replacementProtocols
        .map(p => ({
          plan_id: p.id,
          name: p.name,
          demonstrated: p.demonstrated,
        }));
      bcbaData.behavior_protocols = this.behaviorList.map(item => ({
        plan_id: item.id,
        name: item.name,
        discussed: item.value,
      }));
      bcbaData.caregiver_goals = this.caregivers_training_goalsgroup.map(item => ({
        plan_id: item.id,
        name: item.name,
        percentage_achieved: item.porcent_of_correct_response,
      }));
      bcbaData.intervention_protocols = this.interventionsListDoble
        .map((item, index) => ({
          name: item.name,
          demonstrated: this.interventionsList[index].value,
        }));
    }

    const request = this.isEditMode
      ? this.noteBcbaV2Service.update(bcbaData as NoteBcbaV2, this.noteId)
      : this.noteBcbaV2Service.create(bcbaData);

    request.subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          Swal.fire('Success', `Note BCBA ${this.isEditMode ? 'updated' : 'created'}`, 'success');
          this.router.navigate([
            AppRoutes.noteBcba.list,
            this.patient_identifier,
          ]);
        } else {
          Swal.fire('Error', `There was an error ${this.isEditMode ? 'updating' : 'saving'} the note.`, 'error');
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
      }
    });
  }

  getAISummaryData(): AISummaryData {
    console.log(this.replacementProtocols, 'replacementProtocols');
    if (!this.selectedPaService || !this.selectedPaService.cpt) {
      return null;
    }

    return {
      diagnosis: this.client_selected.diagnosis_code,
      birthDate: typeof this.client_selected.birth_date === 'string' ? this.client_selected.birth_date : null,
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
      replacementProtocols: this.replacementProtocols ? this.replacementProtocols
        .filter(p => p.modified)
        .map(p => p.name)
        .join(', ') : '',

      modificationsNeededAtThisTime: this.modifications_needed_at_this_time,
      additionalGoalsOrInterventions: this.additional_goals_or_interventions,
      // 97156
      demonstratedReplacementProtocols: this.replacementProtocols ? this.replacementProtocols
        .filter(p => p.demonstrated)
        .map(p => p.name)
        .join(', ') : '',
      demonstratedInterventionProtocols: this.interventionsList ? Object.values(this.interventionsList)
        .filter(item => item.value)
        .map(item => item.name)
        .join(', ') : '',
      discussedBehaviors: this.behaviorList ? Object.values(this.behaviorList)
        .filter(item => item.value)
        .map(item => item.name)
        .join(', ') : '',
      caregiverGoals: this.caregivers_training_goalsgroup
        ?.filter(g => g.porcent_of_correct_response !== undefined && g.porcent_of_correct_response !== null)
        ?.map(g => `${g.name} - ${g.porcent_of_correct_response}% correct`)
        .join(', '),
        // pending
      rbtTrainingGoals: this.rbt_training_goals?.map(g => ({
        goal: g.lto,
        percentCorrect: g.porcent_of_correct_response
      })),
    };
  }

  onAISummaryRequested() {
    const summaryData = this.getAISummaryData();
    if (summaryData) {
      this.aiSummaryComponent.generateSummary(summaryData);
    }
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


    const hasTime1 = this.selectedValueTimeIn && this.selectedValueTimeOut;
    const hasTime2 = this.selectedValueTimeIn2 && this.selectedValueTimeOut2;
    if (!hasTime1 && !hasTime2) {
      missingFields.push('At least one session time period (Time In/Out)');
    }

    if (!this.meet_with_client_at) {
      missingFields.push('POS');
    }

    if (!this.selectedValueAba) {
      missingFields.push('ABA Supervisor');
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

    if (!this.selectedPaService || !this.selectedPaService.cpt) {
      missingFields.push('CPT Code selection');
      return { isValid: false, missingFields }; // Return early as CPT is required for further validation
    }

    // CPT specific validations
    switch (this.selectedPaService.cpt) {
      case '97151':
        break;

      case '97155':
        if (!this.rbt_training_goals || this.rbt_training_goals.length === 0) {
          missingFields.push('RBT training goals');
        }
        break;

      case '97156':
        if (!this.caregivers_training_goalsgroup || this.caregivers_training_goalsgroup.length === 0) {
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

  onModificationsChange(value: boolean) {
    this.modifications_needed_at_this_time = value;
  }

  onAdditionalChange(value: string) {
    this.additional_goals_or_interventions = value;
  }

  onReplacementProtocolsChange(protocols: ReplacementProtocol[]) {
    // When saving the note, we'll use the protocols array directly
    console.log('Updated protocols:', protocols);
    this.replacementProtocols = protocols;
  }

  onReplacementChange(updatedReplacements: any) {
    this.obj_inprogress = updatedReplacements;
  }
}
