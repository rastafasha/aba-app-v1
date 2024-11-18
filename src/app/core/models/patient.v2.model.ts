import { NumberOrNullOrUndefined } from 'src/app/shared/utils';

export class PatientV2 {
  id: number;
  first_name: string;
  last_name: string;

  //
  full_name: string;
  patient_id: string; //is a code
  //
  insurer_id: number;

  constructor(data: Partial<PatientV2>) {
    console.log(data);
    return {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      full_name: `${data.first_name} ${data.last_name}`,
    } as PatientV2;
  }
}
