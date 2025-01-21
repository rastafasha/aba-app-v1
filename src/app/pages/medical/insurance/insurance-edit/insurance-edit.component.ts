import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../../../../core/services/insurances.service';
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

  name = '';

  notes = [];
  note: any;

  city: string;
  state: string;
  street: string;
  street2: string;
  zip: string;
  payer_id: number;
  is_self_subscriber: boolean;

  services = [];
  insurance_edit: any;
  note_edit: string;
  code: string;
  provider: string;
  description: string;
  unit_prize: number;
  hourly_fee: number;
  max_allowed: string;

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
    this.insuranceService.get(this.insurance_id).subscribe((resp) => {
      this.insurance_selected = resp;

      this.name = this.insurance_selected.insurance.name;
      // console.log(this.name);
      this.city = this.insurance_selected.insurance.city;
      this.state = this.insurance_selected.insurance.state;
      this.street = this.insurance_selected.insurance.street;
      this.street2 = this.insurance_selected.insurance.street2;
      this.zip = this.insurance_selected.insurance.zip;
      this.payer_id = this.insurance_selected.insurance.payer_id;
      this.is_self_subscriber =
        this.insurance_selected.insurance.is_self_subscriber;
      this.notes = this.insurance_selected.insurance.notes;
      this.services = this.insurance_selected.insurance.services;
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
    this.unit_prize = 0;
    this.hourly_fee = 0;
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
    this.insurance_edit = serv;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }
  seleccionarParaEdit(serv: any, i: number) {
    this.insurance_edit = serv;
    // console.log(this.insurance_edit);
  }
  cambiarNote(note: any, i: number) {
    this.note_edit = note;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }

  onSave() {
    this.text_validation = '';
    if (!this.name || !this.services) {
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    const data = {
      name: this.name,
      city: this.city,
      state: this.state,
      street: this.street,
      street2: this.street2,
      zip: this.zip,
      payer_id: this.payer_id,
      is_self_subscriber: this.is_self_subscriber,
      services: this.services,
      notes: this.notes,
    };

    this.insuranceService
      .update(data as any, this.insurance_id)
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
    // // throw new Error('Method not implemented');
    // this.code = '';
    // this.provider = '';
    // this.description = '';
    // this.unit_prize = 0;
    // this.hourly_fee = 0;
    // this.max_allowed = '';
  }
}
