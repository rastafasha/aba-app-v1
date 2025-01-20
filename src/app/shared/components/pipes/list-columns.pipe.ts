import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listColumns',
})
export class ListColumnsPipe<T> implements PipeTransform {
  transform(
    columns: (keyof T)[],
    extras: string[],
    show: boolean
  ): (keyof T | string)[] {
    if (!extras?.length || !show) return columns;
    return [...columns, ...extras];
  }
}
