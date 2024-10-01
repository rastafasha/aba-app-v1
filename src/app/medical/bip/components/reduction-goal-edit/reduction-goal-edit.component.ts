import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from 'src/app/medical/bip/service/bip.service';
import { GoalService } from 'src/app/medical/bip/service/goal.service';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reduction-goal-edit',
  templateUrl: './reduction-goal-edit.component.html',
  styleUrls: ['./reduction-goal-edit.component.scss'],
})
export class ReductionGoalEditComponent {
  @Input() maladap: any;

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
      // this.getProfileBip(); // se solicita la info del perfil del usuario
      // console.log(this.patient_id);
    });

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    let USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
    this.getGoalsMaladaptives();
  }

  //obtenemos el bip por el id
  getBip() {
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp: any) => {
        // console.log('bip',resp);
        this.bip_selectedIdd = resp.bip.id; //convertimos la respuesta en un variable
      });
    }
  }

  //obtenemos los goals del maladaptive por nombre
  //obtenemos los maladaptives iniciales para poder relacionarlos con los goals
  getGoalsMaladaptives() {
    this.patient_id = this.patient_id;
    this.goalService
      .listMaladaptivesGoals(this.maladap.maladaptive_behavior, this.patient_id)
      .subscribe((resp: any) => {
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
          this.goalmaladaptive == undefined &&
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
    debugger;
    // this.maladaptiveSelectedSon.splice(i,1);
    this.goalService.deleteGoal(goalsto.id).subscribe((resp: any) => {
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
        maladaptive: this.maladap.maladaptive_behavior,
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
          maladaptive: this.maladap.maladaptive_behavior,
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

    let data = {
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

    let data = {
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

  saveGoal() {
    debugger;
    this.text_validation = '';
    // if(!this.maladaptive || !this.current_status || !this.golsto){
    //   this.text_validation = 'Is required this information ';
    //   return;
    // }

    let data = {
      id: this.goalmaladaptiveid,
      bip_id: this.bip_selectedIdd,
      maladaptive: this.maladap.maladaptive_behavior,
      patient_id: this.patient_id,
      current_status: this.current_status,
      goalstos: this.golsto,
      goalltos: this.gollto,
    };

    if (this.patient_id && this.goalmaladaptiveid) {
      this.goalService
        .editGoal(data, this.goalmaladaptiveid)
        .subscribe((resp: any) => {
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
      this.goalService.createGoal(data).subscribe((resp: any) => {
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
}
