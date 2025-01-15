export interface CreateResponse<T> {
  data: T;
  status: string;
  message: string;
}

export interface ApiV2Response<T> {
  status: 'success' | 'error';
  data: T;
}

export interface ListResponse<T> {
  data: T[];
  status: string;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface ListParameters {
  per_page?: number;
  [key: string]: string | number | boolean;
}
