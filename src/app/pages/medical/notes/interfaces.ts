
export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
}

 export interface POSModel {
  id: number;
  name: string;
  code: string;
}

export interface Intervention {
  id: string;
  name: string;
  value: boolean;
}

export interface MaladaptiveBehavior {
  name: string;
  number_of_occurrences: number;
  goal?: Goal;
  total_trials?: number;
  number_of_correct_response?: number;
}

export interface Goal {
  id: number;
  name: string;
  description?: string;
  total_trials?: number;
  number_of_correct_response?: number;
  goal?: string;
  status:string;
}


