import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalFamilyEnvolmentService } from '../../service/goal-family-envolment.service';
import { DeEscalationTechniqueService } from '../../service/de-escalation-technique.service';
import { AppUser } from 'src/app/core/models/users.model';

@Component({
  selector: 'app-de-escalation-tecniques',
  templateUrl: './de-escalation-tecniques.component.html',
  styleUrls: ['./de-escalation-tecniques.component.scss'],
})
export class DeEscalationTecniquesComponent {
  valid_form_success = false;
  text_validation = '';
  text_success = '';

  description: any;
  service_recomendation: any;

  cpt: any;
  description_service: any;
  num_units: any;
  breakdown_per_week: any;
  location: any;

  caregivers_training_goals = [];
  deEscalationopts = [];
  escalation_edit: any = {};

  client_id: any;
  user: AppUser;
  doctor_id: any;
  client_selected: any;
  patient_id: any;
  bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;
  maladaptives: any;

  location_edit: any;

  deEscalalationsTechs: any;
  client_id_deEscalalationsTechs: any;
  deEscalalationsTechid: any;
  goalFamilyid: any;

  

  constructor(
    private bipService: BipService,
    private deEscalationTechniqueService: DeEscalationTechniqueService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_id = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
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
    this.bipService.showBipProfile(this.patient_id).subscribe((resp) => {
      // console.log('profilebip', resp);
      this.client_selected = resp; //convertimos la respuesta en un variable

      this.client_id = this.client_selected.patient.id;
      if (this.patient_id !== null) {
        this.getPatientGoalFamilyEnvolments(this.patient_id);
      }
    });
  }

  //obtenemos el bip por el id
  getBip() {
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp) => {
        // console.log('bip',resp);
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives = this.bip_selected.maladaptives; //convertimos la respuesta en un variable
      });
    }
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_id si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalFamilyEnvolments(patient_id) {
    this.deEscalationTechniqueService
      .getDeEscalationTechniquebyPatientId(patient_id)
      .subscribe((resp) => {
        // console.log('goals sustition by patientid',resp);
        this.deEscalalationsTechs = resp.deEscalationTechniquePatientIds.data;
        this.deEscalalationsTechid =
          resp.deEscalationTechniquePatientIds.data[0].id;
        this.description =
          resp.deEscalationTechniquePatientIds.data[0].description;
        this.deEscalationopts =
          resp.deEscalationTechniquePatientIds.data[0].recomendation_lists;
        this.service_recomendation =
          resp.deEscalationTechniquePatientIds.data[0].service_recomendation;
        this.client_id_deEscalalationsTechs =
          resp.deEscalationTechniquePatientIds.data[0].client_id;
        // this.goals = resp.goalReductionPatientIds;
        // console.log(this.goals);
      });
  }

  addDocument() {
    if (this.deEscalationopts) {
      this.deEscalationopts.push({
        index: this.deEscalationopts.length + 1,
        cpt: this.cpt,
        description_service: this.description_service,
        num_units: this.num_units,
        breakdown_per_week: this.breakdown_per_week,
        location: this.location,
      });
    } else {
      this.deEscalationopts = [
        {
          index: 1, // initial index
          cpt: this.cpt,
          description_service: this.description_service,
          num_units: this.num_units,
          breakdown_per_week: this.breakdown_per_week,
          location: this.location,
        },
      ];
    }

    this.cpt = '';
    this.description_service = '';
    this.num_units = '';
    this.breakdown_per_week = '';
    this.location = '';
  }

  deleteDocument(escalation: any) {
    const index = this.deEscalationopts.findIndex(
      (element) => element.index === escalation.index
    );
    if (index !== -1) {
      this.deEscalationopts.splice(index, 1);
    }
  }

  seleccionarParaEdit(escalation: any) {
    const selectedEscalation = this.deEscalationopts.find(
      (item) => item.index === escalation.index
    );
    if (selectedEscalation) {
      this.escalation_edit = selectedEscalation;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedEscalation.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateEscalation(escalation: any) {
    const index = this.deEscalationopts.findIndex(
      (item) => item.index === escalation.index
    );
    if (index !== -1) {
      this.deEscalationopts[index] = escalation;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  save() {
    this.text_validation = '';
    if (!this.deEscalationopts) {
      this.text_validation = 'All Fields (*) are required';
      return;
    }

    const data = {
      id: this.deEscalalationsTechid,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
      client_id: this.client_id,
      description: this.description,
      service_recomendation: this.service_recomendation,
      recomendation_lists: this.deEscalationopts,
    };

    if (this.client_id_deEscalalationsTechs && this.deEscalalationsTechid) {
      this.deEscalationTechniqueService
        .editDeEscalationTechnique(data, this.deEscalalationsTechid)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Goal Updated'
          Swal.fire(
            'Updated',
            `De Escalation Technique Updated successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    } else {
      this.deEscalationTechniqueService
        .createDeEscalationTechnique(data)
        .subscribe((resp) => {
          // console.log(resp);
          this.goalFamilyid = resp.id;
          // this.text_success = 'Goal created successfully!'
          Swal.fire(
            'Created',
            `De Escalation Technique Created successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    }
  }

  cambiarStatus(escalation: any) {
    this.location_edit = escalation;
    // console.log(this.location_edit.location);

    const data = {
      recomendation_lists: this.deEscalationopts,
    };

    this.deEscalationTechniqueService
      .editDeEscalationTechnique(data, this.deEscalalationsTechid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }
}
