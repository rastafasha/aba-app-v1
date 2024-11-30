import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import { environment } from 'src/environments/environment';
import { BipService } from '../service/bip.service';

@Component({
  selector: 'app-bip-profile',
  templateUrl: './bip-profile.component.html',
  styleUrls: ['./bip-profile.component.scss'],
})
export class BipProfileComponent implements OnInit {
  routes = AppRoutes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  patientProfile: any[];
  option_selected = 1;
  patient_identifier: string;

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
  assesstmentsDocuments = [];
  prevalent_setting_event_and_atecedents = [];
  interventions: any;

  attention :any = [];
  tangibles :any = [];
  escape :any = [];
  sensory :any = [];
  caregivers_training_goals :any = [];
  consent_to_treatment :any = [];


  bip_selected: any = {};
  patient_selected: any = {};
  reduction_goal :any = [];
  reduction_goals_goalltos = [];
  reduction_goals_goalstos = [];

  sustitution_goal : any =[];
  sustitution_goal_ltos: any = [];
  sustitution_goal_stos: any = [];

  family_envolment: any = [];
  monitoring_evalutating: any[] = [];
  monitoring_evalutating_goals: any[] = [];
  generalization_training: any = [];
  transition_fading_plans: any= [];
  discharge_plan: string;
  rbt_training_goals: any= [];
  de_escalation_technique: any= [];
  recomendation_lists: any= [];
  
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
  risk_added: any = [];
  risk_factors: boolean;
  do_not_apply: boolean;
  elopement: boolean;
  assaultive_behavior: boolean;
  aggression: boolean;
  self_injurious_behavior: boolean;
  sexually_offending_behavior: boolean;
  fire_setting: boolean;
  current_substance_abuse: boolean;
  impulsive_behavior: boolean;
  psychotic_symptoms: boolean;
  self_mutilation_cutting: boolean;
  caring_for_ill_family_recipient: boolean;
  current_family_violence: boolean;
  dealing_with_significant: boolean;
  prior_psychiatric_inpatient_admission: boolean;
  other: string;

  suicidality_added:any = [];
  not_present: boolean;
  ideation: boolean;
  plan: boolean;
  means: boolean;
  prior_attempt: boolean;

  homicidality_added: any = [];
  not_present_homicidality: boolean;
  ideation_homicidality: boolean;
  plan_homicidality: boolean;
  means_homicidality: boolean;
  prior_attempt_homicidality: boolean;
  user: AppUser;
  patientId: string;
  roles = [];
  permissions = [];
  preescribing_physician: any;
  phiysical_and_medical: any;
  phiysical_and_medical_status: any;
  hypothesis_based_intervention: any;
  assestmentEvaluationSettings: any;

  

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
      this.patient_identifier = resp['patient_id'];
      console.log(this.patient_identifier);
      this.getPatient();
    });
    this.user = this.authService.user as AppUser;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  print() {
    window.print();
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
      .getBipProfilePatientPdf_id(this.patient_identifier)
      .subscribe((resp) => {
        console.log(resp);
        this.patient_selected = resp.patient ? resp.patient : null;
        this.patientId = this.patient_selected.patient_identifier;

        // ------Bip

        this.bip_selected = resp.bip;
        
        this.maladaptives = resp.maladaptives;
        

        
        // ------Replacement
        this.sustitution_goal = resp.bip.sustitution_goal[0];

        this.sustitution_goal_stos = resp.bip.sustitution_goal?.[0]?.goalstos;
        const jsonObj90 = JSON.parse(this.sustitution_goal_stos) || '';
        this.sustitution_goal_stos = jsonObj90;
        
        this.sustitution_goal_ltos = resp.bip.sustitution_goal?.[0]?.goalltos;
        const jsonObj91 = JSON.parse(this.sustitution_goal_ltos) || '';
        this.sustitution_goal_ltos = jsonObj91;



        // ------family_envolment
        this.family_envolment = resp.bip.family_envolment;
        this.caregivers_training_goals = resp.bip.family_envolment?.[0]?.caregivers_training_goals;
        const jsonObj84 = JSON.parse(this.caregivers_training_goals) || '';
        this.caregivers_training_goals = jsonObj84;

        
        
        // ------monitoring_evalutating
        this.monitoring_evalutating = resp.bip.monitoring_evalutating[0];

        this.rbt_training_goals = resp.bip.monitoring_evalutating?.[0]?.rbt_training_goals;
         const jsonObj88 = JSON.parse(this.rbt_training_goals) || '';
         this.rbt_training_goals = jsonObj88;

         

         // ------generalization_training
         this.generalization_training = resp.bip.generalization_training[0];

         this.discharge_plan = resp.bip.generalization_training?.[0]?.discharge_plan;
         this.transition_fading_plans = resp.bip.generalization_training?.[0]?.transition_fading_plans;
         const jsonObj85 = JSON.parse(this.transition_fading_plans) || '';
         this.transition_fading_plans = jsonObj85;
 

        // ------Crisis Plans

        this.crisis_description = resp.bip.crisis_plan?.[0]?.crisis_description;
        this.crisis_note = resp.bip.crisis_plan?.[0]?.crisis_note;
        this.caregiver_requirements_for_prevention_of_crisis = resp.bip.crisis_plan?.[0]?.caregiver_requirements_for_prevention_of_crisis;

        this.risk_added = resp.bip.crisis_plan?.[0]?.risk_factors;
        const jsonObj82 = JSON.parse(this.risk_added) || '';
        this.risk_added = jsonObj82;

       this.do_not_apply = this.risk_added?.[0]?.do_not_apply;
        this.elopement = this.risk_added?.[0]?.elopement;
        this.assaultive_behavior = this.risk_added?.[0]?.assaultive_behavior;
        this.aggression = this.risk_added?.[0]?.aggression;
        this.self_injurious_behavior =
          this.risk_added?.[0]?.self_injurious_behavior;
        this.sexually_offending_behavior =
          this.risk_added?.[0]?.sexually_offending_behavior;
        this.fire_setting = this.risk_added?.[0]?.fire_setting;
        this.current_substance_abuse =
          this.risk_added?.[0]?.current_substance_abuse;
        this.impulsive_behavior = this.risk_added?.[0]?.impulsive_behavior;
        this.psychotic_symptoms = this.risk_added?.[0]?.psychotic_symptoms;
        this.self_mutilation_cutting =
          this.risk_added?.[0]?.self_mutilation_cutting;
        this.caring_for_ill_family_recipient =
          this.risk_added?.[0]?.caring_for_ill_family_recipient;
        this.current_family_violence =
          this.risk_added?.[0]?.current_family_violence;
        this.dealing_with_significant =
          this.risk_added?.[0]?.dealing_with_significant;
        this.prior_psychiatric_inpatient_admission =
          this.risk_added?.[0]?.prior_psychiatric_inpatient_admission;
        this.other =
          this.risk_added?.[0]?.other;

        this.suicidality_added = resp.bip.crisis_plan?.[0]?.suicidalities;
        const jsonObj8 = JSON.parse(this.suicidality_added) || '';
        this.suicidality_added = jsonObj8;

        this.not_present = this.suicidality_added?.[0]?.not_present;
        this.ideation = this.suicidality_added?.[0]?.ideation;
        this.plan = this.suicidality_added?.[0]?.plan;
        this.means = this.suicidality_added?.[0]?.means;
        this.prior_attempt = this.suicidality_added?.[0]?.prior_attempt;

        this.homicidality_added = resp.bip.crisis_plan?.[0]?.homicidalities;
        const jsonObj9 = JSON.parse(this.homicidality_added) || '';
        this.homicidality_added = jsonObj9;

        this.not_present_homicidality =
          this.homicidality_added?.[0]?.not_present_homicidality;
        this.ideation_homicidality =
          this.homicidality_added?.[0]?.ideation_homicidality;
        this.plan_homicidality = this.homicidality_added?.[0]?.plan_homicidality;
        this.means_homicidality = this.homicidality_added?.[0]?.means_homicidality;
        this.prior_attempt_homicidality =
          this.homicidality_added?.[0]?.prior_attempt_homicidality;

          // ------Crisis Plans

         // ------de_escalation_technique
         this.de_escalation_technique = resp.bip.de_escalation_technique[0];
        
         this.recomendation_lists = resp.bip.de_escalation_technique?.[0]?.recomendation_lists;
         const jsonObj86 = JSON.parse(this.recomendation_lists) || '';
         this.recomendation_lists = jsonObj86;
 
        
        // ------consent_to_treatment
        this.consent_to_treatment = resp.bip.consent_to_treatment[0];
        this.analyst_signature = resp.bip.consent_to_treatment[0].analyst_signature;
        this.parent_guardian_signature = resp.bip.consent_to_treatment[0].parent_guardian_signature;
        
        // ------consent_to_treatment
        
        

        
        

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
      const filename = `bip_${this.patient_selected.patient_identifier}.pdf`;
      pdf.save(filename);
    });
  }
}
