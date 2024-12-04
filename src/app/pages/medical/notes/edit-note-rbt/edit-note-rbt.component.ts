import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { NoteRbtService } from '../../../../core/services/notes-rbt.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';

@Component({
  selector: 'app-edit-note-rbt',
  templateUrl: './edit-note-rbt.component.html',
  styleUrls: ['./edit-note-rbt.component.scss'],
})
export class EditNoteRbtComponent implements OnInit {
  routes = AppRoutes;
  target: number;
  interventionsList = [];

  changeTime() {
    this.selectedValueTimeIn = this.formatTime('11:00:00');
  }

  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  

  selectedValueCode!: string;
  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  selectedValueProviderName!: string;
  selectedValueMaladaptive!: string;
  option_selected = 0;
  isGeneratingSummary = false;

  

  selectedValueRBT!: string;
  selectedValueRenderingProvider!: string;
  selectedValueProviderRBT_id!: number;

  selectedValueBCBA!: string;
  selectedValueAbaSupervisor!: string;
  selectedValueBcba_id!: number;


  client_id: any;
  patient_identifier: string;
  patient_id: number;
  doctor_id: any;
  patient_selected: any;
  client_selected: any;
  note_selected: any;
  user: AppUser;
  bip_id: any;
  insurance_identifier: string;
  insurance_id: number;

  first_name = '';
  last_name = '';
  diagnosis_code = '';

  provider_name_g = '';
  provider_credential = '';
  pos = '';
  session_date = '';
  time_in = '';
  time_out = '';
  time_in2 = '';
  time_out2 = '';
  session_length_morning_total = '';
  session_length_afternon_total = '';
  environmental_changes = '';

  sumary_note = '';
  meet_with_client_at = '';
  client_appeared = '';
  as_evidenced_by = '';
  rbt_modeled_and_demonstrated_to_caregiver = '';
  client_response_to_treatment_this_session = '';
  progress_noted_this_session_compared_to_previous_session = '';
  next_session_is_scheduled_for = '';
  provider_name = '';
  supervisor_name = '';

  number_of_occurrences = 0;
  number_of_correct_responses = 0;
  total_trials = 0;
  number_of_correct_response = 0;
  maladaptive = '';
  replacement = '';
  maladaptive_behavior = '';
  interventions: any;
  provider_signature: any;
  supervisor_signature: any;

  pairing: any;
  response_block: any;
  DRA: any;
  DRO: any;
  redirection: any;
  errorless_teaching: any;
  NCR: any;
  shaping: any;
  chaining: any;
  token_economy: any;
  extinction: any;
  natural_teaching: any;

  FILE_SIGNATURE_RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT: any;
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any;
  FILE_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED: string | Blob =
    'assets/img/user-06.jpg';

  rbt_id: any;
  bcba_id: any;
  maladaptivename: any;
  replacementName: any;
  note_rbt_id: any;
  goal: any;
  note_id: any;
  note_selectedId: any;
  porcentage_diario: any;
  location_id: number;
  patientLocation_id: any;
  insurer_id: any;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  maladaptives = [];
  replacementGoals = [];
  intervention_added = [];
  replacements = [];
  interventionsgroup = [];

  maladaptivegroup = [];
  replacementgroup = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  pa_assessments: any = null;
  pa_assessmentsgroup: any = null;
  cpt_code: any = null;
  provider: any = null;

  paServices: PaService[] = [];
  selectedPaService: PaService | null = null;

  constructor(
    private bipService: BipService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteRbtService: NoteRbtService,
    private doctorService: DoctorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //
    this.ativatedRoute.params.subscribe((resp) => {
      this.note_id = resp['id'];
    });

    //  this.countValue();

    this.total_trials = 0;
    this.number_of_occurrences = 0;
    this.number_of_correct_response = 0;

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.doctor_id = this.user.id;
    this.getNote();
    this.getConfig();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getConfig() {
    this.noteRbtService.listConfigNote().subscribe((resp) => {
      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.getNote();
    });
  }

  private convertToInterventions(input: { [x: string]: boolean }) {
    return [
      { id: 'pairing', name: 'Pairing', value: input['pairing'] || false },
      {
        id: 'response_block',
        name: 'Response Block',
        value: input['response_block'] || false,
      },
      { id: 'DRA', name: 'DRA', value: input['DRA'] || false },
      { id: 'DRO', name: 'DRO', value: input['DRO'] || false },
      {
        id: 'redirection',
        name: 'Redirection',
        value: input['redirection'] || false,
      },
      {
        id: 'errorless_teaching',
        name: 'Errorless Teaching',
        value: input['errorless_teaching'] || false,
      },
      { id: 'NCR', name: 'NCR', value: input['NCR'] || false },
      { id: 'shaping', name: 'Shaping', value: input['shaping'] || false },
      { id: 'chaining', name: 'Chaining', value: input['chaining'] || false },
      {
        id: 'token_economy',
        name: 'Token Economy',
        value: input['token_economy'] || false,
      },
      {
        id: 'extinction',
        name: 'Extinction',
        value: input['extinction'] || false,
      },
      {
        id: 'natural_teaching',
        name: 'Natural Teaching',
        value: input['natural_teaching'] || false,
      },
    ];
  }

  private convertToInterventionsGroup(
    interventions: { id: string; name: string; value: boolean }[]
  ) {
    const group = {};
    for (const intervention of interventions) {
      if (intervention.value) {
        group[intervention.id] = true;
      }
    }
    return group;
  }

  getNote() {
    this.noteRbtService.getNote(this.note_id).subscribe((resp) => {
      console.log('Response from getNote:', resp);

      this.target = resp.target;
      this.note_selected = resp.noteRbt;
      this.note_selectedId = resp.noteRbt.id;
      this.bip_id = this.note_selected.bip_id;
      this.insurance_identifier = this.note_selected.insurance_identifier;
      this.patient_identifier = this.note_selected.patient_identifier;

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.client_response_to_treatment_this_session =
        this.note_selected.client_response_to_treatment_this_session;

      this.selectedValueCode = this.note_selected.cpt_code;

      this.selectedValueRBT = resp.noteRbt.provider.name;
      this.selectedValueProviderRBT_id =resp.noteRbt.provider_id;
      
      this.selectedValueBCBA = resp.noteRbt.supervisor.name;
      this.selectedValueBcba_id =resp.noteRbt.supervisor_id;
      // console.log(this.selectedValueRendering );

      this.interventions = resp.interventions;
      const jsonObj = JSON.parse(resp.interventions) || '';
      this.interventionsgroup = [...jsonObj];

      this.interventionsList = this.convertToInterventions(
        this.interventionsgroup[0]
      );

      this.maladaptive = resp.maladaptives;
      const jsonObj1 = JSON.parse(this.maladaptive) || '';
      this.maladaptivegroup = [...jsonObj1];

      this.replacement = resp.replacements; // ?
      const jsonObj2 = JSON.parse(this.replacement) || '';
      this.replacementgroup = jsonObj2;
      // console.log(this.replacementgroup);

      // this.pos = this.note_selected.pos;
      this.environmental_changes = this.note_selected.environmental_changes;
      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.progress_noted_this_session_compared_to_previous_session =
        this.note_selected.progress_noted_this_session_compared_to_previous_session;

      this.rbt_modeled_and_demonstrated_to_caregiver =
        this.note_selected.rbt_modeled_and_demonstrated_to_caregiver;
      this.replacement = this.note_selected.replacement;

      // this.session_date = this.note_selected.session_date;
      this.session_date = this.note_selected.session_date
        ? new Date(this.note_selected.session_date).toISOString()
        : '';
      // this.next_session_is_scheduled_for = this.note_selected.next_session_is_scheduled_for;
      this.next_session_is_scheduled_for = this.note_selected
        .next_session_is_scheduled_for
        ? new Date(
            this.note_selected.next_session_is_scheduled_for
          ).toISOString()
        : '';

      this.session_length_morning_total =
        this.note_selected.session_length_morning_total;
      this.session_length_afternon_total =
        this.note_selected.session_length_afternon_total;

      console.log('Setting:', this.formatTime(this.note_selected.time_in));
      this.selectedValueTimeIn = this.formatTime(this.note_selected.time_in);
      this.selectedValueTimeOut = this.formatTime(this.note_selected.time_out);
      this.selectedValueTimeIn2 = this.formatTime(this.note_selected.time_in2);
      this.selectedValueTimeOut2 = this.formatTime(
        this.note_selected.time_out2
      );
      console.log(
        'Times updated:',
        this.selectedValueTimeIn,
        this.selectedValueTimeOut,
        this.selectedValueTimeIn2,
        this.selectedValueTimeOut2
      );

      const noteServiceId = resp.noteRbt.pa_service_id;
      if (this.paServices?.length && noteServiceId) {
        this.selectedPaService =
          this.paServices.find((service) => service.id === noteServiceId) ||
          null;
      }

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        this.note_selected.supervisor_signature;
      console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      this.getProfileBip(noteServiceId);
    });
  }

  private formatTime(timeString: string | null): string {
    console.log('formatting time: ', timeString);
    if (!timeString) return '';
    const [hours, minutes] = timeString.replace(/ /g, '').split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  
  getProfileBip(noteServiceId?: number) {
    console.log('Getting profile BIP:', {
      noteServiceId,
      availableServices: this.paServices,
    });
    this.bipService
      .getBipProfilePatient_id(this.patient_identifier)
      .subscribe((resp) => {
        console.log('client',resp);
        this.client_selected = resp.patient;

        this.first_name = this.client_selected.first_name;
        this.last_name = this.client_selected.last_name;
        this.patient_identifier = this.client_selected.patient_identifier;
      this.patient_id = this.client_selected.id;
      this.insurance_id = this.client_selected.insurer_id;
      this.insurance_identifier = this.client_selected.insurance_identifier;
        this.patientLocation_id = this.client_selected.location_id;

        

        // this.pos = JSON.parse(resp.patient.pos_covered) ;
        this.pos = this.client_selected.pos_covered;
        this.diagnosis_code = this.client_selected.diagnosis_code;

        this.paServices = this.client_selected.pa_services;
        if (noteServiceId) {
          this.setPaService(noteServiceId);
        }
      });

    this.getReplacementsByPatientId();
  }

  getReplacementsByPatientId() {
    this.noteRbtService
      .showReplacementbyPatient(this.patient_identifier)
      .subscribe((resp) => {
        this.replacementGoals = [];
        resp['replacementGoals'].forEach((element) => {
          const goalSto = JSON.parse(element.goalstos).find(
            (item) => item.sustitution_status_sto_edit === 'inprogress'
          );
          if (!goalSto) {
            this.replacementGoals.push({ ...element, target: goalSto.target });
          }
        });
      });
  }

  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
    }
  }

  private setPaService(noteServiceId: number) {
    console.log('Setting PA Service:', {
      noteServiceId,
      availableServices: this.paServices,
    });

    if (this.paServices?.length && noteServiceId) {
      this.selectedPaService =
        this.paServices.find((service) => service.id === noteServiceId) || null;

      console.log('Selected PA Service:', this.selectedPaService);

      if (this.selectedPaService) {
        this.selectedValueCode = this.selectedPaService.cpt;
      }
    }
  }

  selectCpt(event) {
    event = this.selectedValueCode;
    console.log(event);
  }

  specialistData(selectedValueInsurer) {
    this.doctorService
      .showDoctorProfile(selectedValueInsurer)
      .subscribe((resp) => {
        console.log(resp);
        this.provider_credential = resp.doctor.certificate_number;
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectSpecialist(event) {
    event = this.selectedValueProviderRBT_id;
    this.specialistData(this.selectedValueProviderRBT_id);
    console.log(this.selectedValueProviderRBT_id);
  }

  onInterventionsChange(updatedInterventions: any[]) {
    this.interventionsgroup = [
      this.convertToInterventionsGroup(this.interventionsList),
    ];
    console.log(this.interventionsgroup);
  }

  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
    this.recalculateSessionLength();
  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
    this.recalculateSessionLength();
  }

  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.recalculateSessionLength();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.recalculateSessionLength();
  }

  private recalculateSessionLength() {
    this.session_length_morning_total =
      this.selectedValueTimeIn && this.selectedValueTimeOut
        ? this.calculateSessionLength(
            this.selectedValueTimeIn,
            this.selectedValueTimeOut
          )
        : '00:00';
    this.session_length_afternon_total =
      this.selectedValueTimeIn2 && this.selectedValueTimeOut2
        ? this.calculateSessionLength(
            this.selectedValueTimeIn2,
            this.selectedValueTimeOut2
          )
        : '00:00';
  }
  private calculateSessionLength(timeIn: string, timeOut: string): string {
    const [hoursIn, minutesIn] = timeIn.split(':').map(Number);
    const [hoursOut, minutesOut] = timeOut.split(':').map(Number);
    const totalMinutes = (hoursOut - hoursIn) * 60 + (minutesOut - minutesIn);
    return `${Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}`;
  }

  selectMaladaptive(behavior: any) {
    this.maladaptiveSelected = behavior;
    console.log(behavior);
    // this.maladp_added.push({
    //   maladaptive : behavior
    // })
  }

  selectReplacement(replacemen: any) {
    this.replacementSelected = replacemen;
    console.log(this.replacementSelected);
    // this.replacement_added.push({
    //   replacement : replacemen
    // })
  }

  onMaladaptivesChange(updatedMaladaptives: any[]) {
    this.maladaptivegroup = updatedMaladaptives;
  }

  onReplacementsChange(updatedReplacements: any[]) {
    this.replacementGoals = updatedReplacements;
  }

  back() {
    this.replacementSelected = null;
    this.maladaptiveSelected = null;
    this.total_trials = 0;
    this.number_of_correct_response = 0;
    // this.ngOnInit();
  }

  speciaFirmaDataRbt(selectedValueRBT) {
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp) => {
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        resp.doctor.electronic_signature;
      // this.notes = resp.notes;
      // this.services = resp.services;
    });
  }
  selectFirmaSpecialistRbt(event) {
    event = this.selectedValueProviderRBT_id;
    this.speciaFirmaDataRbt(this.selectedValueProviderRBT_id);
    console.log(this.selectedValueProviderRBT_id);
  }

  speciaFirmaDataBcba(selectedValueBCBA) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp) => {
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectFirmaSpecialistBcba(event) {
    event = this.selectedValueBcba_id;
    this.speciaFirmaDataBcba(this.selectedValueBcba_id);
    console.log(this.selectedValueBcba_id);
  }

  addMaladaptive(behavior: any, i) {
    this.maladaptiveSelected = behavior;
    this.maladaptives[i] = behavior;

    if (this.maladaptives.length > 1) {
      this.maladaptives.splice(this.maladaptives.length, 1);
    }
    this.maladaptiveSelected = null;
    this.maladaptive_behavior = '';
    this.number_of_occurrences = null;
  }

  

  addReplacement(replacemen) {
    this.replacementSelected = replacemen;
    this.replacementGoals.push({
      goal: this.replacementSelected.goal,
      total_trials: this.replacementSelected.total_trials,
      number_of_correct_response:
        this.replacementSelected.number_of_correct_response,
      // number_of_correct_response: this.number_of_correct_response ? this.number_of_correct_response :0 ,
    });
    if (this.replacementGoals.length > 1) {
      this.replacementGoals.splice(this.replacementGoals.length, 1);
    }
    this.replacementSelected = null;
    this.goal = '';
    this.total_trials = null;
    this.number_of_correct_response = null;
  }

  deleteLTOGoal(i: any) {
    this.replacementGoals.splice(i, 1);
  }

  // countValue(){
  //   const countElement = document.querySelector('.count') as HTMLInputElement;
  //   // const countElement = behavior;
  //   countElement.disabled = false;

  //   document.addEventListener('click', (event) => {
  //     const target = event.target as HTMLElement;
  //     if (target.classList.contains('plus')) {
  //       countElement.value = (parseInt(countElement.value, 10) + 1).toString();
  //     } else if (target.classList.contains('minus')) {
  //       let currentValue = parseInt(countElement.value, 10);
  //       if (currentValue === 0) {
  //         currentValue = 1;
  //       } else {
  //         currentValue -= 1;
  //       }
  //       countElement.value = currentValue.toString();
  //     }
  //   });
  // }

  countValue1() {
    const min = 0; // Minimum of 0
    const max = 10; // Maximum of 10
    const countElement = document.querySelector('.count') as HTMLInputElement;
    countElement.disabled = true;

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('minus')) {
        if (countElement.value > min.toString()) {
          countElement.value = (
            parseInt(countElement.value, 10) - 1
          ).toString();
          const counterElement = document.querySelector(
            '.counter'
          ) as HTMLDivElement;
          counterElement.textContent = (
            parseInt(counterElement.textContent, 10) - 1
          ).toString();
        }
      } else if (target.classList.contains('plus')) {
        if (countElement.value < max.toString()) {
          countElement.value = (
            parseInt(countElement.value, 10) + 1
          ).toString();
          const counterElement = document.querySelector(
            '.counter'
          ) as HTMLDivElement;
          counterElement.textContent = (
            parseInt(counterElement.textContent, 10) + 1
          ).toString();
        }
      }
    });
  }

  cambiarStatus(goalsto: any) {
    // this.status_sto_edit = goalsto;
    // console.log(this.status_sto_edit.status_sto);
    // let data ={
    //   goalstos: this.golsto,
    //   goalltos: this.gollto,
    // }
    // this.goalService.editGoal(data, this.goalmaladaptiveid).subscribe(
    //   resp =>{
    //     // console.log(resp);
    //     // this.getTableData();
    //     Swal.fire('Updated', `Goal Updated successfully!`, 'success');
    //     this.ngOnInit();
    //   }
    // )
  }

  //funcion para la primera imagen.. funciona
  loadFile($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_RBT = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_SIGNATURE_RBT);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = reader.result);
  }

  loadFileSignature($event) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_BCBA = $event.target.files[0];
    const reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE_BCBA);
    reader2.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
        reader2.result as string);
  }

  save() {
    this.text_validation = '';
    // if(!this.name||!this.email ||!this.surname ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }

    // if(this.password !== this.password_confirmation  ){
    //   this.text_validation = 'Las contraseña debe ser igual';
    //   return;
    // }
    if (!this.selectedPaService) {
      this.text_validation = 'Please select a service';
      Swal.fire('Warning', this.text_validation, 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('patient_id', this.patient_id+'');
    formData.append('doctor_id', this.selectedValueProviderRBT_id+'');
    formData.append('bip_id', this.bip_id);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('provider_credential', this.provider_credential);
    formData.append('pos', this.pos);

    formData.append('cpt_code', this.selectedValueCode);
    // formData.append('provider', this.provider); // para el calculo de las unidades

    formData.append('session_date', this.session_date);

    formData.append('location_id', this.patientLocation_id);


    formData.append('insurance_id', this.insurance_id+''); // id del seguro preferiblemente que solo agarre la data al crear
    formData.append('insurance_identifier', this.insurance_identifier); // id del seguro preferiblemente que solo agarre la data al crear

    
    if (this.meet_with_client_at) {
      formData.append('meet_with_client_at', this.meet_with_client_at);
    }
    

    if (this.selectedValueTimeIn) {
      formData.append(
        'time_in',
        this.selectedValueTimeIn + '' ? this.selectedValueTimeIn + '' : '0'
      );
    }
    if (this.selectedValueTimeOut) {
      formData.append(
        'time_out',
        this.selectedValueTimeOut + '' ? this.selectedValueTimeOut + '' : '0'
      );
    }
    if (this.selectedValueTimeIn2) {
      formData.append(
        'time_in2',
        this.selectedValueTimeIn2 + '' ? this.selectedValueTimeIn2 + '' : '0'
      );
    }
    if (this.selectedValueTimeOut2) {
      formData.append(
        'time_out2',
        this.selectedValueTimeOut2 + '' ? this.selectedValueTimeOut2 + '' : '0'
      );
    }

    if (this.environmental_changes) {
      formData.append('environmental_changes', this.environmental_changes);
    }
    
    if (this.selectedValueRenderingProvider) {
      formData.append('provider_id', this.selectedValueRenderingProvider);
    }
    
    if (this.selectedValueProviderRBT_id) {
      formData.append('provider_id', this.selectedValueProviderRBT_id+'');
    }
    if (this.selectedValueBcba_id) {
      formData.append('supervisor_id', this.selectedValueBcba_id+'');
    }

    if (this.replacementgroup) {
      formData.append('replacements', JSON.stringify(this.replacementgroup));
    }
    if (this.maladaptivegroup) {
      formData.append('maladaptives', JSON.stringify(this.maladaptivegroup));
    }
    if (this.interventionsgroup) {
      formData.append('interventions', JSON.stringify(this.interventionsgroup));
    }
    if (this.as_evidenced_by) {
      formData.append('as_evidenced_by', this.as_evidenced_by);
    }

    if (this.client_appeared) {
      formData.append('client_appeared', this.client_appeared);
    }
    if (this.client_response_to_treatment_this_session) {
      formData.append(
        'client_response_to_treatment_this_session',
        this.client_response_to_treatment_this_session
      );
    }
    if (this.next_session_is_scheduled_for) {
      formData.append(
        'next_session_is_scheduled_for',
        this.next_session_is_scheduled_for
      );
    }
    formData.append('pa_service_id', this.selectedPaService.id.toString());
    formData.append('cpt_code', this.selectedPaService.cpt);

    // if(this.FILE_SIGNATURE_RBT ){
    //   formData.append('imagen', this.FILE_SIGNATURE_RBT);
    // }
    // if(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED ){
    //   formData.append('imagen', this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
    // }
    // if(this.FILE_SIGNATURE_RBT ){
    //   formData.append('imagenn', this.FILE_SIGNATURE_RBT);
    // }
    // if(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED ){
    //   formData.append('imagenn', this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
    // }

    if (this.FILE_SIGNATURE_RBT) {
      formData.append('imagen', this.FILE_SIGNATURE_RBT);
    }
    if (this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED) {
      formData.append(
        'provider_signature',
        this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED
      );
    }
    if (this.FILE_SIGNATURE_RBT) {
      formData.append('imagenn', this.FILE_SIGNATURE_RBT);
    }
    if (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED) {
      formData.append(
        'supervisor_signature',
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED
      );
    }

    this.noteRbtService.update(formData as any, this.note_selectedId).subscribe(
      (resp) => {
        // console.log(resp);

        if (resp.message === 403) {
          this.text_validation = resp.message_text;
          Swal.fire('Warning', this.text_validation, 'warning');
        } else {
          Swal.fire('Updated', 'Note RBT Updated', 'success');
          this.router.navigate([AppRoutes.noteRbt.list, this.patient_identifier]);
        }
      },
      (error) => {
        console.error('Error updating note:', error);
        if (
          error.error &&
          error.error.message &&
          error.error.message.includes('Time conflict')
        ) {
          this.text_validation =
            'There is a time conflict with an existing note. Please choose a different time.';
        } else {
          this.text_validation =
            'An error occurred while updating the note. Please try again.';
        }
        Swal.fire('Error', this.text_validation, 'error');
      }
    );
  }

  //   class Calculadora {
  //     sumar(num1, num2) {
  //         return num1 + num2;
  //     }

  //     restar(num1, num2) {
  //         return num1 - num2;
  //     }

  //     dividir(num1, num2) {
  //         return num1 / num2;
  //     }

  //     multiplicar(num1, num2) {
  //         return num1 * num2;
  //     }
  // }

  generateAISummary() {
    if (!this.checkDataSufficient()) {
      Swal.fire('Warning', 'Please fill all the required fields', 'warning');
      return;
    }
    this.isGeneratingSummary = true;
    console.log(this.client_selected.patient, 'patient');
    console.log(this.maladaptivegroup, 'maladaptives');
    const data = {
      diagnosis: this.diagnosis_code,
      birthDate: this.client_selected.patient?.birth_date
        ? this.client_selected.patient.birth_date
        : null,
      startTime: this.selectedValueTimeIn
        ? `${this.selectedValueTimeIn}`.trim()
        : null,
      endTime: this.selectedValueTimeOut
        ? `${this.selectedValueTimeOut}`.trim()
        : null,
      startTime2: this.selectedValueTimeIn2
        ? `${this.selectedValueTimeIn2}`.trim()
        : null,
      endTime2: this.selectedValueTimeOut2
        ? `${this.selectedValueTimeOut2}`.trim()
        : null,
      mood: this.client_appeared,
      pos: this.getPos(this.meet_with_client_at),
      maladaptives: this.maladaptivegroup.map((m) => ({
        behavior: m.maladaptive_behavior,
        frequency: m.number_of_occurrences,
      })),
      replacements: this.replacementgroup.map((r) => ({
        name: r.goal,
        totalTrials: r.total_trials,
        correctResponses: r.number_of_correct_response,
      })),
      interventions:
        this.interventionsgroup.length > 0
          ? Object.keys(this.interventionsgroup[0]).filter(
              (key) => this.interventionsgroup[0][key]
            )
          : [],
    };

    this.noteRbtService.generateAISummary(data).subscribe(
      (response: any) => {
        this.client_response_to_treatment_this_session = response.summary;
        this.isGeneratingSummary = false;
      },
      (error) => {
        console.error('Error generating AI summary:', error);
        Swal.fire(
          'Error',
          'Error generating AI summary. Please ensure you have filled all the required fields.',
          'error'
        );
        this.isGeneratingSummary = false;
      }
    );
  }

  checkDataSufficient(): boolean {
    if (!this.client_selected) return false;

    const hasTime1 = this.selectedValueTimeIn && this.selectedValueTimeOut;
    const hasTime2 = this.selectedValueTimeIn2 && this.selectedValueTimeOut2;
    if (!hasTime1 && !hasTime2) return false;

    if (!this.meet_with_client_at) return false;

    if (!this.maladaptivegroup || this.maladaptivegroup.length === 0)
      return false;
    const allMaladaptivesValid = this.maladaptivegroup.every(
      (m) =>
        m.maladaptive_behavior &&
        m.number_of_occurrences !== undefined &&
        m.number_of_occurrences !== null
    );
    if (!allMaladaptivesValid) return false;

    if (!this.replacementgroup || this.replacementgroup.length === 0)
      return false;
    const allReplacementsValid = this.replacementgroup.every(
      (r) =>
        r.total_trials !== undefined &&
        r.total_trials !== null &&
        r.number_of_correct_response !== undefined &&
        r.number_of_correct_response !== null
    );
    if (!allReplacementsValid) return false;

    if (!this.interventionsgroup || this.interventionsgroup.length === 0)
      return false;

    return true;
  }

  getPos(posCode: string) {
    switch (posCode) {
      case '03':
        return 'School';
      case '12':
        return 'Home';
      case '02':
        return 'Telehealth';
      case '99':
        return 'Other';
      default:
        return 'Unknown';
    }
  }
}
