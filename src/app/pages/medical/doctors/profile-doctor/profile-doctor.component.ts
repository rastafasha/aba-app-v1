import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { DoctorService } from '../service/doctor.service';
import { AppUser } from 'src/app/shared/models/users.models';
import { PageService } from 'src/app/shared/services/pages.service';
@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.scss'],
})
export class ProfileDoctorComponent {
  routes = AppRoutes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  option_selected = 1;
  doctorProfile: any[];

  doctor_id: any;

  num_appointment = 0;
  money_of_appointments = 0;
  num_appointment_pendings = 0;
  doctor_selected: any;
  patient_id: any;
  maladaptive_behavior: any;
  graphData: any;
  maladaptives: any;
  total_notes_bips: number;
  total_notes_bcbas: number;
  total_notes_rbts: number;
  appointment_pendings = [];
  appointments = [];
  notes_bcbas = [];
  notes_rbts = [];
  patients = [];
  locations = [];
  name = '';
  surname = '';
  mobile = '';
  email = '';
  address = '';
  password = '';
  password_repeat = '';

  text_success = '';
  text_validation = '';

  user: AppUser;
  role: string = null;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
    this.activatedRoute.params.subscribe((resp) => {
      // console.log(resp);
      this.doctor_id = resp['id'];
    });
    this.getDoctor();

    this.user = this.authService.user as AppUser;
    this.role = this.user.roles[0];
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  isPermission(permission: string) {
    if (this.user.roles.includes('SUPERADMIN')) {
      return true;
    }
    if (this.user.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  getDoctor() {
    this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp) => {
      console.log(resp);
      this.doctor_selected = resp.doctor;
      this.locations = resp.doctor.locations.data;
      console.log(this.locations);
      // this.num_appointment= resp.num_appointment;
      // this.money_of_appointments= resp.money_of_appointments;
      // this.num_appointment_pendings= resp.num_appointment_pendings;
      // this.appointment_pendings= resp.appointment_pendings.data;
      // this.appointments= resp.appointments;

      this.name = this.doctor_selected.name;
      this.surname = this.doctor_selected.surname;
      this.mobile = this.doctor_selected.mobile;
      this.email = this.doctor_selected.email;
      this.address = this.doctor_selected.address;
      this.notes_bcbas = resp.notes_bcbas;
      this.notes_rbts = resp.notes_rbts;
      this.patients = resp.patients;
      this.total_notes_bips = resp.total_notes_bips;
      this.total_notes_bcbas = resp.total_notes_bcbas;
      this.total_notes_rbts = resp.total_notes_rbts;
    });
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }

  update() {
    this.text_validation = '';
    this.text_success = '';
    if (!this.name || !this.email || !this.surname) {
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    if (this.password) {
      if (this.password !== this.password_repeat) {
        this.text_validation = 'Las contraseña debe ser igual';
        return;
      }
    }

    const data = {
      name: this.name,
      surname: this.surname,
      mobile: this.mobile,
      email: this.email,
      address: this.address,
      password: undefined,
    };

    if (this.password) {
      data.password = this.password;
    }
    this.doctorService
      .editDoctorProfile(data, this.doctor_id)
      .subscribe((resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
          Swal.fire('Error', resp.message_text, 'warning');
        } else {
          // this.text_success = 'User info updated';
          Swal.fire('Updated', ` User info updated`, 'success');
          this.ngOnInit();
        }
      });
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
      pdf.save(
        'employee_' +
          this.doctor_selected.name +
          '_' +
          this.doctor_selected.surname +
          '.pdf'
      );
    });
  }
}
