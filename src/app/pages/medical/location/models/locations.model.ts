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
}

export interface LocationApiResponse<T> {
  total: number;
  locations: {
    data: T;
    id: number;
  };
}
