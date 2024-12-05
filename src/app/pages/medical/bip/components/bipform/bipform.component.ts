import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { AuthService } from 'src/app/core/auth/auth.service';


interface Doctor {
  id: number;
  full_name: string;
  avatar: string | null;
}

interface AssestmentConductedOption {
  index: number;
  assestment_title: string;
  assestment_status: string;
}

interface AssestmentEvaluationSetting {
  index: number;
  other: string;
  tangible: string;
  activities: string;
}

interface PrevalentSettingEventAndAtecedent {
  index: number;
  prevalent_setting_event_and_atecedent: string;
  behavior: string;
  hypothesized_functions: string;
}

interface Intervention {
  index: number;
  titleIntervention: string;
  descriptionIntervention: string;
}

interface Tangible {
  index: number;
  preventive_strategies: string;
  manager_strategies: string;
}

interface Attention {
  index: number;
  preventive_strategies_a: string;
  replacement_skills_a: string;
  manager_strategies_a: string;
}

interface Escape {
  index: number;
  preventive_strategies_e: string;
  replacement_skills_e: string;
  manager_strategies_e: string;
}

interface Sensory {
  index: number;
  preventive_strategies_s: string;
  replacement_skills_s: string;
  manager_strategies_s: string;
}

interface BIP {
  id: number;
  type_of_assessment: number;
  doctor_id: number;
  doctor: Doctor;
  patient_id: string;
  background_information: string;
  previus_treatment_and_result: string;
  current_treatment_and_progress: string;
  education_status: string;
  phisical_and_medical_status: string;
  assestment_conducted: string;
  strengths: string;
  weakneses: string;
  documents_reviewed: string[];
  maladaptives: any; // or specific type if known
  assestment_conducted_options: AssestmentConductedOption[];
  assestmentEvaluationSettings: AssestmentEvaluationSetting[];
  prevalent_setting_event_and_atecedents: PrevalentSettingEventAndAtecedent[];
  interventions: Intervention[];
  goal_stos: any; // or specific type if known
  goal_ltos: any; // or specific type if known
  hypothesis_based_intervention: string;
  tangibles: Tangible[];
  attention: Attention[];
  escape: Escape[];
  sensory: Sensory[];
  phiysical_and_medical: string;
  phiysical_and_medical_status: any[]; // specify type if known
  reduction_goal: any[]; // specify type if known
  sustitution_goal: any[]; // specify type if known
  family_envolment: any[]; // specify type if known
  monitoring_evalutating: any[]; // specify type if known
  generalization_training: any[]; // specify type if known
  crisis_plan: any[]; // specify type if known
  de_escalation_technique: any[]; // specify type if known
  consent_to_treatment: any[]; // specify type if known
  created_at: string; // date string
}

interface PatientBIP {
  patient_id: string;
  bip: BIP;
  type_of_assessment: number;
  documents_reviewed: string[];
  maladaptives: any[]; // specify type if known
  assestment_conducted_options: AssestmentConductedOption[];
  prevalent_setting_event_and_atecedents: PrevalentSettingEventAndAtecedent[];
  interventions: Intervention[];
  assestmentEvaluationSettings: AssestmentEvaluationSetting[];
  tangibles: Tangible[];
  attention: Attention[];
  escape: Escape[];
  sensory: Sensory[];
  phiysical_and_medical_status: any[]; // specify type if known
}


@Component({
  selector: 'app-bip-form',
  templateUrl: './bipform.component.html',
  styleUrls: ['./bipform.component.scss'],
})
export class BipFormComponent implements OnInit, OnChanges {
  routes = AppRoutes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() clientSelected: any;

  valid_form_success = false;
  text_validation = '';
  text_success = '';
  option_selected = 1;

  first_name = '';
  last_name = '';
  phone = '';
  parent_guardian_name = '';
  relationship = '';
  address = '';
  age = 0;
  dob = '';

  medical = [];
  description: any;
  name_medical: any;
  uso: any;

  client_id: number;
  id: number;
  patient_id: number;
  patient_identifier: string;
  doctor_id: number;
  user: AppUser;

  type_of_assessment: any;
  background_information: any;
  client_selected: any;
  bip_selected: any;
  previus_treatment_and_result: any;
  current_treatment_and_progress: any;
  education_status: any;
  phisical_and_medical_status: any;

  assestment_conducted: any;
  assestment_conducted_options: any;

  reduction = [];
  maladaptive = [];

  documents = [];
  document_title: string;

  //maladaptives

  maladaptives = [];

  maladaptive_behavior: any;
  topografical_definition: any;
  baseline_level: any;
  baseline_date: any;
  initial_interesting: any;
  current_intensity: any;

  maladaptive_edit: any = {};
  medication_edit: any = {};
  evaluation_edit: any = {};
  prevalent_edit: any = {};
  sensory_edit: any = {};
  escape_edit: any = {};
  intervention_edit: any = {};
  atention_edit: any = {};
  tangible_edit: any = {};

  //assestments
  assesstments = [];
  assesstmentsDocuments = [];
  assestmentEvaluationSettings = [];
  accesstoTangibles = [];
  accesstoSensories = [];
  accesstoAttention = [];
  accesstoEscape = [];
  assestment_title: any;
  assestment_status: any;
  tangible: any;
  activities: any;
  other: any;

  // created comments by Malcolm Cordova at 4 feb 2004
  // mercadocreativo@gmail.com
  // @malcolmcordova

  //
  prevalent_setting_event_and_atecedents = [];
  prevalent_setting_event_and_atecedent: any;
  behavior: any;
  hypothesized_functions: any;
  strengths: any;
  weakneses: any;

  hypothesis_based_intervention: any;

  preventive_strategies: any;
  replacement_skills: any;
  manager_strategies: any;

  preventive_strategies_s: any;
  replacement_skills_s: any;
  manager_strategies_s: any;

  preventive_strategies_e: any;
  replacement_skills_e: any;
  manager_strategies_e: any;

  preventive_strategies_a: any;
  replacement_skills_a: any;
  manager_strategies_a: any;

  medication: any;
  dose: any;
  frecuency: any;
  reason: any;
  preescribing_physician: any;
  phiysical_and_medical: any;

  interventions = [];
  phiysicalAndMedicalSt = [];
  phiysical_and_medical_status = [];

  pairing: any;
  premack_principal: any;
  response_block: any;
  dro: any;
  dra: any;
  errorless_teaching: any;
  redirection: any;
  ncr: any;
  shaping: any;
  chaining: any;
  title: any;
  descriptionIntervention: any;
  titleIntervention: any;

  patient_selected: any;
  bip_id: any;
  bip_selectedid: any;

  inteventionSelected: any;
  access_to_tangibles = [];

  constructor(
    private bipService: BipService,
    private ativatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
    });
    // this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); //se pide el id del bip creado para traer la info necesaria
    this.user = this.authService.user as AppUser;
    this.doctor_id = this.user?.id; //se asigna el doctor logueado a este campo para poderlo enviar en los

    this.accesstoSensories = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientSelected']) {
      this.handleClientSelectedChange();
      console.log('clientSelected changed:', this.clientSelected);
    }
  }

  private handleClientSelectedChange() {
    if (this.clientSelected) {
      this.first_name = this.clientSelected.first_name;
      this.last_name = this.clientSelected.last_name;
      this.patient_identifier = this.clientSelected.patient_identifier;
      this.phone = this.clientSelected.phone;
      this.parent_guardian_name = this.clientSelected.parent_guardian_name;
      this.relationship = this.clientSelected.relationship;
      this.address = this.clientSelected.address;
      this.age = this.clientSelected.age;
      this.dob = this.clientSelected.dob;
    }
  }

  //se obtiene el perfil del usuario, por el cliente_id  que seria igual al id de la url
  // getProfileBip() {
  //   this.bipService.showBipProfile(this.patient_identifier).subscribe((resp) => {
  //     // console.log(resp);
  //     this.client_selected = resp.patient; // asignamos el objeto a nuestra variable

  //     //traemos la info del usuario
  //     if (this.client_selected.type !== null) {
  //       // si hay o no informacion del paciente
  //       if (this.client_selected.eligibility === 'yes') {
  //         // si el status es positivo para proceder
  //         this.first_name = this.client_selected.first_name;
  //         this.last_name = this.client_selected.last_name;
  //         this.patient_identifier = this.client_selected.patient_identifier;
  //         this.phone = this.client_selected.phone;
  //         this.parent_guardian_name =
  //           this.client_selected.parent_guardian_name;
  //         this.relationship = this.client_selected.relationship;
  //         this.address = this.client_selected.address;
  //         this.age = this.client_selected.age;
  //         this.dob = this.client_selected.dob;
  //       }
  //     }
  //   });
  // }
  //obtenemos el bip por el id..
  getBip() {
    if (this.patient_identifier !== null && this.patient_identifier !== undefined) {
      this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
        console.log(resp);

        this.bip_selected = resp; //asigamos una variable a la respuesta
        this.bip_selectedid = resp.bip.id; //obtenemos de nuevo el bip pero para verificar si es actualizar o crear en la funcion

        this.type_of_assessment = this.bip_selected.type_of_assessment;

        (this.background_information =
          this.bip_selected.bip.background_information),
          (this.previus_treatment_and_result =
            this.bip_selected.bip.previus_treatment_and_result),
          (this.current_treatment_and_progress =
            this.bip_selected.bip.current_treatment_and_progress),
          (this.education_status = this.bip_selected.bip.education_status),
          (this.phisical_and_medical_status =
            this.bip_selected.bip.phisical_and_medical_status),
          (this.assestment_conducted =
            this.bip_selected.bip.assestment_conducted),
          (this.strengths = this.bip_selected.bip.strengths);
        this.weakneses = this.bip_selected.bip.weakneses;

        this.documents = this.bip_selected.documents_reviewed;
        console.log(this.documents);
        
        this.maladaptives = this.bip_selected.maladaptives;
        this.maladaptive_behavior = this.bip_selected.maladaptives?.[0].title;

        this.assesstments = this.bip_selected.assestment_conducted_options;
        this.assesstmentsDocuments =
          this.bip_selected.assestment_conducted_options;

        this.hypothesis_based_intervention =
          this.bip_selected.bip.hypothesis_based_intervention;
        this.assestmentEvaluationSettings =
          this.bip_selected.assestmentEvaluationSettings;

        this.accesstoTangibles = this.bip_selected.tangibles;
        this.accesstoAttention = this.bip_selected.attention;
        this.accesstoEscape = this.bip_selected.escape;
        this.accesstoSensories = this.bip_selected.sensory;

        this.phiysical_and_medical =
          this.bip_selected.bip.phiysical_and_medical;
        this.phiysical_and_medical_status =
          this.bip_selected.phiysical_and_medical_status;

        this.prevalent_setting_event_and_atecedents =
          this.bip_selected.prevalent_setting_event_and_atecedents;
        this.interventions = this.bip_selected.interventions;
      });
    }
  }
  //manejo de listas para json

  addDocument() {
    if (this.documents) {
      this.documents.push({
        index: this.documents.length + 1,
        title: this.document_title,
      });
    } else {
      this.documents = [
        {
          index: 1, // initial index
          title: this.document_title,
        },
      ];
    }

    this.document_title = '';
  }

  deleteDocument(i: any) {
    this.documents.splice(i, 1);
  }

  addMedication() {
    if (this.phiysical_and_medical_status) {
      this.phiysical_and_medical_status.push({
        index: this.phiysical_and_medical_status.length + 1,
        medication: this.medication,
        dose: this.dose,
        frecuency: this.frecuency,
        reason: this.reason,
        preescribing_physician: this.preescribing_physician,
      });
    } else {
      this.phiysical_and_medical_status = [
        {
          index: 1, // initial index
          medication: this.medication,
          dose: this.dose,
          frecuency: this.frecuency,
          reason: this.reason,
          preescribing_physician: this.preescribing_physician,
        },
      ];
    }

    this.medication = '';
    this.dose = '';
    this.frecuency = '';
    this.reason = '';
    this.preescribing_physician = '';
  }

  deleteMedication(i: any) {
    this.phiysical_and_medical_status.splice(i, 1);
  }

  updateItemListMedications(medication: any, index: number) {
    this.phiysical_and_medical_status[index] = medication;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }
  seleccionarParaEditM(medication: any) {
    const selectedMedication = this.phiysical_and_medical_status.find(
      (item) => item.index === medication.index
    );
    if (selectedMedication) {
      this.medication_edit = selectedMedication;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedMedication.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  addMaladaptive() {
    if (this.maladaptives) {
      this.maladaptives.push({
        index: this.maladaptives.length + 1,
        maladaptive_behavior: this.maladaptive_behavior,
        topografical_definition: this.topografical_definition,
        baseline_level: this.baseline_level,
        baseline_date: this.baseline_date,
        initial_interesting: this.initial_interesting,
        current_intensity: this.current_intensity,
      });
    } else {
      this.maladaptives = [
        {
          index: 1, // initial index
          maladaptive_behavior: this.maladaptive_behavior,
          topografical_definition: this.topografical_definition,
          baseline_level: this.baseline_level,
          baseline_date: this.baseline_date,
          initial_interesting: this.initial_interesting,
          current_intensity: this.current_intensity,
        },
      ];
    }

    this.maladaptive_behavior = '';
    this.topografical_definition = '';
    this.baseline_level = '';
    this.baseline_date = '';
    this.initial_interesting = '';
    this.current_intensity = '';
  }

  deleteMaladaptive(i: any) {
    this.maladaptives.splice(i, 1);
  }

  seleccionarParaEditMal(maladap: any) {
    const selectedMaladaptive = this.maladaptives.find(
      (item) => item.index === maladap.index
    );
    if (selectedMaladaptive) {
      this.maladaptive_edit = selectedMaladaptive;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedMaladaptive.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateMaladaptive(maladap: any) {
    const index = this.maladaptives.findIndex(
      (item) => item.index === maladap.index
    );
    if (index !== -1) {
      this.maladaptives[index] = maladap;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  addEvaluationSettings() {
    if (this.assestmentEvaluationSettings) {
      this.assestmentEvaluationSettings.push({
        index: this.assestmentEvaluationSettings.length + 1,
        tangible: this.tangible,
        activities: this.activities,
        other: this.other,
      });
    } else {
      this.assestmentEvaluationSettings = [
        {
          index: 1, // initial index
          tangible: this.tangible,
          activities: this.activities,
          other: this.other,
        },
      ];
    }

    this.tangible = '';
    this.activities = '';
    this.other = '';
  }

  deleteEvaluationSetting(i: any) {
    this.assestmentEvaluationSettings.splice(i, 1);
  }

  updateItemListEvaluationSetting(evaluation: any) {
    const index = this.assestmentEvaluationSettings.findIndex(
      (item) => item.index === evaluation.index
    );
    if (index !== -1) {
      this.assestmentEvaluationSettings[index] = evaluation;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  seleccionarParaEva(evaluation: any) {
    const selectedEvaluation = this.assestmentEvaluationSettings.find(
      (item) => item.index === evaluation.index
    );
    if (selectedEvaluation) {
      this.evaluation_edit = selectedEvaluation;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedEvaluation.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  addAssesstmentDocument() {
    if (this.assesstmentsDocuments) {
      this.assesstmentsDocuments.push({
        index: this.assesstmentsDocuments.length + 1,
        assestment_title: this.assestment_title,
        assestment_status: this.assestment_status,
      });
    } else {
      this.assesstmentsDocuments = [
        {
          index: 1, // initial index
          assestment_title: this.assestment_title,
          assestment_status: this.assestment_status,
        },
      ];
    }

    this.assestment_title = '';
    this.assestment_status = '';
  }

  deleteAssesstmentDocument(i: any) {
    this.assesstmentsDocuments.splice(i, 1);
  }

  addPrevalent() {
    if (this.prevalent_setting_event_and_atecedents) {
      this.prevalent_setting_event_and_atecedents.push({
        index: this.prevalent_setting_event_and_atecedents.length + 1,
        prevalent_setting_event_and_atecedent:
          this.prevalent_setting_event_and_atecedent,
        behavior: this.behavior,
        hypothesized_functions: this.hypothesized_functions,
      });
    } else {
      this.prevalent_setting_event_and_atecedents = [
        {
          index: 1, // initial index
          prevalent_setting_event_and_atecedent:
            this.prevalent_setting_event_and_atecedent,
          behavior: this.behavior,
          hypothesized_functions: this.hypothesized_functions,
        },
      ];
    }
    this.prevalent_setting_event_and_atecedent = '';
    this.behavior = '';
    this.hypothesized_functions = '';
  }

  deletePrevalent(i: any) {
    this.prevalent_setting_event_and_atecedents.splice(i, 1);
  }

  seleccionarPrevalent(tang: any) {
    const selectedTangible = this.prevalent_setting_event_and_atecedents.find(
      (item) => item.index === tang.index
    );
    if (selectedTangible) {
      this.prevalent_edit = selectedTangible;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedTangible.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateItemListPrevalent(prevalent: any) {
    this.prevalent_edit = prevalent;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
    const index = this.prevalent_setting_event_and_atecedents.findIndex(
      (item) => item.index === prevalent.index
    );
    if (index !== -1) {
      this.prevalent_setting_event_and_atecedents[index] = prevalent;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  //Access to Tangibles/Attention/Attention/escape/sensory

  addTangible() {
    if (this.accesstoTangibles) {
      this.accesstoTangibles.push({
        index: this.accesstoTangibles.length + 1,
        preventive_strategies: this.preventive_strategies,
        replacement_skills: this.replacement_skills,
        manager_strategies: this.manager_strategies,
      });
    } else {
      this.accesstoTangibles = [
        {
          index: 1,
          preventive_strategies: this.preventive_strategies,
          replacement_skills: this.replacement_skills,
          manager_strategies: this.manager_strategies,
        },
      ];
    }
    this.preventive_strategies = '';
    this.replacement_skills = '';
    this.manager_strategies = '';
  }

  deleteTangible(i: any) {
    this.accesstoTangibles.splice(i, 1);
  }

  seleccionarTangible(tang: any) {
    const selectedTangible = this.accesstoTangibles.find(
      (item) => item.index === tang.index
    );
    if (selectedTangible) {
      this.tangible_edit = selectedTangible;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedTangible.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateItemListTangibles(tang: any) {
    this.tangible_edit = tang;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
    const index = this.accesstoTangibles.findIndex(
      (item) => item.index === tang.index
    );
    if (index !== -1) {
      this.accesstoTangibles[index] = tang;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  addSensory() {
    if (this.accesstoSensories) {
      this.accesstoSensories.push({
        index: this.accesstoSensories.length + 1,
        preventive_strategies_s: this.preventive_strategies_s,
        replacement_skills_s: this.replacement_skills_s,
        manager_strategies_s: this.manager_strategies_s,
      });
    } else {
      this.accesstoSensories = [
        {
          index: 1,
          preventive_strategies_s: this.preventive_strategies_s,
          replacement_skills_s: this.replacement_skills_s,
          manager_strategies_s: this.manager_strategies_s,
        },
      ];
    }
    this.preventive_strategies_s = '';
    this.replacement_skills_s = '';
    this.manager_strategies_s = '';
  }

  deleteSensory(i: any) {
    this.accesstoSensories.splice(i, 1);
  }

  updateItemListSensory(sensory: any) {
    this.sensory_edit = sensory;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
    const index = this.accesstoSensories.findIndex(
      (item) => item.index === sensory.index
    );
    if (index !== -1) {
      this.accesstoSensories[index] = sensory;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  seleccionarSensory(sensory: any) {
    const selectedSensory = this.accesstoSensories.find(
      (item) => item.index === sensory.index
    );
    if (selectedSensory) {
      this.sensory_edit = selectedSensory;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedSensory.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  addEscape() {
    if (this.accesstoEscape) {
      this.accesstoEscape.push({
        index: this.accesstoEscape.length + 1,
        preventive_strategies_e: this.preventive_strategies_e,
        replacement_skills_e: this.replacement_skills_e,
        manager_strategies_e: this.manager_strategies_e,
      });
    } else {
      this.accesstoEscape = [
        {
          index: 1,
          preventive_strategies_e: this.preventive_strategies_e,
          replacement_skills_e: this.replacement_skills_e,
          manager_strategies_e: this.manager_strategies_e,
        },
      ];
    }
    this.preventive_strategies_e = '';
    this.replacement_skills_e = '';
    this.manager_strategies_e = '';
  }

  deleteEscape(i: any) {
    this.accesstoEscape.splice(i, 1);
  }

  seleccionarEscape(escape: any) {
    const selectedEscape = this.accesstoAttention.find(
      (item) => item.index === escape.index
    );
    if (selectedEscape) {
      this.escape_edit = selectedEscape;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedEscape.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateItemListEscape(escape: any) {
    this.escape_edit = escape;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
    const index = this.accesstoAttention.findIndex(
      (item) => item.index === escape.index
    );
    if (index !== -1) {
      this.accesstoAttention[index] = escape;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  addAttention() {
    if (this.accesstoAttention) {
      this.accesstoAttention.push({
        index: this.accesstoAttention.length + 1,
        preventive_strategies_a: this.preventive_strategies_a,
        replacement_skills_a: this.replacement_skills_a,
        manager_strategies_a: this.manager_strategies_a,
      });
    } else {
      this.accesstoAttention = [
        {
          index: 1,
          preventive_strategies_a: this.preventive_strategies_a,
          replacement_skills_a: this.replacement_skills_a,
          manager_strategies_a: this.manager_strategies_a,
        },
      ];
    }
    this.preventive_strategies_a = '';
    this.replacement_skills_a = '';
    this.manager_strategies_a = '';
  }

  deleteAttention(i: any) {
    this.accesstoAttention.splice(i, 1);
  }

  seleccionarAttenti(attent: any) {
    const selectedAttention = this.accesstoAttention.find(
      (item) => item.index === attent.index
    );
    if (selectedAttention) {
      this.atention_edit = selectedAttention;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedAttention.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateItemListAttention(attent: any) {
    const index = this.accesstoAttention.findIndex(
      (item) => item.index === attent.index
    );
    if (index !== -1) {
      this.accesstoAttention[index] = attent;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  //Access to Tangibles/Attention

  addIntervention() {
    if (this.interventions) {
      this.interventions.push({
        index: this.interventions.length + 1,
        titleIntervention: this.titleIntervention,
        descriptionIntervention: this.descriptionIntervention,
      });
    } else {
      this.interventions = [
        {
          index: 1, // initial index
          titleIntervention: this.titleIntervention,
          descriptionIntervention: this.descriptionIntervention,
        },
      ];
    }

    this.titleIntervention = '';
    this.descriptionIntervention = '';
  }

  deleteIntervention(i: any) {
    this.interventions.splice(i, 1);
    this.interventions.forEach((intervention, index) => {
      intervention.index = index + 1;
    });
  }

  updateIntervention(intervention: any) {
    const index = this.interventions.findIndex(
      (item) => item.index === intervention.index
    );
    if (index !== -1) {
      this.interventions[index] = intervention;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  seleccionarParaEdit(intervention: any) {
    const selectedIntervention = this.interventions.find(
      (item) => item.index === intervention.index
    );
    if (selectedIntervention) {
      this.intervention_edit = selectedIntervention;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedIntervention.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  //fin listados

  save() {
    this.text_validation = '';
    if (
      !this.type_of_assessment ||
      !this.background_information ||
      !this.maladaptives ||
      !this.previus_treatment_and_result ||
      !this.education_status ||
      !this.phisical_and_medical_status
    ) {
      this.text_validation = 'All Fields (*) are required';
      // return;
    }

    const data = {
      id: this.bip_selectedid,
      client_id: this.client_selected.patient.id,
      patient_identifier: this.patient_identifier,
      doctor_id: this.doctor_id,

      type_of_assessment: this.type_of_assessment,

      documents_reviewed: this.documents,

      background_information: this.background_information,
      previus_treatment_and_result: this.previus_treatment_and_result,
      current_treatment_and_progress: this.current_treatment_and_progress,
      education_status: this.education_status,
      phisical_and_medical_status: this.phisical_and_medical_status,
      strengths: this.strengths,
      weakneses: this.weakneses,

      maladaptives: this.maladaptives,

      assestment_conducted: this.assestment_conducted,
      assestment_conducted_options: this.assesstmentsDocuments,

      assestmentEvaluationSettings: this.assestmentEvaluationSettings,

      hypothesis_based_intervention: this.hypothesis_based_intervention,

      phiysical_and_medical_status: this.phiysical_and_medical_status,

      tangibles: this.accesstoTangibles,
      attention: this.accesstoAttention,
      sensory: this.accesstoSensories,
      escape: this.accesstoEscape,
      interventions: this.interventions,

      phiysical_and_medical: this.phiysical_and_medical,

      prevalent_setting_event_and_atecedents:
        this.prevalent_setting_event_and_atecedents,
    };

    if (this.bip_selected) {
      //si  tiene bip se agrega a la informacion de la consulta

      this.bipService.update(data, this.bip_selectedid).subscribe((resp) => {
        Swal.fire('Updated', `Bip Updated successfully!`, 'success');
        this.ngOnInit();
      });
    } else {
      // si no viene crea el bip

      //crear
      this.bipService.createBip(data).subscribe((resp) => {
        // console.log(resp);
        // this.text_success = 'Se guardó la informacion de la cita médica'
        Swal.fire('Updated', `Bip Created successfully!`, 'success');
        this.ngOnInit();
      });
    }

    return false;
  }

  selectedIntervention(intervention: any) {
    this.inteventionSelected = intervention;
    // console.log(this.inteventionSelected);
  }
}
