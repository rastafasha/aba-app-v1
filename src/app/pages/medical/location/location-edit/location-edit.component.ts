import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { LocationService } from '../services/location.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.scss'],
})
export class LocationEditComponent {
  routes = AppRoutes;
  location_id: any;
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

  location_selected: any;

  FILE_AVATAR: any;
  IMAGE_PREVISUALIZA: any = 'assets/img/user-06.jpg';

  valid_form = false;
  valid_form_success = false;
  text_validation: any = null;
  text_success: any = null;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private insuranceService: InsuranceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe((resp) => {
      this.location_id = resp['id'];
    });
    this.showLocation();
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

  showLocation() {
    this.locationService.getLocation(this.location_id).subscribe((resp) => {
      console.log(resp);
      this.location_selected = resp.location;

      // this.selectedValueLocation = this.location_selected.locations.id;

      this.title = this.location_selected.title;
      this.email = this.location_selected.email;
      this.phone1 = this.location_selected.phone1;
      this.phone2 = this.location_selected.phone2;
      this.telfax = this.location_selected.telfax;
      this.zip = this.location_selected.zip;
      this.email = this.location_selected.email;
      this.address = this.location_selected.address;
      this.city = this.location_selected.city;
      this.state = this.location_selected.state;
      this.IMAGE_PREVISUALIZA = this.location_selected.avatar;
    });
  }

  //files

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

  //files
  //update function
  save() {
    this.text_validation = '';
    if (!this.title || !this.address) {
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    // this.valid_form = false;
    const formData = new FormData();
    if (this.title) {
      formData.append('title', this.title);
    }
    if (this.phone1) {
      formData.append('phone1', this.phone1);
    }
    if (this.phone2) {
      formData.append('phone2', this.phone2);
    }
    if (this.telfax) {
      formData.append('telfax', this.telfax);
    }
    if (this.address) {
      formData.append('address', this.address);
    }
    if (this.email) {
      formData.append('email', this.email);
    }
    if (this.zip) {
      formData.append('zip', this.zip);
    }
    if (this.city) {
      formData.append('city', this.city);
    }
    if (this.state) {
      formData.append('state', this.state);
    }

    if (this.FILE_AVATAR) {
      formData.append('imagen', this.FILE_AVATAR);
    }

    this.valid_form_success = false;
    this.text_validation = '';

    this.locationService
      .editLocation(formData, this.location_id)
      .subscribe((resp) => {
        // console.log(resp);
        if (resp.message === 403) {
          this.text_validation = resp.message_text;
        } else {
          // this.text_success = "El location se ha actualizado";
          Swal.fire('Updated', ` Location Has updated`, 'success');
          this.router.navigate([AppRoutes.location.list]);
        }
      });
  }
  //update function
}
