import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GeneralizationTrainingService } from '../../service/generalization-training.service';
import { AppUser } from 'src/app/core/models/users.model';

@Component({
  selector: 'app-generalization-training',
  templateUrl: './generalization-training.component.html',
  styleUrls: ['./generalization-training.component.scss'],
})
export class GeneralizationTrainingComponent {
  valid_form_success = false;
  text_validation = '';
  text_success = '';

  generalization: any;
  risk_assestment: any;
  discharge_plan: any;

  phase: any;
  description: any;

  generalizations = [];
  caregivers = [];

  client_id: any;
  user: AppUser;
  doctor_id: any;
  client_selected: any;
  patient_identifier: string;
  bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;
  maladaptives: any;

  generalizationTrainings: any;
  client_id_generalizations: any;
  generalizationTrainingid: any;
  generalizationid: any;

  family_edit = [];

  constructor(
    private bipService: BipService,
    private generalizationTrainingService: GeneralizationTrainingService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
      // this.getGoalbyPatient(); // se solicita la info del perfil del usuario
    });

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del goal
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
  }

  //obtenemos el perfil  del paciente por el id de la ruta
  getProfileBip() {
    this.bipService.showBipProfile(this.patient_identifier).subscribe((resp) => {
      // console.log('profilebip', resp);
      this.client_selected = resp; //convertimos la respuesta en un variable

      this.client_id = this.client_selected.patient.id;
      if (this.patient_identifier !== null) {
        this.getPatientGoalFamilyEnvolments(this.patient_identifier);
      }
    });
  }

  //obtenemos el bip por el id
  getBip() {
    if (this.patient_identifier !== null && this.patient_identifier !== undefined) {
      this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
        // console.log('bip',resp);

        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives = this.bip_selected.maladaptives; //convertimos la respuesta en un variable
      });
    }
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_identifier si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalFamilyEnvolments(patient_identifier) {
    this.generalizationTrainingService
      .getGeneralizationTrainingbyPatientId(patient_identifier)
      .subscribe((resp) => {
        // console.log('goals sustition by patientid',resp);
        this.generalizationTrainings =
          resp.generalizationTrainingPatientIds.data;
        this.generalizationTrainingid =
          resp.generalizationTrainingPatientIds.data[0]?.id;
        this.caregivers =
          resp.generalizationTrainingPatientIds.data[0]?.recomendation_lists;
        this.generalization =
          resp.generalizationTrainingPatientIds.data[0]?.generalization;
        this.risk_assestment =
          resp.generalizationTrainingPatientIds.data[0]?.risk_assestment;
        this.discharge_plan =
          resp.generalizationTrainingPatientIds.data[0]?.discharge_plan;
        this.generalizations =
          resp.generalizationTrainingPatientIds.data[0]?.transition_fading_plans;

        this.client_id_generalizations =
          resp.generalizationTrainingPatientIds.data[0]?.client_id;
        // this.goals = resp.goalReductionPatientIds;
        // console.log(this.goals);
      });
  }

  addDocument() {

    if (this.generalizations) {
      this.generalizations.push({
        phase: this.phase,
        description: this.description,
      });
    } else {
      this.generalizations = [
        {
          phase: this.phase,
          description: this.description,
        },
      ];
    }

    this.phase = '';
    this.description = '';
  }

  deleteDocument(i: any) {
    this.generalizations.splice(i, 1);
  }

  cambiarStatusSto(generalization: any, i: number) {
    this.family_edit = generalization;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }

  save() {
    this.text_validation = '';
    if (!this.discharge_plan || !this.generalizations) {
      this.text_validation = 'All Fields (*) are required';
      return;
    }

    const data = {
      id: this.generalizationTrainingid,
      bip_id: this.bip_selectedIdd,
      patient_identifier: this.patient_identifier,
      client_id: this.client_id,
      generalization: this.generalization,
      discharge_plan: this.discharge_plan,
      risk_assestment: this.risk_assestment,
      transition_fading_plans: this.generalizations,
    };

    if (this.client_id_generalizations && this.generalizationTrainingid) {
      this.generalizationTrainingService
        .editGeneralizationTraining(data, this.generalizationTrainingid)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Goal Updated'
          Swal.fire(
            'Updated',
            `Generalization Training Updated successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    } else {
      this.generalizationTrainingService
        .createGeneralizationTraining(data)
        .subscribe((resp) => {
         
          this.generalizationid = resp.id;
          // this.text_success = 'Goal created successfully!'
          Swal.fire(
            'Created',
            `Generalization Training Created successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    }
  }
}
