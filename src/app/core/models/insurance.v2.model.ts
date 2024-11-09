export class InsuranceV2 {
  id: number;
  insurer_name: string;
  services: InsuranceV2Service[];
  notes: InsuranceV2Notes[];
  payer_id: number;
  street: string;
  street2: string;
  city: string;
  state: string;
  zip: number;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date;

  static build = (data: object): InsuranceV2 => ({
    ...data,
    services: (data['services'] as object[]).map((serviceData) =>
      InsuranceV2Service.build(serviceData)
    ),
    notes: (data['notes'] as object[]).map((notesData) =>
      InsuranceV2Notes.build(notesData)
    ),
    payer_id: Number(data['payer_id']),
    created_at: new Date(data['created_at']),
    updated_at: new Date(data['updated_at']),
    deleted_at: data['deleted_at'] ? new Date(data['deleted_at']) : null,
    id: Number(data['id']),
    insurer_name: data['insurer_name'] as string,
    street: data['street'] as string,
    street2: data['street2'] as string,
    city: data['city'] as string,
    state: data['state'] as string,
    zip: Number(data['zip']),
  });
}

export class InsuranceV2Service {
  code: string;
  provider: string;
  description: string;
  unit_price: number;
  hourly_fee: number;
  max_allowed: string;
  md1: string; //TODO
  md2: string; //TODO
  type: 'rbt' | 'bcba' | 'all' = 'all'; //TODO
  multiplier = 1; //TODO
  static build = (data: object): InsuranceV2Service => {
    const codes = data['code'].split(' ');

    const result = {
      ...data,
      code: codes[0],
      provider: data['provider'] as string,
      description: data['description'] as string,
      unit_price: data['unit_price']
        ? Number(data['unit_price'])
        : Number(data['unit_prize']),
      hourly_fee: Number(data['hourly_fee']),
      max_allowed: data['max_allowed'] as string,
      md1: codes[1],
      md2: codes[2],
      type: data['type'] as 'rbt' | 'bcba' | 'all',
      multiplier: data['multiplier'] ? Number(data['multiplier']) : 1,
    };
    // FIXES
    result.type =
      result.provider?.toLowerCase() === 'bcba' ||
      result.provider?.toLowerCase() === 'bcaba'
        ? 'bcba'
        : result.provider?.toLowerCase() === 'rbt'
        ? 'rbt'
        : 'all';

    return result;
  };
}

export class InsuranceV2Notes {
  note: string;
  static build = (data: object): InsuranceV2Notes => ({
    note: data['note'] as string,
  });
}
