export interface LocationApi {
  location_id: number;
  id: number;
  created_at: string | number | Date;
  zip: number;
  phone1: string;
  phone2: string;
  city: string;
  email: string;
  title: string;
  name: string;
  address: string;
  address2: string;
  taxid: string;
  npi: string;
  taxonomy: string;
  providerId: string;
  additional_notes: string;
  state: string;
  user_id: number;
  client_id: number;
  telfax: string;
  avatar: string;
}

export interface LocationSpecialist {
  id: number;
  full_name: string;
  email: string;
  status: string;
  npi: string;
  phone: string;
  location_id: number;
  roles: any[];
  created_at: string | number | Date;
  avatar: string;
}

export interface LocationPatient {
  id: number;
  patient_id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  eligibility: string;
  created_at: string | number | Date;
  rbt_id: number;
  rbt2_id: number;
  bcba_id: number;
  bcba2_id: number;
}

export interface LocationInsurance {
  insurer_name: string;
  id: number;
}

export interface Insurance {
  id: number;
  insurer_name: string;
  services: InsuranceService[];
  notes: InsuranceNote[];
  created_at: string;
}

export interface InsuranceService {
  code: string;
  provider: string;
  hourly_fee: number;
  unit_prize: number;
  description: string;
  max_allowed: string;
}

export interface InsuranceNote {
  note: string;
}

export interface InsuranceModifier {
  value: string;
  description: string;
  type: 'rbt' | 'bcba' | 'all';
  multiplier: number;
}

export interface LocationApiResponse<T> {
  total: number;
  locations: {
    data: T;
    id: number;
  };
}

export interface LocationViewApiResponse {
  specialists: LocationSpecialist[];
  patients: LocationPatient[];
  location: LocationApi;
}

export interface LocationLogFilter {
  page?: number;
  insurance_id: number;
  patient_id: number;
  note_type: 'rbt' | 'bcba' | null;
  status_type: string;
  date_start: number | string;
  date_end: number | string;
}
