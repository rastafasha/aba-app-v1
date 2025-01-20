export class ProviderV2 {
  id: number;
  name: string;
  surname: string;
  npi: string;
  electronic_signature: string;
  full_name: string;

  constructor(data: Partial<ProviderV2>) {
    if (!data) return null;
    Object.assign(this, data);
    this.full_name = `${this.name} ${this.surname}`;
  }
}
