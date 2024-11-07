import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../../../../core/services/insurances.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { LocationService } from '../services/location.service';
import { Location } from '@angular/common';
import { PageService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss'],
})
export class LocationAddComponent {
  routes = AppRoutes;
  client_id: any;
  doctor_id: any;
  selectedValueLocation!: number;

  title = '';
  phone1 = '';
  phone2 = '';
  telfax = '';
  zip = '';
  state = '';
  email = '';
  city: any;
  address = '';

  FILE_AVATAR: any;
  IMAGE_PREVISUALIZA: any = 'assets/img/user-06.jpg';

  valid_form = false;
  valid_form_success = false;
  text_validation: any = null;

  constructor(
    private locationService: LocationService,
    private pageService: PageService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
    this.getConfig();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.locationService.listConfig().subscribe((resp) => {
      console.log(resp);
    });
  }

  loadFile($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }

  save() {
    this.text_validation = '';
    if (!this.title || !this.address) {
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    // this.valid_form = false;
    const formData = new FormData();

    formData.append('title', this.title);
    formData.append('phone1', this.phone1);
    formData.append('phone2', this.phone2);
    formData.append('telfax', this.telfax);
    formData.append('city', this.city);
    formData.append('state', this.state);
    formData.append('zip', this.zip);
    formData.append('address', this.address);
    formData.append('email', this.email);

    if (this.email) {
      formData.append('email', this.email);
    }
    if (this.FILE_AVATAR) {
      formData.append('imagen', this.FILE_AVATAR);
    }

    this.valid_form_success = false;
    this.text_validation = '';

    this.locationService.storeLocation(formData).subscribe((resp) => {
      // console.log(resp);
      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        this.router.navigate([AppRoutes.location.list]);
        // this.ngOnInit();
      }
    });
  }
}
