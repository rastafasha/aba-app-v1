import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { NoteBcbaService } from '../../../../core/services/notes-bcba.service';
import { InsuranceService } from '../../../../core/services/insurances.service';
import { Location } from '@angular/common';
import { AppUser } from 'src/app/core/models/users.model';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';



@Component({
  selector: 'app-note-bcba-edit',
  templateUrl: './note-bcba-edit.component.html',
  styleUrls: ['./note-bcba-edit.component.scss'],
})
export class NoteBcbaEditComponent implements OnInit {
  routes = AppRoutes;
  summary_note = '';
  isGeneratingSummary = false;

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  selectedValueProvider!: string;
  
  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';



  selectedValueRBT!: string;
  selectedValueRenderingProvider!: string;
  selectedValueProviderRBT_id!: number;
  
  selectedValueBCBA!: string;
  selectedValueAbaSupervisor!: string;
  selectedValueAbaSupervisor_id: number;
  selectedValueBcba_id!: number;

  selectedValueMaladaptive!: string;
  selectedValueCode!: string;
  option_selected = 0;

  client_id: number;
  doctor_id: number;
  patient_identifier: string;
  patient_id: number;
  patientLocation_id: number;
  client_selected: any;
  note_selected: any = [];
  bip_id: number;
  user: AppUser;
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

  number_of_occurrences = 0;
  number_of_correct_responses = 0;
  total_trials = 0;
  number_of_correct_response = 0;
  maladaptive = '';
  replacement = '';
  maladaptive_behavior = '';
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
  IMAGE_PREVISUALIZA_SIGNATURE__RBT: any;
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
  note_selectedId: number;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  specialists = [];
  maladaptives = [];
  replacementGoals = [];
  intervention_added = [];
  replacements = [];
  interventionsgroup = [];

  maladaptivegroup = [];
  replacementgroup = [];

  familiEnvolments = [];
  monitoringEvaluatingPatientIds = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  birth_date: any;
  cpt: string;
  note_description: string;
  caregivers_training_goals = [];
  rbt_training_goals = [];
  rbt_training_goalsgroup: any;
  caregivers_training_goalsgroup: any;
  pa_assessmentsgroup = [];
  pa_assessments: string;
  n_un = [];

  location: any;
  porcent_of_occurrences = 0;
  porcent_of_correct_response = 0;
  lto: any = null;
  caregiver_goal: any = null;
  cpt_code: any = null;

  insurer_name: any = [];
  services: any = [];
  insurer_id: number;

  pa_services: PaService[] = [];
  selectedPaService: PaService | null = null;
  projectedUnits = 0;
  
  provider: any = [];
  
  insurance_identifier: string;
  insurance_id: number;
  
  
  constructor(
    private bipService: BipService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteBcbaService: NoteBcbaService,
    private doctorService: DoctorService,
    private insuranceService: InsuranceService,
    private locations: Location
  ) {}

  ngOnInit(): void {
    //
    this.ativatedRoute.params.subscribe((resp) => {
      this.note_id = resp['id'];
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
    this.noteBcbaService.listConfigNote().subscribe((resp) => {
      console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.specialists = resp.specialists;
    });
  }

  getNote() {
    this.noteBcbaService.getNote(this.note_id).subscribe((resp) => {
      console.log('respuesta de getNote', resp);
      this.note_selected = resp.noteBcba;
      this.note_selectedId = resp.noteBcba.id;
      this.patient_identifier = this.note_selected.patient_identifier;
      this.bip_id = this.note_selected.bip_id;
      this.location = this.note_selected.location;
      
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
      console.log(this.rbt_training_goals);

      this.selectedValueRBT = resp.noteBcba.provider.name;
      this.selectedValueProviderRBT_id =resp.noteBcba.provider_id;
      
      this.selectedValueBCBA = resp.noteBcba.supervisor.name;
      this.selectedValueBcba_id =resp.noteBcba.supervisor_id;
      // console.log(this.selectedValueRendering );


      this.session_date = this.note_selected.session_date
        ? new Date(this.note_selected.session_date).toISOString()
        : '';

      this.session_length_morning_total = this.note_selected.session_length_morning_total;
      this.session_length_afternon_total = this.note_selected.session_length_afternon_total;
      this.session_length_total = this.note_selected.session_length_total;

      // this.selectedValueTimeIn = this.note_selected.time_in;
      // this.selectedValueTimeOut = this.note_selected.time_out;
      // this.selectedValueTimeIn2 = this.note_selected.time_in2;
      // this.selectedValueTimeOut2 = this.note_selected.time_out2;

      this.selectedValueTimeIn = this.formatTime(this.note_selected.time_in);
      this.selectedValueTimeOut = this.formatTime(this.note_selected.time_out);
      this.selectedValueTimeIn2 = this.formatTime(this.note_selected.time_in2);
      this.selectedValueTimeOut2 = this.formatTime(
        this.note_selected.time_out2
      );

      const noteServiceId = resp.noteBcba.pa_service_id;
      if (this.pa_services?.length && noteServiceId) {
        this.selectedPaService =
          this.pa_services.find((service) => service.id === noteServiceId) ||
          null;
      }

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;

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
      .getBipProfilePatient_id(this.patient_identifier)
      .subscribe((resp) => {
        console.log(resp);
        this.client_selected = resp.patient;

        this.first_name = this.client_selected.first_name;
        this.last_name = this.client_selected.last_name;
        this.patient_id = this.client_selected.id;
        this.patient_identifier = this.client_selected.patient_identifier;
        this.patientLocation_id = this.client_selected.location_id;
        this.insurance_id = resp.patient.insurer_id;
        this.insurance_identifier = resp.patient.insurance_identifier;
        // this.pos = JSON.parse(this.client_selected.pos_covered) ;
        this.pos = this.client_selected.pos_covered;
        this.insuranceData();
        this.getReplacementsByPatientId();
        this.pa_services = this.client_selected.pa_services;

        this.birth_date = this.client_selected.birth_date
        ? new Date(this.client_selected.birth_date).toISOString()
        : '';

      });
  }

  getReplacementsByPatientId() {
    this.noteBcbaService
      .showReplacementbyPatient(this.patient_identifier)
      .subscribe((resp) => {
        console.log(resp);
        this.familiEnvolments = resp.familiEnvolments;
        this.caregivers_training_goals =
          resp.familiEnvolments.data?.[0]?.caregivers_training_goals ?? [];
        this.monitoringEvaluatingPatientIds =
          resp.monitoringEvaluatingPatientIds;
        this.rbt_training_goals =
          resp.monitoringEvaluatingPatientIds.data?.[0]?.rbt_training_goals ??
          [];

        this.pa_assessments = resp.pa_assessments;
        /*
        const jsonObj = JSON.parse(this.pa_assessments) || '';
        this.pa_assessmentsgroup = jsonObj;
        this.n_un = this.pa_assessmentsgroup?.[0]?.n_units;
        */
        // this.unitsAsignated = this.pa_assessmentsgroup.n_units;
        console.log(this.pa_assessmentsgroup);
        // this.cpt = this.pa_assessmentsgroup[0].cpt;
        console.log(this.cpt);
      });
  }

  insuranceData() {
    this.insuranceService.get(this.insurer_id).subscribe((resp) => {
      console.log(resp);
      this.insurer_name = resp.insurer_name;
      // this.notes = resp.notes;
      this.services = resp.services;
    });
  }

  specialistData(selectedValueInsurer) {
    this.doctorService
      .showDoctorProfile(selectedValueInsurer)
      .subscribe((resp) => {
        // console.log(resp);
        this.provider_credential = resp.doctor.certificate_number;
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectSpecialist(event) {
    event = this.selectedValueProviderRBT_id;
    this.specialistData(this.selectedValueProviderRBT_id);
    console.log(this.selectedValueProviderRBT_id);
  }
  selectSpecialistBCBA(event) {
    event = this.selectedValueBcba_id;
    this.specialistData(this.selectedValueBcba_id);
    console.log(this.selectedValueBcba_id);
  }

  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
    this.recalculateSessionLength();
  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
    this.recalculateSessionLength();
  }
  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.recalculateSessionLength();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.recalculateSessionLength();
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

  speciaFirmaDataRbt(selectedValueRBT) {
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp) => {
      console.log(resp);
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        resp.doctor.electronic_signature;
      // console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      // this.notes = resp.notes;
      // this.services = resp.services;
    });
  }
  selectFirmaSpecialistRbt(event) {
    event = this.selectedValueProviderRBT_id;
    this.speciaFirmaDataRbt(this.selectedValueProviderRBT_id);
    // console.log(this.selectedValueRBT);
  }

  speciaFirmaDataBcba(selectedValueBCBA) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp) => {
        // console.log(resp);
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
        // console.log(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectFirmaSpecialistBcba(event) {
    event = this.selectedValueBcba_id;
    this.speciaFirmaDataBcba(this.selectedValueBcba_id);
    // console.log(this.selectedValueBCBA);
  }

  save() {
    this.text_validation = '';
    // if(!this.name||!this.email ||!this.surname ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }

    // if(this.password !== this.password_confirmation  ){
    //   this.text_validation = 'Las contraseña debe ser igual';
    //   return;
    // }

    const formData = new FormData();
    formData.append('patient_id', this.patient_id+'');
    formData.append('doctor_id', this.selectedValueProviderRBT_id+'');
    formData.append('bip_id', this.bip_id+'');
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('location', this.location);
    formData.append('birth_date', this.birth_date);
    formData.append('session_date', this.session_date);
    formData.append('patient_identifier', this.patient_identifier);
    formData.append('location_id', this.patientLocation_id + '');
    formData.append('insurance_id', this.insurance_id+''); // id del seguro preferiblemente que solo agarre la data al crear
    formData.append('insurance_identifier', this.insurance_identifier); // id del seguro preferiblemente que solo agarre la data al crear

    
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

    if (this.selectedValueRenderingProvider) {
      formData.append('rendering_provider', this.selectedValueRenderingProvider);
    }
    if (this.selectedValueAbaSupervisor) {
      formData.append('aba_supervisor', this.selectedValueAbaSupervisor.toString());
    }

    if (this.selectedValueProviderRBT_id) {
      formData.append('provider_id', this.selectedValueProviderRBT_id+'');
    }
    if (this.selectedValueBcba_id) {
      formData.append('supervisor_id', this.selectedValueBcba_id+'');
    }


    if (this.selectedValueCode) {
      formData.append('cpt_code', this.selectedValueCode);
    }
    if (this.selectedPaService) {
      formData.append('pa_service_id', this.selectedPaService.id.toString());
    
    }
    if (this.meet_with_client_at) {
      formData.append('meet_with_client_at', this.meet_with_client_at);
    }
   
    // if (this.note_description) {
    //   formData.append('note_description', this.note_description);
    // }
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
      .update(formData as any, this.note_selectedId)
      .subscribe((resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          // this.text_success = 'Employer created';
          // this.ngOnInit();
          Swal.fire('Updated', ` Note Rbt Updated`, 'success');
          this.router.navigate([AppRoutes.noteBcba.list, this.patient_identifier]);
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



  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
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



}
