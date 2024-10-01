import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from 'src/app/medical/bip/service/bip.service';
import { GoalService } from 'src/app/medical/bip/service/goal.service';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reduction-goal-form',
  templateUrl: './reduction-goal-form.component.html',
  styleUrls: ['./reduction-goal-form.component.scss'],
})
export class ReductionGoalFormComponent {
  // created comments by Malcolm Cordova at 10 feb 2004
  // mercadocreativo@gmail.com
  // @malcolmcordova

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
  public maladaptiveSelected: any;
  public maladaptiveSelectedSon: any;
  public goalmaladaptive: any = [];
  public goalmaladaptive_child: any = [];
  public goalReductionPatientIds: any = [];

  public goalmaladaptiveid: any;
  public current_status!: any;
  public golsto: any = [{}];
  public gollto: any = [{}];
  public golsto_child: any = [{}];
  public gollto_child: any = [{}];

  public client_id_goal: any;
  public goalid: any;
  public goal_id: any;
  public maladaptive: any;

  //grafico
  public maladaptive_child: any;

  //listas
  public sto: any;
  public decription_sto: any;
  public lto: any;
  public decription_lto: any;

  public status_sto: any;
  public status_sto_edit: any;
  public status_lto_edit: any;
  public status_lto: any;
  public initial_date_sto: Date;
  public end_date_sto: Date;
  public initial_date_lto: Date;
  public end_date_lto: Date;

  //revisar
  goalpatient_selected: any;
  goal_selected: any;
  goalsbybipid: any;
  goals: any = [];
  goalReductions: any = [];

  golsto_edit: any = [];
  gollto_edit: any = [];

  goalmaladaptive_clientId: any;
  goalReductionId: any;

  constructor(
    public bipService: BipService,
    public patientService: PatientMService,
    public goalService: GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp: any) => {
      this.patient_id = resp.patient_id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
      // console.log(this.patient_id);
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

      this.client_id = this.client_selected.patient.id;
      if (this.patient_id != null) {
        this.getPatientGoals(this.patient_id);
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

  //obtenemos los tipo goals: reductions del paciente por el patient_id si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoals(patient_id) {
    this.goalService.getGoalbyPatientId(patient_id).subscribe((resp: any) => {
      console.log('goals by patientid', resp);
      this.goalReductions =
        resp.goalReductionPatientIds.data[0] == ''
          ? []
          : resp.goalReductionPatientIds.data;
      this.goalReductionId =
        resp.goalReductionPatientIds.data[0].id || undefined;
      this.client_id_goal = resp.goalReductionPatientIds.data[0].client_id;
    });
  }

  //obtenemos los goals por el id del bip //revisar
  getGoalsByBip() {
    this.goalService
      .getGoalbyBipId(this.bip_selectedId)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.goal_selected = resp.goalreductions;
        // console.log(this.goal_selected);
        this.goalsbybipid = resp.id;
      });
  }

  //selectores
  //seleccionamos el maladaptive de la lista
  //obtenemos informacion de la seleccion
  selectedMaladaptive(maladap: any) {
    this.maladaptiveSelected = maladap;
    console.log(this.maladaptiveSelected);
    //llamamos la funcion del  servicio para obtener la informacion adicional que se va a mostrar en la ventana

    // this.getGoalsMaladaptives();
    // setTimeout(() => {
    //   // this.router.navigate([routes.adminDashboard]);
    // }, 50);
  }

  //listas

  back() {
    this.maladaptiveSelected = null;
    this.maladaptiveSelectedSon = null;
    this.current_status = '';
    this.ngOnInit();
  }

  //grafico

  //selectores seleccionamos el grafico del maladaptive de la lista
  selectedMaladaptiveGraphic(maladap: any) {
    this.maladaptiveSelectedSon = maladap;
    // console.log(this.maladaptiveSelectedSon);
    // this.getGoalsSonMaladaptives();
  }
  //obtenemos los goals del maladaptive por nombre  para el grafico
  getGoalsSonMaladaptives() {
    this.goalService
      .listMaladaptivesGoals(
        this.maladaptiveSelectedSon.maladaptive_behavior,
        this.patient_id
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
}
