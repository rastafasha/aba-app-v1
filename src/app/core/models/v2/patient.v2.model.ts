import {
  BooleanOrNullOrUndefined,
  // compareObjects,
  DateOrNullOrUndefined,
  isString,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { PaServiceV2 } from './pa-service.v2.model';

export class PatientV2 {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  // patient_id: number;
  patient_identifier: string;
  avatar: string;
  status: string;

  insurer_id: number;
  insurer_secondary_id: number;
  insurance_identifier: string;
  insurance_secondary_identifier: string;
  birth_date: Date;

  age: number;
  gender: number;
  parent_gender: number;
  education: string;
  profession: string;
  school_name: string;
  school_number: string;

  parent_guardian_name: string;
  relationship: string;
  parent_birth_date: Date;
  emmployment: boolean;
  auto_accident: boolean;
  other_accident: boolean;
  is_self_subscriber: boolean;

  language: string;
  phone: string;
  home_phone: string;
  work_phone: string;
  email: string;
  city: string;

  zip: string;
  state: string;
  address: string;
  parent_address: string;
  parent_city: string;
  parent_state: string;
  parent_zip: string;
  special_note: string;
  diagnosis_code: string;
  referring_provider_first_name: string;
  referring_provider_last_name: string;
  referring_provider_npi: string;
  referring_code: string;
  npi: string;
  schedule: string;
  summer_schedule: string;
  location_id: number;

  eqhlid: string;
  elegibility_date: Date;
  pos_covered: string[];
  deductible_individual_I_F: string;
  balance: string;
  coinsurance: string;
  copayments: string;
  oop: string;
  patient_control: string;

  welcome: string;
  consent: string;
  insurance_card: string;
  eligibility: string;
  mnl: string;
  referral: string;
  ados: string;
  iep: string;
  asd_diagnosis: string;
  cde: string;
  submitted: string;
  interview: string;
  //
  rbt_home_id: number;
  rbt2_school_id: number;
  bcba_home_id: number;
  bcba_school_id: number;
  bcba2_school_id: number;
  clin_director_id: number;
  telehealth: boolean;
  pay: boolean;


  //
  pa_services: PaServiceV2[];
  pa_assessments: string;
  compayment_per_visit: string;
  insurer_secundary: string;
  //
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(data: Partial<PatientV2>) {
    // some wireds issues
    if (isString(data.pos_covered)) {
      data.pos_covered = data.pos_covered.replace('"', '').split(',');
    }
    const result: PatientV2 = {
      // ...data,
      id: NumberOrNullOrUndefined(data.id),
      first_name: StringOrNullOrUndefined(data.first_name),
      last_name: StringOrNullOrUndefined(data.last_name),
      full_name: `${data.first_name} ${data.last_name}`,
      avatar: StringOrNullOrUndefined(data.avatar),
      status: StringOrNullOrUndefined(data.status),

      birth_date: DateOrNullOrUndefined(data.birth_date),

      // patient_id: NumberOrNullOrUndefined(data.patient_id),
      patient_identifier: StringOrNullOrUndefined(data.patient_identifier),
      insurer_id: NumberOrNullOrUndefined(data.insurer_id),
      insurer_secondary_id: NumberOrNullOrUndefined(data.insurer_secondary_id),
      insurance_identifier: StringOrNullOrUndefined(data.insurance_identifier),
      insurance_secondary_identifier: StringOrNullOrUndefined(
        data.insurance_secondary_identifier
      ),
      language: StringOrNullOrUndefined(data.language),
      city: StringOrNullOrUndefined(data.city),
      email: StringOrNullOrUndefined(data.email),
      phone: StringOrNullOrUndefined(data.phone),
      home_phone: StringOrNullOrUndefined(data.home_phone),
      work_phone: StringOrNullOrUndefined(data.work_phone),
      age: NumberOrNullOrUndefined(data.age),
      gender: NumberOrNullOrUndefined(data.gender),
      parent_gender: NumberOrNullOrUndefined(data.parent_gender),
      education: StringOrNullOrUndefined(data.education),

      profession: StringOrNullOrUndefined(data.profession),
      school_name: StringOrNullOrUndefined(data.school_name),
      school_number: StringOrNullOrUndefined(data.school_number),
      parent_guardian_name: StringOrNullOrUndefined(data.parent_guardian_name),
      relationship: StringOrNullOrUndefined(data.relationship),
      parent_birth_date: DateOrNullOrUndefined(data.parent_birth_date),
      emmployment: BooleanOrNullOrUndefined(data.emmployment),
      auto_accident: BooleanOrNullOrUndefined(data.auto_accident),
      other_accident: BooleanOrNullOrUndefined(data.other_accident),
      is_self_subscriber: BooleanOrNullOrUndefined(data.is_self_subscriber),

      zip: StringOrNullOrUndefined(data.zip),
      state: StringOrNullOrUndefined(data.state),
      address: StringOrNullOrUndefined(data.address),
      parent_address: StringOrNullOrUndefined(data.parent_address),
      parent_city: StringOrNullOrUndefined(data.parent_city),
      parent_state: StringOrNullOrUndefined(data.parent_state),
      parent_zip: StringOrNullOrUndefined(data.parent_zip),
      special_note: StringOrNullOrUndefined(data.special_note),
      diagnosis_code: StringOrNullOrUndefined(data.diagnosis_code),
      referring_provider_first_name: StringOrNullOrUndefined(data.referring_provider_first_name),
      referring_provider_last_name: StringOrNullOrUndefined(data.referring_provider_last_name),
      referring_provider_npi: StringOrNullOrUndefined(data.referring_provider_npi),
      referring_code: StringOrNullOrUndefined(data.referring_code),
      npi: StringOrNullOrUndefined(data.npi),
      schedule: StringOrNullOrUndefined(data.schedule),
      summer_schedule: StringOrNullOrUndefined(data.summer_schedule),
      location_id: NumberOrNullOrUndefined(data.location_id),

      eqhlid: StringOrNullOrUndefined(data.eqhlid),
      elegibility_date: DateOrNullOrUndefined(data.elegibility_date),
      pos_covered: data.pos_covered?.map(StringOrNullOrUndefined) ?? [],
      deductible_individual_I_F: StringOrNullOrUndefined(
        data.deductible_individual_I_F
      ),
      balance: StringOrNullOrUndefined(data.balance),
      coinsurance: StringOrNullOrUndefined(data.coinsurance),
      copayments: StringOrNullOrUndefined(data.copayments),
      oop: StringOrNullOrUndefined(data.oop),
      patient_control: StringOrNullOrUndefined(data.patient_control),

      welcome: StringOrNullOrUndefined(data.welcome),
      consent: StringOrNullOrUndefined(data.consent),
      insurance_card: StringOrNullOrUndefined(data.insurance_card),
      eligibility: StringOrNullOrUndefined(data.eligibility),
      mnl: StringOrNullOrUndefined(data.mnl),
      referral: StringOrNullOrUndefined(data.referral),
      ados: StringOrNullOrUndefined(data.ados),
      iep: StringOrNullOrUndefined(data.iep),
      asd_diagnosis: StringOrNullOrUndefined(data.asd_diagnosis),
      cde: StringOrNullOrUndefined(data.cde),
      submitted: StringOrNullOrUndefined(data.submitted),
      interview: StringOrNullOrUndefined(data.interview),

      pa_services: data.pa_services
        ? data.pa_services?.map((service) => new PaServiceV2(service))
        : [],
      pa_assessments: StringOrNullOrUndefined(data.pa_assessments),
      compayment_per_visit: StringOrNullOrUndefined(data.compayment_per_visit),
      insurer_secundary: StringOrNullOrUndefined(data.insurer_secundary),

      rbt_home_id: NumberOrNullOrUndefined(data.rbt_home_id),
      rbt2_school_id: NumberOrNullOrUndefined(data.rbt2_school_id),
      bcba_home_id: NumberOrNullOrUndefined(data.bcba_home_id),
      bcba_school_id: NumberOrNullOrUndefined(data.bcba_school_id),
      bcba2_school_id: NumberOrNullOrUndefined(data.bcba2_school_id),
      clin_director_id: NumberOrNullOrUndefined(data.clin_director_id),
      telehealth: BooleanOrNullOrUndefined(data.telehealth),
      pay: BooleanOrNullOrUndefined(data.pay),


      created_at: DateOrNullOrUndefined(data.created_at),
      updated_at: DateOrNullOrUndefined(data.updated_at),
      deleted_at: DateOrNullOrUndefined(data.deleted_at),
    };
    // console.table(compareObjects(data, result));
    return result;
  }
}
