export interface PaService {
  id?: number;
  patient_id?: number;
  pa_services: string;
  cpt: string;
  n_units: number;
  available_units?: number;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}


export interface PaServiceResponse {
  pa_service: PaService;
  message?: string;
}

export interface PaServicesResponse {
  pa_services: PaService[];
}

export interface PaServiceError {
  error: string;
  messages?: {
    [key: string]: string[];
  };
}

export interface CreatePaServiceDto {
  pa_services: string;
  cpt: string;
  n_units: number;
  start_date: string;
  end_date: string;
}
