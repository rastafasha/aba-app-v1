export interface NoteRbt {
  type: 'rbt';
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  supervisor_id: number;
  supervisor_name: string;
  supervisor: Supervisor;
  tecnico_id: number;
  tecnico: Tecnico;
  pos: string;
  session_date: string;
  meet_with_client_at: string;
  time_in: string;
  time_out: string;
  time_in2: string;
  time_out2: string;
  total_hours: string;
  total_units: string;
  cpt_code: string;
  xp: number;
  md: string;
  md2: string;
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
  type: 'bcba';
  insuranceId: string;
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  cpt_code: string;
  provider_name: string;
  session_date: string;
  tecnico: Tecnico;
  total_hours: string;
  total_units: string;
  supervisor_id: number;
  supervisor_name: string;
  supervisor: Supervisor;
  aba_supervisor: number;
  abasupervisor: Supervisor;
  xp: number;
  md: string;
  md2: string;
  billed: number;
  pay: number;
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
  npi: string;
}

export interface Tecnico {
  name: string;
  surname: string;
  npi: string;
}

export class NoteRbtBuilder implements NoteRbt {
  type: 'rbt';
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  supervisor_id: number;
  supervisor_name: string;
  supervisor: Supervisor;
  tecnico_id: number;
  tecnico: Tecnico;
  pos: string;
  session_date: string;
  meet_with_client_at: string;
  time_in: string;
  time_out: string;
  time_in2: string;
  time_out2: string;
  total_hours: string;
  total_units: string;
  cpt_code: string;
  xp: number;
  md: string;
  md2: string;
  unidades_sesion_1: number;
  unidades_sesion_2: number;
  session_units_total: number;
  billed: number;
  pay: number;
  status: string;
  created_at: string;
  insuranceId: string;

  constructor(rbt: Partial<NoteRbt> = {}) {
    console.log(rbt);

    this.type = 'rbt';
    this.id = rbt.id || 0;
    this.patient_id = rbt.patient_id || '';
    this.bip_id = rbt.bip_id || 0;
    this.supervisor_id = rbt.supervisor_id || 0;
    this.supervisor_name = rbt.supervisor_name || '';
    this.supervisor = rbt.supervisor || ({} as Supervisor);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.tecnico_id = rbt.tecnico_id || (rbt as any).tecnicoRbt_id || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.tecnico = rbt.tecnico || (rbt as any).tecnicoRbt || ({} as Tecnico);
    this.pos = rbt.pos || '';
    this.session_date = rbt.session_date || '';
    this.meet_with_client_at = rbt.meet_with_client_at || '';
    this.time_in = rbt.time_in || '';
    this.time_out = rbt.time_out || '';
    this.time_in2 = rbt.time_in2 || '';
    this.time_out2 = rbt.time_out2 || '';
    this.total_hours = rbt.total_hours || '0';
    this.total_units = rbt.total_units || '0';
    this.cpt_code = rbt.cpt_code || '';
    this.xp = rbt.xp || 0;
    this.md = rbt.md || '';
    this.md2 = rbt.md2 || '';
    this.unidades_sesion_1 = rbt.unidades_sesion_1 || 0;
    this.unidades_sesion_2 = rbt.unidades_sesion_2 || 0;
    this.session_units_total = rbt.session_units_total || 0;
    this.billed = rbt.billed || 0;
    this.pay = rbt.pay || 0;
    this.status = rbt.status || '';
    this.created_at = rbt.created_at || new Date().toISOString();
    this.insuranceId = rbt.insuranceId || '';
  }
}

export class NoteBcbaBuilder implements NoteBcba {
  type: 'bcba';
  insuranceId: string;
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  cpt_code: string;
  provider_name: string;
  session_date: string;
  tecnico: Tecnico;
  total_hours: string;
  total_units: string;
  supervisor_id: number;
  supervisor_name: string;
  supervisor: Supervisor;
  aba_supervisor: number;
  abasupervisor: Supervisor;
  xp: number;
  md: string;
  md2: string;
  billed: number;
  pay: number;
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

  constructor(bcba: Partial<NoteBcba> = {}) {
    this.type = 'bcba';
    this.insuranceId = bcba.insuranceId || '';
    this.insurance_id = bcba.insurance_id || 0;
    this.id = bcba.id || 0;
    this.patient_id = bcba.patient_id || '';
    this.bip_id = bcba.bip_id || 0;
    this.cpt_code = bcba.cpt_code || '';
    this.provider_name = bcba.provider_name || '';
    this.session_date = bcba.session_date || '';
    this.tecnico = bcba.tecnico || ({} as Tecnico);
    this.total_hours = bcba.total_hours || '0';
    this.total_units = bcba.total_units || '0';
    this.supervisor_id = bcba.supervisor_id || 0;
    this.supervisor_name = bcba.supervisor_name || '';
    this.supervisor = bcba.supervisor || ({} as Supervisor);
    this.aba_supervisor = bcba.aba_supervisor || 0;
    this.abasupervisor = bcba.abasupervisor || ({} as Supervisor);
    this.xp = bcba.xp || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.md = bcba.md || (bcba as any).mdbcba || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.md2 = bcba.md2 || (bcba as any).md2bcba || null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.billed = bcba.billed || (bcba as any).billedbcba || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.pay = bcba.pay || (bcba as any).paybcba || 0;
    this.meet_with_client_at = bcba.meet_with_client_at || '';
    this.unidades_sesion_1 = bcba.unidades_sesion_1 || 0;
    this.unidades_sesion_2 = bcba.unidades_sesion_2 || 0;
    this.session_units_total = bcba.session_units_total || 0;
    this.status = bcba.status || '';
    this.created_at = bcba.created_at || new Date().toISOString();
    this.time_in = bcba.time_in || '';
    this.time_in2 = bcba.time_in2 || '';
    this.time_out = bcba.time_out || '';
    this.time_out2 = bcba.time_out2 || '';
  }
}

export function isNoteRbt(note: NoteRbt | NoteBcba): note is NoteRbt {
  return note.type === 'rbt';
}

export function isNoteBcba(note: NoteRbt | NoteBcba): note is NoteBcba {
  return note.type === 'bcba';
}
