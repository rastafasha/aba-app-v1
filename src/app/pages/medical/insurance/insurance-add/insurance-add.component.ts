import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../../../../core/services/insurances.service';
import { Location } from '@angular/common';
import { PageService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-insurance-add',
  templateUrl: './insurance-add.component.html',
  styleUrls: ['./insurance-add.component.scss'],
})
export class InsuranceAddComponent {
  routes = AppRoutes;
  selectedValue!: string;

  name = '';
  notes = [];
  note: any;

  services = [];
  code: any;
  provider: any;
  description: any;
  unit_prize: any;
  hourly_fee: any;
  max_allowed: any;

  city: string;
  state: string;
  street: string;
  street2: string;
  zip: string;
  payer_id: number;
  is_self_subscriber: boolean;

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  constructor(
    private pageService: PageService,
    private insuranceService: InsuranceService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
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
      is_self_subscriber: this.is_self_subscriber,
      services: this.services,
      notes: this.notes,
    };

    this.insuranceService.create(data).subscribe((resp) => {
      // console.log(resp);

      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        this.text_success = 'El insurance ha sido registrado correctamente';

        this.router.navigate([AppRoutes.insurance.list]);
      }
    });
  }
}
