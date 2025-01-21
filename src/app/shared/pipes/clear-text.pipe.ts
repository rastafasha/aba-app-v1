import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clearText',
})
export class ClearTextPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/[^a-zA-Z0-9]/g, ' ').trim();
  }
}
