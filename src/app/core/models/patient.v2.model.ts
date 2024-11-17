export class PatientV2 {
  id: number;
  first_name: string;
  last_name: string;

  //
  full_name: string;
  patient_id: string; //is a code
  //
  insurer_id: number;

  static build(data: object): PatientV2 {
    return {
      ...data,
      full_name: `${data['first_name']} ${data['last_name']}`,
    } as PatientV2;
  }
}
