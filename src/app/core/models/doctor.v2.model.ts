export class DoctorRoleV2 {
  id: number;
  name: string;
  guard_name: string;
  created_at?: Date;
  updated_at?: Date;
}
export class DoctorV2 {
  id: number;
  patient_id: number;
  location_id: number;
  name: string;
  surname: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  birth_date: Date;
  gender: number;
  address: string;
  status: string;
  avatar: string;
  roles: DoctorRoleV2;
  currently_pay_through_company: string;
  llc: string;
  ien: string;
  wc: string;
  electronic_signature: string;
  agency_location: string;
  city: string;
  languages: string;
  dob: string;
  ss_number: string;
  date_of_hire: Date;
  start_pay: Date;
  driver_license_expiration: Date;
  cpr_every_2_years: string;
  background_every_5_years: string;
  e_verify: string;
  national_sex_offender_registry: string;
  certificate_number: string;
  bacb_license_expiration: string;
  liability_insurance_annually: string;
  local_police_rec_every_5_years: string;
  npi: string;
  medicaid_provider: string;
  ceu_hippa_annually: string;
  ceu_domestic_violence_no_expiration: string;
  ceu_security_awareness_annually: string;
  ceu_zero_tolerance_every_3_years: string;
  ceu_hiv_bloodborne_pathogens_infection_control_no_expiration: string;
  ceu_civil_rights_no_expiration: string;
  school_badge: string;
  w_9_w_4_form: string;
  contract: string;
  two_four_week_notice_agreement: string;
  credentialing_package_bcbas_only: string;
  caqh_bcbas_only: string;
  contract_type: string;
  salary: string;
  created_at?: Date;
}
