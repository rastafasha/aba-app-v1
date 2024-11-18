import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logReportsSessionTotal',
})
export class LogReportsSessionTotalPipe implements PipeTransform {
  transform(
    session_units_total: number,
    md1: string,
    md2: string,
    unitPrice: number,
    modifiers: { value: string; multiplier: number }[]
  ): number {
    if (session_units_total === undefined) return undefined;
    if (!modifiers) return undefined;
    if (unitPrice === undefined) return undefined;
    const mod1 = modifiers.find((mod) => mod.value === md1)?.multiplier ?? 1;
    const mod2 = modifiers.find((mod) => mod.value === md2)?.multiplier ?? 1;
    return session_units_total * unitPrice * mod1 * mod2;
  }
}
