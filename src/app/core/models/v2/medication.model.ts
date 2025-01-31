export class Medication {
  index: number;
  medication: string;
  dose: string;
  frecuency: string;
  reason: string;
  preescribing_physician: string;
  constructor(data: Partial<Medication>) {
    Object.assign(this, data);
  }
  static getDefault(): Medication {
    return {
      index: undefined, // Changed from 0
      medication: '',
      dose: '',
      frecuency: '',
      reason: '',
      preescribing_physician: '',
    };
  }
}
