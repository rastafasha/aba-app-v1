export interface NoteRbt {
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  supervisor_id: number | null;
  supervisor: Supervisor;
  tecnicoRbt_id: number;
  tecnicoRbt: TecnicoRbt;
  pos: string;
  session_date: string;
  meet_with_client_at: string;
  time_in: string;
  time_out: string;
  time_in2: string | null;
  time_out2: string | null;
  total_hours: string;
  total_units: string;
  cpt_code: string;
  md: string | null;
  md2: string | null;
  unidades_sesion_1: number;
  unidades_sesion_2: number;
  session_units_total: number;
  billed: number;
  pay: number;
  status: string;
  created_at: string;
  insuranceId: string;
}

export interface NoteBcba {
  insuranceId: string;
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  cpt_code: string;
  provider_name: number;
  session_date: string;
  tecnico: Tecnico;
  total_hours: string;
  total_units: string;
  supervisor_name: number;
  supervisor: Supervisor;
  aba_supervisor: number;
  abasupervisor: Supervisor;
  mdbcba: string;
  md2bcba: string | null;
  billedbcba: number;
  paybcba: number;
  meet_with_client_at: string;
  unidades_sesion_1: number;
  unidades_sesion_2: number;
  session_units_total: number;
  status: string;
  created_at: string;

  time_in?: string;
  time_in2?: string;

  time_out?: string;
  time_out2?: string;
}

export interface Supervisor {
  name: string;
  surname: string;
  npi: string | null;
}

export interface TecnicoRbt {
  name: string;
  surname: string;
  npi: string | null;
}

export interface Tecnico {
  name: string;
  surname: string;
  npi: string | null;
}
