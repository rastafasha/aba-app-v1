import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PaServiceV2 } from 'src/app/core/models';
import { AppUser } from 'src/app/core/models/users.model';
import { PatientsV2Service } from 'src/app/core/services';
import { BipsV2Service } from 'src/app/core/services/bips.v2.service';
import { PaServicesV2Service } from 'src/app/core/services/pa-services.v2.service';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { NoteBcbaService } from '../../../../core/services/notes-bcba.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { interventionsList, interventionsListDoble, newList, outcomeList, show97151List } from '../listasSelectData';

interface Behavior {
  index: number;
  discused: boolean;
  name: string;
}
interface Replacement {
  index: number;
  name:string;
  assessed:boolean;
  modified:boolean;
}
interface Replacement1 {
  index: number;
  name:string;
  demostrated:boolean;
}

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

  show97156 = false;
  show97155 = false;
  show97151 = false;
  show971511 = false;
  show971512 = false;
  showPosWarning = false;
  text_success = '';
  text_validation = '';

  selectedValueProvider!: string;

  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  totalMinutos = 0;
  total_hour_session = '';
  participants = '';

  selectedValueRBT!: string;
  selectedValueRenderingProvider!: string;
  selectedValueProviderRBT_id!: number;

  selectedValueBCBA!: string;
  selectedValueAbaSupervisor!: string;
  selectedValueAbaSupervisor_id: number;
  selectedValueBcba_id!: number;

  selectedValueMaladaptive!: string;
  selectedValueCode!: string;
  selectedValueCode1!: string;
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
  replacements = [];
  behaviors = [];
  behaviorsview = [];
  interventionsgroup = [];
  interventionsgroup2 = [];

  intervention_added :object;
  intervention2_added :object;
  newlist_added :object;
  behaviorsList_added :object;
  intakeoutcome_added = [];
  replacements_added = [];
  replacements2_added = [];

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
  caregivers_training_goalsgroup :any = [];
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

  pa_services: PaServiceV2[] = [];
  selectedPaService: PaServiceV2 | null = null;
  selectedPaService1: PaService | null = null;
  projectedUnits = 0;

  provider: any = [];

  insurance_identifier: string;
  insurance_id: number;

  fromParam: string | null = null;

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

  interventionsList = interventionsList;
  interventionsListDoble = interventionsListDoble;
    newList = newList;
    outcomeList = outcomeList;
    show97151List = show97151List;
    behaviorList = this.behaviors;
    replacementList = this.replacements;
    replacementList2 = this.replacements;
    replacement2 : any[];

    noteServiceId:number;

    objectives = [];
  obj_inprogress = [];
  obj_inprogress1 = [];

  constructor(
    private bipService: BipService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteBcbaService: NoteBcbaService,
    private doctorService: DoctorService,
    private locations: Location,
    private authService: AuthService,
    private bipV2Service: BipsV2Service,
    private patientService: PatientsV2Service,
    private paServicesService: PaServicesV2Service,
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((resp) => {
      this.note_id = resp['id'];
    });

    this.ativatedRoute.queryParams.subscribe(params => {
      this.fromParam = params['from'];
    });

    this.getConfig();
    this.getNote(); 
    this.user = this.authService.user as AppUser;
    this.doctor_id = this.user.id;
  }



  goBack() {
    this.locations.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.noteBcbaService.listConfigNote().subscribe((resp) => {
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
      this.note_selectedId = this.note_selected.id;
      this.bip_id = this.note_selected.bip_id;
      this.location = this.note_selected.location;
      this.patient_id = this.note_selected.patient_id;

      this.getPatient();

      this.selectedPaService1 = this.note_selected.type;
      this.selectedValueCode = this.note_selected.cpt_code;
      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.participants = this.note_selected.participants;
      this.environmental_changes = this.note_selected.environmental_changes;

      this.selectedValueRBT = this.note_selected.provider.name;
      this.selectedValueProviderRBT_id =this.note_selected.provider_id;

      this.selectedValueBCBA = this.note_selected.supervisor.name;
      this.selectedValueBcba_id =this.note_selected.supervisor_id;
      this.BCBA_conducted_assessments= this.note_selected.BCBA_conducted_assessments;
      this.BCBA_conducted_client_observations= this.note_selected.BCBA_conducted_client_observations;
      
      this.cargiver_participation= this.note_selected.cargiver_participation;
      this.was_the_client_present= this.note_selected.was_the_client_present;
      this.asked_and_clarified_questions_about_the_implementation_of= this.note_selected.asked_and_clarified_questions_about_the_implementation_of;
      this.reinforced_caregiver_strengths_in= this.note_selected.reinforced_caregiver_strengths_in;
      this.gave_constructive_feedback_on= this.note_selected.gave_constructive_feedback_on;
      this.recomended_more_practice_on= this.note_selected.recomended_more_practice_on;

      this.modifications_needed_at_this_time= this.note_selected.modifications_needed_at_this_time;
      this.additional_goals_or_interventions= this.note_selected.additional_goals_or_interventions;
      
      this.summary_note=this.note_selected.summary_note;

      this.session_date = this.note_selected.session_date
        ? new Date(this.note_selected.session_date).toISOString()
        : '';

      this.session_length_morning_total = this.note_selected.session_length_morning_total;
      this.session_length_afternon_total = this.note_selected.session_length_afternon_total;

      this.selectedValueTimeIn = this.formatTime(this.note_selected.time_in);
      this.selectedValueTimeOut = this.formatTime(this.note_selected.time_out);
      this.selectedValueTimeIn2 = this.formatTime(this.note_selected.time_in2);
      this.selectedValueTimeOut2 = this.formatTime(
        this.note_selected.time_out2
      );

      this.noteServiceId = this.note_selected.pa_service_id;
      // if (this.pa_services?.length && this.noteServiceId) {
      //   this.selectedPaService =
      //     this.pa_services.find((service) => service.id === this.noteServiceId) ||
      //     null;
      // }

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;

      if(this.note_selected.cpt_code === '97155' ){
        this.show97155 = true;
      }
      if(this.note_selected.cpt_code === '97156' ){
        this.show97156 = true;
      }
      if(this.note_selected.cpt_code === '97151' ){
        this.show97151 = true;
      }

      if( this.note_selected.cpt_code === '97151' && this.note_selected.type === 'Observation' ){
        this.show971511 = true;
        this.show97151 = true;
      }
      if(this.note_selected.cpt_code === '97151' && this.note_selected.type === 'Report' ){
        this.show971512 = true;
        this.show97151 = true;
      }

      this.newlist_added=this.note_selected.newlist_added;
      this.intakeoutcome_added=this.note_selected.intake_outcome;
      this.interventionsList = this.note_selected.interventions;
      this.interventionsListDoble = this.note_selected.interventions2;

      this.newList = this.note_selected?.newlist_added;
      this.outcomeList = this.note_selected?.intake_outcome;

      this.behaviorList = this.note_selected?.behaviors;

      this.obj_inprogress = this.note_selected.replacements;
      this.obj_inprogress1 = this.note_selected.replacements2;

      this.caregivers_training_goals = resp.caregiver_goals;

      
        if (this.caregivers_training_goals && typeof this.caregivers_training_goals === 'string') {
          try {
            const jsonObj90 = JSON.parse(this.caregivers_training_goals);
            this.caregivers_training_goalsgroup = jsonObj90;
          } catch (error) {
            console.error('Error parsing caregivers_training_goalsgroup:', error);
            this.caregivers_training_goalsgroup = {};
          }
        } else {
          this.caregivers_training_goalsgroup = {};
        }


      // this.getBipv2();

    });
  }

  getPatient(){
    this.patientService.get(this.patient_id).subscribe((resp)=>{
      this.client_selected = resp.data;
      this.first_name = resp.data.first_name;
      this.last_name = resp.data.last_name;
      this.patient_identifier = resp.data.patient_identifier;
      this.diagnosis_code = resp.data.diagnosis_code;
      this.birth_date = resp.data.birth_date;
      this.insurance_id = this.client_selected.insurer_id;
      this.insurance_identifier = this.client_selected.insurance_identifier;
      this.patientLocation_id = this.client_selected.location_id;
      
      this.paServicesService.get( this.noteServiceId, this.patient_id).subscribe((resp)=>{
       this.selectedPaService = resp.data;
        this.selectedValueCode = this.selectedPaService.cpt;
        this.pa_services = [this.selectedPaService];
        
      });
    })
  }

  getBipv2(){
    this.bipV2Service.get(this.bip_id).subscribe((resp)=>{
      console.log('BIP',resp);
      this.bip_id = resp.data.id;
      this.caregivers_training_goals = resp.data.caregiver_trainings;
      // this.behaviorList = resp.data.maladaptives;
      this.replacementList = resp.data.replacements;
      this.replacementList2 = resp.data.replacements;


    // objectives
    
    // Filtrar la lista replacementList por estado
    this.replacementList = this.replacementList.filter(goal => goal.status === 'active');

    // Recorrer la lista replacementList y extraemos los objectives
    this.objectives = this.replacementList.flatMap(objective => objective.objectives);
    // filtrado los que estan en status in progress
    const objetivosEnProgreso = this.objectives.filter(objetivo => objetivo.status === "in progress");
    // this.obj_inprogress = objetivosEnProgreso;
    // this.obj_inprogress1 = objetivosEnProgreso;
      
      //fin objectives


      this.note_selected.behaviors = this.note_selected.behaviors || {};
       // Convierte behaviors en un array de valores
       const behaviorsArray = Object.values(this.note_selected.behaviors) as Behavior[];
       //muestro el resultado de la nota 
      console.log('behaviors:', this.note_selected.behaviors);
      //filtro los behaviors 
      const newBehaviors = this.behaviors.map((element) => {
        // Add null check for element.mal
        const behavior = behaviorsArray.find(
          (behavior) => behavior.name === element.name
        );
      
        if (behavior) {
          return {
            index: element.index,
            name: element.name,
            discused: behavior ? behavior.discused : false,
          };
        } else {
          console.warn(`Behavior with index ${element.index} not found.`);
          return {
            index: element.index,
            name: '', // Provide a default value
            discused: undefined,
          };
        }
      });
      //los uno con el resultado que trae la nota
      const mergedBehaviors = newBehaviors.map((behavior, index) => {
        const noteBehavior = this.note_selected.behaviors[behavior.index];
        return {
          ...behavior,
          name: behavior.name || '', // Provide a default value
          discused: noteBehavior ? noteBehavior.discused : behavior.discused,
        };
      });
      
      console.log('Merged Behaviors:', mergedBehaviors);
      this.behaviorsview = mergedBehaviors;
      console.log(this.behaviorsview);


      //   //replacements 1 valor

    // // Convierte replacements en un array de valores
    // const replacements1Array = Object.values(this.note_selected?.replacements) as Replacement1[];

    // // Muestra el resultado de la nota
    // console.log('replacements:', this.note_selected?.replacements);

    
    //filtro los replacements 
    // const newReplacements1 = this.replacements.map((element) => {
    //   if (!element || !element.id || !element.name) {
    //     console.warn('Invalid replacements element:', element);
    //     return null;
    // }
    //   const replacement1 = replacements1Array.find(
    //     (replacement1) => replacement1.name === element.name
    //   );
    
    //   if (replacement1) {
    //     return {
    //       id: element.id,
    //       name: element.name,
    //       demostrated: replacement1 ? replacement1.demostrated : false,
    //     };
    //   } else {
    //     console.warn(`replacements with id ${element.id} not found.`);
    //     return {
    //       id: element.id,
    //       name: '', // Provide a default value
    //       demostrated: undefined,
    //     };
    //   }
    // });
    //   //los uno con el resultado que trae la nota
    //   const mergedReplacements1 = newReplacements1.map((replacement1, id) => {
    //     const noteReplacement = this.note_selected?.replacements[replacement1.id];
    //     return {
    //       ...replacement1,
    //       name: replacement1.name || '', // Provide a default value
    //       demostrated: noteReplacement ? noteReplacement.demostrated : replacement1.demostrated,
    //     };
    //   });
    
    //   console.log('Merged Replacements1:', mergedReplacements1);
    //   this.replacementsview1 = mergedReplacements1;
    //   console.log(this.replacementsview1);
      
    })
  }


  private convertToInterventions(input: { [x: string]: boolean }) {
    if (!input) {
      return [];
    }
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
      { id: 'behavioral_momentum', name: 'Behavioral Momentum', 
        value: input['Behavioral Momentum'] || false 
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

  private convertToInterventions2(input: { [x: string]: boolean }) {
    if (!input) {
      return [];
    }
    return [
      {
        id: 'token_economy',
        name: 'Token Economy',
        value: input['token_economy'] || false,
        value2: input['token_economy'] || false,
      },
      {
        id: 'generalization',
        name: 'Generalization',
        value: input['generalization'] || false,
        value2: input['generalization'] || false,
      },
      { id: 'NCR', name: 'NCR', 
        value: input['NCR'] || false ,
        value2: input['NCR'] || false ,
      },
      { id: 'behavioral_momentum', name: 'Behavioral Momentum', 
        value: input['behavioral_momentum'] || false ,
        value2: input['behavioral_momentum'] || false 
      },
      { id: 'DRA', name: 'DRA',
         value: input['DRA'] || false,
         value2: input['DRA'] || false
         },
      { id: 'DRI', name: 'DRI',
         value: input['DRI'] || false,
         value2: input['DRI'] || false
         },
      { id: 'DRO', name: 'DRO',
         value: input['DRO'] || false,
         value2: input['DRO'] || false
         },
      { id: 'DRL', name: 'DRL',
         value: input['DRL'] || false,
         value2: input['DRL'] || false
         },
      
      {
        id: 'response_block',
        name: 'Response Block',
        value: input['response_block'] || false,
        value2: input['response_block'] || false,
      },
      {
        id: 'errorless_teaching',
        name: 'Errorless Teaching',
        value: input['errorless_teaching'] || false,
        value2: input['errorless_teaching'] || false,
      },
      {
        id: 'extinction',
        name: 'Extinction',
        value: input['extinction'] || false,
        value2: input['extinction'] || false,
      },
      { id: 'chaining', name: 'Chaining', 
        value: input['chaining'] || false, 
        value2: input['chaining'] || false, 
      },
      {
        id: 'natural_teaching',
        name: 'Natural Teaching',
        value: input['natural_teaching'] || false,
        value2: input['natural_teaching'] || false,
      },
      {
        id: 'redirection',
        name: 'Redirection',
        value: input['redirection'] || false,
        value2: input['redirection'] || false,
      },
      { id: 'shaping', name: 'Shaping', 
        value: input['shaping'] || false,
        value2: input['shaping'] || false,
       },
      { id: 'pairing', name: 'Pairing', 
        value: input['pairing'] || false,
        value2: input['pairing'] || false,
       },
    ];
  }

  
  private convertToInterventionsGroup2(
    interventions2: { id: string; name: string; value: boolean; value2: boolean }[]
  ) {
    const group = {};
    for (const intervention of interventions2) {
      if (intervention.value) {
        group[intervention.id] = true;
      }
      if (intervention.value2) {
        group[intervention.id] = true;
      }
    }
    return group;
  }

  

  // getProfileBip(noteServiceId?: number) {
  //   console.log('Getting profile BIP:', {
  //     noteServiceId,
  //     availableServices: this.pa_services,
  //   });
  //   this.bipV2Service
  //     .get(this.bip_id)
  //     .subscribe((resp) => {
  //       console.log(resp);
  //       // this.bip = resp.data[0];

  //       // this.first_name = this.client_selected.first_name;
  //       // this.last_name = this.client_selected.last_name;
  //       // this.patient_id = this.client_selected.id;
  //       // this.patient_identifier = this.client_selected.patient_identifier;
  //       // this.patientLocation_id = this.client_selected.location_id;
  //       // this.insurance_identifier = resp.patient.insurance_identifier;
  //       // this.insurance_id = resp.patient.insurer_id;
  //       // this.pos = this.client_selected.pos_covered;

  //       this.getReplacementsByPatientId();
  //       this.pa_services = this.client_selected.pa_services;

        
  //     //devolvemos la respuesta da los pa_services disponibles
  //       // if (noteServiceId) {
  //       //   this.setPaService(noteServiceId);
  //       // }
  //       this.birth_date = this.client_selected.birth_date
  //       ? new Date(this.client_selected.birth_date).toISOString()
  //       : '';
  //     });
  // }

  

  // private setPaService(noteServiceId: number) {
  //   if (this.pa_services?.length && noteServiceId) {
  //     this.selectedPaService =
  //       this.pa_services.find((service) => service.id === noteServiceId) || null;
  //     if (this.selectedPaService) {
  //       this.selectedValueCode = this.selectedPaService.cpt;
  //     }
  //   }
  // }

  

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

  private formatTime(timeString: string | null): string {
    // console.log('formatting time: ', timeString);
    if (!timeString) return '';
    const [hours, minutes] = timeString.replace(/ /g, '').split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
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
      
    });
  }
  selectFirmaSpecialistRbt(event) {
    event = this.selectedValueProviderRBT_id;
    this.speciaFirmaDataRbt(this.selectedValueProviderRBT_id);
    
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


  onInterventionsChange(updatedInterventions) {
    // this.interventionsgroup = [
    //   this.convertToInterventionsGroup(this.interventionsList),
    // ];
    this.intervention_added = updatedInterventions;
  }
  
  onInterventions2Change(updatedInterventions2) {
    // this.interventionsgroup2 = [
    //   this.convertToInterventionsGroup2(this.interventionsListDoble),
    // ];
    this.intervention2_added = updatedInterventions2;
  }

  onReplacementChange(updatedReplacements) {
    this.replacements_added = updatedReplacements;
  }
  onReplacement2Change(updatedReplacements2) {
    this.replacements2_added = updatedReplacements2;
  }
  
  onIntakeoutcomeChange(updatedIntakeoutcome) {
    this.intakeoutcome_added = updatedIntakeoutcome;
  }
  onNewListChange(updatedNewList) {
    this.newlist_added = updatedNewList;
  }
  onBehaviorChange(updatedbehaviorsList:object) {
    this.behaviorsList_added = updatedbehaviorsList;
  }

  

  // eslint-disable-next-line no-debugger
  save() {debugger
    this.text_validation = '';

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
    if (this.selectedValueCode1) {
      formData.append('type', this.selectedValueCode1);
    }
    if (this.selectedPaService) {
      formData.append('pa_service_id', this.selectedPaService.id.toString());

    }
    if (this.meet_with_client_at) {
      formData.append('meet_with_client_at', this.meet_with_client_at);
    }

    if (this.participants) {
      formData.append('participants', this.participants);
    }
    if (this.environmental_changes) {
      formData.append('environmental_changes', this.environmental_changes);
    }

    // if (this.rbt_training_goals) {
    //   formData.append(
    //     'rbt_training_goals',
    //     JSON.stringify(this.rbt_training_goals)
    //   );
    // }
    if (this.caregivers_training_goals) {
      formData.append(
        'caregiver_goals',
        JSON.stringify(this.caregivers_training_goals)
      );
    }
    //variaciones nota bcba
    if (this.interventionsList) {
      formData.append(
        'interventions',
        JSON.stringify(this.interventionsList)
      );
    }

    if (this.interventionsListDoble) {
      formData.append(
        'interventions2',
        JSON.stringify(this.interventionsListDoble)
      );
    }

    // if (this.replacements_added) {
    //   formData.append(
    //     'replacements',
    //     JSON.stringify(this.replacements_added)
    //   );
    // }

    // if (this.replacements2_added) {
    //   formData.append(
    //     'replacements2',
    //     JSON.stringify(this.replacements2_added)
    //   );
    // }

    if (this.obj_inprogress) {
      formData.append(
        'replacements',
        JSON.stringify(this.obj_inprogress)
      );
    }

    if (this.obj_inprogress1) {
      formData.append(
        'replacements2',
        JSON.stringify(this.obj_inprogress1)
      );
    }

    if (this.newList) {
      formData.append(
        'newlist_added',
        JSON.stringify(this.newlist_added)
      );
    }

    if (this.outcomeList) {
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
    
    //variaciones nota bcba

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
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          Swal.fire('Updated', ` Note Rbt Updated`, 'success');
          this.router.navigate([AppRoutes.noteBcba.list, this.patient_identifier]);
        }
      });
  }

  
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
    const type = event.value;
    if (type) {
      this.selectedValueCode1 = type.cpt;
      
      this.show97151 = true;
      this.show971511 = false;
      this.show971512 = false;

      if(type.cpt === 'Observation' ){
        this.show971511 = true;
        this.show97151 = true;
      }
      if(type.cpt === 'Report' ){
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
