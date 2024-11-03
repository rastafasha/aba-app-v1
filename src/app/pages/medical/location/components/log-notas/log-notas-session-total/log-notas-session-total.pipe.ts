import { Pipe, PipeTransform } from '@angular/core';
import { NoteBcba, NoteRbt } from 'src/app/shared/models/notes.model';

@Pipe({
  name: 'logNotasSessionTotal',
})
export class LogNotasSessionTotalPipe implements PipeTransform {
  transform(
    value: NoteRbt | NoteBcba,
    unitPrice: number,
    modifiers: { value: string; porcent: number }[]
  ): number {
    if (!value) return 0;
    const mod1 = modifiers.find((mod) => mod.value === value.md)?.porcent || 1;
    const mod2 = modifiers.find((mod) => mod.value === value.md2)?.porcent || 1;
    return value.session_units_total * unitPrice * (mod1 + mod2);
  }
}
