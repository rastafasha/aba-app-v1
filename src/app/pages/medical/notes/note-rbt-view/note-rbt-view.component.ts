import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AppUser } from 'src/app/shared/models/users.models';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { NoteRbtService } from '../services/note-rbt.service';

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
  patient_id: any;
  // option_selected:number = 0;

  selectedValueProvider!: string;
  selectedValueRBT!: string;
  selectedValueBCBA!: string;
  selectedValueTimeIn!: number;
  selectedValueTimeOut!: number;
  selectedValueTimeIn2!: number;
  selectedValueTimeOut2!: number;
  selectedValueProviderName!: string;
  selectedValueMaladaptive!: string;

  client_id: any;
  doctor_id: any;
  doctor_selected: any;
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
  note_selectedId: any;
  statusNote: any;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  maladaptives = [];
  replacementGoals = [];
  intervention_added = [];
  replacements = [];
  interventionsgroup = [];

  maladaptivegroup = [];
  replacementgroup = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  doctor_selected_full_name: any = null;
  doctor_selected_rbt: any = null;
  doctor_selected_full_name_rbt: any = null;
  doctor_selected_bcba: any = null;
  doctor_selected_full_name_bcba: any = null;

  constructor(
    private noteRbtService: NoteRbtService,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private pageService: PageService,
    private bipService: BipService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.pageService.onInitPage();
    this.doctorService.getUserRoles();

    this.activatedRoute.params.subscribe((resp) => {
      // console.log(resp);
      this.note_id = resp['id'];
    });
    this.getConfig();
    this.getNote();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.noteRbtService.listConfigNote().subscribe((resp) => {
      console.log(resp);
    });
  }

  getNote() {
    this.noteRbtService.getNote(this.note_id).subscribe((resp) => {
      console.log(resp);
      this.note_selected = resp.noteRbt;
      this.note_selectedId = resp.noteRbt.id;
      this.patient_id = this.note_selected.patient_id;
      this.bip_id = this.note_selected.bip_id;
      this.statusNote = this.note_selected.status;

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.client_response_to_treatment_this_session =
        this.note_selected.client_response_to_treatment_this_session;

      this.interventions = resp.interventions;
      const jsonObj = JSON.parse(this.interventions) || '';
      this.interventionsgroup = jsonObj;
      // console.log(this.interventionsgroup);

      this.pairing = this.interventionsgroup[0].pairing;
      this.response_block = this.interventionsgroup[0].response_block;
      this.DRA = this.interventionsgroup[0].DRA;
      this.DRO = this.interventionsgroup[0].DRO;
      this.redirection = this.interventionsgroup[0].redirection;
      this.errorless_teaching = this.interventionsgroup[0].errorless_teaching;
      this.NCR = this.interventionsgroup[0].NCR;
      this.shaping = this.interventionsgroup[0].shaping;
      this.chaining = this.interventionsgroup[0].chaining;
      this.token_economy = this.interventionsgroup[0].token_economy;
      this.extinction = this.interventionsgroup[0].extinction;
      this.natural_teaching = this.interventionsgroup[0].natural_teaching;

      this.maladaptive = resp.maladaptives;
      const jsonObj1 = JSON.parse(this.maladaptive) || '';
      this.maladaptivegroup = jsonObj1;
      // console.log(this.maladaptivegroup);

      this.replacement = resp.replacements; // ?
      const jsonObj2 = JSON.parse(this.replacement) || '';
      this.replacementgroup = jsonObj2;
      // console.log(this.replacementgroup);

      this.pos = this.note_selected.pos_covered;

      this.environmental_changes = this.note_selected.environmental_changes;
      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.progress_noted_this_session_compared_to_previous_session =
        this.note_selected.progress_noted_this_session_compared_to_previous_session;

      this.rbt_modeled_and_demonstrated_to_caregiver =
        this.note_selected.rbt_modeled_and_demonstrated_to_caregiver;
      this.replacement = this.note_selected.replacement;

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

      this.session_length_total = this.note_selected.session_length_total;
      this.session_length_total2 = this.note_selected.session_length_total2;

      this.selectedValueTimeIn = this.note_selected.time_in;
      this.selectedValueTimeOut = this.note_selected.time_in2;
      this.selectedValueTimeIn2 = this.note_selected.time_out;
      this.selectedValueTimeOut2 = this.note_selected.time_out2;

      this.selectedValueProviderName = this.note_selected.provider_name_g;
      this.provider_name = this.note_selected.provider_name;

      this.selectedValueRBT = this.note_selected.provider_name;
      this.selectedValueBCBA = this.note_selected.supervisor_name;

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;
      console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      console.log(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);

      this.getProfileBip();
      this.getDoctor();
      this.getDoctorBcba();
      this.getDoctorRbt();
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

  getProfileBip() {
    this.bipService
      .getBipProfilePatient_id(this.patient_id)
      .subscribe((resp) => {
        console.log(resp);
        this.patient_selected = resp.patient;

        this.first_name = this.patient_selected.first_name;
        this.last_name = this.patient_selected.last_name;
        this.patient_id = resp.patient.patient_id;
        // console.log(this.patient_id);
        this.diagnosis_code = this.patient_selected.diagnosis_code;
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
      pdf.save('note_rbt_client_' + this.patient_selected.patient_id + '.pdf');
      // pdf.save('note_rbt_client_'+this.patient_selected.patient_id+'_'+this.patient_selected.last_name+".pdf");
    });
  }
  //convertToPdf(): void {
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
