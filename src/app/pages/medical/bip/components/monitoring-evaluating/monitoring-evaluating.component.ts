import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonitoringEvaluating, Objective } from 'src/app/core/models';

@Component({
  selector: 'app-monitoring-evaluating',
  templateUrl: './monitoring-evaluating.component.html',
  styleUrls: ['./monitoring-evaluating.component.scss'],
})
export class MonitoringEvaluatingComponent {
  @Input() monitoring_evalutating: MonitoringEvaluating;
  @Output() monitoring_evalutatingChange =
    new EventEmitter<MonitoringEvaluating>();
  @Output() save = new EventEmitter<MonitoringEvaluating>();
  //
  newRbtTrainingGoal = Objective.getDefault();
  //
  text_validation = '';
  //
  onSave() {
    this.monitoring_evalutatingChange.emit(this.monitoring_evalutating);
    this.save.emit(this.monitoring_evalutating);
  }
}
/*

  @Input() clientSelected: any;
  @Input() bipSelected: any;

  valid_form_success = false;
  text_validation = '';
  text_success = '';
  goal: any;
  lto: any;
  date: Date;
  end_date: Date;
  decription: any;
  status: any;
  rbt_training_goals = [];
  training_goals: any[] = [];
  monitoring_status_sto_edit = [];

  client_id: any;
  user: AppUser;
  doctor_id: any;
  client_selected: any;
  patient_identifier: string;
  // bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;
  maladaptives: any;

  monitorings: any;
  monitoringtid: any;
  client_id_monitorings: any;
  monitorid: any;
  lto_edit: any;

  gollto_edit: any = {};

  current_status: any;

  constructor(
    private bipService: BipService,
    private monitoringEvaluatingService: MonitoringEvaluatingService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      // this.getProfileBip(); // se solicita la info del perfil del usuario
      // this.getGoalbyPatient(); // se solicita la info del perfil del usuario
    });

    // this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
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
      this.bip_selectedId = this.bipSelected.id;
      this.bip_selectedIdd = this.bipSelected.bip.id;
      this.maladaptives = this.bipSelected.maladaptives;
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

  // //obtenemos el bip por el id
  // getBip() {
  //   if (this.patient_identifier !== null && this.patient_identifier !== undefined) {
  //     this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
  //       // console.log('bip',resp);
  //       this.bip_selected = resp; //convertimos la respuesta en un variable
  //       this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
  //       this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
  //       this.maladaptives = this.bip_selected.maladaptives; //convertimos la respuesta en un variable
  //     });
  //   }
  // }

  //obtenemos los tipo goals: sustituions del paciente por el patient_identifier si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalFamilyEnvolments(patient_identifier) {
    this.monitoringEvaluatingService
      .getMonitoringEvaluatingbyPatientId(patient_identifier)
      .subscribe((resp) => {
        // console.log('goals sustition by patientid',resp);
        this.monitorings = resp.monitoringEvaluatingPatientIds.data;
        if (this.monitorings.length > 0) {
          this.training_goals = this.monitorings[0].rbt_training_goals || []; // Ensure it's an array
        } else {
          this.training_goals = []; // Fallback to an empty array
        }
        this.monitoringtid = resp.monitoringEvaluatingPatientIds.data[0]?.id;
        // this.training_goals =
        //   resp.monitoringEvaluatingPatientIds.data[0].rbt_training_goals;
        this.client_id_monitorings =
          resp.monitoringEvaluatingPatientIds.data[0]?.client_id;
      });
  }

  addMonitor() {
    if (this.training_goals) {
      this.training_goals.push({
        index: this.training_goals.length + 1,
        lto: this.lto,
        status: this.status,
        date: this.date,
        end_date: this.end_date,
      });
    } else {
      this.training_goals = [
        {
          index: 1, // initial index
          lto: this.lto,
          status: this.status,
          date: this.date,
          end_date: this.end_date,
        },
      ];
    }

    this.lto = '';
    this.status = '';
    this.date = null;
    this.end_date = null;
  }

  deleteDocument(monito: any) {
    const index = this.training_goals.findIndex(
      (element) => element.index === monito.index
    );
    if (index !== -1) {
      this.training_goals.splice(index, 1);
    }
  }

  seleccionarParaEdit(monito: any) {
    const selectedMonitor = this.training_goals.find(
      (item) => item.index === monito.index
    );
    if (selectedMonitor) {
      this.gollto_edit = selectedMonitor;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedMonitor.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateMonitor(monito: any) {
    const index = this.training_goals.findIndex(
      (item) => item.index === monito.index
    );
    if (index !== -1) {
      this.training_goals[index] = monito;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  cambiarStatusSto(caregiver: any) {
    this.monitoring_status_sto_edit = caregiver;
    // console.log(this.monitoring_status_sto_edit.status_sto);

    const data = {
      rbt_training_goals: this.training_goals,
    };

    this.monitoringEvaluatingService
      .editMonitoringEvaluating(data, this.monitoringtid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }
  cambiarLTO(goalsto: any) {
    this.lto_edit = goalsto;

    const data = {
      rbt_training_goals: this.training_goals,
    };

    this.monitoringEvaluatingService
      .editMonitoringEvaluating(data, this.monitoringtid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }

  onSave() {
    this.text_validation = '';
    if (!this.training_goals) {
      this.text_validation = 'Is required this information ';
      return;
    }

    const data = {
      id: this.monitoringtid,
      bip_id: this.bip_selectedIdd,
      patient_identifier: this.patient_identifier,
      client_id: this.client_id,
      rbt_training_goals: this.training_goals,
    };

    if (this.client_id_monitorings && this.monitoringtid) {
      this.monitoringEvaluatingService
        .editMonitoringEvaluating(data, this.monitoringtid)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Goal Updated'
          Swal.fire(
            'Updated',
            ` Monitoring Evaluating Updated successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    } else {
      this.monitoringEvaluatingService
        .createMonitoringEvaluating(data)
        .subscribe((resp) => {
          // console.log(resp);
          this.monitorid = resp.id;
          // this.text_success = 'Goal created successfully!'
          Swal.fire(
            'Created',
            ` Monitoring Evaluating Created successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    }
  }
}
*/
