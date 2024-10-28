export interface LocationApi {
  location_id: number;
  id: number | string;
  created_at: string | number | Date;
  zip: number;
  phone1: string;
  phone2: string;
  city: string;
  email: string;
  title: string;
  name: string;
  address: string;
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
