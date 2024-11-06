import { Pipe, PipeTransform } from '@angular/core';
import { InsuranceModifier } from '../../../models/locations.model';

@Pipe({
  name: 'logNotasSessionTotal',
})
export class LogNotasSessionTotalPipe implements PipeTransform {
  transform(
    session_units_total: number,
    md: string,
    md2: string,
    unitPrice: number,
    modifiers: InsuranceModifier[]
  ): number {
    if (!md) return undefined;
    const mod1 = modifiers.find((mod) => mod.value === md)?.multiplier ?? 1;
    const mod2 = modifiers.find((mod) => mod.value === md2)?.multiplier ?? 1;
    return session_units_total * unitPrice * mod1 * mod2;
  }
}
