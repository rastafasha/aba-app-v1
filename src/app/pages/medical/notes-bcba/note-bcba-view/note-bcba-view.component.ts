import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { PatientsV2Service } from 'src/app/core/services';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { NotesBcbaV2Service } from '../../../../core/services/notes-bcba.v2.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { NoteBcbaV2 } from 'src/app/core/models/v2/note-bcba.v2.model';
import { PatientV2 } from 'src/app/core/models/v2/patient.v2.model';
import { calculateTimeDifference, convertToHours } from 'src/app/utils/time-functions';


@Component({
  selector: 'app-note-bcba-view',
  templateUrl: './note-bcba-view.component.html',
  styleUrls: ['./note-bcba-view.component.scss'],
})
export class NoteBcbaViewComponent implements OnInit {
  routes = AppRoutes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  // Core properties
  note_id!: number;
  note_selected!: NoteBcbaV2;
  patient_selected!: PatientV2;
  patient_identifier: string;
  patient_id: number;

  // View flags
  show97156 = false;
  show97155 = false;
  show97151 = false;
  show971511 = false;
  show971512 = false;

  // Signature images
  IMAGE_PREVISUALIZA_SIGNATURE__BCBA_CREATED = 'assets/img/user-06.jpg';
  IMAGE_PREVISUALIZA_SIGNATURE_SUPERVISOR_CREATED = 'assets/img/user-06.jpg';

  // Doctor information
  doctor_selected_full_name: string;
  doctor_selected_full_name_supervisor: string;

  // Time information
  morning_total_time: string;
  afternoon_total_time: string;
  total_time: string;
  fromParam: string | null = null;

  constructor(
    private noteBcbaService: NotesBcbaV2Service,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private doctorService: DoctorService,
    private patientService: PatientsV2Service,
    private locations: Location,
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
    this.activatedRoute.params.subscribe((resp) => {
      this.note_id = Number(resp['id']);
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.fromParam = params['from'];
    });
    this.getNote();
  }

  goBack() {
    this.locations.back();
  }

  print() {
    window.print();
  }

  getNote() {
    this.noteBcbaService.get(this.note_id).subscribe((resp) => {
      this.note_selected = resp.data;
      this.patient_identifier = this.note_selected.patient_identifier;
      this.patient_id = this.note_selected.patient_id;

      // Set up signatures if available
      if (this.note_selected.provider_signature) {
        this.IMAGE_PREVISUALIZA_SIGNATURE__BCBA_CREATED = this.note_selected.provider_signature;
      }
      if (this.note_selected.supervisor_signature) {
        this.IMAGE_PREVISUALIZA_SIGNATURE_SUPERVISOR_CREATED = this.note_selected.supervisor_signature;
      }

      // Get additional data
      this.getProfilePatient();
      this.getDoctor();
      this.getDoctorRbt();

      // Set view flags based on CPT code and type
      this.show97155 = this.note_selected.cpt_code === '97155';
      this.show97156 = this.note_selected.cpt_code === '97156';
      this.show971511 = this.note_selected.cpt_code === '97151' && this.note_selected.subtype.toLowerCase() === 'observation';
      this.show971512 = this.note_selected.cpt_code === '97151' && this.note_selected.subtype.toLowerCase() === 'report';

      this.morning_total_time = calculateTimeDifference(this.note_selected.time_in, this.note_selected.time_out);
      this.afternoon_total_time = calculateTimeDifference(this.note_selected.time_in2, this.note_selected.time_out2);
      this.total_time = convertToHours(this.note_selected.total_minutes);
      console.log(this.note_selected);
    });
  }

  getDoctor() {
    if (this.note_selected?.provider_id) {
      this.doctorService.showDoctor(this.note_selected.provider_id).subscribe((resp) => {
        this.doctor_selected_full_name = resp.user.full_name;
      });
    }
  }

  getDoctorRbt() {
    if (this.note_selected?.supervisor_id) {
      this.doctorService.showDoctor(this.note_selected.supervisor_id).subscribe((resp) => {
        this.doctor_selected_full_name_supervisor = resp.user.full_name;
      });
    }
  }

  getProfilePatient() {
    if (this.patient_id) {
      this.patientService.get(this.patient_id).subscribe((resp) => {
        this.patient_selected = resp.data;
      });
    }
  }

  convertToPdf(): void {
    const data = this.contentToConvert.nativeElement;

    html2canvas(data).then((canvas) => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

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

      pdf.save(`note_bcba_client_${this.patient_id}.pdf`);
    });
  }
}
