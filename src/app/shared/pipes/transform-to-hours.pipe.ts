import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformToHour',
})
export class TransformToHourPipe implements PipeTransform {
  transform(value: number): number {
    if (!value) return null;
    return Math.floor(value/60);
  }


}
