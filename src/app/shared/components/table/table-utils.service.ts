import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})
export class TableUtilsService {
  constructor() {
    //
  }

  orderData<T>(_data: T[], sort: Sort): T[] {
    const data = _data.slice();
    if (!sort.active || sort.direction === '') {
      return data;
    } else {
      return data.sort((a, b) => {
        const aValue = a[sort.active];
        const bValue = b[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
}
