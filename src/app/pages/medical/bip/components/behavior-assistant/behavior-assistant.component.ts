import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-behavior-assistant',
  templateUrl: './behavior-assistant.component.html',
  styleUrls: ['./behavior-assistant.component.scss'],
})
export class BehaviorAssistantComponent {
  valid_form_success = false;
  text_validation: string = '';
  text_success: string = '';

  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;

  behaviors: any[] = [];

  client_id: any;
  user: any;
  doctor_id: any;
  client_selected: any;
  patient_id: any;
  bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;
  maladaptives: any;

  goalFamilyEnvolments: any;
  client_id_goalFamilyEnvolments: any;
  goalFamilyEnvolmentid: any;
  goalFamilyid: any;

  constructor(private ativatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // window.scrollTo(0, 0);//inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp: any) => {
      this.client_id = resp.id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
    });
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
  }

  addDocument() {
    this.behaviors.push({
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
    });
    this.monday = '';
    this.tuesday = '';
    this.wednesday = '';
    this.thursday = '';
    this.friday = '';
    this.saturday = '';
  }

  deleteDocument(i: any) {
    this.behaviors.splice(i, 1);
  }
}
