import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  LOCALE_ID,
  Output,
  ViewChild,
} from '@angular/core';
import { GoalV2, Objective } from 'src/app/core/models';
import { ListAndFormComponent } from 'src/app/shared/components/list-and-form/list-and-form.component';
import {
  ListOption,
  ListRender,
} from 'src/app/shared/components/list/list.component';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { ListFormStrategy } from '../bip-form/list-form.strategy';

@Component({
  selector: 'app-reduction-goal-edit',
  templateUrl: './reduction-goal-edit.component.html',
  styleUrls: ['./reduction-goal-edit.component.scss'],
})
export class ReductionGoalEditComponent {
  routes = AppRoutes;
  @Output() save = new EventEmitter<void>();
  @Input() maladaptive: GoalV2;
  @Input() goal: GoalV2;
  @Output() goalChange = new EventEmitter<GoalV2>();
  //
  @ViewChild('stoListForm') stoListForm: ListAndFormComponent<Objective>;
  @ViewChild('ltoListForm') ltoListForm: ListAndFormComponent<Objective>;

  //
  ltos: Objective[] = [];
  ltosChange = new EventEmitter<Objective[]>();
  newLto: Objective = Objective.getDefault();
  ltoStrategy = new ListFormStrategy<Objective>(this.ltosChange, this.newLto);

  //
  stos: Objective[] = [];
  stosChange = new EventEmitter<Objective[]>();
  newSto: Objective = {
    id: 0,
    name: 'sto',
    maladaptive_id: 0,
    status: 'initiated',
    initial_date: new Date(),
    end_date: new Date(),
    description: '',
    target: 0,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  };
  stoStrategy = new ListFormStrategy<Objective>(this.stosChange, this.newSto);
  stoOptions: ListOption<Objective>[] = [
    {
      text: 'Edit',
      icon: 'fa fa-pencil',
      class: 'btn btn-outline-success btn-sm',
      action: (item: Objective) => this.onSelectSto(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: Objective) => this.onDeleteSto(item),
    },
  ];
  //
  ltoOptions: ListOption<Objective>[] = [
    {
      text: 'Edit',
      icon: 'fa fa-pencil',
      class: 'btn btn-outline-success btn-sm',
      action: (item: Objective) => this.onSelectLto(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: Objective) => this.onDeleteLto(item),
    },
  ];

  //
  text_validation = '';
  //
  locale = inject(LOCALE_ID);
  renders: ListRender<Objective> = {
    name: (x) => `<b>${x.name}</b>`,
    initial_date: (x) =>
      new DatePipe(this.locale).transform(x.initial_date, 'shortDate'),
    end_date: (x) =>
      new DatePipe(this.locale).transform(x.end_date, 'shortDate'),
  };

  onSelectSto(sto: Objective) {
    this.newSto = this.stoStrategy.select(this.stos, sto);
    this.stoListForm.open();
  }
  onDeleteSto(sto: Objective) {
    this.stos = this.stoStrategy.delete(this.stos.indexOf(sto), this.stos);
    this.stos = [...this.stos];
  }

  onSaveSto(sto: Objective) {
    const resp = this.stoStrategy.add(() => this.validateSto(), this.stos, sto);
    this.newSto = resp.item;
    this.stos = resp.items;
    this.stos = [...this.stos];
    this.stoListForm.close();
  }

  onSelectLto(lto: Objective) {
    this.newLto = this.ltoStrategy.select(this.ltos, lto);
    this.ltoListForm.open();
  }
  onDeleteLto(lto: Objective) {
    this.ltos = this.ltoStrategy.delete(this.ltos.indexOf(lto), this.ltos);
    this.ltos = [...this.ltos];
  }

  onSaveLto(lto: Objective) {
    const resp = this.ltoStrategy.add(() => this.validateLto(), this.ltos, lto);
    this.newLto = resp.item;
    this.ltos = resp.items;
    this.ltos = [...this.ltos];
    this.ltoListForm.close();
  }

  private validateSto() {
    return !!this.newSto;
  }
  private validateLto() {
    return !!this.newLto;
  }
  /*
  valid_form_success = false;
  text_success = '';

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
  maladaptiveSelected: any;
  maladaptiveSelectedSon: any;
  goalmaladaptive: any;
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
  goalReductions = [];

  golsto_edit: any = {};
  gollto_edit: any = {};

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
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      // this.getProfileBip(); // se solicita la info del perfil del usuario
      // console.log(this.patient_id);
    });

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    this.user = this.authService.user as AppUser;
    this.doctor_id = this.user?.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
    this.getGoalsMaladaptives();
  }

  //obtenemos el bip por el id
  getBip() {
    if (
      this.patient_identifier !== null &&
      this.patient_identifier !== undefined
    ) {
      this.bipService
        .getBipByUser(this.patient_identifier)
        .subscribe((resp) => {
          // console.log('bip',resp);
          this.bip_selectedIdd = resp.bip.id; //convertimos la respuesta en un variable
        });
    }
  }

  //obtenemos los goals del maladaptive por nombre
  //obtenemos los maladaptives iniciales para poder relacionarlos con los goals
  getGoalsMaladaptives() {
    this.goalService
      .listMaladaptivesGoals(this.maladaptive?.name, this.patient_identifier)
      .subscribe((resp) => {
        console.log(resp);
        //  this.bip_selectedIdd = resp.goalsmaladaptive.data[0].bip_id;

        //  console.log('palabra maladaptive', resp.goalsmaladaptive.data[0].maladaptive);
        if (
          resp &&
          resp.goalsmaladaptive &&
          resp.goalsmaladaptive.data &&
          resp.goalsmaladaptive.data[0]
        ) {
          this.goalmaladaptive = resp.goalsmaladaptive.data[0];
          this.goalmaladaptiveid = resp.goalsmaladaptive.data[0].id || null;
          this.goalmaladaptive_clientId =
            resp.goalsmaladaptive.data[0].client_id || null;

          this.current_status = this.goalmaladaptive.current_status;
          this.golsto = resp.goalsmaladaptive.data[0].goalstos;
          this.gollto = resp.goalsmaladaptive.data[0].goalltos;

          // ...
        } else {
          console.log('empty');
        }

        //si el client_id guardado no es igual al que se esta viendo en este momento,
        //debe traer su informacion
        //comparamos si es igual al que tiene session activa, si no lo es
        if (this.client_id === this.goalmaladaptive_clientId) {
          //si no existe no recibe nada..pero esta trayendo cosas de otras personas
          // console.log('son iguales');
        } else {
          console.log('No son iguales');
        }
        // aqui si no hay goalmaladaptive o es undefined no traigas nada para evitar el error en consola
        if (
          this.goalmaladaptive === undefined &&
          this.client_id === this.goalmaladaptive_clientId
        ) {
          this.current_status = '';
          this.golsto = '';
          this.gollto = '';
        } else {
          // this.golsto = this.goalmaladaptive[0].goalstos;
          // console.log(this.golsto);
          // this.gollto = this.goalmaladaptive[0].goalltos;
          // console.log(this.gollto);
        }
      });
  }

  deleteMaladaptiveSon(goalsto: any) {
    // this.maladaptiveSelectedSon.splice(i,1);
    this.goalService.deleteGoal(goalsto.id).subscribe((resp) => {
      // alert("Se elimino el objetivo");
      // this.getGoals();
    });
  }

  //fin selectores

  //listas
  addSTOGoal() {
    if (this.golsto) {
      this.golsto.push({
        index: this.golsto.length + 1,
        maladaptive: this.maladaptive?.name,
        sto: this.sto,
        status_sto: this.status_sto,
        status_sto_edit: this.status_sto,
        initial_date_sto: this.initial_date_sto,
        end_date_sto: this.end_date_sto,
        decription_sto: this.decription_sto,
      });
    } else {
      this.golsto = [
        {
          index: 1, // initial index
          maladaptive: this.maladaptive?.name,
          sto: this.sto,
          status_sto: this.status_sto,
          status_sto_edit: this.status_sto,
          initial_date_sto: this.initial_date_sto,
          end_date_sto: this.end_date_sto,
          decription_sto: this.decription_sto,
        },
      ];
    }

    this.sto = '';
    this.status_sto = '';
    this.status_sto_edit = '';
    this.initial_date_sto = null;
    this.end_date_sto = null;
    this.decription_sto = '';
  }

  deleteSTOGoal(goalst: any) {
    const index = this.golsto.findIndex(
      (element) => element.index === goalst.index
    );
    if (index !== -1) {
      this.golsto.splice(index, 1);
    }
  }

  seleccionarParaEdit(goalst: any) {
    const selectedGoalSto = this.golsto.find(
      (item) => item.index === goalst.index
    );
    if (selectedGoalSto) {
      this.golsto_edit = selectedGoalSto;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedGoalSto.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateGoalSto(goalst: any) {
    const index = this.golsto.findIndex((item) => item.index === goalst.index);
    if (index !== -1) {
      this.golsto[index] = goalst;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  addLTOGoal() {
    if (this.gollto) {
      this.gollto.push({
        index: this.gollto.length + 1,
        lto: this.lto,
        status_lto: this.status_lto,
        initial_date_lto: this.initial_date_lto,
        end_date_lto: this.end_date_lto,
        decription_lto: this.decription_lto,
      });
    } else {
      this.gollto = [
        {
          index: 1, // initial index
          lto: this.lto,
          status_lto: this.status_lto,
          initial_date_lto: this.initial_date_lto,
          end_date_lto: this.end_date_lto,
          decription_lto: this.decription_lto,
        },
      ];
    }

    this.lto = '';
    this.status_lto = '';
    this.initial_date_lto = null;
    this.end_date_lto = null;
    this.decription_lto = '';
  }

  deleteLTOGoal(goall: any) {
    const index = this.gollto.findIndex(
      (element) => element.index === goall.index
    );
    if (index !== -1) {
      this.gollto.splice(index, 1);
    }
  }

  seleccionarParaEditLto(goall: any) {
    const selectedGoalLto = this.gollto.find(
      (item) => item.index === goall.index
    );
    if (selectedGoalLto) {
      this.gollto_edit = selectedGoalLto;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedGoalLto.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateGoalLto(goall: any) {
    const index = this.gollto.findIndex((item) => item.index === goall.index);
    if (index !== -1) {
      this.gollto[index] = goall;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  cambiarStatus(goalsto: any) {
    this.status_sto_edit = goalsto;
    // console.log(this.status_sto_edit.status_sto);

    const data = {
      goalstos: this.golsto,
      goalltos: this.gollto,
    };

    this.goalService
      .editGoal(data, this.goalmaladaptiveid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }
  cambiarStatusLto(goallto: any) {
    this.status_sto_edit = goallto;
    // console.log(this.status_lto_edit.status_lto);

    const data = {
      goalstos: this.golsto,
      goalltos: this.gollto,
    };

    this.goalService
      .editGoal(data, this.goalmaladaptiveid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }

  //listas

  back() {
    this.maladaptiveSelected = null;
    this.maladaptiveSelectedSon = null;
    this.current_status = '';
    this.ngOnInit();
  }

  onSaveGoal() {
    this.text_validation = '';
    // if(!this.maladaptive || !this.current_status || !this.golsto){
    //   this.text_validation = 'Is required this information ';
    //   return;
    // }

    const data = {
      id: this.goalmaladaptiveid,
      bip_id: this.bip_selectedIdd,
      maladaptive: this.maladaptive?.name,
      patient_identifier: this.patient_identifier,
      current_status: this.current_status,
      goalstos: this.golsto,
      goalltos: this.gollto,
    };

    if (this.patient_identifier && this.goalmaladaptiveid) {
      this.goalService
        .editGoal(data, this.goalmaladaptiveid)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Goal Updated'
          Swal.fire(
            'Updated',
            `Goal Reduction Updated successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    } else {
      this.goalService.createGoal(data).subscribe((resp) => {
        console.log(resp);
        this.goalid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `Goal Reduction Created successfully!`, 'success');
        this.ngOnInit();
        // this.getGoalsMaladaptives();

        // this.maladaptive = '';
        // this.goal_id = '';
        // this.current_status = '';
      });
    }
  }
    */
}
