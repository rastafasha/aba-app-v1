import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { InsuranceService } from '../../../../core/services/insurances.service';
import { NoteBcbaService } from '../../../../core/services/notes-bcba.service';
import { BipService } from '../../bip/service/bip.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';

@Component({
  selector: 'app-note-bcba',
  templateUrl: './note-bcba.component.html',
  styleUrls: ['./note-bcba.component.scss'],
})
export class NoteBcbaComponent implements OnInit {
Number(arg0: string) {
throw new Error('Method not implemented.');
}
  routes = AppRoutes;
  summary_note = '';
  isGeneratingSummary = false;
  showFamily = false;
  showMonitoring = false;
  valid_form = false;
  valid_form_success = false;

  text_success = '';
  text_validation = '';

  selectedValueProvider!: string;
  selectedValueRBT!: string;
  selectedValueBCBA!: string;
  selectedValueTimeIn = '';
  selectedValueTimeOut = '';
  selectedValueTimeIn2 = '';
  selectedValueTimeOut2 = '';
  selectedValueProviderName!: string;
  selectedValueMaladaptive!: string;
  selectedValueRendering!: string;
  selectedValueAba!: string;
  selectedValueCode!: string;
  option_selected = 0;
  totalMinutos = 0;
  total_hour_session = '';

  selectedValueProviderRBT_id:number
  selectedValueBcba_id:number

  client_id: string | number;
  patient_id: number;
  patient_identifier: string ;
  doctor_id: string | number;
  patient_selected: any;
  client_selected: any;
  bip_id: string | number;
  user: AppUser;

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
  session_length_total = '';
  session_length_total2 = '';
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

  porcent_of_occurrences = 0;
  porcent_of_correct_response = 0;
  maladaptive = '';
  replacement = '';
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
  IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED: any = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA: any;
  IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED: any = 'assets/img/user-06.jpg';

  rbt_id: any;
  bcba_id: any;
  maladaptivename: any;
  replacementName: any;
  note_rbt_id: any;
  goal: any;
  note_id: any;
  location: any;
  birth_date = '';
  rendering_provider: any;

  roles_rbt = [];
  roles_bcba = [];

  hours_days = [];
  specialists = [];
  maladaptives = [];
  replacementGoals = [];
  intervention_added = [];
  replacements = [];

  maladaptiveSelected: any = null;
  replacementSelected: any = null;
  lto: any = null;
  caregiver_goal: any = null;
  maladp_added = [];
  replacement_added = [];
  pa_assessments: string;
  pa_assessmentsgroup = [];
  familiEnvolments = [];
  monitoringEvaluatingPatientIds = [];
  caregivers_training_goals = [];
  rbt_training_goals = [];
  posGruoup = [];
  note_description: any;
  insurer_name: any;
  services: any;
  insurer_id: any;
  cpt: number;
  roles: string[];
  electronic_signature: any;
  doctor: any;
  full_name: any;
  patientLocation_id: number;
  insurance_id: number;
  insurance_identifier: string;

  pa_services: PaService[] = [];
  selectedPaService: PaService | null = null;
  projectedUnits = 0;

  constructor(
    private bipService: BipService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private noteBcbaService: NoteBcbaService,
    private doctorService: DoctorService,
    private insuranceService: InsuranceService,
    private locations: Location
  ) {}

  ngOnInit(): void {
    //
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id'];
    });
    this.getConfig();
    this.getProfileBip();

    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.roles = this.user.roles;
    this.doctor_id = this.user.id;
    this.getDoctor();
    this.specialistData();
  }

  goBack() {
    this.locations.back(); // <-- go back to previous location on cancel
  }

  getDoctor() {
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp) => {
      this.doctor = resp.user;
      this.electronic_signature = resp.user.electronic_signature;
      this.full_name = resp.user.full_name;
    });
  }

  getConfig() {
    this.noteBcbaService.listConfigNote().subscribe((resp) => {
      // console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.specialists = resp.specialists;

      this.FILE_SIGNATURE_RBT = resp.roles_rbt.electronic_signature;
      this.FILE_SIGNATURE_BCBA = resp.roles_bcba.electronic_signature;
    });
  }

  getProfileBip() {
    this.bipService.showBipProfile(this.patient_identifier).subscribe((resp) => {
      this.client_selected = resp.patient;
      console.log('cliente',resp);

      this.first_name = this.client_selected.first_name;
      this.last_name = this.client_selected.last_name;
      this.patientLocation_id = this.client_selected.location_id;
      this.pos = this.client_selected.pos_covered;

      this.patient_id = this.client_selected.id;
      this.patient_identifier = this.client_selected.patient_identifier;
      this.patientLocation_id = this.client_selected.location_id;
      this.insurance_id = resp.patient.insurer_id;
      this.insurance_identifier = resp.patient.insurance_identifier;
      
      // this.pos = JSON.parse(resp.patient.pos_covered) ;

      // let jsonObjPOS = JSON.parse(this.pos) || '';
      // this.posGruoup = jsonObjPOS;
      // console.log(this.posGruoup);
      console.log(this.pos);

      this.birth_date = this.client_selected.birth_date
        ? new Date(this.client_selected.birth_date).toISOString()
        : '';
      console.log(this.birth_date);
      this.diagnosis_code = this.client_selected.diagnosis_code;
      this.insurer_id = this.client_selected.insurer_id;

      this.selectedValueAba = resp.patient.clin_director_id;
      this.selectedValueRendering = resp.patient.bcba_id;
      this.selectedValueBCBA = resp.patient.clin_director_id;
      this.selectedValueRBT = resp.patient.bcba_id;

      this.getReplacementsByPatientId();
      this.getMaladaptivesBipByPatientId();
      this.insuranceData();
      this.pa_services = resp.patient.pa_services;
    });
  }

  insuranceData() {
    this.insuranceService.get(this.insurer_id).subscribe((resp) => {
      console.log(resp);
      this.insurer_name = resp.insurer_name;
      // this.notes = resp.notes;
      this.services = resp.services;
    });
  }

  getReplacementsByPatientId() {
    this.noteBcbaService
      .showReplacementbyPatient(this.patient_identifier)
      .subscribe((resp) => {
        console.log(resp);
        this.familiEnvolments = resp.familiEnvolments;
        this.caregivers_training_goals =
          resp.familiEnvolments.data?.[0]?.caregivers_training_goals ?? [];
        this.monitoringEvaluatingPatientIds =
          resp.monitoringEvaluatingPatientIds;
        this.rbt_training_goals =
          resp.monitoringEvaluatingPatientIds.data?.[0]?.rbt_training_goals ??
          [];

        
      });
  }

  specialistData() {
    this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp) => {
      // console.log(resp);
      this.provider_credential = resp.doctor.certificate_number;
      // this.notes = resp.notes;
      // this.services = resp.services;
    });
  }

  specialistDataSupervisor(selectedValueAba) {
    this.doctorService.showDoctorProfile(selectedValueAba).subscribe((resp) => {
      // console.log(resp);
      this.provider_credential = resp.doctor.certificate_number;
      // this.notes = resp.notes;
      // this.services = resp.services;
    });
  }
  getCPtList(selectedValueCode) {
    // this.doctorService.showDoctorProfile(selectedValueCode).subscribe((resp:any)=>{
    //   // console.log(resp);
    //   this.unitsAsignated = resp.doctor.certificate_number;
    //   // this.notes = resp.notes;
    //   // this.services = resp.services;
    // })
  }

  getMaladaptivesBipByPatientId() {
    this.bipService
      .getBipProfilePatient_id(this.patient_identifier)
      .subscribe((resp) => {
        console.log(resp);
        // this.maladaptives = resp.bip.maladaptives;
        this.bip_id = resp.id;
      });
  }

  // selectSpecialist(event:any){
  //   event = this.selectedValueRendering;
  //   this.specialistData(this.selectedValueRendering);
  //   console.log(this.selectedValueRendering);

  // }
  selectSpecialistab(event) {
    this.selectedValueAba = event.value;
    // event = this.selectedValueAba;
    this.specialistDataSupervisor(this.selectedValueAba);
  }


  speciaFirmaData(selectedValueRBT) {
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp) => {
      console.log(resp);
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED =
        resp.doctor.electronic_signature;
      // this.notes = resp.notes;
      // this.services = resp.services;
    });
  }
  
  selectFirmaSpecialistRbt(event) {
    event = this.selectedValueProviderRBT_id;
    this.speciaFirmaData(this.selectedValueProviderRBT_id);
    console.log(this.selectedValueProviderRBT_id);
  }

  speciaFirmaDataBcba(selectedValueBCBA) {
    this.doctorService
      .showDoctorProfile(selectedValueBCBA)
      .subscribe((resp) => {
        console.log(resp);
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED =
          resp.doctor.electronic_signature;
        console.log(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
        // this.notes = resp.notes;
        // this.services = resp.services;
      });
  }

  selectFirmaSpecialistBcba(event) {
    // event = this.selectedValueBCBA;
    this.speciaFirmaDataBcba(this.selectedValueBcba_id);
    console.log('selectFirmaSpecialistBcba', this.selectedValueBcba_id, event);
  }

  hourTimeInSelected(value: string) {
    this.selectedValueTimeIn = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }
  hourTimeOutSelected(value: string) {
    this.selectedValueTimeOut = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }
  hourTimeIn2Selected(value: string) {
    this.selectedValueTimeIn2 = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }
  hourTimeOut2Selected(value: string) {
    this.selectedValueTimeOut2 = value;
    this.calculateProjectedUnits();
    this.calculateTotalHours();
  }


  calculateTotalHours() {
    const timeIn1 = this.convertToMinutes(this.selectedValueTimeIn);
    const timeOut1 = this.convertToMinutes(this.selectedValueTimeOut);
    const timeIn2 = this.convertToMinutes(this.selectedValueTimeIn2);
    const timeOut2 = this.convertToMinutes(this.selectedValueTimeOut2);

    const totalMinutes = (timeOut1 - timeIn1) + (timeOut2 - timeIn2);
    const totalHours = this.convertToHours(totalMinutes);
    this.total_hour_session = totalHours;
    console.log(`Total hours: ${totalHours}`);
    console.log('para el html', this.total_hour_session);
}

convertToMinutes(time: string): number {
  if (!time || !time.includes(':')) {
    console.error(`Invalid time format: ${time}`);
        return 0; // O manejar el error de otra manera
    }

    const [hours, minutes] = time.split(':').map(Number);

    // Validar que hours y minutes sean números válidos
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        console.error(`Invalid time values: hours=${hours}, minutes=${minutes}`);
        return 0; // O manejar el error de otra manera
    }

    return hours * 60 + minutes;
}

convertToHours(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}


  updateCaregiverGoal(index: number) {
    console.log(
      'Caregiver goal updated:',
      this.caregivers_training_goals[index]
    );
  }

  updateRbtGoal(index: number) {
    console.log('RBT goal updated:', this.rbt_training_goals[index]);
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
      (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = reader2.result);
  }

  // eslint-disable-next-line no-debugger
  save() {debugger
    this.text_validation = '';
    if (
      // !this.rbt_training_goals ||
      // !this.caregivers_training_goals ||
      !this.meet_with_client_at ||
      !this.session_date
    ) {
      this.text_validation = 'All Fields (*) are required';
      return;
    }
    if (!this.selectedValueAba) {
      this.text_validation = 'ABA Supervisor must be selected';
      return;
    }

    if (!this.selectedPaService) {
      this.text_validation = 'Please select a service';
      return;
    }

    const formData = new FormData();
    formData.append('summary_note', this.summary_note);

    formData.append('patient_id', this.patient_id + '');
    formData.append('patient_identifier', this.patient_identifier);
    formData.append('doctor_id', this.doctor_id + '');
    formData.append('bip_id', this.bip_id + '');

    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('location', this.location);
    formData.append('birth_date', this.birth_date);

    formData.append('rendering_provider', this.doctor_id + '');
    formData.append('provider_id', this.doctor_id + '');
    formData.append('supervisor_id', this.selectedValueAba + '');
    formData.append('aba_supervisor', this.selectedValueAba + '');
    formData.append('pa_service_id', this.selectedPaService.id.toString());
    formData.append('cpt_code', this.selectedPaService.cpt);
    formData.append('meet_with_client_at', this.meet_with_client_at);

    formData.append('provider_name', this.doctor_id + '');
    formData.append('supervisor_name', this.selectedValueBCBA);
    
    formData.append('insurance_id', this.insurance_id+''); // id del seguro preferiblemente que solo agarre la data al crear
    formData.append('insurance_identifier', this.insurance_identifier); // id del seguro preferiblemente que solo agarre la data al crear

    formData.append(
      'rbt_training_goals',
      JSON.stringify(this.rbt_training_goals)
    );
    formData.append(
      'caregiver_goals',
      JSON.stringify(this.caregivers_training_goals)
    );

    formData.append('session_date', this.session_date);

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

    // formData.append('imagen', this.FILE_SIGNATURE_RBT);
    // formData.append('imagenn', this.FILE_SIGNATURE_BCBA);

    formData.append('provider_signature', this.doctor.electronic_signature);

    if (this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED) {
      formData.append(
        'supervisor_signature',
        this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED
      );
    }

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

    this.noteBcbaService.create(formData).subscribe((resp) => {
      // console.log(resp);

      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        this.text_success = 'Note BCBA created';
        // this.ngOnInit();
        Swal.fire('Created', ` Note BCBA Created`, 'success');
        this.router.navigate([AppRoutes.noteBcba.list, this.patient_identifier]);
      }
    });
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
  //

  generateAISummary() {
    if (!this.checkDataSufficient()) {
      Swal.fire('Warning', 'Please fill all the required fields', 'warning');
      return;
    }
    this.isGeneratingSummary = true;
    const data = {
      diagnosis: this.diagnosis_code,
      birthDate: this.birth_date,
      startTime: this.selectedValueTimeIn ? this.selectedValueTimeIn : null,
      endTime: this.selectedValueTimeOut ? this.selectedValueTimeOut : null,
      startTime2: this.selectedValueTimeIn2 ? this.selectedValueTimeIn2 : null,
      endTime2: this.selectedValueTimeOut2 ? this.selectedValueTimeOut2 : null,
      pos: this.getPos(this.meet_with_client_at),
      caregiverGoals: this.caregivers_training_goals.map((g) => ({
        goal: g.caregiver_goal,
        percentCorrect: g.porcent_of_correct_response,
      })),
      rbtTrainingGoals: this.rbt_training_goals.map((g) => ({
        goal: g.lto,
        percentCorrect: g.porcent_of_correct_response,
      })),
      noteDescription: this.note_description,
    };

    this.noteBcbaService.generateAISummary(data).subscribe(
      (response: any) => {
        this.summary_note = response.summary;
        this.isGeneratingSummary = false;
      },
      (error) => {
        console.error('Error generating AI summary:', error);
        Swal.fire(
          'Error',
          'Error generating AI summary. Please try again.',
          'error'
        );
        this.isGeneratingSummary = false;
      }
    );
  }

  checkDataSufficient(): boolean {
    if (!this.client_selected) return false;

    const hasTime = this.selectedValueTimeIn && this.selectedValueTimeOut;
    if (!hasTime) return false;

    if (!this.meet_with_client_at) return false;

    if (
      !this.caregivers_training_goals ||
      this.caregivers_training_goals.length === 0
    )
      return false;
    const allCaregiverGoalsValid = this.caregivers_training_goals.every(
      (g) =>
        g.caregiver_goal &&
        g.porcent_of_correct_response !== undefined &&
        g.porcent_of_correct_response !== null
    );
    if (!allCaregiverGoalsValid) return false;

    if (!this.rbt_training_goals || this.rbt_training_goals.length === 0)
      return false;
    const allRbtGoalsValid = this.rbt_training_goals.every(
      (g) =>
        g.lto &&
        g.porcent_of_correct_response !== undefined &&
        g.porcent_of_correct_response !== null
    );
    if (!allRbtGoalsValid) return false;

    // if (!this.note_description) return false;

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

  onPaServiceSelect(event: any) {
    const service = event.value;
    if (service) {
      this.selectedValueCode = service.cpt;
      // console.log(this.selectedValueCode);
      this.showFamily = false;
      this.showMonitoring = false;
      
      if(service.cpt === '97155' ){
        this.showFamily = true;
      }
      if(service.cpt === '97156' ){
        this.showMonitoring = true;
      }
    }
  }

  calculateUnitsFromTime(startTime: string, endTime: string): number {
    if (!startTime || !endTime) return 0;

    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);

    if (!start || !end) return 0;

    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return Math.ceil(durationMinutes / 15);
  }

  parseTime(timeStr: string): Date | null {
    if (!timeStr) return null;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  calculateProjectedUnits(): void {
    let totalUnits = 0;

    if (this.selectedValueTimeIn && this.selectedValueTimeOut) {
      const morningUnits = this.calculateUnitsFromTime(
        this.selectedValueTimeIn,
        this.selectedValueTimeOut
      );
      totalUnits += morningUnits;
    }

    if (this.selectedValueTimeIn2 && this.selectedValueTimeOut2) {
      const afternoonUnits = this.calculateUnitsFromTime(
        this.selectedValueTimeIn2,
        this.selectedValueTimeOut2
      );
      totalUnits += afternoonUnits;
    }

    this.projectedUnits = totalUnits;
  }
}
