import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeString',
})
export class RemoveStringPipe implements PipeTransform {
  transform(value: string, remove: string): string {
    return value?.replaceAll(remove, '');
  }
}
