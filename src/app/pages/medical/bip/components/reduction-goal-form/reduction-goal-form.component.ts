import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Maladaptive } from 'src/app/core/models';
import { ListFormStrategy } from '../bip-form/list-form.strategy';
@Component({
  selector: 'app-reduction-goal-form',
  templateUrl: './reduction-goal-form.component.html',
  styleUrls: ['./reduction-goal-form.component.scss'],
})
export class ReductionGoalFormComponent {
  state: 'list' | 'edit' | 'viewGraph' = 'list';
  @Input() maladaptives: Maladaptive[] = [];
  @Output() maladaptivesChange = new EventEmitter<Maladaptive[]>();
  newMaladaptive: Maladaptive = {
    baseline_date: new Date(),
    baseline_level: 0,
    current_intensity: 0,
    initial_intensity: 0,
    name: '',
    description: '',
  };
  maladaptiveStrategy = new ListFormStrategy<Maladaptive>(
    this.maladaptivesChange,
    this.newMaladaptive
  );
  //
  newMaladaptiveSon = { ...this.newMaladaptive };
  //
  text_validation = '';

  onEdit(maladaptive: Maladaptive) {
    this.newMaladaptive = this.maladaptiveStrategy.select(
      this.maladaptives,
      maladaptive
    );
    this.state = 'edit';
  }
  onViewGraph(maladaptive: Maladaptive) {
    this.newMaladaptiveSon = this.maladaptiveStrategy.select(
      this.maladaptives,
      maladaptive
    );
    this.state = 'viewGraph';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDelete(maladaptive: Maladaptive) {
    throw new Error('Method not implemented.');
  }
  onBack() {
    this.state = 'list';
  }
  /*
  // created comments by Malcolm Cordova at 10 feb 2004
  // mercadocreativo@gmail.com
  // @malcolmcordova
  @Input() clientSelected: any;
  @Input() bipSelected: any;

  routes = AppRoutes;
  valid_form_success = false;
  text_validation = '';
  text_success = '';

  clientSelected.id: any;
  user: AppUser;
  doctor_id: any;
  clientSelected.patient_identifier: string;
  client_selected: any;

  bip_id: any;
  bipSelected.id: any;
  bipSelected.id: any;
  bipSelected.maladaptives = [];

  goalSustitutions = [];
  client_id_goalSustitution: any;

  //goals
  maladaptiveSelected: any;
  maladaptiveSelectedSon: any;
  goalmaladaptive = [];
  goalmaladaptive_child = [];
  goalReductionPatientIds = [];

  goalmaladaptiveid: any;
  current_status!: any;
  golsto: any = [{}];
  gollto: any = [{}];
  golsto_child: any = [{}];
  gollto_child: any = [{}];

  client_id_goal: any;
  goalid: any;
  goal_id: any;
  maladaptive: any;

  //grafico
  maladaptive_child: any;

  //listas
  sto: any;
  decription_sto: any;
  lto: any;
  decription_lto: any;

  status_sto: any;
  status_sto_edit: any;
  status_lto_edit: any;
  status_lto: any;
  initial_date_sto: Date;
  end_date_sto: Date;
  initial_date_lto: Date;
  end_date_lto: Date;

  //revisar
  goalpatient_selected: any;
  goal_selected: any;
  goalsbybipid: any;
  goals = [];
  goalReductions = [];

  golsto_edit = [];
  gollto_edit: any;

  goalmaladaptive_clientId: any;
  goalReductionId: any;

  constructor(
    private bipService: BipService,
    private goalService: GoalService,
    private ativatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.clientSelected.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      // this.getProfileBip(); // se solicita la info del perfil del usuario
      // console.log(this.patient_id);
    });

    // this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    this.user = this.authService.user as AppUser; //
    this.doctor_id = this.user?.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
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
      this.bipSelected.id = this.bipSelected.bip.id;
      this.bipSelected.id = this.bipSelected.bip.id;
      this.bipSelected.maladaptives = this.bipSelected.maladaptives;
    }
  }

  private handleClientSelectedChange() {
    if (this.clientSelected) {
      this.clientSelected.id = this.clientSelected.patient.id;
      this.clientSelected.patient_identifier = this.clientSelected.patient.patient_identifier;
      if (this.clientSelected.patient_identifier !== null) {


        this.getPatientGoals(this.clientSelected.patient_identifier);



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
  //       this.getPatientGoals(this.patient_identifier);
  //     }
  //   });
  // }

  //obtenemos el bip por el id
  // getBip() {
  //   if (this.patient_identifier !== null && this.patient_identifier !== undefined) {
  //     this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
  //       // console.log('bip',resp);

  //       this.bip_selectedId = resp['id']; //convertimos la respuesta en un variable
  //       this.bip_selectedIdd = this.bipSelected.bip.id; //convertimos la respuesta en un variable
  //       this.maladaptives = this.bipSelected.maladaptives; //convertimos la respuesta en un variable
  //     });
  //   }
  // }

  //obtenemos los tipo goals: reductions del paciente por el patient_identifier si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoals(patient_identifier) {
    this.goalService.getGoalbyPatientId(patient_identifier).subscribe((resp) => {
      console.log('goals by patientid', resp);
      this.goalReductions =
        resp.goalReductionPatientIds.data[0] === ''
          ? []
          : resp.goalReductionPatientIds.data;
      this.goalReductionId =
        resp.goalReductionPatientIds.data[0]?.id || undefined;
      this.client_id_goal = resp.goalReductionPatientIds.data[0]?.client_id;
    });
  }

  //obtenemos los goals por el id del bip //revisar
  getGoalsByBip() {
    this.goalService.getGoalbyBipId(this.bipSelected.id).subscribe((resp) => {
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
        this.clientSelected.patient_identifier
      )
      .subscribe((resp) => {
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
      */
}
