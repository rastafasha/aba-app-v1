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
  public current_intensity: any;

  public maladaptive_edit: any = [];
  public medication_edit: any = [];
  public evaluation_edit: any = [];
  public prevalent_edit: any = [];
  public sensory_edit: any = [];
  public escape_edit: any = [];
  public intervention_edit: any = [];
  public atention_edit: any = [];
  public tangible_edit: any = [];
  
  
  
  
  //assestments
  public assesstments:any[] = [];
  public assesstmentsDocuments:any[] = [];
  public assestmentEvaluationSettings:any[] = [];
  public accesstoTangibles:any[] = [];
  public accesstoSensories:any[] = [];
  public accesstoAttention:any[] = [];
  public accesstoEscape:any[] = [];
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

  public preventive_strategies_s: any;
  public replacement_skills_s: any;
  public manager_strategies_s: any;

  public preventive_strategies_e: any;
  public replacement_skills_e: any;
  public manager_strategies_e: any;

  public preventive_strategies_a: any;
  public replacement_skills_a: any;
  public manager_strategies_a: any;

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
  title:any;
  descriptionIntervention:any;
  titleIntervention:any;
  
  
  patient_selected:any;
  bip_id:any;
  bip_selectedid:any;
  
  inteventionSelected:any;
  access_to_tangibles: any = [];
  


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

    this.accesstoSensories = [];
    
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
      
        
        this.accesstoTangibles =this.bip_selected.tangibles;
        this.accesstoAttention =this.bip_selected.attention;
        this.accesstoEscape =this.bip_selected.escape;
        this.accesstoSensories =this.bip_selected.sensory;
        
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
    })
    this.document_title = '';
  }

  deleteDocument(i:any){
    this.documents.splice(i,1);
  }

  addMedication(){

    if (this.phiysical_and_medical_status) {
      this.phiysical_and_medical_status.push({
        index: this.phiysical_and_medical_status.length + 1,
        medication: this.medication,
      dose: this.dose,
      frecuency: this.frecuency,
      reason: this.reason,
      preescribing_physician: this.preescribing_physician,
      
      })
    } else {
      this.phiysical_and_medical_status = [{
        index: 1, // initial index
        medication: this.medication,
        dose: this.dose,
        frecuency: this.frecuency,
        reason: this.reason,
        preescribing_physician: this.preescribing_physician,
      
      }]
    }
    
    this.medication = '';
    this.dose = '';
    this.frecuency = '';
    this.reason = '';
    this.preescribing_physician = '';
  }

  deleteMedication(i:any){
    this.phiysical_and_medical_status.splice(i,1);
  }

  updateItemListMedications(medication:any, index:number){
    this.phiysical_and_medical_status[index] = medication;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    
  }
  seleccionarParaEditM(medication:any){
    const selectedMedication = this.phiysical_and_medical_status.find((item) => item.index === medication.index);
    if (selectedMedication) {
      this.medication_edit = selectedMedication;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedMedication.nombre = 'Nuevo nombre'; // Por ejemplo
    }
    
  }


  addMaladaptive(){

    if (this.maladaptives) {
      this.maladaptives.push({
        index: this.maladaptives.length + 1,
        maladaptive_behavior: this.maladaptive_behavior,
      topografical_definition: this.topografical_definition,
      baseline_level: this.baseline_level,
      baseline_date: this.baseline_date,
      initial_interesting: this.initial_interesting,
      current_intensity: this.current_intensity,
      
      })
    } else {
      this.maladaptives = [{
        index: 1, // initial index
        maladaptive_behavior: this.maladaptive_behavior,
      topografical_definition: this.topografical_definition,
      baseline_level: this.baseline_level,
      baseline_date: this.baseline_date,
      initial_interesting: this.initial_interesting,
      current_intensity: this.current_intensity,
      
      }]
    }
   
    this.maladaptive_behavior = '';
    this.topografical_definition = '';
    this.baseline_level = '';
    this.baseline_date = '';
    this.initial_interesting = '';
    this.current_intensity = '';
  }

  deleteMaladaptive(i:any){
    this.maladaptives.splice(i,1);
  }

  seleccionarParaEditMal(maladap:any){
        
    const selectedMaladaptive = this.maladaptives.find((item) => item.index === maladap.index);
    if (selectedMaladaptive) {
      this.maladaptive_edit = selectedMaladaptive;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedMaladaptive.nombre = 'Nuevo nombre'; // Por ejemplo
    }
    
  }

  updateMaladaptive(maladap:any){
   
        const index = this.maladaptives.findIndex((item) => item.index === maladap.index);
        if (index !== -1) {
          this.maladaptives[index] = maladap;
          Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
        }    
  }


  addEvaluationSettings(){

    if (this.assestmentEvaluationSettings) {
      this.assestmentEvaluationSettings.push({
        index: this.assestmentEvaluationSettings.length + 1,
        tangible: this.tangible,
      activities: this.activities,
      other: this.other,
      
      })
    } else {
      this.assestmentEvaluationSettings = [{
        index: 1, // initial index
        tangible: this.tangible,
      activities: this.activities,
      other: this.other,
      
      }]
    }
    
    this.tangible = '';
    this.activities = '';
    this.other = '';
  }

  deleteEvaluationSetting(i:any){
    this.assestmentEvaluationSettings.splice(i,1);
  }

  updateItemListEvaluationSetting(evaluation:any){
    const index = this.assestmentEvaluationSettings.findIndex((item) => item.index === evaluation.index);
    if (index !== -1) {
      this.assestmentEvaluationSettings[index] = evaluation;
      Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    }
  }

  seleccionarParaEva(evaluation:any){
    
    const selectedEvaluation = this.assestmentEvaluationSettings.find((item) => item.index === evaluation.index);
    if (selectedEvaluation) {
      this.evaluation_edit = selectedEvaluation;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedEvaluation.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }
  


  addAssesstmentDocument(){
    if (this.assesstmentsDocuments) {
      this.assesstmentsDocuments.push({
        index: this.assesstmentsDocuments.length + 1,
        assestment_title: this.assestment_title,
      assestment_status: this.assestment_status,
      
      })
    } else {
      this.assesstmentsDocuments = [{
        index: 1, // initial index
        assestment_title: this.assestment_title,
      assestment_status: this.assestment_status,
      
      }]
    }

    this.assestment_title = '';
    this.assestment_status = '';
  }

  deleteAssesstmentDocument(i:any){
    this.assesstmentsDocuments.splice(i,1);
  }


  addPrevalent(){
    if (this.prevalent_setting_event_and_atecedents) {
      this.prevalent_setting_event_and_atecedents.push({
        index: this.prevalent_setting_event_and_atecedents.length + 1,
        prevalent_setting_event_and_atecedent: this.prevalent_setting_event_and_atecedent,
        behavior: this.behavior,
        hypothesized_functions: this.hypothesized_functions,
      
      })
    } else {
      this.prevalent_setting_event_and_atecedents = [{
        index: 1, // initial index
        prevalent_setting_event_and_atecedent: this.prevalent_setting_event_and_atecedent,
      behavior: this.behavior,
      hypothesized_functions: this.hypothesized_functions,
      
      }]
    }
    this.prevalent_setting_event_and_atecedent = '';
    this.behavior = '';
    this.hypothesized_functions = '';
  }

  deletePrevalent(i:any){
    this.prevalent_setting_event_and_atecedents.splice(i,1);
  }

  seleccionarPrevalent(tang:any){

    const selectedTangible = this.prevalent_setting_event_and_atecedents.find((item) => item.index === tang.index);
    if (selectedTangible) {
      this.prevalent_edit = selectedTangible;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedTangible.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateItemListPrevalent(prevalent:any){
    this.prevalent_edit = prevalent;
    Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    const index = this.prevalent_setting_event_and_atecedents.findIndex((item) => item.index === prevalent.index);
    if (index !== -1) {
      this.prevalent_setting_event_and_atecedents[index] = prevalent;
      Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    }

  }

  //Access to Tangibles/Attention/Attention/escape/sensory
 
  addTangible(){
    if (this.accesstoTangibles) {
      this.accesstoTangibles.push({
        index: this.accesstoTangibles.length + 1,
        preventive_strategies: this.preventive_strategies,
        replacement_skills: this.replacement_skills,
        manager_strategies: this.manager_strategies,
      })
    } else {
      this.accesstoTangibles = [{
        index: 1,
        preventive_strategies: this.preventive_strategies,
        replacement_skills: this.replacement_skills,
        manager_strategies: this.manager_strategies,
      }]
    }
    this.preventive_strategies = '';
    this.replacement_skills = '';
    this.manager_strategies = '';
  }

  deleteTangible(i:any){
    this.accesstoTangibles.splice(i,1);
  }

  seleccionarTangible(tang:any){

    const selectedTangible = this.accesstoTangibles.find((item) => item.index === tang.index);
    if (selectedTangible) {
      this.tangible_edit = selectedTangible;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedTangible.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateItemListTangibles(tang:any){
    this.tangible_edit = tang;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
        const index = this.accesstoTangibles.findIndex((item) => item.index === tang.index);
        if (index !== -1) {
          this.accesstoTangibles[index] = tang;
          Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
        }

  }

  

  addSensory(){
    if (this.accesstoSensories) {
      this.accesstoSensories.push({
        index: this.accesstoSensories.length + 1,
        preventive_strategies_s: this.preventive_strategies_s,
        replacement_skills_s: this.replacement_skills_s,
        manager_strategies_s: this.manager_strategies_s,
      })
    } else {
      this.accesstoSensories = [{
        index: 1,
        preventive_strategies_s: this.preventive_strategies_s,
        replacement_skills_s: this.replacement_skills_s,
        manager_strategies_s: this.manager_strategies_s,
      }]
    }
    this.preventive_strategies_s = '';
    this.replacement_skills_s = '';
    this.manager_strategies_s = '';
  }

  deleteSensory(i:any){
    this.accesstoSensories.splice(i,1);
  }

  updateItemListSensory(sensory:any){
    this.sensory_edit = sensory;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
        const index = this.accesstoSensories.findIndex((item) => item.index === sensory.index);
        if (index !== -1) {
          this.accesstoSensories[index] = sensory;
          Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
        }
    
  }

  seleccionarSensory(sensory:any){

    const selectedSensory = this.accesstoSensories.find((item) => item.index === sensory.index);
    if (selectedSensory) {
      this.sensory_edit = selectedSensory;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedSensory.nombre = 'Nuevo nombre'; // Por ejemplo
    }
        
    
  }

  
  addEscape(){
    if (this.accesstoEscape) {
      this.accesstoEscape.push({
        index: this.accesstoEscape.length + 1,
        preventive_strategies_e: this.preventive_strategies_e,
      replacement_skills_e: this.replacement_skills_e,
      manager_strategies_e: this.manager_strategies_e,
      })
    } else {
      this.accesstoEscape = [{
        index: 1,
        preventive_strategies_e: this.preventive_strategies_e,
        replacement_skills_e: this.replacement_skills_e,
        manager_strategies_e: this.manager_strategies_e,
      }]
    }
    this.preventive_strategies_e = '';
    this.replacement_skills_e = '';
    this.manager_strategies_e = '';
  }

  deleteEscape(i:any){
    this.accesstoEscape.splice(i,1);
  }

  seleccionarEscape(escape:any){

    const selectedEscape = this.accesstoAttention.find((item) => item.index === escape.index);
    if (selectedEscape) {
      this.escape_edit = selectedEscape;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedEscape.nombre = 'Nuevo nombre'; // Por ejemplo
    }
        
    
  }

  updateItemListEscape(escape:any){
    this.escape_edit = escape;
        Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
        const index = this.accesstoAttention.findIndex((item) => item.index === escape.index);
        if (index !== -1) {
          this.accesstoAttention[index] = escape;
          Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
        }
  }

  addAttention(){
    if (this.accesstoAttention) {
      this.accesstoAttention.push({
        index: this.accesstoAttention.length + 1,
        preventive_strategies_a: this.preventive_strategies_a,
        replacement_skills_a: this.replacement_skills_a,
        manager_strategies_a: this.manager_strategies_a,
      })
    } else {
      this.accesstoAttention = [{
        index: 1,
        preventive_strategies_a: this.preventive_strategies_a,
        replacement_skills_a: this.replacement_skills_a,
        manager_strategies_a: this.manager_strategies_a,
      }]
    }
    this.preventive_strategies_a = '';
    this.replacement_skills_a = '';
    this.manager_strategies_a = '';
  }

  deleteAttention(i:any){
    this.accesstoAttention.splice(i,1);
  }

  seleccionarAttenti(attent:any){

    const selectedAttention = this.accesstoAttention.find((item) => item.index === attent.index);
    if (selectedAttention) {
      this.atention_edit = selectedAttention;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedAttention.nombre = 'Nuevo nombre'; // Por ejemplo
    }
        
    
  }

  
  updateItemListAttention(attent:any){
    
    const index = this.accesstoAttention.findIndex((item) => item.index === attent.index);
    if (index !== -1) {
      this.accesstoAttention[index] = attent;
      Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    }
  }

  //Access to Tangibles/Attention


 

  addIntervention(){
    if (this.interventions) {
      this.interventions.push({
        index: this.interventions.length + 1,
        titleIntervention: this.titleIntervention,
        descriptionIntervention: this.descriptionIntervention,
      
      })
    } else {
      this.interventions = [{
        index: 1, // initial index
        titleIntervention: this.titleIntervention,
        descriptionIntervention: this.descriptionIntervention,
      
      }]
    }
    
    this.titleIntervention = '';
    this.descriptionIntervention = '';
  }

  deleteIntervention(i:any){
    this.interventions.splice(i,1);
    this.interventions.forEach((intervention, index) => {
      intervention.index = index + 1;
    });
  }

  updateIntervention(intervention:any){
    const index = this.interventions.findIndex((item) => item.index === intervention.index);
    if (index !== -1) {
      this.interventions[index] = intervention;
      Swal.fire('Updated', `Updated item List successfully, if you finish the list, now press button save!`, 'success');
    }
    
  }

  seleccionarParaEdit(intervention:any){

    const selectedIntervention = this.interventions.find((item) => item.index === intervention.index);
    if (selectedIntervention) {
      this.intervention_edit = selectedIntervention;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedIntervention.nombre = 'Nuevo nombre'; // Por ejemplo
    }
        
    
  }
  
 

  
 

//fin listados





  save(){
    this.text_validation = '';
    if(!this.type_of_assessment
      || !this.background_information 
      || !this.maladaptives
      || !this.previus_treatment_and_result 
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

      tangibles   : this.accesstoTangibles,
      attention   : this.accesstoAttention,
      sensory   : this.accesstoSensories,
      escape   : this.accesstoEscape,
      interventions   : this.interventions,

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
