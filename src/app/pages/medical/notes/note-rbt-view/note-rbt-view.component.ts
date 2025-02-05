import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import { NoteRbtV2, PatientV2 } from 'src/app/core/models';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { NoteRbtService } from '../../../../core/services/notes-rbt.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { NotesRbtV2Service } from 'src/app/core/services/notes-rbt.v2.service';
import { calculateTimeDifference } from 'src/app/utils/time-functions';
import { convertToHours } from 'src/app/utils/time-functions';
import { BipsV2Service } from 'src/app/core/services/bips.v2.service';
import { PatientsV2Service } from 'src/app/core/services/patients.v2.service';

interface NoteIntervention {
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
}

@Component({
  selector: 'app-note-rbt-view',
  templateUrl: './note-rbt-view.component.html',
  styleUrls: ['./note-rbt-view.component.scss'],
})
export class NoteRbtViewComponent implements OnInit {
  routes = AppRoutes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  patientProfile: any[];
  option_selected = 1;
  patient_identifier: string;
  patient_id: number;
  // option_selected:number = 0;

  morning_total_time: string;
  afternoon_total_time: string;
  total_time: string;

  selectedValueProvider;
  selectedValueRBT;
  selectedValueBCBA;
  selectedValueTimeIn;
  selectedValueTimeOut;
  selectedValueTimeIn2;
  selectedValueTimeOut2;
  selectedValueProviderName;
  selectedValueMaladaptive;

  client_id: number;
  doctor_id: number;
  doctor_selected: any;
  patient_selected: PatientV2;
  client_selected: PatientV2;
  note_selected: NoteRbtV2;
  bip_id: number;
  user: AppUser;

  provider_name_g = '';
  provider_credential = '';
  session_date = '';
  time_in = '';
  time_out = '';
  time_in2 = '';
  time_out2 = '';
  session_length_total;
  session_length_total2;
  environmental_changes;

  sumary_note = '';
  meet_with_client_at = '';
  client_appeared = '';
  as_evidenced_by = '';
  rbt_modeled_and_demonstrated_to_caregiver = '';
  client_response_to_treatment_this_session = '';
  progress_noted_this_session_compared_to_previous_session = '';
  next_session_is_scheduled_for = '';
  provider_name;
  supervisor_name;

  number_of_occurrences = 0;
  number_of_correct_responses = 0;
  total_trials = 0;
  number_of_correct_response = 0;
  maladaptive = '';
  maladaptive_behavior = '';
  interventions: any;
  provider_signature: any;
  supervisor_signature: any;

  FILE_SIGNATURE_RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED: any = 'assets/img/user-06.jpg';

  rbt_id: any;
  bcba_id: any;
  maladaptivename: any;
  replacementName: any;
  note_rbt_id: any;
  goal: any;
  note_id: any;
  statusNote: any;
  insurance_identifier: string;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  replacementGoals = [];
  intervention_added = [];
  interventionsBase: string[] = [];

  interventionsgroup;

  maladaptivegroup = [];
  replacementgroup = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  doctor_selected_full_name: any = null;
  doctor_selected_rbt: any = null;
  doctor_selected_full_name_rbt: any = null;
  doctor_selected_bcba: any = null;
  doctor_selected_full_name_bcba: any = null;

  fromParam: string | null = null;

  JSON = JSON;

  constructor(
    private noteRbtService: NoteRbtService,
    private noteRbtV2Service: NotesRbtV2Service,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private pageService: PageService,
    private location: Location,
    private bipV2Service: BipsV2Service,
    private patientV2Service: PatientsV2Service
  ) {}
  ngOnInit(): void {
    this.pageService.onInitPage();

    this.activatedRoute.params.subscribe((resp) => {
      this.note_id = resp['id'];
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.fromParam = params['from'];
    });

    this.getConfig();
    this.getNote();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  print() {
    window.print();
  }

  getConfig() {
    this.noteRbtService.listConfigNote().subscribe((resp) => {
      console.log(resp);
    });
  }

  getNote() {
    this.noteRbtV2Service.get(this.note_id).subscribe((resp) => {
      this.note_selected = resp.data as unknown as NoteRbtV2;
      console.log('noteRbt', this.note_selected);
      this.patient_identifier = this.note_selected.patient_identifier;
      this.bip_id = this.note_selected.bip_id;
      this.statusNote = this.note_selected.status;

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      // this.insurance_identifier = this.note_selected.insurance_identifier;
      this.client_appeared = this.note_selected.client_appeared;
      this.client_response_to_treatment_this_session =
        this.note_selected.client_response_to_treatment_this_session;

      this.environmental_changes = this.note_selected.environmental_changes;
      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.progress_noted_this_session_compared_to_previous_session =
        this.note_selected.progress_noted_this_session_compared_to_previous_session;

      this.rbt_modeled_and_demonstrated_to_caregiver =
        this.note_selected.rbt_modeled_and_demonstrated_to_caregiver;

      // this.session_date = this.note_selected.session_date;
      this.session_date = this.note_selected.session_date
        ? new Date(this.note_selected.session_date).toISOString()
        : '';
      // this.next_session_is_scheduled_for = this.note_selected.next_session_is_scheduled_for;
      this.next_session_is_scheduled_for = this.note_selected
        .next_session_is_scheduled_for
        ? new Date(
            this.note_selected.next_session_is_scheduled_for
          ).toISOString()
        : '';

      this.morning_total_time = calculateTimeDifference(this.note_selected.time_in, this.note_selected.time_out);
      this.afternoon_total_time = calculateTimeDifference(this.note_selected.time_in2, this.note_selected.time_out2);
      this.total_time = convertToHours(this.note_selected.total_minutes);

      this.selectedValueTimeIn = this.note_selected.time_in;
      this.selectedValueTimeOut = this.note_selected.time_in2;
      this.selectedValueTimeIn2 = this.note_selected.time_out;
      this.selectedValueTimeOut2 = this.note_selected.time_out2;

      this.selectedValueProviderName = this.note_selected.provider_id;
      this.provider_name = this.note_selected.provider_name;

      this.selectedValueRBT = this.note_selected.provider_id;
      this.selectedValueBCBA = this.note_selected.supervisor_id;

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;

      // this.getProfileBip();
      this.getDoctor();
      this.getDoctorBcba();
      this.getDoctorRbt();

      this.getBipV2();
      this.getPatientV2();
    });
  }

  getDoctor() {
    this.doctorService
    .showDoctor(this.selectedValueProviderName)
    .subscribe((resp) => {
      console.log(resp);
      this.doctor_selected = resp.user;
      this.doctor_selected_full_name = resp.user.full_name;
    });
  }

  getDoctorRbt() {
    this.doctorService.showDoctor(this.selectedValueRBT).subscribe((resp) => {
      console.log(resp);
      this.doctor_selected_rbt = resp.user;
      this.doctor_selected_full_name_rbt = resp.user.full_name;
    });
  }
  getDoctorBcba() {
    this.doctorService.showDoctor(this.selectedValueBCBA).subscribe((resp) => {
      console.log(resp);
      this.doctor_selected_bcba = resp.user;
      this.doctor_selected_full_name_bcba = resp.user.full_name;
    });
  }

  getBipV2() {
    this.bipV2Service.get(this.bip_id).subscribe((resp) => {
      this.interventionsBase = resp.data.interventions
        .map((intervention) => intervention.title);
    });
  }

  getPatientV2() {
    this.patientV2Service.get(this.patient_id).subscribe((resp) => {
      this.patient_selected = resp.data;
    });
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }

  convertToPdf(): void {
    const data = this.contentToConvert.nativeElement;
    // Create a new PDF document
    const pdf = new jspdf.jsPDF('p', 'px');
    pdf.html(data, {
      html2canvas: {
        windowWidth: 1920,
        scale: 0.3,
        ignoreElements: (element) => {
          // Ignore elements with class 'd-print-none'
          return element.classList.contains('d-print-none');
        },
      },
      margin: [10, 10, 10, 10],
      callback: (pdf) =>
        pdf.save(
          'note_rbt_client_' + this.patient_selected.id + '.pdf'
        ),
    });
  }
}
