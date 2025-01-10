import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { NoteBcbaService } from '../../../../core/services/notes-bcba.service';
import { Supervisor } from 'src/app/core/models/notes.model';
import { 
  NoteIntervention, 
  NoteNewList,
  NoteOutcomeList,
  NoteBehaviorsList,
  NoteIntervention2,
} from '../interfaces';
import { PatientsV2Service } from 'src/app/core/services';



@Component({
  selector: 'app-note-bcba-view',
  templateUrl: './note-bcba-view.component.html',
  styleUrls: ['./note-bcba-view.component.scss'],
})
export class NoteBcbaViewComponent implements OnInit {
  routes = AppRoutes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  patientProfile: any[];
  option_selected = 1;
  patient_id: number;
  patient_identifier: string;
  // option_selected:number = 0;

  showFamily = false;
  showMonitoring = false;

  show97156 = false;
  show97155 = false;
  show97151 = false;
  show971511 = false;
  show971512 = false;

  selectedValueProvider!: string;
  selectedValueRBT!: string;
  selectedValueBCBA!: string;
  selectedValueTimeIn!: number;
  selectedValueTimeOut!: number;
  selectedValueTimeIn2!: number;
  selectedValueTimeOut2!: number;
  selectedValueProviderName!: string;
  selectedValueMaladaptive!: string;
  selectedValueAba!: string;
  selectedValueRendering!: number;

  client_id: any;
  doctor_id: any;
  patient_selected: any;
  client_selected: any;
  note_selected: any;
  bip_id: any;
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

  public FILE_SIGNATURE_RBT: any;
  public IMAGE_PREVISUALIZA_SIGNATURE__BCBA_CREATED = 'assets/img/user-06.jpg';
  public FILE_SIGNATURE_BCBA: any;
  public IMAGE_PREVISUALIZA_SIGNATURE_SUPERVISOR_CREATED =
    'assets/img/user-06.jpg';

  rbt_id: any;
  bcba_id: any;
  maladaptivename: any;
  replacementName: any;
  note_rbt_id: any;
  goal: any;
  note_id: any;
  note_selectedId: any;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  behaviors = [];
  replacementGoals = [];
  intervention_added = [];
  replacements = [];
  replacements2 = [];
  newlist_added = [];
  intake_outcome = [];
  interventionsgroup = [];

  maladaptivegroup = [];
  replacementgroup = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;

  note_description: any;
  caregivers_training_goals = [];
  rbt_training_goals = [];
  rbt_training_goalsgroup: any;
  caregivers_training_goalsgroup: any;
  aba_supervisor: number;

  location: any;
  birth_date: any;
  porcent_of_occurrences = 0;
  porcent_of_correct_response = 0;
  lto: any = null;
  caregiver_goal: any = null;
  cpt_code: any = null;
  type: string = null;
  doctor_selected: any = null;
  doctor_selected_full_name: any = null;
  doctor_selected_rbt: any = null;
  doctor_selected_full_name_supervisor: any = null;
  doctor_selected_bcba: any = null;
  doctor_selected_full_name_bcba: any = null;
  pa_assessments: string;
  pa_assessmentsgroup = [];

  fromParam: string | null = null;

  intervention: NoteIntervention = {
    token_economy: false,
    generalization: false,
    NCR: false,
    behavioral_momentum: false,
    DRA: false,
    DRI: false,
    DRO: false,
    DRL: false,
    response_block: false,
    errorless_teaching: false,
    extinction: false,
    chaining: false,
    natural_teaching: false,
    redirection: false,
    shaping: false,
    pairing: false,
  };
  interventions2: NoteIntervention2 = {
    token_economy: false,
    generalization: false,
    NCR: false,
    behavioral_momentum: false,
    DRA: false,
    DRI: false,
    DRO: false,
    DRL: false,
    response_block: false,
    errorless_teaching: false,
    extinction: false,
    chaining: false,
    natural_teaching: false,
    redirection: false,
    shaping: false,
    pairing: false,
  };
  newlist: NoteNewList = {
    FAST: false,
    MAST: false,
    QABF: false,
    ABC_data_collection: false,
    VBmapp: false,
    Ablls: false,
    EFL: false,
    Peak: false,
    parent_interview: false,
    reinforcement_questionnaire: false,
    preference_assessment: false,
    other: false,
  };
  outcomeList: NoteOutcomeList = {
    SRS_2: false,
    vineland_3: false,
    PDDBI: false,
    PSI_4_short_form: false,
  };
  behaviorsList: NoteBehaviorsList = {
    maladaptive_behavior: '',
  };

  constructor(
    private noteBcbaService: NoteBcbaService,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private doctorService: DoctorService,
    private bipService: BipService,
    private patientService: PatientsV2Service,
    private locations: Location
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
    this.activatedRoute.params.subscribe((resp) => {
      this.note_id = resp['id'];
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.fromParam = params['from'];
    });

    this.getConfig();
    this.getNote();
  }

  goBack() {
    this.locations.back(); // <-- go back to previous location on cancel
  }
  print() {
    window.print();
    }


  getConfig() {
    this.noteBcbaService.listConfigNote().subscribe((resp) => {
      // console.log(resp);
    });
  }

  getNote() {
    this.noteBcbaService.getNote(this.note_id).subscribe((resp) => {
      console.log(resp, 'resp');
      this.note_selected = resp.noteBcba;
      this.note_selectedId = resp.noteBcba.id;
      this.patient_identifier = this.note_selected.patient_identifier;
      this.patient_id = this.note_selected.patient_id;
      this.bip_id = this.note_selected.bip_id;
      this.location = this.note_selected.location;
      // this.birth_date = this.note_selected.birth_date;
      this.birth_date = this.note_selected.birth_date
        ? new Date(this.note_selected.birth_date).toISOString()
        : '';

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.diagnosis_code = this.note_selected.diagnosis_code;
      this.cpt_code = this.note_selected.cpt_code;
      this.type = this.note_selected.type;
      this.note_description = this.note_selected.note_description;
      this.client_response_to_treatment_this_session =
        this.note_selected.client_response_to_treatment_this_session;
      this.pos = this.note_selected.pos;
      

      this.session_length_total = this.note_selected.session_length_total;
      this.session_length_total2 = this.note_selected.session_length_total2;

      this.selectedValueTimeIn = this.note_selected.time_in;
      this.selectedValueTimeOut = this.note_selected.time_in2;
      this.selectedValueTimeIn2 = this.note_selected.time_out;
      this.selectedValueTimeOut2 = this.note_selected.time_out2;

      this.caregivers_training_goalsgroup = this.note_selected.caregiver_goals;
      const jsonObj = typeof this.caregivers_training_goalsgroup === 'string' ? JSON.parse(this.caregivers_training_goalsgroup) : this.caregivers_training_goalsgroup;
      this.caregivers_training_goals = jsonObj;
      // console.log(this.caregivers_training_goals);

      this.rbt_training_goalsgroup = this.note_selected.rbt_training_goals;
      const jsonObj1 = typeof this.rbt_training_goalsgroup === 'string' ? JSON.parse(this.rbt_training_goalsgroup) : this.rbt_training_goalsgroup;
      this.rbt_training_goals = jsonObj1;
      // console.log(this.rbt_training_goals);

      this.aba_supervisor = resp.noteBcba.supervisor_id;
      this.selectedValueRendering = resp.noteBcba.provider_id;

      this.selectedValueProviderName = this.note_selected.provider_name_g;
      this.selectedValueRBT = this.note_selected.provider_name;
      this.selectedValueBCBA = this.note_selected.supervisor_name;

      this.IMAGE_PREVISUALIZA_SIGNATURE__BCBA_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_SUPERVISOR_CREATED =
        this.note_selected.supervisor_signature;

      this.getProfilePatient();

      //para traer datos del doctor usado
      this.getDoctor();
      this.getDoctorRbt();
      // this.getDoctorBcba();

      if(this.cpt_code === '97155' ){
        this.show97155 = true;
      }
      if(this.cpt_code === '97156' ){
        this.show97156 = true;
      }
      if(this.type === 'Observation' ){
        this.show971511 = true;
      }
      if(this.type === 'Report' ){
        this.show971512 = true;
      }

      this.behaviors = this.note_selected.behaviors;
      this.interventions = this.note_selected.interventions;
      this.interventions2 = this.note_selected.interventions2;
      this.replacements = this.note_selected.replacements;
      this.replacements2 = this.note_selected.replacements2;
      this.newlist_added = this.note_selected.newlist_added;
      this.intake_outcome = this.note_selected.intake_outcome;
    });
  }

  getDoctor() {
    this.doctorService
      .showDoctor(this.selectedValueRendering)
      .subscribe((resp) => {
        // console.log(resp);
        this.doctor_selected = resp.user;
        this.doctor_selected_full_name = resp.user.full_name;
      });
  }

  getDoctorRbt() {
    this.doctorService.showDoctor(this.aba_supervisor).subscribe((resp) => {
      // console.log(resp);
      this.doctor_selected_rbt = resp.user;
      this.doctor_selected_full_name_supervisor = resp.user.full_name;
    });
  }
  getDoctorBcba() {
    this.doctorService.showDoctor(this.selectedValueBCBA).subscribe((resp) => {
      // console.log(resp);
      this.doctor_selected_bcba = resp.user;
      this.doctor_selected_full_name_bcba = resp.user.full_name;
    });
  }

  getProfilePatient() {
    this.patientService.get(this.patient_id).subscribe((resp) => {
        this.patient_selected = resp.data;
      });
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }

  convertToPdf(): void {
    const data = this.contentToConvert.nativeElement;

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create a new PDF document
      const pdf = new jspdf.jsPDF('p', 'mm');
      let position = 0;

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save('note_bcba_client_' + this.patient_selected.patient_id + '.pdf');
      // pdf.save('note_rbt_client_'+this.patient_selected.patient_id+'_'+this.patient_selected.last_name+".pdf");
    });
  }
  // convertToPdf(): void {
  //   const data = this.contentToConvert.nativeElement;
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 695;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;

  //     // Create a new PDF document
  //     const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

  //     // Add an image of the canvas to the PDF
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

  //     // Save the PDF
  //     pdf.save('note_rbt_client_'+this.patient_selected.patient_id+".pdf");
  //     // pdf.save('note_rbt_client_'+this.patient_selected.patient_id+'_'+this.patient_selected.last_name+".pdf");
  //   });
  // }
}
