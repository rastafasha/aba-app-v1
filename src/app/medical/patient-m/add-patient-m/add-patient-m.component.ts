import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';
import { PatientMService } from '../service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../../insurance/service/insurance.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

export interface ResponseBackend{
  users:User[];
  doctores:any [];
  locations:any[];
  location:any;
  insurances:any[];
 }
export interface User{
  id:string;
  full_name:string;
  status:string;
  roles:any [];
  insurances:string;
 }

 export interface Service {
  code: string;
  provider: string;
  // Add other service properties here
}


@Component({
  selector: 'app-add-patient-m',
  templateUrl: './add-patient-m.component.html',
  styleUrls: ['./add-patient-m.component.scss']
})
export class AddPatientMComponent {
  public routes = routes;
  public patient_id: any;
  public selectedValueLocation!: string;
  public selectedValueCode!: string;
  public selectedValuePosCovered!: string;
  public selectedValueUnitPrize!: string;
  option_selected:number = 0;

  
  
  public first_name: string;
  public last_name: string = '';
  public parent_guardian_name: string = '';
  public relationship: any;
  public language: string = '';
  public phone: string = '';
  public home_phone: string = '';
  public work_phone: string = '';
  public zip: string = '';
  public state: string = '';
  public email: string = '';
  public education: string = '';
  public profession: string = '';
  public school_name: string = '';
  public school_number: string = '';
  public birth_date: string = '';
  public age: number = 0;
  public gender: number = 1;
  public address: string = '';
  public special_note: any;
  public city: any;
  public patient_control: any;
  public schedule: any;
  public summer_schedule: any;
  public diagnosis_code: any;

  

  public insurer: any;
  public insuranceId: any;
  public insurer_secundary: any;
  public insuranceId_secundary: any;
  public elegibility_date: any;
  public pos_covered: any;
  public deductible_individual_I_F: any;
  public balance: any;
  public coinsurance: any;
  public copayments: any;
  public oop: any;
  public eqhlid: any;
  public roles_doctor: any;

  public pa_assessments: any = [];
  public pa_assessment: any;
  public pa_assessment_start_date: Date ;
  public pa_assessment_end_date: Date ;
  public pa_services: any;
  public pa_services_start_date: Date ;
  public pa_services_end_date: Date ;
  public cpt: any;
  public n_units: number = 0;
  
  public welcome: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public consent: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public insurance_card: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public mnl: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public referral: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public ados: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public iep: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public asd_diagnosis: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public cde: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public submitted: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public eligibility: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public interview: 'pending'|'send' | 'receive' | 'no apply';

  public specialists:any = [];
  public locations:any = [];
  public roles_rbt:any = [];
  public roles_bcba:any = [];
  public insurances:any = [];
  public insurance_codes:any = [];
  public insurance:any;
  public code:any;
  public provider:any;

  public selectedValue_rbt!: string;
  public selectedValue_rbt2!: string;
  public selectedValue_bcba!: string;
  public selectedValue_bcba2!: string;
  public selectedValue_clind!: string;
  public selectedValueInsurer!: string;
  
  public rbt_id: any;
  public rbt2_id: any;
  public bcba_id: any;
  public bcba2_id: any;
  public clin_director_id: any;

  public insurance_id: any;
  public id: any;
 
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';
  
  
  public FILE_ADITIONAL_DOCS:any;
  public IMAGE_PREVISUALIZA_ADITIONAL_DOCS:any = 'assets/img/user-06.jpg';
  public FILE_MEDICAL_NOTES:any;
  public IMAGE_PREVISUALIZA_MEDICAL_NOTES:any = 'assets/img/user-06.jpg';
  public FILE_CDE:any;
  public IMAGE_PREVISUALIZA_CDE:any = 'assets/img/user-06.jpg';
  public FILE_IEP:any;
  public IMAGE_PREVISUALIZA_IEP:any = 'assets/img/user-06.jpg';
  public FILE_MNL:any;
  public IMAGE_PREVISUALIZA_MNL:any = 'assets/img/user-06.jpg';
  public FILE_REFERAL:any;
  public IMAGE_PREVISUALIZA_REFERAL:any = 'assets/img/user-06.jpg';

  public insurer_name: any;
  public notes: any= [];
  public services: any= [];
  public services_code: any= [];
  public poscoveredList: any= [];

  public telehealth:boolean;
  public pay:boolean ;
  public user:any ;
  public doctor:any ;
  public roles:any = [];
  public doctor_id:any ;
  public locationId:any ;
  public location:any ;
  

  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;
  
  constructor(
    public patientService:PatientMService,
    public doctorService:DoctorService,
    public insuranceService:InsuranceService,
    public router: Router,
    public locationBack: Location,
  ){

  }

  ngOnInit(): void {
    // window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    
    this.getPoscoveredList();
    // this.insuranceData();
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
    this.locationId = this.user.location_id;
    this.roles = this.user.roles[0];
    // console.log(this.locationId);

    if(this.user.roles[0] == 'MANAGER'){
      this.selectedValueLocation = this.user.location_id;
    }
    this.getConfig();
  }

  goBack() {
    this.locationBack.back(); // <-- go back to previous location on cancel
    
  }
  getPoscoveredList(){
    this.patientService.getPosCovered().subscribe((res:any)=> {
        console.log("pos covered list", res);
        this.poscoveredList = res.data;
        
    });
  }

  getConfig(){
    this.patientService.listConfig(this.selectedValueLocation).subscribe((resp:ResponseBackend)=>{
      console.log(resp);
      this.locations = resp.locations;
      this.location = resp.location;
      this.specialists = resp.users;
      this.insurances = resp.insurances;

      this.roles_rbt = this.specialists.filter(user=> user.roles[0].name == 'RBT');
      this.roles_bcba = this.specialists.filter(user=> user.roles[0].name == 'BCBA');
      console.log(this.roles_bcba);
    })
  }


  selectCategory(event: any){
    let VALUE = event;
    this.selectedValueLocation = VALUE;
    console.log(this.selectedValueLocation);
    this.getConfig();
   
  }

  
  // insuranceData(){
  //   this.option_selected=this.option_selected
  //   this.insuranceService.showInsurance(this.option_selected).subscribe((resp:any)=>{
  //     console.log(resp);
  //     this.insurance = resp;
  //     this.insurer_name = resp.insurer_name;
  //     this.notes = resp.notes;
  //     this.services_code = resp.services;
  //   })
  // }
  // selectInsurance(id:any){debugger
  //   // this.insuranceData();
  //   // this.insurance_id='1';
  //   this.option_selected = id;
  //   this.insuranceService.showInsurance(this.option_selected).subscribe((resp:any)=>{
  //     console.log(resp);
  //     this.insurance = resp;
  //     this.insurer_name = resp.insurer_name;
  //     this.notes = resp.notes;
  //     this.services = resp.services;
  //     this.insuranceData();
  //   })
    
  // }


  insuranceData(selectedValueInsurer){
    this.insuranceService.showInsurance(selectedValueInsurer).subscribe((resp:any)=>{
      console.log(resp);
      this.insurer_name = resp.insurer_name;
      // this.notes = resp.notes;
      this.services = resp.services;
      this.provider = resp.services[0].provider;
    })
  }

  selectProviderCpt(event: any){debugger
    const selectedValue = event.target.value;
    console.log(selectedValue);

    const cptservice = this.services.find((service: Service) => service.code === selectedValue);
    if (cptservice) {
      this.provider = cptservice.provider;
      console.log(this.provider);
    } else {
      console.log('No se encontró el proveedor');
    }

  }

  selectInsurance(event:any){
    event = this.selectedValueInsurer;
    this.insuranceData(this.selectedValueInsurer);
    
  }

  // addService(){
  //   this.services.push({
  //     n_code: this.n_code,
  //     s_unit: this.s_unit
  //   })
  //   this.n_code = '';
  //   this.s_unit = '';
  // }

  // deleteService(i:any){
  //   this.services.splice(i,1);
  // }

  addPAAssestment(){
    this.pa_assessments.push({
      pa_assessment: this.pa_assessment,
      pa_assessment_start_date: this.pa_assessment_start_date,
      pa_assessment_end_date: this.pa_assessment_end_date,
      pa_services: this.pa_services,
      pa_services_start_date: this.pa_services_start_date,
      pa_services_end_date: this.pa_services_end_date,
      cpt: this.selectedValueCode,
      n_units: this.n_units,
      provider: this.provider,
    })
    this.pa_assessment = '';
    this.pa_assessment_start_date = null;
    this.pa_assessment_end_date = null;
    this.pa_services = '';
    this.pa_services_start_date = null;
    this.pa_services_end_date = null;
    this.selectedValueCode = null;
    this.n_units = 0;
    this.provider = '';
  }

  deletePAAssestment(i:any){
    this.pa_assessments.splice(i,1);
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }
  loadFileDoctorR($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo pdf';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }
  loadFileMedicalNote($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo pdf';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }
 

  save(){
    this.text_validation = '';
    if(
      !this.first_name ||!this.last_name || !this.patient_id ||
      !this.birth_date ||!this.parent_guardian_name || !this.relationship || 
      !this.language ||!this.gender || !this.phone || 
      !this.state ||!this.address || !this.city || 
      !this.diagnosis_code ||!this.insuranceId || !this.eligibility || 
      !this.welcome ||!this.consent || !this.insurance_card || 
      !this.mnl ||!this.referral || !this.ados || 
      !this.iep ||!this.asd_diagnosis || !this.cde || 
      !this.submitted ||!this.eqhlid || !this.interview  

    ){
      this.text_validation = 'All the fields are required';
      return;
    }
    

    // this.valid_form = false;
    let formData = new FormData();

    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('parent_guardian_name', this.parent_guardian_name);
    formData.append('relationship', this.relationship);
    formData.append('language', this.language);
    formData.append('home_phone', this.home_phone);
    formData.append('work_phone', this.work_phone);
    formData.append('phone', this.phone);
    formData.append('gender', this.gender+'');
    formData.append('zip', this.zip);
    formData.append('state', this.state);
    formData.append('address', this.address);
    formData.append('city', this.city);
    formData.append('education', this.education);
    formData.append('profession', this.profession);
    formData.append('school_name', this.school_name);
    formData.append('school_number', this.school_number);
    formData.append('age', this.age+'');
    formData.append('patient_id', this.patient_id);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('schedule', this.schedule);
    formData.append('summer_schedule', this.summer_schedule);
    formData.append('patient_control', this.patient_control);
    formData.append('special_note', this.special_note);
    
    formData.append('insurer_id', this.selectedValueInsurer);
    formData.append('insuranceId', this.insuranceId);
    // formData.append('insurer_secundary', this.insurer_secundary);
    // formData.append('insuranceId_secundary', this.insuranceId_secundary);
    formData.append('elegibility_date', this.elegibility_date);
    // formData.append('pos_covered', this.pos_covered);
    formData.append('deductible_individual_I_F', this.deductible_individual_I_F);
    formData.append('balance', this.balance);
    formData.append('coinsurance', this.coinsurance);
    formData.append('copayments', this.copayments);
    formData.append('oop', this.oop);
    
    formData.append('pos_covered', this.poscoveredList);
    
    if(this.user.roles[0] == 'SUPERADMIN'){
      formData.append('location_id', this.selectedValueLocation);
    }
    if(this.user.roles[0] == 'MANAGER'){
      formData.append('location_id', this.user.location_id);
    }
    // formData.append('location_id', this.locationId);

    
    formData.append('welcome', this.welcome);
    formData.append('consent', this.consent);
    formData.append('insurance_card', this.insurance_card);
    formData.append('mnl', this.mnl);
    formData.append('referral', this.referral);
    formData.append('ados', this.ados);
    formData.append('iep', this.iep);
    formData.append('asd_diagnosis', this.asd_diagnosis);
    formData.append('cde', this.cde);
    formData.append('submitted', this.submitted);
    formData.append('eligibility', this.eligibility);

    // formData.append('rbt_home_id', this.selectedValue_rbt);
    // formData.append('rbt2_school_id', this.selectedValue_rbt2);
    // formData.append('bcba_home_id', this.selectedValue_bcba);
    // formData.append('bcba2_school_id', this.selectedValue_bcba2);
    formData.append('clin_director_id', this.selectedValue_clind);

    if(this.eqhlid){
      formData.append('eqhlid', this.eqhlid);
    
    }
    if(this.pay){
      formData.append('pay', this.pay+'');
    
    }
    if(this.telehealth){
      formData.append('telehealth', this.telehealth+'');
    
    }

    if(this.interview){
      formData.append('interview', this.interview);
    }
    
    if(this.birth_date){
      formData.append('birth_date', this.birth_date);
    }
    if(this.email){
      formData.append('email', this.email);
    }
    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }

    formData.append('pa_assessments', JSON.stringify(this.pa_assessments));
    
    this.valid_form_success = false;
    this.text_validation = '';

    if(this.user.roles[0] == 'SUPERADMIN'){
      this.patientService.createPatient(formData).subscribe((resp:any)=>{
        if(resp.message == 403){
          this.text_validation = resp.message_text;
        }else{
          Swal.fire('Created', `Client Created successfully!`, 'success');
          this.router.navigate(['/patients/list']);
        }
      })
    }
    if(this.user.roles[0] == 'MANAGER'){
      this.patientService.createPatient(formData).subscribe((resp:any)=>{
        if(resp.message == 403){
          this.text_validation = resp.message_text;
        }else{
          Swal.fire('Created', `Client Created successfully!`, 'success');
          this.router.navigate(['/location/view/', this.user.location_id]);
        }
      })
    }

    


  }
}
