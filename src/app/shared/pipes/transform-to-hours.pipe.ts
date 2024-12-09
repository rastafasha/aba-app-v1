import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformToHour',
})
export class TransformToHourPipe implements PipeTransform {
  transform(value: number): number {
    if (!value) return null;
    return Math.floor(value/60);
  }
  // para sacar  total hour con los minutos se multiplica por 0.25 y se divide entre 15
  

  


}
