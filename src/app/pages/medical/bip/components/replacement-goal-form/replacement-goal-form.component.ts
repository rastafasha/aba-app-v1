import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalSustitutionService } from '../../service/goal-sustitution.service';
import { AppUser } from 'src/app/shared/models/users.models';
declare let $: any;
@Component({
  selector: 'app-replacement-goal-form',
  templateUrl: './replacement-goal-form.component.html',
  styleUrls: ['./replacement-goal-form.component.scss'],
})
export class ReplacementGoalFormComponent {
  routes = AppRoutes;
  valid_form_success = false;
  text_validation = '';
  text_success = '';

  client_id: any;
  user: AppUser;
  doctor_id: any;
  patient_id: any;
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

  golsto_edit = [];
  gollto_edit = [];

  constructor(
    private bipService: BipService,
    private goalSustitutionService: GoalSustitutionService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp: any) => {
      this.patient_id = resp.patient_id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
    });

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
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
        /* eslint-disable */ console.log(
          ...oo_oo(
            `3021847437_165_8_165_57_4`,
            'goals sustition by patientid',
            resp
          )
        );
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
    this.sustitution_date_sto = null;
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
    /* eslint-disable */ console.log(
      ...oo_oo(
        `3021847437_367_4_367_60_4`,
        this.sustitution_status_sto_edit.status_sto
      )
    );

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
    /* eslint-disable */ console.log(
      ...oo_oo(
        `3021847437_386_4_386_60_4`,
        this.sustitution_status_lto_edit.status_sto
      )
    );

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
    /* eslint-disable */ console.log(
      ...oo_oo(
        `3021847437_405_4_405_61_4`,
        this.createdgoal_status_lto_edit2.status_sto
      )
    );

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

    // if(this.goalSelectedId  ){

    //   this.goalSustitutionService.editGoalSustitution(data, this.goalSelectedId).subscribe((resp:any)=>{
    //     // console.log(resp);
    //     // this.text_success = 'Goal Updated'
    //     Swal.fire('Updated', `Goal Sustitution Updated successfully!`, 'success');
    //     this.ngOnInit();
    //   })

    // }else{

    // }
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
        // console.log( resp);

        this.goalmaladaptive_child = resp.goalsmaladaptive.data;

        this.maladaptive_child = resp.goalsmaladaptive.data[0].maladaptive;
        // console.log(this.maladaptive_child);

        this.golsto_child = this.goalmaladaptive_child[0].goalstos;
        // console.log(this.golsto_child);

        this.gollto_child = this.goalmaladaptive_child[0].goalltos;
        // console.log(this.gollto_child);
        // this.ngOnInit();
      });
  }

  //selectores seleccionamos el grafico del maladaptive de la lista
  selectedReplacementGraphic(goal: any) {
    this.goalSelectedGraphic = goal;
    // console.log(this.goalSelectedGraphic);
    // this.getGoalsSonMaladaptives();
  }
}
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */ function oo_cm() {
  try {
    return (
      (0, eval)('globalThis._console_ninja') ||
      (0, eval)(
        "/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x52c85b=_0x1765;(function(_0x3cd6dd,_0x5377ca){var _0x486f76=_0x1765,_0xaa2ebe=_0x3cd6dd();while(!![]){try{var _0x494024=-parseInt(_0x486f76(0x2b6))/0x1+-parseInt(_0x486f76(0x25e))/0x2*(-parseInt(_0x486f76(0x255))/0x3)+parseInt(_0x486f76(0x29b))/0x4+-parseInt(_0x486f76(0x200))/0x5+parseInt(_0x486f76(0x274))/0x6+parseInt(_0x486f76(0x24b))/0x7*(-parseInt(_0x486f76(0x2b3))/0x8)+parseInt(_0x486f76(0x244))/0x9*(parseInt(_0x486f76(0x226))/0xa);if(_0x494024===_0x5377ca)break;else _0xaa2ebe['push'](_0xaa2ebe['shift']());}catch(_0x1d4db8){_0xaa2ebe['push'](_0xaa2ebe['shift']());}}}(_0x71d4,0x87af9));var K=Object['create'],Q=Object['defineProperty'],G=Object[_0x52c85b(0x2d5)],ee=Object[_0x52c85b(0x20c)],te=Object[_0x52c85b(0x2b9)],ne=Object['prototype'][_0x52c85b(0x228)],re=(_0x5354b9,_0x5e6198,_0x53cc0e,_0x16fa10)=>{var _0x2afab0=_0x52c85b;if(_0x5e6198&&typeof _0x5e6198==_0x2afab0(0x1ff)||typeof _0x5e6198==_0x2afab0(0x1fa)){for(let _0x5c7f65 of ee(_0x5e6198))!ne[_0x2afab0(0x241)](_0x5354b9,_0x5c7f65)&&_0x5c7f65!==_0x53cc0e&&Q(_0x5354b9,_0x5c7f65,{'get':()=>_0x5e6198[_0x5c7f65],'enumerable':!(_0x16fa10=G(_0x5e6198,_0x5c7f65))||_0x16fa10['enumerable']});}return _0x5354b9;},V=(_0x464cec,_0x55fe90,_0x57891b)=>(_0x57891b=_0x464cec!=null?K(te(_0x464cec)):{},re(_0x55fe90||!_0x464cec||!_0x464cec[_0x52c85b(0x210)]?Q(_0x57891b,_0x52c85b(0x29a),{'value':_0x464cec,'enumerable':!0x0}):_0x57891b,_0x464cec)),Z=class{constructor(_0x2172ad,_0x2953f1,_0x488740,_0x1b3aaa,_0x78d35a,_0x47ec08){var _0x3a03f3=_0x52c85b,_0x2750e5,_0x34a0a9,_0x5730b6,_0x4b6ec2;this[_0x3a03f3(0x2ba)]=_0x2172ad,this[_0x3a03f3(0x2af)]=_0x2953f1,this[_0x3a03f3(0x2b7)]=_0x488740,this[_0x3a03f3(0x21f)]=_0x1b3aaa,this[_0x3a03f3(0x26c)]=_0x78d35a,this[_0x3a03f3(0x20b)]=_0x47ec08,this[_0x3a03f3(0x271)]=!0x0,this[_0x3a03f3(0x1f9)]=!0x0,this['_connected']=!0x1,this[_0x3a03f3(0x272)]=!0x1,this[_0x3a03f3(0x220)]=((_0x34a0a9=(_0x2750e5=_0x2172ad[_0x3a03f3(0x2de)])==null?void 0x0:_0x2750e5[_0x3a03f3(0x231)])==null?void 0x0:_0x34a0a9[_0x3a03f3(0x22c)])===_0x3a03f3(0x276),this[_0x3a03f3(0x27f)]=!((_0x4b6ec2=(_0x5730b6=this['global'][_0x3a03f3(0x2de)])==null?void 0x0:_0x5730b6[_0x3a03f3(0x249)])!=null&&_0x4b6ec2[_0x3a03f3(0x256)])&&!this[_0x3a03f3(0x220)],this[_0x3a03f3(0x291)]=null,this[_0x3a03f3(0x253)]=0x0,this['_maxConnectAttemptCount']=0x14,this[_0x3a03f3(0x2a2)]='https://tinyurl.com/37x8b79t',this[_0x3a03f3(0x1ee)]=(this[_0x3a03f3(0x27f)]?_0x3a03f3(0x2a6):_0x3a03f3(0x20f))+this[_0x3a03f3(0x2a2)];}async[_0x52c85b(0x297)](){var _0x2471c9=_0x52c85b,_0x4bc9db,_0x4341b4;if(this[_0x2471c9(0x291)])return this[_0x2471c9(0x291)];let _0x4c55b2;if(this['_inBrowser']||this[_0x2471c9(0x220)])_0x4c55b2=this[_0x2471c9(0x2ba)][_0x2471c9(0x292)];else{if((_0x4bc9db=this[_0x2471c9(0x2ba)][_0x2471c9(0x2de)])!=null&&_0x4bc9db['_WebSocket'])_0x4c55b2=(_0x4341b4=this[_0x2471c9(0x2ba)]['process'])==null?void 0x0:_0x4341b4[_0x2471c9(0x254)];else try{let _0x296c50=await import('path');_0x4c55b2=(await import((await import('url'))[_0x2471c9(0x287)](_0x296c50[_0x2471c9(0x25c)](this[_0x2471c9(0x21f)],_0x2471c9(0x2cf)))['toString']()))[_0x2471c9(0x29a)];}catch{try{_0x4c55b2=require(require(_0x2471c9(0x1f8))[_0x2471c9(0x25c)](this[_0x2471c9(0x21f)],'ws'));}catch{throw new Error(_0x2471c9(0x1f1));}}}return this[_0x2471c9(0x291)]=_0x4c55b2,_0x4c55b2;}[_0x52c85b(0x23e)](){var _0x43da68=_0x52c85b;this[_0x43da68(0x272)]||this[_0x43da68(0x2d8)]||this[_0x43da68(0x253)]>=this['_maxConnectAttemptCount']||(this[_0x43da68(0x1f9)]=!0x1,this[_0x43da68(0x272)]=!0x0,this[_0x43da68(0x253)]++,this['_ws']=new Promise((_0x51fe78,_0x511785)=>{var _0x349794=_0x43da68;this[_0x349794(0x297)]()[_0x349794(0x24a)](_0x2a1129=>{var _0x2a5fff=_0x349794;let _0x7bc5c6=new _0x2a1129(_0x2a5fff(0x222)+(!this[_0x2a5fff(0x27f)]&&this[_0x2a5fff(0x26c)]?_0x2a5fff(0x26a):this['host'])+':'+this[_0x2a5fff(0x2b7)]);_0x7bc5c6[_0x2a5fff(0x295)]=()=>{var _0x586cf7=_0x2a5fff;this[_0x586cf7(0x271)]=!0x1,this[_0x586cf7(0x25d)](_0x7bc5c6),this['_attemptToReconnectShortly'](),_0x511785(new Error(_0x586cf7(0x1f5)));},_0x7bc5c6['onopen']=()=>{var _0x3ab114=_0x2a5fff;this[_0x3ab114(0x27f)]||_0x7bc5c6[_0x3ab114(0x2a5)]&&_0x7bc5c6[_0x3ab114(0x2a5)][_0x3ab114(0x2d9)]&&_0x7bc5c6[_0x3ab114(0x2a5)][_0x3ab114(0x2d9)](),_0x51fe78(_0x7bc5c6);},_0x7bc5c6[_0x2a5fff(0x211)]=()=>{var _0x8f69f1=_0x2a5fff;this[_0x8f69f1(0x1f9)]=!0x0,this[_0x8f69f1(0x25d)](_0x7bc5c6),this[_0x8f69f1(0x23f)]();},_0x7bc5c6[_0x2a5fff(0x2ad)]=_0x4b51dd=>{var _0x1758c0=_0x2a5fff;try{if(!(_0x4b51dd!=null&&_0x4b51dd[_0x1758c0(0x277)])||!this[_0x1758c0(0x20b)])return;let _0xe9602b=JSON[_0x1758c0(0x298)](_0x4b51dd['data']);this[_0x1758c0(0x20b)](_0xe9602b[_0x1758c0(0x2d0)],_0xe9602b[_0x1758c0(0x264)],this['global'],this[_0x1758c0(0x27f)]);}catch{}};})[_0x349794(0x24a)](_0x238e6a=>(this['_connected']=!0x0,this[_0x349794(0x272)]=!0x1,this[_0x349794(0x1f9)]=!0x1,this[_0x349794(0x271)]=!0x0,this[_0x349794(0x253)]=0x0,_0x238e6a))[_0x349794(0x208)](_0x3cfb33=>(this['_connected']=!0x1,this[_0x349794(0x272)]=!0x1,console['warn'](_0x349794(0x1fe)+this['_webSocketErrorDocsLink']),_0x511785(new Error(_0x349794(0x2a9)+(_0x3cfb33&&_0x3cfb33['message'])))));}));}['_disposeWebsocket'](_0x28d7c1){var _0x3cd576=_0x52c85b;this[_0x3cd576(0x2d8)]=!0x1,this[_0x3cd576(0x272)]=!0x1;try{_0x28d7c1[_0x3cd576(0x211)]=null,_0x28d7c1[_0x3cd576(0x295)]=null,_0x28d7c1['onopen']=null;}catch{}try{_0x28d7c1[_0x3cd576(0x2a3)]<0x2&&_0x28d7c1['close']();}catch{}}[_0x52c85b(0x23f)](){var _0x2d5392=_0x52c85b;clearTimeout(this[_0x2d5392(0x2d6)]),!(this['_connectAttemptCount']>=this[_0x2d5392(0x1f4)])&&(this[_0x2d5392(0x2d6)]=setTimeout(()=>{var _0x18f7af=_0x2d5392,_0x5a11bf;this[_0x18f7af(0x2d8)]||this[_0x18f7af(0x272)]||(this[_0x18f7af(0x23e)](),(_0x5a11bf=this[_0x18f7af(0x2d7)])==null||_0x5a11bf[_0x18f7af(0x208)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x2d5392(0x2d6)]['unref']&&this['_reconnectTimeout'][_0x2d5392(0x2d9)]());}async['send'](_0x2b2f32){var _0x3a0278=_0x52c85b;try{if(!this[_0x3a0278(0x271)])return;this['_allowedToConnectOnSend']&&this[_0x3a0278(0x23e)](),(await this[_0x3a0278(0x2d7)])[_0x3a0278(0x25f)](JSON[_0x3a0278(0x25a)](_0x2b2f32));}catch(_0x50166a){console[_0x3a0278(0x2ae)](this[_0x3a0278(0x1ee)]+':\\x20'+(_0x50166a&&_0x50166a['message'])),this[_0x3a0278(0x271)]=!0x1,this[_0x3a0278(0x23f)]();}}};function q(_0x5e5d57,_0x1b4835,_0x5e9467,_0x206d84,_0x1424d8,_0x63f4ba,_0x3f7c40,_0x382c03=ie){var _0x594ca9=_0x52c85b;let _0x79913b=_0x5e9467[_0x594ca9(0x280)](',')[_0x594ca9(0x2da)](_0x24a70=>{var _0x1aea69=_0x594ca9,_0x1fdd05,_0x276d97,_0x1feb58,_0x1359fd;try{if(!_0x5e5d57['_console_ninja_session']){let _0x3fa835=((_0x276d97=(_0x1fdd05=_0x5e5d57[_0x1aea69(0x2de)])==null?void 0x0:_0x1fdd05[_0x1aea69(0x249)])==null?void 0x0:_0x276d97['node'])||((_0x1359fd=(_0x1feb58=_0x5e5d57['process'])==null?void 0x0:_0x1feb58['env'])==null?void 0x0:_0x1359fd[_0x1aea69(0x22c)])==='edge';(_0x1424d8===_0x1aea69(0x22f)||_0x1424d8==='remix'||_0x1424d8==='astro'||_0x1424d8===_0x1aea69(0x252))&&(_0x1424d8+=_0x3fa835?'\\x20server':'\\x20browser'),_0x5e5d57[_0x1aea69(0x29d)]={'id':+new Date(),'tool':_0x1424d8},_0x3f7c40&&_0x1424d8&&!_0x3fa835&&console[_0x1aea69(0x242)](_0x1aea69(0x21a)+(_0x1424d8[_0x1aea69(0x21d)](0x0)[_0x1aea69(0x2c5)]()+_0x1424d8[_0x1aea69(0x219)](0x1))+',',_0x1aea69(0x20e),_0x1aea69(0x215));}let _0x83dde3=new Z(_0x5e5d57,_0x1b4835,_0x24a70,_0x206d84,_0x63f4ba,_0x382c03);return _0x83dde3['send'][_0x1aea69(0x2bb)](_0x83dde3);}catch(_0x1072c2){return console[_0x1aea69(0x2ae)](_0x1aea69(0x23b),_0x1072c2&&_0x1072c2['message']),()=>{};}});return _0x5f5c=>_0x79913b[_0x594ca9(0x206)](_0xf1e1e9=>_0xf1e1e9(_0x5f5c));}function ie(_0x844ad6,_0x1ef94f,_0x1bb388,_0x5b0f35){var _0x21c3ad=_0x52c85b;_0x5b0f35&&_0x844ad6===_0x21c3ad(0x26f)&&_0x1bb388[_0x21c3ad(0x2a1)][_0x21c3ad(0x26f)]();}function _0x71d4(){var _0x4cd662=['eventReceivedCallback','getOwnPropertyNames','constructor','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','__es'+'Module','onclose','1729055306719','_additionalMetadata','allStrLength','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','level','HTMLAllCollection','current','substr','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','funcName','_isSet','charAt','String','nodeModules','_inNextEdge','_dateToString','ws://','error','null','capped','450VyGHfK','count','hasOwnProperty','_setNodeExpandableState','reduceLimits','_setNodeQueryPath','NEXT_RUNTIME','some','_numberRegExp','next.js','depth','env','bigint','autoExpandLimit','boolean','_isUndefined','_addLoadNode','cappedElements','expId','trace','_addProperty','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','console','POSITIVE_INFINITY','_connectToHostNow','_attemptToReconnectShortly','autoExpandMaxDepth','call','log','_objectToString','107955OuwREG','_HTMLAllCollection','number','Map','_processTreeNodeResult','versions','then','322336BCHbRX','type','_getOwnPropertyDescriptor','value','','autoExpandPropertyCount','_treeNodePropertiesBeforeFullValue','angular','_connectAttemptCount','_WebSocket','131994iCoayd','node','_hasMapOnItsPath','push','[object\\x20Set]','stringify','Buffer','join','_disposeWebsocket','2wslTSs','send','autoExpandPreviousObjects','name','_p_length','match','args','','concat','_ninjaIgnoreNextError','fromCharCode','props','gateway.docker.internal','elapsed','dockerizedApp','_capIfString','resolveGetters','reload','_undefined','_allowedToSend','_connecting','_console_ninja','5612766HFCOwu','_setNodePermissions','edge','data','replace','performance','time',\"c:\\\\Users\\\\gato_\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.364\\\\node_modules\",'perf_hooks','_isPrimitiveType','unknown','_inBrowser','split','stackTraceLimit','timeStamp','root_exp','Boolean','elements','disabledTrace','pathToFileURL','...','NEGATIVE_INFINITY','string','127.0.0.1','index','50680','symbol','_p_name','_setNodeExpressionPath','_WebSocketClass','WebSocket','length','_blacklistedProperty','onerror','sort','getWebSocketClass','parse','pop','default','2263440DiNTNK','_addFunctionsNode','_console_ninja_session','getOwnPropertySymbols','test','indexOf','location','_webSocketErrorDocsLink','readyState','_Symbol','_socket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','toLowerCase','getter','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_isMap','_setNodeId','undefined','onmessage','warn','host','_quotedRegExp','autoExpand','toString','112TgpLnc','_p_','_treeNodePropertiesAfterFullValue','883830dhuaNV','port','angular','getPrototypeOf','global','bind','nan','includes','set','origin','hits','hrtime','_getOwnPropertySymbols','cappedProps','strLength','toUpperCase','isExpressionToEvaluate','hostname','expressionsToEvaluate','totalStrLength','parent','_sortProps','now','slice','message','ws/index.js','method','_getOwnPropertyNames','[object\\x20BigInt]','_type','[object\\x20Map]','getOwnPropertyDescriptor','_reconnectTimeout','_ws','_connected','unref','map','_isPrimitiveWrapperType','[object\\x20Date]','positiveInfinity','process','array','rootExpression','_setNodeLabel','_sendErrorMessage','_addObjectProperty','noFunctions','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','valueOf','stack','_maxConnectAttemptCount','logger\\x20websocket\\x20error','_propertyName','prototype','path','_allowedToConnectOnSend','function','negativeZero','[object\\x20Array]','Set','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','object','4115maXyRn','Number','_keyStrRegExp','coverage','_consoleNinjaAllowedToStart','startsWith','forEach','_property','catch','_cleanNode','serialize'];_0x71d4=function(){return _0x4cd662;};return _0x71d4();}function _0x1765(_0x553705,_0x4ec105){var _0x71d46=_0x71d4();return _0x1765=function(_0x17652e,_0x1a61b2){_0x17652e=_0x17652e-0x1ec;var _0x40c357=_0x71d46[_0x17652e];return _0x40c357;},_0x1765(_0x553705,_0x4ec105);}function B(_0x57d751){var _0x30d759=_0x52c85b,_0x2f0544,_0x425634;let _0x3fb00b=function(_0x4f3378,_0x2b9204){return _0x2b9204-_0x4f3378;},_0x37974a;if(_0x57d751[_0x30d759(0x279)])_0x37974a=function(){var _0x4497fe=_0x30d759;return _0x57d751[_0x4497fe(0x279)][_0x4497fe(0x2cc)]();};else{if(_0x57d751[_0x30d759(0x2de)]&&_0x57d751[_0x30d759(0x2de)][_0x30d759(0x2c1)]&&((_0x425634=(_0x2f0544=_0x57d751[_0x30d759(0x2de)])==null?void 0x0:_0x2f0544['env'])==null?void 0x0:_0x425634[_0x30d759(0x22c)])!=='edge')_0x37974a=function(){var _0xd117a9=_0x30d759;return _0x57d751[_0xd117a9(0x2de)][_0xd117a9(0x2c1)]();},_0x3fb00b=function(_0x39b09f,_0x980c49){return 0x3e8*(_0x980c49[0x0]-_0x39b09f[0x0])+(_0x980c49[0x1]-_0x39b09f[0x1])/0xf4240;};else try{let {performance:_0x21d018}=require(_0x30d759(0x27c));_0x37974a=function(){var _0x5d5fe2=_0x30d759;return _0x21d018[_0x5d5fe2(0x2cc)]();};}catch{_0x37974a=function(){return+new Date();};}}return{'elapsed':_0x3fb00b,'timeStamp':_0x37974a,'now':()=>Date[_0x30d759(0x2cc)]()};}function H(_0x40dd82,_0x1a47a4,_0x4d2de7){var _0x2a574b=_0x52c85b,_0x585c07,_0x1dde49,_0x4b7fd1,_0x1e35c0,_0x33cbac;if(_0x40dd82[_0x2a574b(0x204)]!==void 0x0)return _0x40dd82[_0x2a574b(0x204)];let _0x4109f2=((_0x1dde49=(_0x585c07=_0x40dd82[_0x2a574b(0x2de)])==null?void 0x0:_0x585c07['versions'])==null?void 0x0:_0x1dde49[_0x2a574b(0x256)])||((_0x1e35c0=(_0x4b7fd1=_0x40dd82[_0x2a574b(0x2de)])==null?void 0x0:_0x4b7fd1['env'])==null?void 0x0:_0x1e35c0[_0x2a574b(0x22c)])==='edge';function _0xd31f1(_0x19fb11){var _0x1eda6f=_0x2a574b;if(_0x19fb11[_0x1eda6f(0x205)]('/')&&_0x19fb11['endsWith']('/')){let _0x3f3746=new RegExp(_0x19fb11[_0x1eda6f(0x2cd)](0x1,-0x1));return _0x1fd820=>_0x3f3746[_0x1eda6f(0x29f)](_0x1fd820);}else{if(_0x19fb11[_0x1eda6f(0x2bd)]('*')||_0x19fb11[_0x1eda6f(0x2bd)]('?')){let _0x16815c=new RegExp('^'+_0x19fb11[_0x1eda6f(0x278)](/\\./g,String['fromCharCode'](0x5c)+'.')['replace'](/\\*/g,'.*')[_0x1eda6f(0x278)](/\\?/g,'.')+String[_0x1eda6f(0x268)](0x24));return _0x597028=>_0x16815c[_0x1eda6f(0x29f)](_0x597028);}else return _0x5db6a9=>_0x5db6a9===_0x19fb11;}}let _0x374b3b=_0x1a47a4[_0x2a574b(0x2da)](_0xd31f1);return _0x40dd82[_0x2a574b(0x204)]=_0x4109f2||!_0x1a47a4,!_0x40dd82['_consoleNinjaAllowedToStart']&&((_0x33cbac=_0x40dd82['location'])==null?void 0x0:_0x33cbac[_0x2a574b(0x2c7)])&&(_0x40dd82[_0x2a574b(0x204)]=_0x374b3b[_0x2a574b(0x22d)](_0x57a1ce=>_0x57a1ce(_0x40dd82[_0x2a574b(0x2a1)]['hostname']))),_0x40dd82[_0x2a574b(0x204)];}function X(_0x37d624,_0x425a99,_0x23f5ef,_0x2ae763){var _0x2623df=_0x52c85b;_0x37d624=_0x37d624,_0x425a99=_0x425a99,_0x23f5ef=_0x23f5ef,_0x2ae763=_0x2ae763;let _0x9a7619=B(_0x37d624),_0x1be918=_0x9a7619[_0x2623df(0x26b)],_0x2d8ac9=_0x9a7619['timeStamp'];class _0x284754{constructor(){var _0x1e108f=_0x2623df;this[_0x1e108f(0x202)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x1e108f(0x22e)]=/^(0|[1-9][0-9]*)$/,this[_0x1e108f(0x2b0)]=/'([^\\\\']|\\\\')*'/,this[_0x1e108f(0x270)]=_0x37d624['undefined'],this[_0x1e108f(0x245)]=_0x37d624[_0x1e108f(0x217)],this[_0x1e108f(0x24d)]=Object[_0x1e108f(0x2d5)],this['_getOwnPropertyNames']=Object[_0x1e108f(0x20c)],this['_Symbol']=_0x37d624['Symbol'],this['_regExpToString']=RegExp[_0x1e108f(0x1f7)][_0x1e108f(0x2b2)],this[_0x1e108f(0x221)]=Date[_0x1e108f(0x1f7)]['toString'];}['serialize'](_0x5df2e5,_0x28d843,_0xcb4789,_0xdcda9){var _0x157369=_0x2623df,_0x204121=this,_0x7c527c=_0xcb4789['autoExpand'];function _0x525b94(_0x476e30,_0x59becc,_0x306c45){var _0x17e488=_0x1765;_0x59becc['type']='unknown',_0x59becc[_0x17e488(0x223)]=_0x476e30[_0x17e488(0x2ce)],_0x642c19=_0x306c45['node'][_0x17e488(0x218)],_0x306c45['node'][_0x17e488(0x218)]=_0x59becc,_0x204121[_0x17e488(0x251)](_0x59becc,_0x306c45);}try{_0xcb4789[_0x157369(0x216)]++,_0xcb4789['autoExpand']&&_0xcb4789['autoExpandPreviousObjects'][_0x157369(0x258)](_0x28d843);var _0x1cc857,_0x4f181d,_0x1561f0,_0x4bd796,_0x12e234=[],_0x57be70=[],_0x538ba4,_0x937729=this[_0x157369(0x2d3)](_0x28d843),_0x7c4fbd=_0x937729==='array',_0x423502=!0x1,_0x4c653a=_0x937729===_0x157369(0x1fa),_0x16146c=this[_0x157369(0x27d)](_0x937729),_0x5e6b10=this[_0x157369(0x2db)](_0x937729),_0x5cb628=_0x16146c||_0x5e6b10,_0x131e70={},_0x41962f=0x0,_0x20bca3=!0x1,_0x642c19,_0x1bfeb1=/^(([1-9]{1}[0-9]*)|0)$/;if(_0xcb4789[_0x157369(0x230)]){if(_0x7c4fbd){if(_0x4f181d=_0x28d843[_0x157369(0x293)],_0x4f181d>_0xcb4789['elements']){for(_0x1561f0=0x0,_0x4bd796=_0xcb4789[_0x157369(0x285)],_0x1cc857=_0x1561f0;_0x1cc857<_0x4bd796;_0x1cc857++)_0x57be70[_0x157369(0x258)](_0x204121['_addProperty'](_0x12e234,_0x28d843,_0x937729,_0x1cc857,_0xcb4789));_0x5df2e5[_0x157369(0x237)]=!0x0;}else{for(_0x1561f0=0x0,_0x4bd796=_0x4f181d,_0x1cc857=_0x1561f0;_0x1cc857<_0x4bd796;_0x1cc857++)_0x57be70[_0x157369(0x258)](_0x204121[_0x157369(0x23a)](_0x12e234,_0x28d843,_0x937729,_0x1cc857,_0xcb4789));}_0xcb4789[_0x157369(0x250)]+=_0x57be70['length'];}if(!(_0x937729===_0x157369(0x224)||_0x937729==='undefined')&&!_0x16146c&&_0x937729!=='String'&&_0x937729!==_0x157369(0x25b)&&_0x937729!=='bigint'){var _0x14ad0a=_0xdcda9['props']||_0xcb4789[_0x157369(0x269)];if(this[_0x157369(0x21c)](_0x28d843)?(_0x1cc857=0x0,_0x28d843[_0x157369(0x206)](function(_0x795ddf){var _0x15dd02=_0x157369;if(_0x41962f++,_0xcb4789['autoExpandPropertyCount']++,_0x41962f>_0x14ad0a){_0x20bca3=!0x0;return;}if(!_0xcb4789[_0x15dd02(0x2c6)]&&_0xcb4789[_0x15dd02(0x2b1)]&&_0xcb4789[_0x15dd02(0x250)]>_0xcb4789[_0x15dd02(0x233)]){_0x20bca3=!0x0;return;}_0x57be70['push'](_0x204121[_0x15dd02(0x23a)](_0x12e234,_0x28d843,_0x15dd02(0x1fd),_0x1cc857++,_0xcb4789,function(_0x498239){return function(){return _0x498239;};}(_0x795ddf)));})):this[_0x157369(0x2aa)](_0x28d843)&&_0x28d843['forEach'](function(_0x268d65,_0x26e6f7){var _0x462487=_0x157369;if(_0x41962f++,_0xcb4789[_0x462487(0x250)]++,_0x41962f>_0x14ad0a){_0x20bca3=!0x0;return;}if(!_0xcb4789['isExpressionToEvaluate']&&_0xcb4789['autoExpand']&&_0xcb4789[_0x462487(0x250)]>_0xcb4789[_0x462487(0x233)]){_0x20bca3=!0x0;return;}var _0x19aed5=_0x26e6f7[_0x462487(0x2b2)]();_0x19aed5[_0x462487(0x293)]>0x64&&(_0x19aed5=_0x19aed5['slice'](0x0,0x64)+_0x462487(0x288)),_0x57be70[_0x462487(0x258)](_0x204121[_0x462487(0x23a)](_0x12e234,_0x28d843,'Map',_0x19aed5,_0xcb4789,function(_0x23ffd6){return function(){return _0x23ffd6;};}(_0x268d65)));}),!_0x423502){try{for(_0x538ba4 in _0x28d843)if(!(_0x7c4fbd&&_0x1bfeb1['test'](_0x538ba4))&&!this[_0x157369(0x294)](_0x28d843,_0x538ba4,_0xcb4789)){if(_0x41962f++,_0xcb4789[_0x157369(0x250)]++,_0x41962f>_0x14ad0a){_0x20bca3=!0x0;break;}if(!_0xcb4789[_0x157369(0x2c6)]&&_0xcb4789[_0x157369(0x2b1)]&&_0xcb4789[_0x157369(0x250)]>_0xcb4789['autoExpandLimit']){_0x20bca3=!0x0;break;}_0x57be70[_0x157369(0x258)](_0x204121[_0x157369(0x1ef)](_0x12e234,_0x131e70,_0x28d843,_0x937729,_0x538ba4,_0xcb4789));}}catch{}if(_0x131e70[_0x157369(0x262)]=!0x0,_0x4c653a&&(_0x131e70[_0x157369(0x28f)]=!0x0),!_0x20bca3){var _0x5ae1db=[][_0x157369(0x266)](this[_0x157369(0x2d1)](_0x28d843))[_0x157369(0x266)](this[_0x157369(0x2c2)](_0x28d843));for(_0x1cc857=0x0,_0x4f181d=_0x5ae1db[_0x157369(0x293)];_0x1cc857<_0x4f181d;_0x1cc857++)if(_0x538ba4=_0x5ae1db[_0x1cc857],!(_0x7c4fbd&&_0x1bfeb1[_0x157369(0x29f)](_0x538ba4[_0x157369(0x2b2)]()))&&!this[_0x157369(0x294)](_0x28d843,_0x538ba4,_0xcb4789)&&!_0x131e70[_0x157369(0x2b4)+_0x538ba4[_0x157369(0x2b2)]()]){if(_0x41962f++,_0xcb4789['autoExpandPropertyCount']++,_0x41962f>_0x14ad0a){_0x20bca3=!0x0;break;}if(!_0xcb4789[_0x157369(0x2c6)]&&_0xcb4789[_0x157369(0x2b1)]&&_0xcb4789[_0x157369(0x250)]>_0xcb4789[_0x157369(0x233)]){_0x20bca3=!0x0;break;}_0x57be70[_0x157369(0x258)](_0x204121[_0x157369(0x1ef)](_0x12e234,_0x131e70,_0x28d843,_0x937729,_0x538ba4,_0xcb4789));}}}}}if(_0x5df2e5[_0x157369(0x24c)]=_0x937729,_0x5cb628?(_0x5df2e5[_0x157369(0x24e)]=_0x28d843['valueOf'](),this[_0x157369(0x26d)](_0x937729,_0x5df2e5,_0xcb4789,_0xdcda9)):_0x937729==='date'?_0x5df2e5[_0x157369(0x24e)]=this[_0x157369(0x221)][_0x157369(0x241)](_0x28d843):_0x937729===_0x157369(0x232)?_0x5df2e5[_0x157369(0x24e)]=_0x28d843[_0x157369(0x2b2)]():_0x937729==='RegExp'?_0x5df2e5[_0x157369(0x24e)]=this['_regExpToString'][_0x157369(0x241)](_0x28d843):_0x937729==='symbol'&&this[_0x157369(0x2a4)]?_0x5df2e5['value']=this[_0x157369(0x2a4)][_0x157369(0x1f7)]['toString'][_0x157369(0x241)](_0x28d843):!_0xcb4789['depth']&&!(_0x937729===_0x157369(0x224)||_0x937729===_0x157369(0x2ac))&&(delete _0x5df2e5[_0x157369(0x24e)],_0x5df2e5[_0x157369(0x225)]=!0x0),_0x20bca3&&(_0x5df2e5[_0x157369(0x2c3)]=!0x0),_0x642c19=_0xcb4789[_0x157369(0x256)]['current'],_0xcb4789[_0x157369(0x256)][_0x157369(0x218)]=_0x5df2e5,this[_0x157369(0x251)](_0x5df2e5,_0xcb4789),_0x57be70[_0x157369(0x293)]){for(_0x1cc857=0x0,_0x4f181d=_0x57be70[_0x157369(0x293)];_0x1cc857<_0x4f181d;_0x1cc857++)_0x57be70[_0x1cc857](_0x1cc857);}_0x12e234['length']&&(_0x5df2e5[_0x157369(0x269)]=_0x12e234);}catch(_0x4c6312){_0x525b94(_0x4c6312,_0x5df2e5,_0xcb4789);}return this['_additionalMetadata'](_0x28d843,_0x5df2e5),this['_treeNodePropertiesAfterFullValue'](_0x5df2e5,_0xcb4789),_0xcb4789[_0x157369(0x256)]['current']=_0x642c19,_0xcb4789[_0x157369(0x216)]--,_0xcb4789[_0x157369(0x2b1)]=_0x7c527c,_0xcb4789[_0x157369(0x2b1)]&&_0xcb4789[_0x157369(0x260)][_0x157369(0x299)](),_0x5df2e5;}['_getOwnPropertySymbols'](_0x98a2ac){var _0x5699af=_0x2623df;return Object[_0x5699af(0x29e)]?Object['getOwnPropertySymbols'](_0x98a2ac):[];}[_0x2623df(0x21c)](_0x1b06f2){var _0x45deb3=_0x2623df;return!!(_0x1b06f2&&_0x37d624[_0x45deb3(0x1fd)]&&this[_0x45deb3(0x243)](_0x1b06f2)===_0x45deb3(0x259)&&_0x1b06f2[_0x45deb3(0x206)]);}[_0x2623df(0x294)](_0x2a16f8,_0x2d32bc,_0xc52e10){var _0x1da585=_0x2623df;return _0xc52e10['noFunctions']?typeof _0x2a16f8[_0x2d32bc]==_0x1da585(0x1fa):!0x1;}[_0x2623df(0x2d3)](_0x3c584c){var _0x4a2b0b=_0x2623df,_0x116724='';return _0x116724=typeof _0x3c584c,_0x116724===_0x4a2b0b(0x1ff)?this[_0x4a2b0b(0x243)](_0x3c584c)==='[object\\x20Array]'?_0x116724=_0x4a2b0b(0x2df):this['_objectToString'](_0x3c584c)===_0x4a2b0b(0x2dc)?_0x116724='date':this[_0x4a2b0b(0x243)](_0x3c584c)===_0x4a2b0b(0x2d2)?_0x116724=_0x4a2b0b(0x232):_0x3c584c===null?_0x116724=_0x4a2b0b(0x224):_0x3c584c[_0x4a2b0b(0x20d)]&&(_0x116724=_0x3c584c[_0x4a2b0b(0x20d)][_0x4a2b0b(0x261)]||_0x116724):_0x116724===_0x4a2b0b(0x2ac)&&this[_0x4a2b0b(0x245)]&&_0x3c584c instanceof this[_0x4a2b0b(0x245)]&&(_0x116724=_0x4a2b0b(0x217)),_0x116724;}[_0x2623df(0x243)](_0xc200d5){var _0x4e9e8b=_0x2623df;return Object[_0x4e9e8b(0x1f7)][_0x4e9e8b(0x2b2)]['call'](_0xc200d5);}[_0x2623df(0x27d)](_0x529a22){var _0x5c1d83=_0x2623df;return _0x529a22===_0x5c1d83(0x234)||_0x529a22===_0x5c1d83(0x28a)||_0x529a22===_0x5c1d83(0x246);}[_0x2623df(0x2db)](_0x138149){var _0x4a144e=_0x2623df;return _0x138149===_0x4a144e(0x284)||_0x138149===_0x4a144e(0x21e)||_0x138149===_0x4a144e(0x201);}[_0x2623df(0x23a)](_0x135627,_0x29b532,_0x21cfc1,_0x11f9fb,_0x375c3c,_0x438524){var _0x2e6ca4=this;return function(_0x3cef10){var _0xcb4898=_0x1765,_0x47c646=_0x375c3c[_0xcb4898(0x256)]['current'],_0x4083d7=_0x375c3c['node']['index'],_0x5280a8=_0x375c3c[_0xcb4898(0x256)][_0xcb4898(0x2ca)];_0x375c3c[_0xcb4898(0x256)][_0xcb4898(0x2ca)]=_0x47c646,_0x375c3c['node'][_0xcb4898(0x28c)]=typeof _0x11f9fb=='number'?_0x11f9fb:_0x3cef10,_0x135627[_0xcb4898(0x258)](_0x2e6ca4['_property'](_0x29b532,_0x21cfc1,_0x11f9fb,_0x375c3c,_0x438524)),_0x375c3c[_0xcb4898(0x256)][_0xcb4898(0x2ca)]=_0x5280a8,_0x375c3c[_0xcb4898(0x256)]['index']=_0x4083d7;};}[_0x2623df(0x1ef)](_0x5f50f6,_0x19f62d,_0x22009e,_0x1ee267,_0x153ede,_0x195a04,_0x145f61){var _0x1b819d=_0x2623df,_0x2f2a63=this;return _0x19f62d[_0x1b819d(0x2b4)+_0x153ede[_0x1b819d(0x2b2)]()]=!0x0,function(_0x52cd65){var _0xc2af59=_0x1b819d,_0xf1884d=_0x195a04['node'][_0xc2af59(0x218)],_0x1f5c05=_0x195a04['node'][_0xc2af59(0x28c)],_0x20b47d=_0x195a04[_0xc2af59(0x256)][_0xc2af59(0x2ca)];_0x195a04[_0xc2af59(0x256)]['parent']=_0xf1884d,_0x195a04['node'][_0xc2af59(0x28c)]=_0x52cd65,_0x5f50f6[_0xc2af59(0x258)](_0x2f2a63[_0xc2af59(0x207)](_0x22009e,_0x1ee267,_0x153ede,_0x195a04,_0x145f61)),_0x195a04[_0xc2af59(0x256)][_0xc2af59(0x2ca)]=_0x20b47d,_0x195a04['node'][_0xc2af59(0x28c)]=_0x1f5c05;};}['_property'](_0x29f600,_0x5a186a,_0x18094d,_0x4c36b3,_0x5d29b6){var _0x855d23=_0x2623df,_0x537e61=this;_0x5d29b6||(_0x5d29b6=function(_0x534676,_0x2f0f3c){return _0x534676[_0x2f0f3c];});var _0x3dad2b=_0x18094d['toString'](),_0x196ba1=_0x4c36b3[_0x855d23(0x2c8)]||{},_0x3e68f2=_0x4c36b3['depth'],_0x4ae156=_0x4c36b3[_0x855d23(0x2c6)];try{var _0x46f2e7=this[_0x855d23(0x2aa)](_0x29f600),_0x21c63a=_0x3dad2b;_0x46f2e7&&_0x21c63a[0x0]==='\\x27'&&(_0x21c63a=_0x21c63a['substr'](0x1,_0x21c63a[_0x855d23(0x293)]-0x2));var _0x51b35c=_0x4c36b3[_0x855d23(0x2c8)]=_0x196ba1['_p_'+_0x21c63a];_0x51b35c&&(_0x4c36b3[_0x855d23(0x230)]=_0x4c36b3[_0x855d23(0x230)]+0x1),_0x4c36b3['isExpressionToEvaluate']=!!_0x51b35c;var _0x4102a5=typeof _0x18094d==_0x855d23(0x28e),_0x10aa24={'name':_0x4102a5||_0x46f2e7?_0x3dad2b:this[_0x855d23(0x1f6)](_0x3dad2b)};if(_0x4102a5&&(_0x10aa24['symbol']=!0x0),!(_0x5a186a===_0x855d23(0x2df)||_0x5a186a==='Error')){var _0x4f0a95=this['_getOwnPropertyDescriptor'](_0x29f600,_0x18094d);if(_0x4f0a95&&(_0x4f0a95[_0x855d23(0x2be)]&&(_0x10aa24['setter']=!0x0),_0x4f0a95['get']&&!_0x51b35c&&!_0x4c36b3[_0x855d23(0x26e)]))return _0x10aa24[_0x855d23(0x2a8)]=!0x0,this[_0x855d23(0x248)](_0x10aa24,_0x4c36b3),_0x10aa24;}var _0x8e1bdc;try{_0x8e1bdc=_0x5d29b6(_0x29f600,_0x18094d);}catch(_0x343ade){return _0x10aa24={'name':_0x3dad2b,'type':_0x855d23(0x27e),'error':_0x343ade[_0x855d23(0x2ce)]},this[_0x855d23(0x248)](_0x10aa24,_0x4c36b3),_0x10aa24;}var _0x4c95a3=this[_0x855d23(0x2d3)](_0x8e1bdc),_0x39d7f9=this[_0x855d23(0x27d)](_0x4c95a3);if(_0x10aa24[_0x855d23(0x24c)]=_0x4c95a3,_0x39d7f9)this[_0x855d23(0x248)](_0x10aa24,_0x4c36b3,_0x8e1bdc,function(){var _0x294840=_0x855d23;_0x10aa24['value']=_0x8e1bdc[_0x294840(0x1f2)](),!_0x51b35c&&_0x537e61['_capIfString'](_0x4c95a3,_0x10aa24,_0x4c36b3,{});});else{var _0x308b70=_0x4c36b3[_0x855d23(0x2b1)]&&_0x4c36b3[_0x855d23(0x216)]<_0x4c36b3[_0x855d23(0x240)]&&_0x4c36b3['autoExpandPreviousObjects'][_0x855d23(0x2a0)](_0x8e1bdc)<0x0&&_0x4c95a3!==_0x855d23(0x1fa)&&_0x4c36b3[_0x855d23(0x250)]<_0x4c36b3[_0x855d23(0x233)];_0x308b70||_0x4c36b3['level']<_0x3e68f2||_0x51b35c?(this[_0x855d23(0x20a)](_0x10aa24,_0x8e1bdc,_0x4c36b3,_0x51b35c||{}),this[_0x855d23(0x213)](_0x8e1bdc,_0x10aa24)):this[_0x855d23(0x248)](_0x10aa24,_0x4c36b3,_0x8e1bdc,function(){var _0x40e642=_0x855d23;_0x4c95a3===_0x40e642(0x224)||_0x4c95a3===_0x40e642(0x2ac)||(delete _0x10aa24[_0x40e642(0x24e)],_0x10aa24[_0x40e642(0x225)]=!0x0);});}return _0x10aa24;}finally{_0x4c36b3[_0x855d23(0x2c8)]=_0x196ba1,_0x4c36b3[_0x855d23(0x230)]=_0x3e68f2,_0x4c36b3[_0x855d23(0x2c6)]=_0x4ae156;}}[_0x2623df(0x26d)](_0x2f7d2a,_0x3e2111,_0x4f06a4,_0x165e3c){var _0x1a3fe5=_0x2623df,_0x4cb626=_0x165e3c[_0x1a3fe5(0x2c4)]||_0x4f06a4[_0x1a3fe5(0x2c4)];if((_0x2f7d2a===_0x1a3fe5(0x28a)||_0x2f7d2a==='String')&&_0x3e2111['value']){let _0x39d5f7=_0x3e2111[_0x1a3fe5(0x24e)][_0x1a3fe5(0x293)];_0x4f06a4['allStrLength']+=_0x39d5f7,_0x4f06a4[_0x1a3fe5(0x214)]>_0x4f06a4[_0x1a3fe5(0x2c9)]?(_0x3e2111[_0x1a3fe5(0x225)]='',delete _0x3e2111['value']):_0x39d5f7>_0x4cb626&&(_0x3e2111['capped']=_0x3e2111[_0x1a3fe5(0x24e)][_0x1a3fe5(0x219)](0x0,_0x4cb626),delete _0x3e2111[_0x1a3fe5(0x24e)]);}}['_isMap'](_0x34931b){var _0x3272ed=_0x2623df;return!!(_0x34931b&&_0x37d624[_0x3272ed(0x247)]&&this[_0x3272ed(0x243)](_0x34931b)===_0x3272ed(0x2d4)&&_0x34931b['forEach']);}[_0x2623df(0x1f6)](_0x47a998){var _0x54c731=_0x2623df;if(_0x47a998[_0x54c731(0x263)](/^\\d+$/))return _0x47a998;var _0x13c78f;try{_0x13c78f=JSON['stringify'](''+_0x47a998);}catch{_0x13c78f='\\x22'+this[_0x54c731(0x243)](_0x47a998)+'\\x22';}return _0x13c78f[_0x54c731(0x263)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x13c78f=_0x13c78f['substr'](0x1,_0x13c78f['length']-0x2):_0x13c78f=_0x13c78f['replace'](/'/g,'\\x5c\\x27')[_0x54c731(0x278)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x13c78f;}[_0x2623df(0x248)](_0x450bd2,_0x540e99,_0x3a738d,_0x1d5e7b){var _0xbf57c1=_0x2623df;this[_0xbf57c1(0x251)](_0x450bd2,_0x540e99),_0x1d5e7b&&_0x1d5e7b(),this[_0xbf57c1(0x213)](_0x3a738d,_0x450bd2),this[_0xbf57c1(0x2b5)](_0x450bd2,_0x540e99);}['_treeNodePropertiesBeforeFullValue'](_0x288bd4,_0x443233){var _0x15c053=_0x2623df;this[_0x15c053(0x2ab)](_0x288bd4,_0x443233),this[_0x15c053(0x22b)](_0x288bd4,_0x443233),this['_setNodeExpressionPath'](_0x288bd4,_0x443233),this[_0x15c053(0x275)](_0x288bd4,_0x443233);}[_0x2623df(0x2ab)](_0x33355c,_0x4c1413){}['_setNodeQueryPath'](_0x5e28c0,_0x37c1ca){}['_setNodeLabel'](_0xee885f,_0x115998){}[_0x2623df(0x235)](_0x55a938){var _0x1aa6f4=_0x2623df;return _0x55a938===this[_0x1aa6f4(0x270)];}['_treeNodePropertiesAfterFullValue'](_0x10edfb,_0x29f29a){var _0x206d02=_0x2623df;this[_0x206d02(0x1ed)](_0x10edfb,_0x29f29a),this['_setNodeExpandableState'](_0x10edfb),_0x29f29a['sortProps']&&this[_0x206d02(0x2cb)](_0x10edfb),this[_0x206d02(0x29c)](_0x10edfb,_0x29f29a),this[_0x206d02(0x236)](_0x10edfb,_0x29f29a),this[_0x206d02(0x209)](_0x10edfb);}[_0x2623df(0x213)](_0x2ae38c,_0x6a4e65){var _0x3180df=_0x2623df;let _0x39ab34;try{_0x37d624[_0x3180df(0x23c)]&&(_0x39ab34=_0x37d624[_0x3180df(0x23c)][_0x3180df(0x223)],_0x37d624[_0x3180df(0x23c)][_0x3180df(0x223)]=function(){}),_0x2ae38c&&typeof _0x2ae38c[_0x3180df(0x293)]==_0x3180df(0x246)&&(_0x6a4e65[_0x3180df(0x293)]=_0x2ae38c[_0x3180df(0x293)]);}catch{}finally{_0x39ab34&&(_0x37d624[_0x3180df(0x23c)][_0x3180df(0x223)]=_0x39ab34);}if(_0x6a4e65[_0x3180df(0x24c)]==='number'||_0x6a4e65[_0x3180df(0x24c)]==='Number'){if(isNaN(_0x6a4e65['value']))_0x6a4e65[_0x3180df(0x2bc)]=!0x0,delete _0x6a4e65['value'];else switch(_0x6a4e65[_0x3180df(0x24e)]){case Number[_0x3180df(0x23d)]:_0x6a4e65[_0x3180df(0x2dd)]=!0x0,delete _0x6a4e65[_0x3180df(0x24e)];break;case Number['NEGATIVE_INFINITY']:_0x6a4e65['negativeInfinity']=!0x0,delete _0x6a4e65[_0x3180df(0x24e)];break;case 0x0:this['_isNegativeZero'](_0x6a4e65[_0x3180df(0x24e)])&&(_0x6a4e65[_0x3180df(0x1fb)]=!0x0);break;}}else _0x6a4e65[_0x3180df(0x24c)]===_0x3180df(0x1fa)&&typeof _0x2ae38c[_0x3180df(0x261)]==_0x3180df(0x28a)&&_0x2ae38c[_0x3180df(0x261)]&&_0x6a4e65[_0x3180df(0x261)]&&_0x2ae38c[_0x3180df(0x261)]!==_0x6a4e65[_0x3180df(0x261)]&&(_0x6a4e65[_0x3180df(0x21b)]=_0x2ae38c[_0x3180df(0x261)]);}['_isNegativeZero'](_0x2fa98d){var _0x8c6a89=_0x2623df;return 0x1/_0x2fa98d===Number[_0x8c6a89(0x289)];}[_0x2623df(0x2cb)](_0x45f240){var _0x27ea15=_0x2623df;!_0x45f240[_0x27ea15(0x269)]||!_0x45f240['props'][_0x27ea15(0x293)]||_0x45f240[_0x27ea15(0x24c)]===_0x27ea15(0x2df)||_0x45f240[_0x27ea15(0x24c)]==='Map'||_0x45f240[_0x27ea15(0x24c)]===_0x27ea15(0x1fd)||_0x45f240[_0x27ea15(0x269)][_0x27ea15(0x296)](function(_0x587f85,_0x25310e){var _0x27429f=_0x27ea15,_0x22eb8f=_0x587f85['name'][_0x27429f(0x2a7)](),_0x9f76b=_0x25310e[_0x27429f(0x261)][_0x27429f(0x2a7)]();return _0x22eb8f<_0x9f76b?-0x1:_0x22eb8f>_0x9f76b?0x1:0x0;});}[_0x2623df(0x29c)](_0x6aec3b,_0x4e7839){var _0x5e1614=_0x2623df;if(!(_0x4e7839[_0x5e1614(0x1f0)]||!_0x6aec3b[_0x5e1614(0x269)]||!_0x6aec3b['props'][_0x5e1614(0x293)])){for(var _0x4ae259=[],_0x2bc8c5=[],_0x2c5219=0x0,_0x4f1485=_0x6aec3b[_0x5e1614(0x269)]['length'];_0x2c5219<_0x4f1485;_0x2c5219++){var _0x29e8fa=_0x6aec3b[_0x5e1614(0x269)][_0x2c5219];_0x29e8fa['type']===_0x5e1614(0x1fa)?_0x4ae259[_0x5e1614(0x258)](_0x29e8fa):_0x2bc8c5[_0x5e1614(0x258)](_0x29e8fa);}if(!(!_0x2bc8c5[_0x5e1614(0x293)]||_0x4ae259[_0x5e1614(0x293)]<=0x1)){_0x6aec3b[_0x5e1614(0x269)]=_0x2bc8c5;var _0x28eeff={'functionsNode':!0x0,'props':_0x4ae259};this['_setNodeId'](_0x28eeff,_0x4e7839),this[_0x5e1614(0x1ed)](_0x28eeff,_0x4e7839),this[_0x5e1614(0x229)](_0x28eeff),this[_0x5e1614(0x275)](_0x28eeff,_0x4e7839),_0x28eeff['id']+='\\x20f',_0x6aec3b['props']['unshift'](_0x28eeff);}}}[_0x2623df(0x236)](_0x8d09ca,_0x48c45f){}['_setNodeExpandableState'](_0x2c3113){}['_isArray'](_0x4d0b46){var _0x540da5=_0x2623df;return Array['isArray'](_0x4d0b46)||typeof _0x4d0b46==_0x540da5(0x1ff)&&this[_0x540da5(0x243)](_0x4d0b46)===_0x540da5(0x1fc);}['_setNodePermissions'](_0x51ec7c,_0x53542f){}[_0x2623df(0x209)](_0x47913e){var _0x503d84=_0x2623df;delete _0x47913e['_hasSymbolPropertyOnItsPath'],delete _0x47913e['_hasSetOnItsPath'],delete _0x47913e[_0x503d84(0x257)];}[_0x2623df(0x290)](_0x3e77fb,_0x7533ff){}}let _0x31638a=new _0x284754(),_0xdce57e={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x43e197={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x6a9287(_0x531b46,_0x4bc71a,_0x197aa8,_0x42857c,_0x5321fe,_0x10f17e){var _0x471a36=_0x2623df;let _0x101e55,_0x1a2226;try{_0x1a2226=_0x2d8ac9(),_0x101e55=_0x23f5ef[_0x4bc71a],!_0x101e55||_0x1a2226-_0x101e55['ts']>0x1f4&&_0x101e55[_0x471a36(0x227)]&&_0x101e55[_0x471a36(0x27a)]/_0x101e55[_0x471a36(0x227)]<0x64?(_0x23f5ef[_0x4bc71a]=_0x101e55={'count':0x0,'time':0x0,'ts':_0x1a2226},_0x23f5ef[_0x471a36(0x2c0)]={}):_0x1a2226-_0x23f5ef[_0x471a36(0x2c0)]['ts']>0x32&&_0x23f5ef[_0x471a36(0x2c0)]['count']&&_0x23f5ef['hits'][_0x471a36(0x27a)]/_0x23f5ef[_0x471a36(0x2c0)][_0x471a36(0x227)]<0x64&&(_0x23f5ef['hits']={});let _0x11e3f6=[],_0x5697d2=_0x101e55['reduceLimits']||_0x23f5ef[_0x471a36(0x2c0)][_0x471a36(0x22a)]?_0x43e197:_0xdce57e,_0x405b05=_0x3da01f=>{var _0x3c6546=_0x471a36;let _0x26cba4={};return _0x26cba4['props']=_0x3da01f[_0x3c6546(0x269)],_0x26cba4[_0x3c6546(0x285)]=_0x3da01f[_0x3c6546(0x285)],_0x26cba4[_0x3c6546(0x2c4)]=_0x3da01f[_0x3c6546(0x2c4)],_0x26cba4[_0x3c6546(0x2c9)]=_0x3da01f['totalStrLength'],_0x26cba4[_0x3c6546(0x233)]=_0x3da01f[_0x3c6546(0x233)],_0x26cba4[_0x3c6546(0x240)]=_0x3da01f[_0x3c6546(0x240)],_0x26cba4['sortProps']=!0x1,_0x26cba4[_0x3c6546(0x1f0)]=!_0x425a99,_0x26cba4[_0x3c6546(0x230)]=0x1,_0x26cba4[_0x3c6546(0x216)]=0x0,_0x26cba4[_0x3c6546(0x238)]='root_exp_id',_0x26cba4[_0x3c6546(0x1ec)]=_0x3c6546(0x283),_0x26cba4[_0x3c6546(0x2b1)]=!0x0,_0x26cba4[_0x3c6546(0x260)]=[],_0x26cba4[_0x3c6546(0x250)]=0x0,_0x26cba4[_0x3c6546(0x26e)]=!0x0,_0x26cba4[_0x3c6546(0x214)]=0x0,_0x26cba4['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x26cba4;};for(var _0x23e276=0x0;_0x23e276<_0x5321fe[_0x471a36(0x293)];_0x23e276++)_0x11e3f6[_0x471a36(0x258)](_0x31638a[_0x471a36(0x20a)]({'timeNode':_0x531b46===_0x471a36(0x27a)||void 0x0},_0x5321fe[_0x23e276],_0x405b05(_0x5697d2),{}));if(_0x531b46==='trace'||_0x531b46===_0x471a36(0x223)){let _0x56cb28=Error['stackTraceLimit'];try{Error[_0x471a36(0x281)]=0x1/0x0,_0x11e3f6['push'](_0x31638a[_0x471a36(0x20a)]({'stackNode':!0x0},new Error()[_0x471a36(0x1f3)],_0x405b05(_0x5697d2),{'strLength':0x1/0x0}));}finally{Error[_0x471a36(0x281)]=_0x56cb28;}}return{'method':_0x471a36(0x242),'version':_0x2ae763,'args':[{'ts':_0x197aa8,'session':_0x42857c,'args':_0x11e3f6,'id':_0x4bc71a,'context':_0x10f17e}]};}catch(_0x141361){return{'method':_0x471a36(0x242),'version':_0x2ae763,'args':[{'ts':_0x197aa8,'session':_0x42857c,'args':[{'type':'unknown','error':_0x141361&&_0x141361[_0x471a36(0x2ce)]}],'id':_0x4bc71a,'context':_0x10f17e}]};}finally{try{if(_0x101e55&&_0x1a2226){let _0x53d3d0=_0x2d8ac9();_0x101e55['count']++,_0x101e55[_0x471a36(0x27a)]+=_0x1be918(_0x1a2226,_0x53d3d0),_0x101e55['ts']=_0x53d3d0,_0x23f5ef[_0x471a36(0x2c0)][_0x471a36(0x227)]++,_0x23f5ef[_0x471a36(0x2c0)][_0x471a36(0x27a)]+=_0x1be918(_0x1a2226,_0x53d3d0),_0x23f5ef[_0x471a36(0x2c0)]['ts']=_0x53d3d0,(_0x101e55['count']>0x32||_0x101e55['time']>0x64)&&(_0x101e55[_0x471a36(0x22a)]=!0x0),(_0x23f5ef['hits'][_0x471a36(0x227)]>0x3e8||_0x23f5ef[_0x471a36(0x2c0)][_0x471a36(0x27a)]>0x12c)&&(_0x23f5ef['hits'][_0x471a36(0x22a)]=!0x0);}}catch{}}}return _0x6a9287;}((_0x5c57ad,_0x1873d7,_0x288199,_0xbac8a7,_0x3deb3c,_0x598d24,_0x5d532f,_0x146311,_0x5c841c,_0x435457,_0x4af095)=>{var _0x178280=_0x52c85b;if(_0x5c57ad[_0x178280(0x273)])return _0x5c57ad[_0x178280(0x273)];if(!H(_0x5c57ad,_0x146311,_0x3deb3c))return _0x5c57ad[_0x178280(0x273)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x5c57ad['_console_ninja'];let _0x348138=B(_0x5c57ad),_0x4526fb=_0x348138[_0x178280(0x26b)],_0x4d4ffb=_0x348138[_0x178280(0x282)],_0x383918=_0x348138[_0x178280(0x2cc)],_0x42c1e2={'hits':{},'ts':{}},_0x5f1ccb=X(_0x5c57ad,_0x5c841c,_0x42c1e2,_0x598d24),_0xd940d5=_0x4e24ec=>{_0x42c1e2['ts'][_0x4e24ec]=_0x4d4ffb();},_0xea84f2=(_0x1e4f3c,_0x4cf578)=>{var _0x1bcce6=_0x178280;let _0x930c06=_0x42c1e2['ts'][_0x4cf578];if(delete _0x42c1e2['ts'][_0x4cf578],_0x930c06){let _0x1303d4=_0x4526fb(_0x930c06,_0x4d4ffb());_0xde4346(_0x5f1ccb(_0x1bcce6(0x27a),_0x1e4f3c,_0x383918(),_0x42be99,[_0x1303d4],_0x4cf578));}},_0x4f0396=_0x430740=>{var _0x16daef=_0x178280,_0x326829;return _0x3deb3c===_0x16daef(0x22f)&&_0x5c57ad[_0x16daef(0x2bf)]&&((_0x326829=_0x430740==null?void 0x0:_0x430740[_0x16daef(0x264)])==null?void 0x0:_0x326829[_0x16daef(0x293)])&&(_0x430740[_0x16daef(0x264)][0x0]['origin']=_0x5c57ad[_0x16daef(0x2bf)]),_0x430740;};_0x5c57ad['_console_ninja']={'consoleLog':(_0x389383,_0x33070f)=>{var _0xcc2784=_0x178280;_0x5c57ad[_0xcc2784(0x23c)]['log']['name']!=='disabledLog'&&_0xde4346(_0x5f1ccb(_0xcc2784(0x242),_0x389383,_0x383918(),_0x42be99,_0x33070f));},'consoleTrace':(_0x5a7462,_0x4ad9a0)=>{var _0x34222f=_0x178280,_0x4e5f09,_0x38cb70;_0x5c57ad['console']['log'][_0x34222f(0x261)]!==_0x34222f(0x286)&&((_0x38cb70=(_0x4e5f09=_0x5c57ad['process'])==null?void 0x0:_0x4e5f09[_0x34222f(0x249)])!=null&&_0x38cb70[_0x34222f(0x256)]&&(_0x5c57ad['_ninjaIgnoreNextError']=!0x0),_0xde4346(_0x4f0396(_0x5f1ccb(_0x34222f(0x239),_0x5a7462,_0x383918(),_0x42be99,_0x4ad9a0))));},'consoleError':(_0x56c660,_0x124401)=>{var _0x5a4dbf=_0x178280;_0x5c57ad[_0x5a4dbf(0x267)]=!0x0,_0xde4346(_0x4f0396(_0x5f1ccb(_0x5a4dbf(0x223),_0x56c660,_0x383918(),_0x42be99,_0x124401)));},'consoleTime':_0x2b72bf=>{_0xd940d5(_0x2b72bf);},'consoleTimeEnd':(_0xf42d7f,_0x231d2e)=>{_0xea84f2(_0x231d2e,_0xf42d7f);},'autoLog':(_0x34fc42,_0x1593ab)=>{_0xde4346(_0x5f1ccb('log',_0x1593ab,_0x383918(),_0x42be99,[_0x34fc42]));},'autoLogMany':(_0x1161f8,_0x1f890f)=>{var _0x432033=_0x178280;_0xde4346(_0x5f1ccb(_0x432033(0x242),_0x1161f8,_0x383918(),_0x42be99,_0x1f890f));},'autoTrace':(_0x1abd02,_0x1a1339)=>{var _0x23dceb=_0x178280;_0xde4346(_0x4f0396(_0x5f1ccb(_0x23dceb(0x239),_0x1a1339,_0x383918(),_0x42be99,[_0x1abd02])));},'autoTraceMany':(_0x5662b6,_0x1b0d24)=>{_0xde4346(_0x4f0396(_0x5f1ccb('trace',_0x5662b6,_0x383918(),_0x42be99,_0x1b0d24)));},'autoTime':(_0x4a4e0b,_0x1660f1,_0xecbc72)=>{_0xd940d5(_0xecbc72);},'autoTimeEnd':(_0x391986,_0x4e8b70,_0x41f58e)=>{_0xea84f2(_0x4e8b70,_0x41f58e);},'coverage':_0x5ae8d0=>{var _0x294a69=_0x178280;_0xde4346({'method':_0x294a69(0x203),'version':_0x598d24,'args':[{'id':_0x5ae8d0}]});}};let _0xde4346=q(_0x5c57ad,_0x1873d7,_0x288199,_0xbac8a7,_0x3deb3c,_0x435457,_0x4af095),_0x42be99=_0x5c57ad[_0x178280(0x29d)];return _0x5c57ad[_0x178280(0x273)];})(globalThis,_0x52c85b(0x28b),_0x52c85b(0x28d),_0x52c85b(0x27b),_0x52c85b(0x2b8),'1.0.0',_0x52c85b(0x212),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"LAPTOP-6FGTKA5H\",\"192.168.247.246\"],_0x52c85b(0x265),_0x52c85b(0x24f),'1');"
      )
    );
  } catch (e) {}
}
/* istanbul ignore next */ function oo_oo(i: string, ...v: any[]) {
  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {}
  return v;
}
oo_oo;
/* istanbul ignore next */ function oo_tr(i: string, ...v: any[]) {
  try {
    oo_cm().consoleTrace(i, v);
  } catch (e) {}
  return v;
}
oo_tr;
/* istanbul ignore next */ function oo_tx(i: string, ...v: any[]) {
  try {
    oo_cm().consoleError(i, v);
  } catch (e) {}
  return v;
}
oo_tx;
/* istanbul ignore next */ function oo_ts(v?: string): string {
  try {
    oo_cm().consoleTime(v);
  } catch (e) {}
  return v as string;
}
oo_ts;
/* istanbul ignore next */ function oo_te(
  v: string | undefined,
  i: string
): string {
  try {
    oo_cm().consoleTimeEnd(v, i);
  } catch (e) {}
  return v as string;
}
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/
