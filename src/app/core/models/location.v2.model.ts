import {
  StringOrNullOrUndefined,
  NumberOrNullOrUndefined,
} from 'src/app/shared/utils';

export class LocationV2 {
  id: number;
  title: string;
  avatar: string;
  city: string;
  state: string;
  zip: number;
  address: string;
  email: string;
  phone1: string;
  phone2: string;
  telfax: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date;

  constructor(data: Partial<LocationV2>) {
    if (!data) return null;
    const location: LocationV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      title: StringOrNullOrUndefined(data.title),
      avatar: StringOrNullOrUndefined(data.avatar),
      city: StringOrNullOrUndefined(data.city),
      state: StringOrNullOrUndefined(data.state),
      zip: NumberOrNullOrUndefined(data.zip),
      address: StringOrNullOrUndefined(data.address),
      email: StringOrNullOrUndefined(data.email),
      phone1: StringOrNullOrUndefined(data.phone1),
      phone2: StringOrNullOrUndefined(data.phone2),
      telfax: StringOrNullOrUndefined(data.telfax),
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
      deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
    };
    return location;
  }
}
