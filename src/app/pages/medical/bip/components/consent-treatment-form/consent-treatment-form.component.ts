import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { ConsentToTreatmentService } from '../../service/consent-to-treatment.service';
import { AppUser } from 'src/app/core/models/users.model';
@Component({
  selector: 'app-consent-treatment-form',
  templateUrl: './consent-treatment-form.component.html',
  styleUrls: ['./consent-treatment-form.component.scss'],
})
export class ConsentTreatmentFormComponent implements OnInit, OnChanges {
  @Input() clientSelected: any;
  @Input() bipSelected: any;

  valid_form = false;
  valid_form_success = false;
  text_success = '';
  text_validation = '';

  client_id: any;
  user: AppUser;
  doctor_id: any;
  client_selected: any;
  patient_identifier: string;
  bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;

  analyst_signature_date = '';
  parent_guardian_signature_date = '';

  FILE_SIGNATURE_ANAYST: any;
  IMAGE_PREVISUALIZA_SIGNATURE_ANAYST = 'assets/img/user-06.jpg';
  IMAGE_PREVISUALIZA_SIGNATURE_ANAYST_CREATED = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_PARENT: any;
  IMAGE_PREVISUALIZA_SIGNATURE_PARENT = 'assets/img/user-06.jpg';
  IMAGE_PREVISUALIZA_SIGNATURE_PARENT_CREATED = 'assets/img/user-06.jpg';

  consentToTreatments: any;
  client_id_consentToTreatment: any;
  consentToTreatmentid: any;
  analyst_signature: any;
  parent_guardian_signature: any;

  constructor(
    private bipService: BipService,
    private consentToTreatmentService: ConsentToTreatmentService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      // this.getProfileBip(); // se solicita la info del perfil del usuario
      // this.getGoalbyPatient(); // se solicita la info del perfil del usuario
    });

    // this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del goal
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientSelected']) {
      this.handleClientSelectedChange();
      console.log('clientSelected changed:', this.clientSelected);
    }
    if (changes['bipSelected']) {
      this.handleBipSelectedChange();
      console.log('bipSelected changed:', this.bipSelected);
    }
  }

  private handleBipSelectedChange() {
    if (this.bipSelected) {
      this.bip_selected = this.bipSelected;
      this.bip_selectedId = this.bipSelected.id;
      this.bip_selectedIdd = this.bipSelected.bip.id;
    }
  }

  private handleClientSelectedChange() {
    if (this.clientSelected) {
      this.client_selected = this.clientSelected;
      this.client_id = this.clientSelected.patient.id;
      if (this.patient_identifier !== null) {
        this.getPatientConsentToTreatment(this.patient_identifier);
      }
    }
  }

  //obtenemos el perfil  del paciente por el id de la ruta
  // getProfileBip() {
  //   this.bipService.showBipProfile(this.patient_identifier).subscribe((resp) => {
  //     // console.log('profilebip', resp);
  //     this.client_selected = resp; //convertimos la respuesta en un variable

  //     this.client_id = this.client_selected.patient.id;
  //     if (this.patient_identifier !== null) {
  //       this.getPatientConsentToTreatment(this.patient_identifier);
  //     }
  //   });
  // }

  //obtenemos el bip por el id
  // getBip() {
  //   if (this.patient_identifier !== null && this.patient_identifier !== undefined) {
  //     this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
  //       // console.log('bip',resp);

  //       this.bip_selected = resp; //convertimos la respuesta en un variable
  //       this.bip_selected = resp; //convertimos la respuesta en un variable
  //       this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
  //       this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
  //     });
  //   }
  // }

  //obtenemos los tipo goals: sustituions del paciente por el patient_identifier si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientConsentToTreatment(patient_identifier) {
    this.consentToTreatmentService
      .getConsentToTreatmentbyPatientId(patient_identifier)
      .subscribe((resp) => {
        // console.log('goals sustition by patientid',resp);
        this.consentToTreatments = resp.consentToTreatmentPatientIds.data[0];
        this.consentToTreatmentid =
          resp.consentToTreatmentPatientIds.data[0]?.id;
        // console.log(this.consentToTreatments);

        this.client_id_consentToTreatment =
          resp.consentToTreatmentPatientIds.data[0]?.client_id;

        // this.parent_guardian_signature_date = this.consentToTreatments.parent_guardian_signature_date ? new Date(this.consentToTreatments.parent_guardian_signature_date).toISOString(): '';
        this.parent_guardian_signature_date =
          this.consentToTreatments?.parent_guardian_signature_date;
        // console.log(this.parent_guardian_signature_date);

        this.IMAGE_PREVISUALIZA_SIGNATURE_ANAYST_CREATED =
          this.consentToTreatments?.analyst_signature;

        // this.analyst_signature_date = this.consentToTreatments.analyst_signature_date ? new Date(this.consentToTreatments.analyst_signature_date).toISOString(): '';
        this.analyst_signature_date =
          this.consentToTreatments?.analyst_signature_date;
        // console.log(this.analyst_signature_date);

        this.IMAGE_PREVISUALIZA_SIGNATURE_PARENT_CREATED =
          this.consentToTreatments?.parent_guardian_signature;
      });
  }

  //funcion para la primera imagen.. funciona
  loadFile($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_ANAYST = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_SIGNATURE_ANAYST);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE_ANAYST = reader.result as string);
  }

  //funcion para la segunda  imagen.. no funciona
  loadFile1($event: any) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_PARENT = $event.target.files[0];
    // console.log(this.FILE_SIGNATURE_PARENT);
    const reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE_PARENT);
    reader2.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE_PARENT = reader2.result as string);
  }

  save() {
    this.text_validation = '';
    // if(!this.first_name ||!this.last_name || !this.patient_identifier ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }
    // this.valid_form = false;
    const formData = new FormData();

    formData.append(
      'parent_guardian_signature_date',
      this.parent_guardian_signature_date
    );
    formData.append('analyst_signature_date', this.analyst_signature_date);
    formData.append('patient_identifier', this.patient_identifier);
    formData.append('client_id', this.client_id);

    if (this.bip_selectedIdd) {
      formData.append('bip_id', this.bip_selectedIdd);
    }

    // condiciones para revisar si viene o no la foto
    formData.append('imagen', this.FILE_SIGNATURE_ANAYST);
    if (this.analyst_signature) {
      //
    }

    // condiciones para revisar si viene o no la foto... no funciona
    formData.append('imagenn', this.FILE_SIGNATURE_PARENT);
    if (this.parent_guardian_signature) {
      //
    }

    this.valid_form_success = false;
    this.text_validation = '';

    if (this.client_id_consentToTreatment && this.consentToTreatmentid) {
      this.consentToTreatmentService
        .createConsentToTreatment(formData)
        .subscribe((resp) => {
          // console.log(resp);
          if (resp.message === 403) {
            this.text_validation = resp.message_text;
          } else {
            Swal.fire(
              'Updated',
              `Consent To Treatment Updated successfully!`,
              'success'
            );
            this.ngOnInit();
          }
        });
    } else {
      this.consentToTreatmentService
        .createConsentToTreatment(formData)
        .subscribe((resp) => {
          // console.log(resp);
          if (resp.message === 403) {
            this.text_validation = resp.message_text;
          } else {
            // this.valid_form_success = true;
            Swal.fire(
              'Created',
              `Consent To Treatment Created successfully!`,
              'success'
            );
            this.ngOnInit();
          }
        });
    }
  }
}
