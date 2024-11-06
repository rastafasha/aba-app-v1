import { TestBed } from '@angular/core/testing';

import { Sort } from '@angular/material/sort';
import { TableUtilsService } from './table-utils.service';

describe('TableUtilsService', () => {
  let service: TableUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should order a list', () => {
    const sort: Sort = {
      direction: 'asc',
      active: 'age',
    };
    const data = [
      { name: 'John', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 20 },
    ];
    const expected = [
      { name: 'Bob', age: 20 },
      { name: 'John', age: 25 },
      { name: 'Alice', age: 30 },
    ];
    expect(service.orderData(data, sort)).toEqual(expected);
  });
});
