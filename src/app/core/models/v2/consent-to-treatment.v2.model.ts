import { DateOrNullOrUndefined } from 'src/app/shared/utils';

export class ConsentToTreatment {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  analyst_signature: string;
  analyst_signature_date: Date;
  parent_guardian_signature: string;
  parent_guardian_signature_date: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<ConsentToTreatment>) {
    Object.assign(this, data);
    this.analyst_signature_date = DateOrNullOrUndefined(
      this.analyst_signature_date
    );
    this.parent_guardian_signature_date = DateOrNullOrUndefined(
      this.parent_guardian_signature_date
    );
  }
  static getDefault(): ConsentToTreatment {
    return {
      id: undefined,
      bip_id: undefined,
      patient_id: '',
      client_id: undefined,
      analyst_signature: '',
      analyst_signature_date: new Date(),
      parent_guardian_signature: '',
      parent_guardian_signature_date: new Date(),
    };
  }
}
