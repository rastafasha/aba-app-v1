import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { CrisisPlanService } from '../../service/crisis-plan.service';
import { AppUser } from 'src/app/core/models/users.model';

@Component({
  selector: 'app-crisis-plan',
  templateUrl: './crisis-plan.component.html',
  styleUrls: ['./crisis-plan.component.scss'],
})
export class CrisisPlanComponent {
  valid_form_success = false;
  text_validation = '';
  text_success = '';

  client_id: any;
  user: AppUser;
  doctor_id: any;
  client_selected: any;
  patient_id: any;
  bip_selected: any;
  bip_selectedId: any;
  bip_selectedIdd: any;
  maladaptives: any;

  risk_factors: any;
  do_not_apply: any;
  elopement: any;
  assaultive_behavior: any;
  aggression: any;
  self_injurious_behavior: any;
  sexually_offending_behavior: any;
  fire_setting: any;
  current_substance_abuse: any;
  impulsive_behavior: any;
  psychotic_symptoms: any;
  self_mutilation_cutting: any;
  caring_for_ill_family_recipient: any;
  current_family_violence: any;
  dealing_with_significant: any;
  prior_psychiatric_inpatient_admission: any;
  other: any;

  suicidalities: any;
  not_present: any;
  ideation: any;
  plan: any;
  means: any;
  prior_attempt: any;

  homicidalities: any;
  not_present_homicidality: any;
  ideation_homicidality: any;
  plan_homicidality: any;
  means_homicidality: any;
  prior_attempt_homicidality: any;

  crisisPlans = [];
  caregiver_requirements_for_prevention_of_crisis = [];
  crisisplanId: any;
  crisis_description: any;
  crisis_note: any;
  client_id_crisisPlans: any;
  crisisid: any;

  constructor(
    private bipService: BipService,
    private crisisPlanService: CrisisPlanService,
    private ativatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // //inicia la vista siempre desde arriba

    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp) => {
      this.patient_id = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
      // this.getGoalbyPatient(); // se solicita la info del perfil del usuario
    });

    this.ativatedRoute.params.subscribe(({ id }) => this.getBip()); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del goal
    const USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
  }

  //obtenemos el perfil  del paciente por el id de la ruta
  getProfileBip() {
    this.bipService.showBipProfile(this.patient_id).subscribe((resp) => {
      // console.log('profilebip', resp);
      this.client_selected = resp; //convertimos la respuesta en un variable

      this.client_id = this.client_selected.patient.id;
      if (this.patient_id !== null) {
        this.getPatientGoalFamilyEnvolments(this.patient_id);
      }
    });
  }

  //obtenemos el bip por el id
  getBip() {
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp) => {
        // console.log('bip',resp);

        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives = this.bip_selected.maladaptives; //convertimos la respuesta en un variable
      });
    }
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_id si existe,
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalFamilyEnvolments(patient_id) {
    this.crisisPlanService
      .getCrisisPlanbyPatientId(patient_id)
      .subscribe((resp) => {
        console.log('goals sustition by patientid',resp);
        this.crisisPlans = resp.crisiPlanPatientIds.data;
        this.crisisplanId = resp.crisiPlanPatientIds.data[0].id;
        //risk list
        this.risk_factors = resp.crisiPlanPatientIds.data[0].risk_factors;
        this.other = resp.crisiPlanPatientIds.data[0].risk_factors[0].other;
        this.do_not_apply =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].do_not_apply;
        this.elopement =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].elopement;
        this.assaultive_behavior =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].assaultive_behavior;
        this.aggression =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].aggression;
        this.self_injurious_behavior =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].self_injurious_behavior;
        this.sexually_offending_behavior =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].sexually_offending_behavior;
        this.fire_setting =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].fire_setting;
        this.current_substance_abuse =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].current_substance_abuse;
        this.impulsive_behavior =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].impulsive_behavior;
        this.psychotic_symptoms =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].psychotic_symptoms;
        this.self_mutilation_cutting =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].self_mutilation_cutting;
        this.caring_for_ill_family_recipient =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].caring_for_ill_family_recipient;
        this.current_family_violence =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].current_family_violence;
        this.dealing_with_significant =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].dealing_with_significant;
        this.prior_psychiatric_inpatient_admission =
          resp.crisiPlanPatientIds.data[0].risk_factors[0].prior_psychiatric_inpatient_admission;

        this.suicidalities = resp.crisiPlanPatientIds.data[0].suicidalities;
        this.not_present =
          resp.crisiPlanPatientIds.data[0].suicidalities[0].not_present;
        this.ideation =
          resp.crisiPlanPatientIds.data[0].suicidalities[0].ideation;
        this.plan = resp.crisiPlanPatientIds.data[0].suicidalities[0].plan;
        this.means = resp.crisiPlanPatientIds.data[0].suicidalities[0].means;
        this.prior_attempt =
          resp.crisiPlanPatientIds.data[0].suicidalities[0].prior_attempt;

        this.homicidalities =
          resp.crisiPlanPatientIds.data[0].homicidalities;
        this.not_present_homicidality =
          resp.crisiPlanPatientIds.data[0].homicidalities[0].not_present_homicidality;
        this.ideation_homicidality =
          resp.crisiPlanPatientIds.data[0].homicidalities[0].ideation_homicidality;
        this.plan_homicidality =
          resp.crisiPlanPatientIds.data[0].homicidalities[0].plan_homicidality;
        this.means_homicidality =
          resp.crisiPlanPatientIds.data[0].homicidalities[0].means_homicidality;
        this.prior_attempt_homicidality =
          resp.crisiPlanPatientIds.data[0].homicidalities[0].prior_attempt_homicidality;

        this.crisis_description =
          resp.crisiPlanPatientIds.data[0].crisis_description;
        this.caregiver_requirements_for_prevention_of_crisis =
          resp.crisiPlanPatientIds.data[0].caregiver_requirements_for_prevention_of_crisis;
        this.crisis_note = resp.crisiPlanPatientIds.data[0].crisis_note;
        this.client_id_crisisPlans = resp.crisiPlanPatientIds.data[0].id;
        // this.goals = resp.goalReductionPatientIds;
        // console.log(this.goals);
      });
  }

  addRisk() {

    if (this.risk_factors) {
      this.risk_factors.push({
        do_not_apply: this.do_not_apply,
        elopement: this.elopement,
        assaultive_behavior: this.assaultive_behavior,
        aggression: this.aggression,
        self_injurious_behavior: this.self_injurious_behavior,
        sexually_offending_behavior: this.sexually_offending_behavior,
        fire_setting: this.fire_setting,
        current_substance_abuse: this.current_substance_abuse,
        impulsive_behavior: this.impulsive_behavior,
        psychotic_symptoms: this.psychotic_symptoms,
        self_mutilation_cutting: this.self_mutilation_cutting,
        caring_for_ill_family_recipient: this.caring_for_ill_family_recipient,
        current_family_violence: this.current_family_violence,
        dealing_with_significant: this.dealing_with_significant,
        prior_psychiatric_inpatient_admission:
          this.prior_psychiatric_inpatient_admission,
        other: this.other,
      });
    } else {
      this.risk_factors = [
        {
          do_not_apply: this.do_not_apply,
          elopement: this.elopement,
          assaultive_behavior: this.assaultive_behavior,
          aggression: this.aggression,
          self_injurious_behavior: this.self_injurious_behavior,
          sexually_offending_behavior: this.sexually_offending_behavior,
          fire_setting: this.fire_setting,
          current_substance_abuse: this.current_substance_abuse,
          impulsive_behavior: this.impulsive_behavior,
          psychotic_symptoms: this.psychotic_symptoms,
          self_mutilation_cutting: this.self_mutilation_cutting,
          caring_for_ill_family_recipient: this.caring_for_ill_family_recipient,
          current_family_violence: this.current_family_violence,
          dealing_with_significant: this.dealing_with_significant,
          prior_psychiatric_inpatient_admission:
            this.prior_psychiatric_inpatient_admission,
          other: this.other,
        },
      ];
    }
    console.log(this.risk_factors);

    //si existe un elemento actualiza ese elemento en la lista
    if (this.risk_factors.length > 0) {
      this.risk_factors.splice(this.risk_factors, 1);
      Swal.fire('Updated', `Risk option added!`, 'success');
    } else {
      Swal.fire('Warning', `Must add less one`, 'warning');
    }
  }

  deleteRisk(i: any) {
    this.risk_factors.splice(i, 1);
  }

  addSuicidality() {

    if (this.suicidalities) {
      this.suicidalities.push({
        not_present: this.not_present,
        ideation: this.ideation,
        plan: this.plan,
        means: this.means,
        prior_attempt: this.prior_attempt,
      });
    } else {
      this.suicidalities = [
        {
          not_present: this.not_present,
          ideation: this.ideation,
          plan: this.plan,
          means: this.means,
          prior_attempt: this.prior_attempt,
        },
      ];
    }
    console.log(this.suicidalities);
    //si existe un elemento actualiza ese elemento en la lista
    if (this.suicidalities.length > 0) {
      this.suicidalities.splice(this.suicidalities, 1);
      Swal.fire('Updated', `Suicidality option added!`, 'success');
    } else {
      Swal.fire('Warning', `Must add less one`, 'warning');
    }
    
  }

  deleteSuicidality(i: any) {
    this.suicidalities.splice(i, 1);
  }
  addHomicidality() {

    if (this.homicidalities) {
      this.homicidalities.push({
        not_present_homicidality: this.not_present_homicidality,
      ideation_homicidality: this.ideation_homicidality,
      plan_homicidality: this.plan_homicidality,
      means_homicidality: this.means_homicidality,
      prior_attempt_homicidality: this.prior_attempt_homicidality,
      });
    } else {
      this.homicidalities = [
        {
          not_present_homicidality: this.not_present_homicidality,
      ideation_homicidality: this.ideation_homicidality,
      plan_homicidality: this.plan_homicidality,
      means_homicidality: this.means_homicidality,
      prior_attempt_homicidality: this.prior_attempt_homicidality,
        },
      ];
    }
    console.log(this.homicidalities);
    //si existe un elemento actualiza ese elemento en la lista
    if (this.homicidalities.length > 0) {
      this.homicidalities.splice(this.homicidalities, 1);
      Swal.fire('Updated', `Homicidality option added!`, 'success');
    } else {
      Swal.fire('Warning', `Must add less one`, 'warning');
    }
  }

  deleteHomicidality(i: any) {
    this.homicidalities.splice(i, 1);
  }

  save() {debugger
    this.text_validation = '';
    // if(!this.crisis_description || !this.crisis_note || !this.caregiver_requirements_for_prevention_of_crisis){
    //   this.text_validation = 'All Fields (*) are required';
    //   return;
    // }

    const data = {
      id: this.crisisplanId,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
      crisis_description: this.crisis_description,
      crisis_note: this.crisis_note,
      caregiver_requirements_for_prevention_of_crisis:
        this.caregiver_requirements_for_prevention_of_crisis,
      risk_factors: this.risk_factors,
      suicidalities: this.suicidalities,
      homicidalities: this.homicidalities,
    };

    if (this.crisisplanId) {
      this.crisisPlanService
        .editCrisisPlan(data, this.crisisplanId)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Goal Updated'
          Swal.fire('Updated', `Crisis Plan Updated successfully!`, 'success');
          this.ngOnInit();
        });
    } else {
      this.crisisPlanService.createCrisisPlan(data).subscribe((resp) => {
        // console.log(resp);
        this.crisisid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `Crisis Plan Created successfully!`, 'success');
        this.ngOnInit();
      });
    }
  }
}
