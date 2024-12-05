import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalSustitutionService } from '../../service/goal-sustitution.service';

@Component({
  selector: 'app-sustitution-list',
  templateUrl: './sustitution-list.component.html',
  styleUrls: ['./sustitution-list.component.scss'],
})
export class SustitutionListComponent implements OnInit {
  routes = AppRoutes;
  valid_form_success = false;
  text_validation = '';
  text_success = '';
  @Input() clientSelected: any;
  client_id: any;
  user: AppUser;
  doctor_id: any;
  patient_identifier: string;
  client_selected: any;

  bip_id: any;
  bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;
  maladaptives = [];

  goalSustitutions = [];
  client_id_goalSustitution: any;

  //goals
  goalSelected: any;
  goalSelectedSon: any;
  goalmaladaptive: any;
  goalSelectedGraphic: any;
  goalmaladaptive_child = [];
  goalReductionPatientIds = [];

  goalmaladaptiveid: any;
  goalmaladaptive_clientId: any;

  goalSustitutionId: any;
  goalsustitid: any;
  current_sustitution!: any;
  current_status!: any;
  description!: any;

  golstoSustiutions = [];
  golltoSustiution = [];
  golsto_child = [];
  gollto_child = [];

  client_id_goal: any;
  goalid: any;
  goal_id: any;
  maladaptive: any;

  //grafico
  maladaptive_child: any;

  //listas
  sustitution_sto: any;
  sustitution_decription_sto: any;
  sustitution_lto: any;
  sustitution_decription_lto: any;

  sustitution_date_sto: Date;
  sustitution_date_lto: Date;
  end_sustitution_date_sto: Date;
  end_sustitution_date_lto: Date;
  sustitution_status_sto: any;
  sustitution_status_lto: any;
  sustitution_status_sto_edit: any;
  sustitution_status_lto_edit: any;
  sustitution_status_lto_edit2: any;
  sustitution_status_sto_edit2: any;

  arrayFk: any;

  goal: any;
  goals: any;
  initial_interesting: any;
  target: any;

  createSelected: any;
  golltoCreateds: any;
  golstocreated: any;

  createdgoal_sto: any;
  createdgoal_initial_interesting: any;
  createdgoal_status_sto: any;
  createdgoal_status_sto_edit: any;
  createdgoal_date_lto: Date;
  createdgoal_decription_sto: any;
  createdgoal_decription: any;
  createdgoal_lto: any;
  createdgoal_status_lto: any;
  createdgoal_date_sto: Date;
  createdgoal_decription_lto: any;
  createdgoal_status_lto_edit2: any;
  createdgoal_status_sto_edit2: any;
  goalSelectedId: any;
  newGoaladd: any;

  golsto_edit : any = {};
  gollto_edit : any = {};

  constructor(
    private bipService: BipService,
    private goalSustitutionService: GoalSustitutionService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
    });

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
  }

  //obtenemos el perfil  del paciente por el id de la ruta
  getProfileBip() {
    this.bipService.showBipProfile(this.patient_identifier).subscribe((resp) => {
      // console.log('profilebip', resp);
      this.client_selected = resp; //convertimos la respuesta en un variable

      this.patient_identifier = this.client_selected.patient.patient_identifier;
      if (this.patient_identifier !== null) {
        this.getPatientGoalSustitutions(this.patient_identifier);
      }
    });
  }

  //obtenemos el bip por el id
  getBip() {
    if (this.patient_identifier !== null && this.patient_identifier !== undefined) {
      this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
        // console.log('bip',resp);

        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives = this.bip_selected.maladaptives; //convertimos la respuesta en un variable
      });
    }
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_identifier si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalSustitutions(patient_identifier) {
    this.goalSustitutionService
      .getGoalSustitutionbyPatientId(patient_identifier)
      .subscribe((resp) => {
        console.log('goals by patientid', resp);
        this.goals = resp.sustitutiongoalPatientIds.data;
      });
  }

  //selectores

  createGoal() {
    this.createSelected = true;

    (this.goal = ''),
      (this.current_sustitution = ''),
      (this.description = ''),
      (this.sustitution_sto = '');
    this.target = '';
    // this.initial_interesting = '';
    this.sustitution_status_sto = '';
    this.sustitution_status_sto_edit = '';
    this.sustitution_date_lto = null;
    this.sustitution_decription_sto = '';

    this.sustitution_lto = '';
    this.sustitution_status_lto = '';
    this.sustitution_date_lto = null;
    this.sustitution_decription_lto = '';
    this.newGoaladd = '';
  }

  //seleccionamos el maladaptive de la lista
  //obtenemos informacion de la seleccion
  selectedGoal(goal: any) {
    this.goalSelected = goal;
    // console.log(this.goalSelected);

    this.goal = this.goalSelected.goal;
    this.goals = this.goalSelected.data;
    this.description = this.goalSelected.description;
    this.current_status = this.goalSelected.current_status;
    this.goalSelectedId = this.goalSelected.id;
    // this.goals = resp.goalReductionPatientIds;
    // console.log(this.goals);

    this.golstoSustiutions = this.goalSelected.goalstos;
    this.golltoSustiution = this.goalSelected.goalltos;

    //llamamos la funcion del  servicio para obtener la informacion adicional que se va a mostrar en la ventana
    // this.getGoalsMaladaptives();
  }

  //selectores seleccionamos el grafico del maladaptive de la lista
  selectedGoalSon(goal: any) {
    this.goalSelectedSon = goal;
    // console.log(this.goalSelectedSon);
    this.getGoalsSonMaladaptives();
  }

  deleteGoalSon(goalsto: any, i: number) {
    this.goals.splice(i, 1);
    this.goalSustitutionService
      .deleteGoalSustitution(goalsto.id)
      .subscribe((resp) => {
        // console.log(resp)
      });
  }

  //fin selectores

  //listas
  addSTOGoal() {
    if (this.golstoSustiutions) {
      this.golstoSustiutions.push({
        index: this.golstoSustiutions.length + 1,
        sustitution_sto: this.sustitution_sto,
        target: this.target,
        sustitution_status_sto: this.sustitution_status_sto,
        sustitution_status_sto_edit: this.sustitution_status_sto,
        sustitution_date_sto: this.sustitution_date_sto,
        end_sustitution_date_sto: this.end_sustitution_date_sto,
        sustitution_decription_sto: this.sustitution_decription_sto,
      });
    } else {
      this.golstoSustiutions = [
        {
          index: 1, // initial index
          sustitution_sto: this.sustitution_sto,
          target: this.target,
          sustitution_status_sto: this.sustitution_status_sto,
          sustitution_status_sto_edit: this.sustitution_status_sto,
          sustitution_date_sto: this.sustitution_date_sto,
          end_sustitution_date_sto: this.end_sustitution_date_sto,
          sustitution_decription_sto: this.sustitution_decription_sto,
        },
      ];
    }

    this.sustitution_sto = '';
    this.target = '';
    this.sustitution_status_sto = '';
    this.sustitution_status_sto_edit = '';
    this.sustitution_date_lto = null;
    this.end_sustitution_date_sto = null;
    this.sustitution_decription_sto = '';
  }

  deleteSTOGoal(goalst: any) {
    const index = this.golstoSustiutions.findIndex(
      (element) => element.index === goalst.index
    );
    if (index !== -1) {
      this.golstoSustiutions.splice(index, 1);
    }
  }

  seleccionarParaEdit(goalst: any) {
    const selectedGoalSto = this.golstoSustiutions.find(
      (item) => item.index === goalst.index
    );
    if (selectedGoalSto) {
      this.golsto_edit = selectedGoalSto;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedGoalSto.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateGoalSto(goalst: any) {
    const index = this.golstoSustiutions.findIndex(
      (item) => item.index === goalst.index
    );
    if (index !== -1) {
      this.golstoSustiutions[index] = goalst;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  addLTOGoal() {
    if (this.golltoSustiution) {
      this.golltoSustiution.push({
        index: this.golltoSustiution.length + 1,
        sustitution_lto: this.sustitution_lto,
        sustitution_status_lto: this.sustitution_status_lto,
        sustitution_date_lto: this.sustitution_date_lto,
        end_sustitution_date_lto: this.end_sustitution_date_lto,
        sustitution_decription_lto: this.sustitution_decription_lto,
      });
    } else {
      this.golltoSustiution = [
        {
          index: 1, // initial index
          sustitution_lto: this.sustitution_lto,
          sustitution_status_lto: this.sustitution_status_lto,
          sustitution_date_lto: this.sustitution_date_lto,
          end_sustitution_date_lto: this.end_sustitution_date_lto,
          sustitution_decription_lto: this.sustitution_decription_lto,
        },
      ];
    }

    this.sustitution_lto = '';
    this.sustitution_status_lto = '';
    this.sustitution_date_lto = null;
    this.end_sustitution_date_lto = null;
    this.sustitution_decription_lto = '';
  }

  deleteLTOGoal(goall: any) {
    const index = this.golltoSustiution.findIndex(
      (element) => element.index === goall.index
    );
    if (index !== -1) {
      this.golltoSustiution.splice(index, 1);
    }
  }

  seleccionarParaEditLto(goall: any) {
    const selectedGoalLto = this.golltoSustiution.find(
      (item) => item.index === goall.index
    );
    if (selectedGoalLto) {
      this.gollto_edit = selectedGoalLto;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedGoalLto.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateGoalLto(goall: any) {
    const index = this.golltoSustiution.findIndex(
      (item) => item.index === goall.index
    );
    if (index !== -1) {
      this.golltoSustiution[index] = goall;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  cambiarStatusSto(goalsto: any) {
    this.sustitution_status_sto_edit = goalsto;
   
    const data = {
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
    };

    this.goalSustitutionService
      .editGoalSustitution(data, this.goalmaladaptiveid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }

  cambiarStatusLto(goallto: any) {
    this.sustitution_status_lto_edit = goallto;
   
    const data = {
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
    };

    this.goalSustitutionService
      .editGoalSustitution(data, this.goalmaladaptiveid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }

  cambiarStatusCreatedLto(goallto: any) {
    this.createdgoal_status_lto_edit2 = goallto;
    const data = {
      goalltos: this.golltoCreateds,
      goalstos: this.golstocreated,
    };

    this.goalSustitutionService
      .editGoalSustitution(data, this.goalmaladaptiveid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }
  cambiarStatusCreatedSto(goalsto: any) {
    this.createdgoal_status_sto_edit2 = goalsto;
    // console.log(this.createdgoal_status_sto_edit2.status_sto);

    const data = {
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
    };

    this.goalSustitutionService
      .editGoalSustitution(data, this.goalmaladaptiveid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }

  back() {
    this.goalSelected = null;
    this.createSelected = null;
    this.goalSelectedSon = null;
    this.goalSelectedGraphic = null;
    this.current_status = '';
    (this.goal = ''),
      (this.current_status = ''),
      (this.description = ''),
      (this.sustitution_sto = '');
    this.initial_interesting = '';
    this.sustitution_status_sto = '';
    this.sustitution_status_sto_edit = '';
    this.sustitution_date_lto = null;
    this.sustitution_decription_sto = '';

    this.sustitution_lto = '';
    this.sustitution_status_lto = '';
    this.sustitution_date_lto = null;
    this.sustitution_decription_lto = '';
    this.ngOnInit();
  }

  saveGoal() {
    this.text_validation = '';
    // if(!this.maladaptive || !this.current_sustitution || !this.golsto){
    //   this.text_validation = 'Is required this information ';
    //   return;
    // }

    const data = {
      id: this.goalSelectedId,
      bip_id: this.bip_selectedIdd,
      patient_identifier: this.patient_identifier,
      goal: this.goal,
      current_status: this.current_status,
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
      client_id: this.client_id,
      description: this.description,
    };

    if (this.goalSelectedId) {
      this.goalSustitutionService
        .editGoalSustitution(data, this.goalSelectedId)
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
      this.goalSustitutionService
        .createGoalSustitution(data)
        .subscribe((resp) => {
          // console.log(resp);
          this.goalsustitid = resp.id;
          // this.text_success = 'Goal created successfully!'
          Swal.fire(
            'Created',
            `Goal Sustitution Created successfully!`,
            'success'
          );
          this.ngOnInit();
          // this.getGoalsMaladaptives();
        });
    }
  }

  newGoal() {
    this.text_validation = '';
    // if(!this.maladaptive || !this.current_sustitution || !this.golsto){
    //   this.text_validation = 'Is required this information ';
    //   return;
    // }

    const data = {
      id: this.goalsustitid,
      bip_id: this.bip_selectedIdd,
      patient_identifier: this.patient_identifier,
      goal: this.goal,
      current_status: this.current_status,
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
      client_id: this.client_id,
      description: this.description,
    };

    this.goalSustitutionService
      .createGoalSustitution(data)
      .subscribe((resp) => {
        // console.log(resp);
        this.goalsustitid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire(
          'Created',
          `Goal Sustitution Created successfully!`,
          'success'
        );
        this.ngOnInit();
        // this.getGoalsMaladaptives();
      });
  }

  //grafico
  //obtenemos los goals del maladaptive por nombre  para el grafico
  getGoalsSonMaladaptives() {
    this.goalSustitutionService
      .listMaladaptivesGoalSustitutions(
        this.goalSelectedSon.maladaptive_behavior
      )
      .subscribe((resp) => {
        this.goalmaladaptive_child = resp.goalsmaladaptive.data;
        this.maladaptive_child = resp.goalsmaladaptive.data[0].maladaptive;
        this.golsto_child = this.goalmaladaptive_child[0].goalstos;
        this.gollto_child = this.goalmaladaptive_child[0].goalltos;
      });
  }

  //selectores seleccionamos el grafico del maladaptive de la lista
  selectedReplacementGraphic(goal: any) {
    this.goalSelectedGraphic = goal;
  }
}
