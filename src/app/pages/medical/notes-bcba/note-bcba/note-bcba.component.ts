import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { InsuranceService } from '../../../../core/services/insurances.service';
import { NoteBcbaService } from '../../../../core/services/notes-bcba.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import {
  interventionsList, interventionsList2,
  newList,
  outcomeList, show97151List
} from '../listasSelectData';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PaServiceV2, PatientV2 } from 'src/app/core/models';
import { BipsV2Service } from 'src/app/core/services/bips.v2.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import {
  ValidationResult
} from '../interfaces';

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
  selectedValueAba!: string;
  selectedValueCode!: string;
  option_selected = 0;
  totalMinutos = 0;
  total_hour_session = '';

  selectedValueProviderRBT_id:number
  selectedValueBcba_id:number

  client_id: number;
  patient_id: number;
  patient_identifier: string ;
  doctor_id: string | number;
  patient_selected: any;
  client_selected: PatientV2;
  bip_id: string | number;
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

  token_economy= false;
    generalization= false;
    NCR= false;
    behavioral_momentum= false;
    DRA= false;
    DRI= false;
    DRO= false;
    DRL= false;
    response_block= false;
    errorless_teaching= false;
    extinction= false;
    chaining= false;
    natural_teaching= false;
    redirection= false;
    shaping= false;
    pairing= false;

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
  birth_date = '';
  rendering_provider: number;

  roles_rbt = [];
  roles_bcba = [];
  
  hours_days = [];
  specialists = [];
  maladaptives = [];
  replacementGoals = [];
  replacementList = [];
  replacements = [];

  intervention_added : object;
  intervention2_added : object;
  replacements_added :object;
  replacements2_added :object;
  intakeoutcome_added : object;
  newlist_added :object;
  behaviorsList_added :object;
  
  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  lto: any = null;
  caregiver_goal: any = null;
 
  
  pa_assessments: string;
  pa_assessmentsgroup = [];
  
  familiEnvolments = [];
  monitoringEvaluating = [];
  caregivers_training_goals = [];
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
  selectedPaService1: PaServiceV2 | null = null;
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

  demostrated= false;
  modifications_needed_at_this_time= false;
  cargiver_participation= false;
  was_the_client_present= false;

  interventionsSelected = {};

  interventionsList = interventionsList;
  interventionsList2 = interventionsList2;
  behaviorList :any[];
  newList = newList;
  outcomeList = outcomeList;
  show97151List = show97151List;
  objectives = [];
  obj_inprogress = [];

  constructor(
    private bipV2Service: BipsV2Service,
    private patientService: PatientMService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteBcbaService: NoteBcbaService,
    private doctorService: DoctorService,
    private locations: Location,
    private authService: AuthService,
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
  getPatient(){
    this.patientService.getPatientByPatientId(this.patient_identifier).subscribe((resp)=>{
      console.log('patient',resp);
      this.client_selected = resp.patient;
      this.patient_id = resp.patient.id;
      this.patientLocation_id = this.client_selected.location_id;
      this.patient_identifier = this.client_selected.patient_identifier;
      this.patientLocation_id = this.client_selected.location_id;
      this.insurance_id = this.client_selected.insurer_id;
      this.insurance_identifier = this.client_selected.insurance_identifier;

        this.diagnosis_code = this.client_selected.diagnosis_code;
        this.insurer_id = this.client_selected.insurer_id;

      this.selectedValueAba = resp.patient.clin_director_id;
      this.selectedValueRendering = resp.patient.bcba_id;
      this.selectedValueBCBA = resp.patient.clin_director_id;
      this.selectedValueRBT = resp.patient.bcba_id;

      this.pa_services = resp.patient.pa_services;
      this.start_date = resp.patient.start_date;
      this.end_date = resp.patient.end_date;


      //filtramos lo pa_services usando star_date y end_date comparado con el dia de hoy
      this.pa_services = this.pa_services.filter((pa) => {
        const dateStart = new Date(pa.start_date).getTime();
        const dateEnd = new Date(pa.end_date).getTime();
        const dateToday = new Date().getTime();
        return dateStart <= dateToday && dateEnd >= dateToday;
      });
      //devolvemos la respuesta da los pa_services disponibles
      this.getBipV2();
    })
  }

  getBipV2(){
    this.bipV2Service.list({client_id: this.patient_id}).subscribe((resp)=>{
      console.log('BIP',resp);
      this.bip_id = resp.data[0].id;
      this.caregivers_training_goals = resp.data[0].caregiver_trainings;
      
      this.behaviorList = resp.data[0].maladaptives;
      this.replacementList = resp.data[0].replacements;

      // Verificar la lista replacementList
      console.log('replacementList', this.replacementList);
  
      // Filtrar la lista replacementList por estado
      this.replacementList = this.replacementList.filter(goal => goal.status === 'active');

      // Recorrer la lista replacementList y extraemos los objectives
      this.objectives = this.replacementList.flatMap(objective => objective.objectives);
      console.log('Objetives', this.objectives );
      
      // filtrado los que estan en status in progress
      const objetivosEnProgreso = this.objectives.filter(objetivo => objetivo.status === "in progress");

      console.log(objetivosEnProgreso);
      this.obj_inprogress = objetivosEnProgreso;
      
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
    const timeIn1 = this.convertToMinutes(this.selectedValueTimeIn);
    const timeOut1 = this.convertToMinutes(this.selectedValueTimeOut);
    const timeIn2 = this.convertToMinutes(this.selectedValueTimeIn2);
    const timeOut2 = this.convertToMinutes(this.selectedValueTimeOut2);

    const totalMinutes = (timeOut1 - timeIn1) + (timeOut2 - timeIn2);
    const totalHours = this.convertToHours(totalMinutes);
    this.total_hour_session = totalHours;
}

convertToMinutes(time: string): number {
  if (!time || !time.includes(':')) {
    // console.error(`Invalid time format: ${time}`);
        return 0; // O manejar el error de otra manera
    }

    const [hours, minutes] = time.split(':').map(Number);

    // Validar que hours y minutes sean números válidos
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
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


  updateCaregiverGoal(id: number) {
    console.log(
      'Caregiver goal updated:',
      this.caregivers_training_goals[id]
    );
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
  onInterventions2Change(updatedInterventions2:object) {
    this.intervention2_added = updatedInterventions2;
  }

  onReplacementChange(updatedReplacements:object) {
    this.replacements_added = updatedReplacements;
  }
  onReplacement2Change(updatedReplacements2:object) {
    this.replacements2_added = updatedReplacements2;
  }
  
  onIntakeoutcomeChange(updatedIntakeoutcome: object) {
    this.intakeoutcome_added = updatedIntakeoutcome;
  }

  onNewListChange(updatedNewList:object) {
    this.newlist_added = updatedNewList;
  }

  onBehaviorChange(updatedbehaviorsList:object) {
    this.behaviorsList_added = updatedbehaviorsList;
  }

  save() {
    this.text_validation = '';
    if (
      // !this.rbt_training_goals ||
      // !this.caregivers_training_goals ||
      !this.meet_with_client_at ||
      !this.session_date
    )
    // {
    //   this.text_validation = 'All Fields (*) are required';
    //   return;
    // }
    if (!this.selectedValueAba) {
      // this.text_validation = 'ABA Supervisor must be selected';
      // return;
      Swal.fire(
        'Warning',
        'ABA Supervisor must be selected ',
        'warning'
      );
      return;
    }

    if (!this.selectedPaService) {
      // this.text_validation = 'Please select a service';
      // return;
      Swal.fire(
        'Warning',
        'Please select a service ',
        'warning'
      );
      return;
    }
    if (!this.meet_with_client_at) {
      // this.text_validation = 'Please select a POS';
      // return;
      Swal.fire(
        'Warning',
        'Please select a POS ',
        'warning'
      );
      return;
    }
    if (!this.session_date) {
      // this.text_validation = 'Please select a session date';
      // return;
      Swal.fire(
        'Warning',
        'Please select a session date ',
        'warning'
      );
      return;
    }

    const formData = new FormData();
    formData.append('summary_note', this.summary_note);

    formData.append('patient_id', this.patient_id + '');
    formData.append('patient_identifier', this.patient_identifier);
    formData.append('doctor_id', this.doctor_id + '');
    formData.append('bip_id', this.bip_id + '');

    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('location_id', this.patientLocation_id + '');
    formData.append('birth_date', this.birth_date);

    formData.append('rendering_provider', this.doctor_id + '');
    formData.append('provider_id', this.doctor_id + '');
    formData.append('supervisor_id', this.selectedValueAba + '');
    formData.append('aba_supervisor', this.selectedValueAba + '');
    formData.append('pa_service_id', this.selectedPaService.id.toString());
    formData.append('cpt_code', this.selectedPaService.cpt);
    formData.append('meet_with_client_at', this.meet_with_client_at);

    formData.append('provider_name', this.doctor_id + '');
    formData.append('supervisor_name', this.selectedValueBcba_id+'');

    formData.append('insurance_id', this.insurance_id+''); // id del seguro preferiblemente que solo agarre la data al crear
    formData.append('insurance_identifier', this.insurance_identifier); // id del seguro preferiblemente que solo agarre la data al crear

    formData.append('participants', this.participants);
    formData.append('environmental_changes', this.environmental_changes);

    formData.append(
      'rbt_training_goals',
      JSON.stringify(this.rbt_training_goals)
    );
   
    if (this.caregivers_training_goals) {
      formData.append(
        'caregiver_goals',
        JSON.stringify(this.caregivers_training_goals)
      );
    }
    if (this.intervention_added) {
      formData.append(
        'interventions',
        JSON.stringify(this.intervention_added)
      );
    }

    if (this.intervention2_added) {
      formData.append(
        'interventions2',
        JSON.stringify(this.intervention2_added)
      );
    }

    if (this.replacements_added) {
      formData.append(
        'replacements',
        JSON.stringify(this.replacements_added)
      );
    }

    if (this.replacements2_added) {
      formData.append(
        'replacements2',
        JSON.stringify(this.replacements2_added)
      );
    }

    if (this.newlist_added) {
      formData.append(
        'newlist_added',
        JSON.stringify(this.newlist_added)
      );
    }

    if (this.intakeoutcome_added) {
      formData.append(
        'intake_outcome',
        JSON.stringify(this.intakeoutcome_added)
      );
    }

    if (this.behaviorsList_added) {
      formData.append(
        'behaviors',
        JSON.stringify(this.behaviorsList_added)
      );
    }
   
    
    if (this.modifications_needed_at_this_time) {
      formData.append('modifications_needed_at_this_time', this.modifications_needed_at_this_time ? '1' : '0');
    }
    if (this.cargiver_participation) {
      formData.append('cargiver_participation', this.cargiver_participation ? '1' : '0');
    }
    if (this.was_the_client_present) {
      formData.append('was_the_client_present', this.was_the_client_present ? '1' : '0');
    }
    if (this.BCBA_conducted_assessments) {
      formData.append('BCBA_conducted_assessments', this.BCBA_conducted_assessments ? '1' : '0');
    }
    if (this.BCBA_conducted_client_observations) {
      formData.append('BCBA_conducted_client_observations', this.BCBA_conducted_client_observations ? '1' : '0');
    }
    if (this.additional_goals_or_interventions) {
      formData.append('additional_goals_or_interventions', this.additional_goals_or_interventions);
    }
    if (this.asked_and_clarified_questions_about_the_implementation_of) {
      formData.append('asked_and_clarified_questions_about_the_implementation_of', this.asked_and_clarified_questions_about_the_implementation_of);
    }
    if (this.reinforced_caregiver_strengths_in) {
      formData.append('reinforced_caregiver_strengths_in', this.reinforced_caregiver_strengths_in);
    }
    if (this.gave_constructive_feedback_on) {
      formData.append('gave_constructive_feedback_on', this.gave_constructive_feedback_on);
    }
    if (this.recomended_more_practice_on) {
      formData.append('recomended_more_practice_on', this.recomended_more_practice_on);
    }
    
    
    if (this.selectedPaService1) {
      formData.append('type', this.selectedPaService1.cpt.toString());
    }

    formData.append('session_date', this.session_date);

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

    formData.append('provider_signature', this.doctor.electronic_signature);

    if (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED) {
      formData.append(
        'supervisor_signature',
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED
      );
    }

    this.noteBcbaService.create(formData).subscribe((resp) => {

      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        this.text_success = 'Note BCBA created';
        Swal.fire('Created', ` Note BCBA Created`, 'success');
        this.router.navigate([AppRoutes.noteBcba.list, this.patient_identifier]);
      }
    });
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
        birthDate: this.birth_date || null,
        startTime: this.selectedValueTimeIn ? this.selectedValueTimeIn : null,
        endTime: this.selectedValueTimeOut ? this.selectedValueTimeOut : null,
        startTime2: this.selectedValueTimeIn2 ? this.selectedValueTimeIn2 : null,
        endTime2: this.selectedValueTimeOut2 ? this.selectedValueTimeOut2 : null,
        pos: this.getPos(this.meet_with_client_at),
        caregiverGoals: this.show97155 ? this.caregivers_training_goals.map((g) => ({
            goal: g.caregiver_goal,
            percentCorrect: g.porcent_of_correct_response,
        })) : [],
        rbtTrainingGoals: this.show97156 ? this.rbt_training_goals.map((g) => ({
            goal: g.lto,
            percentCorrect: g.porcent_of_correct_response,
        })) : [],
        noteDescription: this.note_description,
    };

    this.noteBcbaService.generateAISummary(data).subscribe(
        (response: any) => {
            this.summary_note = response.summary;
            this.isGeneratingSummary = false;
        },
        (error) => {
            console.error('Error generating AI summary:', error);
            Swal.fire('Error', 'Error generating AI summary. Please try again.', 'error');
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

    // Only validate caregiver goals if CPT code is 97156
    if (this.show97156) {
        if (!this.caregivers_training_goals || this.caregivers_training_goals.length === 0) {
            missingFields.push('Caregiver training goals');
        } else {
            const allCaregiverGoalsValid = this.caregivers_training_goals.every(
                (g) => g.caregiver_goal &&
                g.porcent_of_correct_response !== undefined &&
                g.porcent_of_correct_response !== null
            );
            if (!allCaregiverGoalsValid) {
                missingFields.push('Complete caregiver goal information (goals and percentages)');
            }
        }
    }

    // Only validate RBT goals if CPT code is 97155
    if (this.show97155) {
        if (!this.rbt_training_goals || this.rbt_training_goals.length === 0) {
            missingFields.push('RBT training goals');
        } else {
            const allRbtGoalsValid = this.rbt_training_goals.every(
                (g) => g.lto &&
                g.porcent_of_correct_response !== undefined &&
                g.porcent_of_correct_response !== null
            );
            if (!allRbtGoalsValid) {
                missingFields.push('Complete RBT goal information (goals and percentages)');
            }
        }
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

  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
      this.show97155 = false;
      this.show97156 = false;
      this.show97151 = false;
      this.show971511 = false;
      this.show971512 = false;

      if(service.cpt === '97155' ){
        this.show97155 = true;
      }
      if(service.cpt === '97156' ){
        this.show97156 = true;
      }
      if(service.cpt === '97151' ){
        this.show97151 = true;
      }
      this.checkPosWarning();
    }
  }

  onPaServiceSelect2(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
      
      this.show97151 = true;
      this.show971511 = false;
      this.show971512 = false;

      if(service.cpt === 'Observation' ){
        this.show971511 = true;
        this.show97151 = true;
      }
      if(service.cpt === 'Report' ){
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
}
