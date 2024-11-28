import { NoteBcba } from './note-bcba.model';
import { Supervisor, Tecnico } from './notes.model';

export interface NoteRbt {
  
  pa_service_id: any;
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
  session_length_total: string;
  total_units: string;
  cpt_code: string;
  xp: number;
  md: string;
  md2: string;
  unidades_sesion_1: number;
  unidades_sesion_2: number;
  session_units_total: number;
  billed: boolean;
  pay: boolean;
  status: string;
  created_at: string;
  insurance_key: string;
  provider_id: number;
  provider: Provider;
}
export interface Provider {
  id: number;
  name: string;
  surname: string | null;
  npi: string | null;
  electronic_signature: string | null;
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
  session_length_total: string;
  total_units: string;
  cpt_code: string;
  xp: number;
  md: string;
  md2: string;
  unidades_sesion_1: number;
  unidades_sesion_2: number;
  session_units_total: number;
  billed: boolean;
  pay: boolean;
  status: string;
  created_at: string;
  insurance_key: string;
  pa_service_id: number;
  provider_id: number;
  provider: Provider;

  constructor(data: Partial<NoteRbt> = {}) {
    this.type = 'rbt';
    this.id = data.id || 0;
    this.patient_id = data.patient_id || '';
    this.provider_id = data.provider_id || 0;
    this.bip_id = data.bip_id || 0;
    this.supervisor_id = data.supervisor_id || 0;
    this.supervisor_name = data.supervisor_name || '';
    this.supervisor = data.supervisor || ({} as Supervisor);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.tecnico_id = data.tecnico_id || (data as any).tecnicoRbt_id || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.tecnico = data.tecnico || (data as any).tecnicoRbt || ({} as Tecnico);
    this.pos = data.pos || '';
    this.session_date = data.session_date || '';
    this.meet_with_client_at = data.meet_with_client_at || '';
    this.time_in = data.time_in || '';
    this.time_out = data.time_out || '';
    this.time_in2 = data.time_in2 || '';
    this.time_out2 = data.time_out2 || '';
    this.session_length_total = data.session_length_total || '0';
    this.total_units = data.total_units || '0';
    this.cpt_code = data.cpt_code || '';
    this.xp = data.xp || 0;
    this.md = data.md || '';
    this.md2 = data.md2 || '';
    this.unidades_sesion_1 = data.unidades_sesion_1 || 0;
    this.unidades_sesion_2 = data.unidades_sesion_2 || 0;
    this.session_units_total = data.session_units_total || 0;
    this.billed = data.billed || false;
    this.pay = data.pay || false;
    this.status = data.status || '';
    this.created_at = data.created_at || new Date().toISOString();
    this.insurance_key = data.insurance_key || (data as any).insuranceId || '';

    this.pa_service_id = data.pa_service_id || 0;
  }
}

export function isNoteRbt(note: NoteRbt | NoteBcba): note is NoteRbt {
  return note.type === 'rbt';
}
