import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../service/insurance.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { PageService } from 'src/app/shared/services/pages.service';
@Component({
  selector: 'app-insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.scss'],
})
export class InsuranceEditComponent {
  routes = AppRoutes;
  selectedValue!: string;
  option_selected = 1;

  insurer_name = '';

  notes = [];
  note: any;

  services = [];
  maladaptive_edit: any;
  note_edit: any;
  code: any;
  provider: any;
  description: any;
  unit_prize: any;
  hourly_fee: any;
  max_allowed: any;

  insurance_id: any;
  insurance_selected: any;

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  constructor(
    private pageService: PageService,
    private insuranceService: InsuranceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
    this.activatedRoute.params.subscribe((resp) => {
      // console.log(resp);
      this.insurance_id = resp['id'];
    });

    this.getConfig();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.insuranceService.showInsurance(this.insurance_id).subscribe((resp) => {
      // console.log(resp);
      this.insurance_selected = resp;

      this.insurer_name = this.insurance_selected.insurer_name;
      this.notes = this.insurance_selected.notes;
      this.services = this.insurance_selected.services;
    });
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }

  addService() {
    this.services.push({
      code: this.code,
      provider: this.provider,
      description: this.description,
      unit_prize: this.unit_prize,
      hourly_fee: this.unit_prize * 4,
      max_allowed: this.max_allowed,
    });
    this.code = '';
    this.provider = '';
    this.description = '';
    this.unit_prize = '';
    this.hourly_fee = '';
    this.max_allowed = '';
  }

  deleteService(i: any) {
    this.services.splice(i, 1);
  }
  addNotes() {
    this.notes.push({
      note: this.note,
    });
    this.note = '';
  }

  deleteNote(i: any) {
    this.notes.splice(i, 1);
  }

  cambiarStatus(serv: any, i: number) {
    this.maladaptive_edit = serv;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }
  seleccionarParaEdit(serv: any, i: number) {
    this.maladaptive_edit = serv;
    // console.log(this.maladaptive_edit);
  }
  cambiarNote(note: any, i: number) {
    this.note_edit = note;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }

  save() {
    this.text_validation = '';
    if (!this.insurer_name || !this.services) {
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    const data = {
      insurer_name: this.insurer_name,
      services: this.services,
      notes: this.notes,
    };

    this.insuranceService
      .editInsurance(data, this.insurance_id)
      .subscribe((resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          // this.text_success = 'El insurance ha sido registrado correctamente';
          Swal.fire('Updated', ` Insurance Has updated`, 'success');
          this.router.navigate([AppRoutes.insurance.list]);
        }
      });
  }
  closeReload() {
    throw new Error('Method not implemented');
  }
}
