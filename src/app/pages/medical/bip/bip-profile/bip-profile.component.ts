import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { environment } from 'src/environments/environment';
import { DoctorService } from '../../doctors/service/doctor.service';
import { BipService } from '../service/bip.service';
import { AppUser } from 'src/app/shared/models/users.models';
import { PageService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-bip-profile',
  templateUrl: './bip-profile.component.html',
  styleUrls: ['./bip-profile.component.scss'],
})
export class BipProfileComponent {
  routes = AppRoutes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  patientProfile: any[];
  option_selected = 1;
  patient_id: any;

  num_appointment = 0;
  money_of_appointments = 0;
  num_appointment_pendings = 0;
  appointment_pendings = [];
  appointments = [];
  pa_assessments: string;

  type_of_assessment = [];
  background_information = [];
  previus_treatment_and_result = [];
  current_treatment_and_progress = [];
  education_status = [];
  phisical_and_medical_status = [];
  assestment_conducted = [];
  documents = [];
  maladaptives = [];
  maladaptive_behavior = [];
  assesstments = [];
  assesstmentsDocuments = [];
  prevalent_setting_event_and_atecedents = [];
  interventions: any;

  bip_selected: any = {};
  patient_selected: any = {};
  reduction_goals = [];
  reduction_goals_goalltos = [];
  reduction_goals_goalstos: string;
  sustitution_goal = [];
  sustitution_goal_ltos: string;
  sustitution_goal_stos: string;
  family_envolment: string;
  monitoring_evalutating: string;
  monitoring_evalutating_goals: string;
  generalization_training: string;
  transition_fading_plans: string;
  de_escalation_techniques: string;
  analyst_signature: any = '';
  analyst_signature_date = '';
  parent_guardian_signature: any = '';
  parent_guardian_signature_date = '';

  caregiver_requirements_for_prevention_of_crisis = '';
  crisis_description = '';
  crisis_note = '';

  text_success = '';
  text_validation = '';

  crisis_plan: string;
  risk_added: string;
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

  suicidality_added: any;
  not_present: any;
  ideation: any;
  plan: any;
  means: any;
  prior_attempt: any;

  homicidality_added: any;
  not_present_homicidality: any;
  ideation_homicidality: any;
  plan_homicidality: any;
  means_homicidality: any;
  prior_attempt_homicidality: any;
  user: AppUser;
  patientId: any;
  roles = [];
  permissions = [];
  preescribing_physician: any;
  phiysical_and_medical: any;
  phiysical_and_medical_status = [];
  hypothesis_based_intervention = [];
  assestmentEvaluationSettings = [];

  accesstoTangibles = [];
  accesstoAttention = [];
  accesstoEscape = [];
  accesstoSensory = [];

  imagenSerUrl = environment.url_media;

  constructor(
    private bipService: BipService,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private authService: AuthService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.pageService.onInitPage();
    // this.doctorService.getUserRoles();
    this.activatedRoute.params.subscribe((resp) => {
      this.patient_id = resp['patient_id'];
      console.log(this.patient_id);
      this.getPatient();
    });
    this.user = this.authService.user as AppUser;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  isPermission(permission: string) {
    if (this.user.roles.includes('SUPERADMIN')) {
      return true;
    }
    if (this.user.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  getPatient() {
    this.bipService
      .getBipProfilePatientPdf_id(this.patient_id)
      .subscribe((resp) => {
        console.log(resp);
        this.bip_selected = resp.bip;
        this.patient_selected = resp.patient ? resp.patient : null;
        this.patientId = resp.patient.patient_id;

        this.type_of_assessment = this.bip_selected.type_of_assessment;

        (this.background_information =
          this.bip_selected.background_information),
          (this.previus_treatment_and_result =
            this.bip_selected.previus_treatment_and_result),
          (this.current_treatment_and_progress =
            this.bip_selected.current_treatment_and_progress),
          (this.education_status = this.bip_selected.education_status),
          (this.phisical_and_medical_status =
            this.bip_selected.phisical_and_medical_status),
          (this.assestment_conducted = this.bip_selected.assestment_conducted),
          (this.documents = this.bip_selected.documents_reviewed);
        // console.log(this.documents);
        this.maladaptives = this.bip_selected.maladaptives;
        this.maladaptive_behavior = this.bip_selected.maladaptives[0].title;

        // console.log(this.maladaptives);
        // console.log(this.maladaptive_behavior);

        this.assesstments = this.bip_selected.assestment_conducted_options;
        this.assesstmentsDocuments =
          this.bip_selected.assestment_conducted_options;
        this.prevalent_setting_event_and_atecedents =
          this.bip_selected.prevalent_setting_event_and_atecedents;
        // this.interventions =this.bip_selected.interventions;

        this.analyst_signature =
          this.bip_selected.consent_to_treatment[0].analyst_signature;
        this.analyst_signature_date =
          this.bip_selected.consent_to_treatment[0].analyst_signature_date;
        this.parent_guardian_signature =
          this.bip_selected.consent_to_treatment[0].parent_guardian_signature;

        const imageData =
          'data:image/png;base64,' + btoa(this.parent_guardian_signature);
        // const imageData2 = 'data:image/png;base64,' + btoa(this.analyst_signature);
        console.log(imageData);
        // this.parent_guardian_signature = imageData;

        this.parent_guardian_signature_date =
          this.bip_selected.consent_to_treatment[0].parent_guardian_signature_date;
        this.reduction_goals = this.bip_selected.reduction_goal;
        this.reduction_goals_goalltos =
          this.bip_selected.reduction_goal[0].goalltos;
        this.reduction_goals_goalstos =
          this.bip_selected.reduction_goal[0].goalstos;
        this.sustitution_goal = this.bip_selected.sustitution_goal;
        this.sustitution_goal_ltos =
          this.bip_selected.sustitution_goal[0].goalltos;
        this.sustitution_goal_stos =
          this.bip_selected.sustitution_goal[0].goalstos;
        this.family_envolment =
          this.bip_selected.family_envolment[0].caregivers_training_goals;

        this.monitoring_evalutating = this.bip_selected.monitoring_evalutating;
        this.monitoring_evalutating_goals =
          this.bip_selected.monitoring_evalutating[0].rbt_training_goals;
        this.generalization_training =
          this.bip_selected.generalization_training;
        this.transition_fading_plans =
          this.bip_selected.generalization_training[0].transition_fading_plans;
        this.de_escalation_techniques =
          this.bip_selected.de_escalation_technique[0].recomendation_lists;

        this.hypothesis_based_intervention =
          this.bip_selected.hypothesis_based_intervention;
        this.assestmentEvaluationSettings =
          this.bip_selected.assestmentEvaluationSettings;

        this.accesstoTangibles = this.bip_selected.tangibles
          ? this.bip_selected.tangibles
          : null;
        this.accesstoAttention = this.bip_selected.attention
          ? this.bip_selected.attention
          : null;
        this.accesstoEscape = this.bip_selected.escape
          ? this.bip_selected.escape
          : null;
        this.accesstoSensory = this.bip_selected.sensory
          ? this.bip_selected.sensory
          : null;

        this.interventions = this.bip_selected.interventions
          ? this.bip_selected.interventions
          : null;

        this.phiysical_and_medical = this.bip_selected.phiysical_and_medical;
        this.phiysical_and_medical_status =
          this.bip_selected.phiysical_and_medical_status;

        this.caregiver_requirements_for_prevention_of_crisis =
          this.bip_selected.crisis_plan[0].caregiver_requirements_for_prevention_of_crisis;
        this.crisis_description =
          this.bip_selected.crisis_plan[0].crisis_description;
        this.crisis_note = this.bip_selected.crisis_plan[0].crisis_note;
        this.crisis_plan = this.bip_selected.crisis_plan[0];
        this.risk_factors = this.bip_selected.crisis_plan[0].risk_factors;

        const jsonObj = JSON.parse(this.reduction_goals_goalstos) || '';
        this.reduction_goals_goalstos = jsonObj;
        // console.log(this.reduction_goals_goalstos);

        const jsonObj1 = JSON.parse(this.sustitution_goal_stos) || '';
        this.sustitution_goal_stos = jsonObj1;
        // console.log(this.sustitution_goal_stos);

        const jsonObj2 = JSON.parse(this.sustitution_goal_ltos) || '';
        this.sustitution_goal_ltos = jsonObj2;
        // console.log(this.sustitution_goal_ltos);

        const jsonObj3 = JSON.parse(this.family_envolment) || '';
        this.family_envolment = jsonObj3;
        // console.log(this.family_envolment);

        const jsonObj4 = JSON.parse(this.monitoring_evalutating_goals) || '';
        this.monitoring_evalutating_goals = jsonObj4;
        // console.log(this.monitoring_evalutating_goals);

        const jsonObj5 = JSON.parse(this.transition_fading_plans) || '';
        this.transition_fading_plans = jsonObj5;
        // console.log(this.transition_fading_plans);

        const jsonObj6 = JSON.parse(this.de_escalation_techniques) || '';
        this.de_escalation_techniques = jsonObj6;
        // console.log(this.transition_fading_plans);

        const jsonObj7 = JSON.parse(this.risk_factors) || '';
        this.risk_factors = jsonObj7;
        // console.log(this.risk_factors);

        this.other = this.risk_factors[0].other;
        // console.log(this.other);
        this.do_not_apply = this.risk_factors[0].do_not_apply;
        this.elopement = this.risk_factors[0].elopement;
        this.assaultive_behavior = this.risk_factors[0].assaultive_behavior;
        this.aggression = this.risk_factors[0].aggression;
        this.self_injurious_behavior =
          this.risk_factors[0].self_injurious_behavior;
        this.sexually_offending_behavior =
          this.risk_factors[0].sexually_offending_behavior;
        this.fire_setting = this.risk_factors[0].fire_setting;
        this.current_substance_abuse =
          this.risk_factors[0].current_substance_abuse;
        this.impulsive_behavior = this.risk_factors[0].impulsive_behavior;
        this.psychotic_symptoms = this.risk_factors[0].psychotic_symptoms;
        this.self_mutilation_cutting =
          this.risk_factors[0].self_mutilation_cutting;
        this.caring_for_ill_family_recipient =
          this.risk_factors[0].caring_for_ill_family_recipient;
        this.current_family_violence =
          this.risk_factors[0].current_family_violence;
        this.dealing_with_significant =
          this.risk_factors[0].dealing_with_significant;
        this.prior_psychiatric_inpatient_admission =
          this.risk_factors[0].prior_psychiatric_inpatient_admission;

        this.suicidality_added = resp.bip.crisis_plan[0].suicidalities;
        const jsonObj8 = JSON.parse(this.suicidality_added) || '';
        this.suicidality_added = jsonObj8;
        // console.log(this.suicidality_added);

        this.not_present = this.suicidality_added[0].not_present;
        this.ideation = this.suicidality_added[0].ideation;
        this.plan = this.suicidality_added[0].plan;
        this.means = this.suicidality_added[0].means;
        this.prior_attempt = this.suicidality_added[0].prior_attempt;

        this.homicidality_added = resp.bip.crisis_plan[0].homicidalities;
        const jsonObj9 = JSON.parse(this.homicidality_added) || '';
        this.homicidality_added = jsonObj9;
        // console.log(this.homicidality_added);

        this.not_present_homicidality =
          this.homicidality_added[0].not_present_homicidality;
        this.ideation_homicidality =
          this.homicidality_added[0].ideation_homicidality;
        this.plan_homicidality = this.homicidality_added[0].plan_homicidality;
        this.means_homicidality = this.homicidality_added[0].means_homicidality;
        this.prior_attempt_homicidality =
          this.homicidality_added[0].prior_attempt_homicidality;
      });
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }

  //convertToPdf(): void {
  //   const data = this.contentToConvert.nativeElement;
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;

  //     const margins = {
  //       top: 40,
  //       bottom: 60,
  //       left: 40,
  //       width: 522
  //     };

  //     // Create a new PDF document
  //     const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
  //     // const pdf = new jspdf.jsPDF('p', 'pt', 'letter');

  //     // Add an image of the canvas to the PDF
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

  //     // Save the PDF
  //     pdf.save('bip_'+this.patient_selected.patient_id+".pdf");
  //   });
  // }

  convertToPdf(): void {
    const data = this.contentToConvert.nativeElement;

    html2canvas(data).then((canvas) => {
      // Define necessary settings
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create a new PDF document
      const pdf = new jspdf.jsPDF('p', 'mm');
      let position = 0;

      // Add image to PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      pdf.addImage(
        canvas.toDataURL('image/jpg'),
        'JPG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      // Add additional pages if necessary
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const filename = `bip_${this.patient_selected.patient_id}.pdf`;
      pdf.save(filename);
    });
  }
}
