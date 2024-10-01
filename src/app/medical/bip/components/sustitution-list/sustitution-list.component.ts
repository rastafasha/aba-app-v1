import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalSustitutionService } from '../../service/goal-sustitution.service';
declare var $: any;
@Component({
  selector: 'app-sustitution-list',
  templateUrl: './sustitution-list.component.html',
  styleUrls: ['./sustitution-list.component.scss'],
})
export class SustitutionListComponent {
  public routes = AppRoutes;
  valid_form_success: boolean = false;
  public text_validation: string = '';
  public text_success: string = '';

  public client_id: any;
  public user: any;
  public doctor_id: any;
  public patient_id: any;
  public client_selected: any;

  public bip_id: any;
  public bip_selected: any;
  public bip_selectedId: any;
  public bip_selectedIdd: any;
  public maladaptives: any = [];

  public goalSustitutions: any = [];
  public client_id_goalSustitution: any;

  //goals
  public goalSelected: any;
  public goalSelectedSon: any;
  public goalmaladaptive: any;
  public goalSelectedGraphic: any;
  public goalmaladaptive_child: any = [];
  public goalReductionPatientIds: any = [];

  public goalmaladaptiveid: any;
  public goalmaladaptive_clientId: any;

  public goalSustitutionId: any;
  public goalsustitid: any;
  public current_sustitution!: any;
  public current_status!: any;
  public description!: any;

  public golstoSustiutions: any = [];
  public golltoSustiution: any = [];
  public golsto_child: any = [];
  public gollto_child: any = [];

  public client_id_goal: any;
  public goalid: any;
  public goal_id: any;
  public maladaptive: any;

  //grafico
  public maladaptive_child: any;

  //listas
  public sustitution_sto: any;
  public sustitution_decription_sto: any;
  public sustitution_lto: any;
  public sustitution_decription_lto: any;

  public sustitution_date_sto: Date;
  public sustitution_date_lto: Date;
  public end_sustitution_date_sto: Date;
  public end_sustitution_date_lto: Date;
  public sustitution_status_sto: any;
  public sustitution_status_lto: any;
  public sustitution_status_sto_edit: any;
  public sustitution_status_lto_edit: any;
  public sustitution_status_lto_edit2: any;
  public sustitution_status_sto_edit2: any;

  public arrayFk: any;

  public goal: any;
  public goals: any;
  public initial_interesting: any;
  public target: any;

  public createSelected: any;
  public golltoCreateds: any;
  public golstocreated: any;

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

  golsto_edit: any = [];
  gollto_edit: any = [];

  constructor(
    public bipService: BipService,
    public patientService: PatientMService,
    public goalSustitutionService: GoalSustitutionService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // window.scrollTo(0, 0);//inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp: any) => {
      this.patient_id = resp.patient_id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
    });

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    let USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
  }

  //obtenemos el perfil  del paciente por el id de la ruta
  getProfileBip() {
    this.bipService.showBipProfile(this.patient_id).subscribe((resp: any) => {
      // console.log('profilebip', resp);
      this.client_selected = resp; //convertimos la respuesta en un variable

      this.patient_id = this.client_selected.patient.patient_id;
      if (this.patient_id != null) {
        this.getPatientGoalSustitutions(this.patient_id);
      }
    });
  }

  //obtenemos el bip por el id
  getBip() {
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp: any) => {
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
  getPatientGoalSustitutions(patient_id) {
    this.goalSustitutionService
      .getGoalSustitutionbyPatientId(patient_id)
      .subscribe((resp: any) => {
        console.log('goals sustition by patientid', resp);
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
      .subscribe((resp: any) => {});
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
    console.log(this.sustitution_status_sto_edit.status_sto);

    let data = {
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
    console.log(this.sustitution_status_lto_edit.status_sto);

    let data = {
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
    console.log(this.createdgoal_status_lto_edit2.status_sto);

    let data = {
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

    let data = {
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

    let data = {
      id: this.goalSelectedId,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
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
        .subscribe((resp: any) => {
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
        .subscribe((resp: any) => {
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

    let data = {
      id: this.goalsustitid,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
      goal: this.goal,
      current_status: this.current_status,
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
      client_id: this.client_id,
      description: this.description,
    };

    this.goalSustitutionService
      .createGoalSustitution(data)
      .subscribe((resp: any) => {
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
      .subscribe((resp: any) => {
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
