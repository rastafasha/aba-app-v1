import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalFamilyEnvolmentService } from '../../service/goal-family-envolment.service';

@Component({
  selector: 'app-family-involvement-goal-form',
  templateUrl: './family-involvement-goal-form.component.html',
  styleUrls: ['./family-involvement-goal-form.component.scss'],
})
export class FamilyInvolvementGoalFormComponent implements OnInit {
  valid_form_success = false;
  text_validation = '';
  text_success = '';
  @Input() clientSelected: any;
  caregiver_goal: any;
  outcome_measure: any;
  criteria: any;
  initiation: Date;
  end_date: Date;
  current_status: any;
  caregivers_training_goals = [];
  caregivers = [];
  family_edit = [];

  client_id: any;
  user: AppUser;
  doctor_id: any;
  client_selected: any;
  patient_identifier: string;
  bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;
  maladaptives: any;

  maladaptive_edit = [];

  goalFamilyEnvolments: any;
  client_id_goalFamilyEnvolments: any;
  goalFamilyEnvolmentid: any;
  goalFamilyid: any;
  selectedCaregiver: any = {};

  constructor(
    private bipService: BipService,
    private goalFamilyEnvolmentService: GoalFamilyEnvolmentService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      // this.getProfileBip(); // se solicita la info del perfil del usuario
    });

    this.getBip(); // se solicita la info del perfil del bip
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientSelected']) {
      this.handleClientSelectedChange();
      console.log('clientSelected changed:', this.clientSelected);
    }
  }

  private handleClientSelectedChange() {
    if (this.clientSelected) {
      this.client_id = this.clientSelected.patient.id;
      if (this.patient_identifier !== null) {
        this.getPatientGoalFamilyEnvolments(this.patient_identifier);
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
  //       this.getPatientGoalFamilyEnvolments(this.patient_identifier);
  //     }
  //   });
  // }

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
    this.goalFamilyEnvolmentService
      .getGoalFamilyEnvolmentbyPatientId(patient_identifier)
      .subscribe((resp) => {
        // console.log('goals sustition by patientid',resp);
        this.goalFamilyEnvolments = resp.familiEnvolmentPatientIds.data;
        this.goalFamilyEnvolmentid = resp.familiEnvolmentPatientIds.data[0]?.id;
        this.caregivers =
          resp.familiEnvolmentPatientIds.data[0]?.caregivers_training_goals;
        // this.client_id_goalFamilyEnvolments = resp.familiEnvolmentPatientIds.data[0].caregivers_training_goals.client_id;
        this.client_id_goalFamilyEnvolments =
          resp.familiEnvolmentPatientIds.data[0]?.client_id;
      });
  }

  addDocument() {
    if (this.caregivers) {
      this.caregivers.push({
        index: this.caregivers.length + 1,
        caregiver_goal: this.caregiver_goal,
        outcome_measure: this.outcome_measure,
        criteria: this.criteria,
        initiation: this.initiation,
        end_date: this.end_date,
        current_status: this.current_status,
      });
    } else {
      this.caregivers = [
        {
          index: 1, // initial index
          caregiver_goal: this.caregiver_goal,
          outcome_measure: this.outcome_measure,
          criteria: this.criteria,
          initiation: this.initiation,
          end_date: this.end_date,
          current_status: this.current_status,
        },
      ];
    }

    this.caregiver_goal = '';
    this.outcome_measure = '';
    this.criteria = '';
    this.initiation = null;
    this.end_date = null;
    this.current_status = '';
  }

  deleteDocument(caregiver: any) {
    const index = this.caregivers.findIndex(
      (element) => element.index === caregiver.index
    );
    if (index !== -1) {
      this.caregivers.splice(index, 1);
    }
  }

  seleccionarParaEdit(caregiver: any) {
    const selectedCaregiver = this.caregivers.find(
      (item) => item.index === caregiver.index
    );
    if (selectedCaregiver) {
      this.family_edit = selectedCaregiver;
      this.selectedCaregiver = selectedCaregiver;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedCaregiver.nombre = 'Nuevo nombre'; // Por ejemplo
      console.log('Objeto seleccionado:', this.selectedCaregiver);
    }
  }

  cambiarStatusSto(caregiver: any) {
    this.family_edit = caregiver;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }

  updateItem(caregiver: any) {
    const index = this.caregivers.findIndex(
      (item) => item.index === caregiver.index
    );
    if (index !== -1) {
      this.caregivers[index] = caregiver;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  closeReload() {
    this.caregiver_goal = '';
    this.outcome_measure = '';
    this.criteria = '';
    this.initiation = null;
    this.end_date = null;
    this.current_status = '';
  }

  save() {
    this.text_validation = '';
    // if(!this.goalFamilyEnvolmentid
    //   || !this.caregivers
    // ){
    //     this.text_validation = 'All Fields (*) are required';
    //   return;
    // }

    const data = {
      id: this.goalFamilyEnvolmentid,
      bip_id: this.bip_selectedIdd,
      patient_identifier: this.patient_identifier,
      client_id: this.client_id,
      caregivers_training_goals: this.caregivers,
    };

    if (this.client_id_goalFamilyEnvolments && this.goalFamilyEnvolmentid) {
      this.goalFamilyEnvolmentService
        .editGoalFamilyEnvolment(data, this.goalFamilyEnvolmentid)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Goal Updated'
          Swal.fire(
            'Updated',
            `Goal Sustitution Updated successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    } else {
      this.goalFamilyEnvolmentService
        .createGoalFamilyEnvolment(data)
        .subscribe((resp) => {
          // console.log(resp);
          this.goalFamilyid = resp.id;
          // this.text_success = 'Goal created successfully!'
          Swal.fire(
            'Created',
            `Goal Sustitution Created successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    }
  }
}
