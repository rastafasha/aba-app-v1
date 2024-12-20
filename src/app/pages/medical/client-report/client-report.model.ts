import { NoteBcba } from 'src/app/core/models/note-bcba.model';
import { NoteRbt } from 'src/app/core/models';
import {
  LocationApi,
  LocationInsurance,
} from '../location/models/locations.model';

export class ClientReportModel {
  pa_assessments: any = [];
  pa_assessmentsgroup: any = [];
  cpt: any;
  n_units: any;
  pa_number: any;
  insurances: any = [];
  insurance_id: any;
  insuranceiddd: any;
  insurer_name: any;
  sponsors: any = [];
  modifiers: any = [];
  noteRbt: any = [];
  pos_covered: any = [];
  pa_assessmentgroup: any = [];
  noteBcba: any = [];
  patient: any;
  patientID: any;
  patientName: any;
  doctor_selected_full_name: any;
  billing_total = 0;
  week_total_hours: string;
  week_total_units = 0;
  total_hours = 0;
  total_units = 0;
  charges = 0;
  unitPrize = 0;
  unitPrizeCpt = 0;
  xe = 0;
  is_xe: boolean;

  session_date: any;
  time_in: any;
  time_out: any;
  time_in2: any;
  time_out2: any;
  pos: any;
  billed: boolean;
  pay: boolean;
  billedbcba: boolean;
  paybcba: boolean;
  md: any;
  md2: any;
  mdbcba: any;
  md2bcba: any;
  pay_selected: any;
  billed_selected: any;
  total: any;
  totalPorPagar: any;
  resultconFactor: any;
  unidades: any;
  porPagar: any;
  horaTrabajada: any;
  factHoras: any;
  totalHoras: any;
  totalUnidades: any;
  units: any;
  hoursPerUnit: any;
  timePerUnit: any;

  tecnicoRbts: any;
  supervisor: any;
  npi: any;
  rbt_id: any;
  rbt2_id: any;
  bcba_id: any;
  bcba2_id: any;
  doctor_selected_bcba: any;
  full_name: any;
  doctors: any;
  tecnicoDoctorNames: any;
  patientId: any;
  services: any;
  provider: any;
  selectedCpt: any;
  //data: any;

  providersSponsorsList: any;
  factorPorcentual = 1.66666666666667;

  doctor_selected: any = null;
  combinedList: any[];
  unitPrizeCptBcba: any;
  unitPrizeCptRbt: any;
  bcbaCptCode: string;
  rbtCptCode: string;
}

export interface ClientReportConfig {
  insurances: LocationInsurance[];
}

export interface ClientReportByLocation {
  noteRbts: NoteRbt[];
  noteBcbas: NoteBcba[];
  location: LocationApi;
  totalPages: number;
  arrayPages: number[];
}
