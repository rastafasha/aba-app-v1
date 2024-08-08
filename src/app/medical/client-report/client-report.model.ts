export class ClientReportModel {

  public pa_assessments:any=[];
  public pa_assessmentsgroup:any=[];
  public cpt:any;
  public n_units:any;
  public pa_number:any;
  public insurances:any=[];
  public insurance_id:any;
  public insuranceiddd:any;
  public insurer_name:any;
  public sponsors:any=[];
  public modifiers:any=[];
  public noteRbt:any=[];
  public pos_covered:any=[];
  public pa_assessmentgroup:any=[];
  public noteBcba:any=[];
  public patient:any;
  public patientID:any;
  public patientName:any;
  public doctor_selected_full_name:any;
  public billing_total:number = 0;
  public week_total_hours:string;
  public week_total_units:number = 0;
  public total_hours:number = 0;
  public total_units:number = 0;
  public charges:number = 0;
  public unitPrize:number = 0;
  public unitPrizeCpt:number = 0;
  public xe:number = 0;
  public is_xe:boolean;
  
  public session_date:any;
  public time_in:any;
  public time_out:any;
  public time_in2:any;
  public time_out2:any;
  public pos:any;
  public billed:boolean ;
  public pay:boolean ;
  public billedbcba:boolean ;
  public paybcba:boolean ;
  public md:any;
  public md2:any;
  public mdbcba:any;
  public md2bcba:any;
  public pay_selected:any;
  public billed_selected:any;
  public total:any;
  public totalPorPagar:any;
  public resultconFactor:any;
  public unidades:any;
  public porPagar:any;
  public horaTrabajada:any;
  public factHoras:any;
  public totalHoras:any;
  public totalUnidades:any;
  public units:any;
  public hoursPerUnit:any;
  public timePerUnit:any;
  
  public tecnicoRbts:any;
  public supervisor:any;
  public npi:any;
  public rbt_id: any;
  public rbt2_id: any;
  public bcba_id: any;
  public bcba2_id: any;
  public doctor_selected_bcba: any;
  public full_name: any;
  public doctors: any;
  public tecnicoDoctorNames: any;
  public patientId: any;
  public services: any;
  public provider: any;
  public selectedCpt: any;
  // public data: any;

  public providersSponsorsList:any;
  public factorPorcentual: number =  1.66666666666667

  doctor_selected:any =null;
  combinedList: any[];
  unitPrizeCptBcba: any;
  unitPrizeCptRbt: any;
  bcbaCptCode: string;
rbtCptCode: string;
}