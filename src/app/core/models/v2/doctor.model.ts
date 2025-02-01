export class Doctor {
  id: number;
  full_name: string;
  avatar: string | null;
  constructor(data: Partial<Doctor>) {
    Object.assign(this, data);
  }
}
