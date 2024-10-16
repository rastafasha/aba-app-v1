import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
})
export class ArrayFilterPipe implements PipeTransform {
  transform<T>(items: T[], field: keyof T, value: unknown): T[] {
    if (!items || !field || value === undefined || value === null) {
      return items;
    }
    return items.filter((item) => item[field] === value);
  }
}
