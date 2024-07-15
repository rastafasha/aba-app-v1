import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from 'src/app/medical/bip/service/bip.service';
import { GoalService } from 'src/app/medical/bip/service/goal.service';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bipform',
  templateUrl: './bipform.component.html',
  styleUrls: ['./bipform.component.scss']
})
export class BipformComponent {

  public routes = routes;

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';
  option_selected:number = 1;

  
  first_name:string = '';
  last_name:string = '';
  phone:string = '';
  parent_guardian_name:string = '';
  relationship:string = '';
  address:string = '';
  age:number = 0;
  dob:string = '';

  public medical:any = [];
  description:any;
  name_medical:any;
  uso:any;
  
  client_id:any;
  id:any;
  patient_id:any;
  doctor_id:any;
  user:any;

  type_of_assessment:any;
  background_information:any;
  client_selected:any;
  bip_selected:any;
  previus_treatment_and_result:any;
  current_treatment_and_progress:any;
  education_status:any;
  phisical_and_medical_status:any;

  assestment_conducted:any;
  assestment_conducted_options:any;

  reduction:any = [];
  maladaptive:any = [];

  
  public documents:any = [];
  public document_title: any;
  public document_status: any;
  
  //maladaptives
  
  public maladaptives:any = [];

  public maladaptive_behavior: any;
  public topografical_definition: any;
  public baseline_level: any;
  public baseline_date: any;
  public initial_interesting: any;

  public maladaptive_edit: any = [];
  public medication_edit: any = [];
  public evaluation_edit: any = [];
  public prevalent_edit: any = [];
  
  
  
  
  //assestments
  public assesstments:any = [];
  public assesstmentsDocuments:any = [];
  public assestmentEvaluationSettings:any = [];
  public accesstoTangibles:any = [];
  public assestment_title: any;
  public assestment_status: any;
  public tangible: any;
  public activities: any;
  public other: any;
  
  // created comments by Malcolm Cordova at 4 feb 2004
  // mercadocreativo@gmail.com
  // @malcolmcordova

  //
  public prevalent_setting_event_and_atecedents: any = [];
  public prevalent_setting_event_and_atecedent: any;
  public behavior: any;
  public hypothesized_functions: any;
  public strengths: any;
  public weakneses: any;

  public hypothesis_based_intervention: any;
  public preventive_strategies: any;
  public replacement_skills: any;
  public manager_strategies: any;
  public medication: any;
  public dose: any;
  public frecuency: any;
  public reason: any;
  public preescribing_physician: any;
  public phiysical_and_medical: any;
  
  public interventions:any = [];
  public phiysicalAndMedicalSt:any = [];
  public phiysical_and_medical_status:any = [];
  pairing:any;
  premack_principal:any;
  response_block:any;
  dro:any;
  dra:any;
  errorless_teaching:any;
  redirection:any;
  ncr:any;
  shaping:any;
  chaining:any;
  
  
  patient_selected:any;
  bip_id:any;
  bip_selectedid:any;
  
  inteventionSelected:any;
  access_to_tangibles: any;


  constructor(
    public patientService:PatientMService,
    public router: Router,
    public bipService:BipService,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);//inicia la vista siempre desde arriba
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      
     })
     this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado
     
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip());//se pide el id del bip creado para traer la info necesaria
    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id;  //se asigna el doctor logueado a este campo para poderlo enviar en los


    
  }

  

  
  //se obtiene el perfil del usuario, por el cliente_id  que seria igual al id de la url
  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.client_selected = resp;// asignamos el objeto a nuestra variable

      //traemos la info del usuario 
      if (this.client_selected.type !== null){// si hay o no informacion del paciente
        if (this.client_selected.eligibility == 'yes'){// si el status es positivo para proceder
          this.first_name = this.client_selected.patient.first_name;
          this.last_name = this.client_selected.patient.last_name;
          this.patient_id = this.client_selected.patient.patient_id;  
          this.phone = this.client_selected.patient.phone; 
          this.parent_guardian_name = this.client_selected.patient.parent_guardian_name;
          this.relationship = this.client_selected.patient.relationship;
          this.address = this.client_selected.patient.address;
          this.age = this.client_selected.patient.age;
          this.dob = this.client_selected.patient.dob;
        }
      }
    });


  }
  //obtenemos el bip por el id..
  getBip(){
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp:any)=>{
        // console.log(resp);
  
        this.bip_selected = resp; //asigamos una variable a la respuesta
        this.bip_selectedid = resp.bip.id;//obtenemos de nuevo el bip pero para verificar si es actualizar o crear en la funcion
        
        this.type_of_assessment =this.bip_selected.type_of_assessment;
  
        this.background_information = this.bip_selected.bip.background_information,
        this.previus_treatment_and_result = this.bip_selected.bip.previus_treatment_and_result,
        this.current_treatment_and_progress = this.bip_selected.bip.current_treatment_and_progress,
        this.education_status = this.bip_selected.bip.education_status,
        this.phisical_and_medical_status = this.bip_selected.bip.phisical_and_medical_status,
        this.assestment_conducted = this.bip_selected.bip.assestment_conducted,
        this.strengths =this.bip_selected.bip.strengths;
        this.weakneses =this.bip_selected.bip.weakneses;

        this.documents =this.bip_selected.documents_reviewed;
        this.maladaptives =this.bip_selected.maladaptives;
        this.maladaptive_behavior =this.bip_selected.maladaptives[0].title;

        this.assesstments =this.bip_selected.assestment_conducted_options;
        this.assesstmentsDocuments =this.bip_selected.assestment_conducted_options;
        
        this.hypothesis_based_intervention =this.bip_selected.bip.hypothesis_based_intervention;
        this.assestmentEvaluationSettings =this.bip_selected.assestmentEvaluationSettings;
      
        
        this.accesstoTangibles =this.bip_selected.access_to_tangibles;
        
        this.phiysical_and_medical =this.bip_selected.bip.phiysical_and_medical;
        this.phiysical_and_medical_status =this.bip_selected.phiysical_and_medical_status;
        
        this.prevalent_setting_event_and_atecedents =this.bip_selected.prevalent_setting_event_and_atecedents;
        this.interventions =this.bip_selected.interventions;
        
  
      })
    }
    
    
  }
//manejo de listas para json 

  addDocument(){
    this.documents.push({
      document_title: this.document_title,
      document_status: this.document_status,
    })
    this.document_title = '';
    this.document_status = '';
  }

  deleteDocument(i:any){
    this.documents.splice(i,1);
  }

  addMaladaptive(){
    this.maladaptives.push({
      maladaptive_behavior: this.maladaptive_behavior,
      topografical_definition: this.topografical_definition,
      baseline_level: this.baseline_level,
      baseline_date: this.baseline_date,
      initial_interesting: this.initial_interesting,
    })
    this.maladaptive_behavior = '';
    this.topografical_definition = '';
    this.baseline_level = '';
    this.baseline_date = '';
    this.initial_interesting = '';
  }

  deleteMaladaptive(i:any){
    this.maladaptives.splice(i,1);
  }

  addEvaluationSettings(){
    this.assestmentEvaluationSettings.push({
      tangible: this.tangible,
      activities: this.activities,
      other: this.other,
    })
    this.tangible = '';
    this.activities = '';
    this.other = '';
  }

  deleteEvaluationSetting(i:any){
    this.assestmentEvaluationSettings.splice(i,1);
  }

  updateItemListEvaluationSetting(evaluation:any){
    this.evaluation_edit = evaluation;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    
  }
  


  addAssesstmentDocument(){
    this.assesstmentsDocuments.push({
      assestment_title: this.assestment_title,
      assestment_status: this.assestment_status,
    })
    this.assestment_title = '';
    this.assestment_status = '';
  }

  deleteAssesstmentDocument(i:any){
    this.assesstmentsDocuments.splice(i,1);
  }

  addAssesstment(){
    this.prevalent_setting_event_and_atecedents.push({
      prevalent_setting_event_and_atecedent: this.prevalent_setting_event_and_atecedent,
      behavior: this.behavior,
      hypothesized_functions: this.hypothesized_functions,
    })
    this.prevalent_setting_event_and_atecedent = '';
    this.behavior = '';
    this.hypothesized_functions = '';
  }

  deleteAssesstment(i:any){
    this.prevalent_setting_event_and_atecedents.splice(i,1);
  }

  updateItemListPrevalent(prevalent:any){
    this.prevalent_edit = prevalent;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    
  }
  addTangible(){
    this.accesstoTangibles.push({
      preventive_strategies: this.preventive_strategies,
      replacement_skills: this.replacement_skills,
      manager_strategies: this.manager_strategies,
    })
    this.preventive_strategies = '';
    this.replacement_skills = '';
    this.manager_strategies = '';
  }

  deleteTangible(i:any){
    this.accesstoTangibles.splice(i,1);
  }

  
  updateItemListTangibles(maladap:any){
    this.maladaptive_edit = maladap;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    
  }
  addMedication(){
    this.phiysical_and_medical_status.push({
      medication: this.medication,
      dose: this.dose,
      frecuency: this.frecuency,
      reason: this.reason,
      preescribing_physician: this.preescribing_physician,
    })
    this.medication = '';
    this.dose = '';
    this.frecuency = '';
    this.reason = '';
    this.preescribing_physician = '';
  }

  deleteMedication(i:any){
    this.phiysical_and_medical_status.splice(i,1);
  }

  updateItemListMedications(medication:any){
    this.medication_edit = medication;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    
  }

  addIntervention(){
    this.interventions.push({
      pairing: this.pairing,
      premack_principal: this.premack_principal,
      response_block: this.response_block,
      dro: this.dro,
      dra: this.dra,
      errorless_teaching: this.errorless_teaching,
      redirection: this.redirection,
      ncr: this.ncr,
      shaping: this.shaping,
      chaining: this.chaining,
    })
    this.pairing = '';
    this.premack_principal = '';
    this.response_block = '';
    this.dro = '';
    this.dra = '';
    this.errorless_teaching = '';
    this.redirection = '';
    this.ncr = '';
    this.shaping = '';
    this.chaining = '';
  }

  deleteIntervention(i:any){
    this.interventions.splice(i,1);
  }

  
  cambiarStatusSto(maladap:any){
    this.maladaptive_edit = maladap;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    // console.log(this.maladaptive_edit);
    
    // let data ={
      //   rbt_training_goals: this.training_goals,
      // }
    
      // this.monitoringEvaluatingService.editMonitoringEvaluating(data, this.monitoringtid).subscribe(
    //   resp =>{
      //     // console.log(resp);
      //     // this.getTableData();
      //     Swal.fire('Updated', `Goal Updated successfully!`, 'success');
    //     this.ngOnInit();
    //   }
    // )
  }

  updateItemList(maladap:any){
    this.maladaptive_edit = maladap;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    
  }

//fin listados





  save(){
    this.text_validation = '';
    if(!this.type_of_assessment
      ||!this.background_information 
      ||!this.previus_treatment_and_result 
      || !this.education_status
      || !this.phisical_and_medical_status
    ){
      this.text_validation = 'All Fields (*) are required';
      // return;
    }

    let data ={
      id:this.bip_selectedid,
      client_id: this.client_selected.patient.id,
      patient_id: this.patient_id,
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
      assestment_conducted_options  : this.assesstmentsDocuments,

      assestmentEvaluationSettings  : this.assestmentEvaluationSettings,
      
      hypothesis_based_intervention  : this.hypothesis_based_intervention,
      
      phiysical_and_medical_status   : this.phiysical_and_medical_status,
      access_to_tangibles   : this.accesstoTangibles,

      phiysical_and_medical   : this.phiysical_and_medical,

      prevalent_setting_event_and_atecedents: this.prevalent_setting_event_and_atecedents,
      
    }

    if(this.bip_selected){//si  tiene bip se agrega a la informacion de la consulta

      this.bipService.update(data, this.bip_selectedid).subscribe((resp:any)=>{
        Swal.fire('Updated', `Bip Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{ // si no viene crea el bip
      
      //crear
      this.bipService.createBip(data).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Se guardó la informacion de la cita médica'
        Swal.fire('Updated', `Bip Created successfully!`, 'success');
        this.ngOnInit();
      })
    }
    
    return false;
    

  }

  selectedIntervention(intervention:any){
    this.inteventionSelected = intervention
    // console.log(this.inteventionSelected);
  }

  
}
