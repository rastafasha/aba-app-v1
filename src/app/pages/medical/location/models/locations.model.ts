export interface LocationApi {
  name: string;
}

export interface LocationApiResponse<T> {
  total: number;
  locations: {
    data: T;
    id: number;
  };
}
