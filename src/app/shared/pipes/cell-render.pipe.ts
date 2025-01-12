import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cellRender',
})
export class CellRenderPipe implements PipeTransform {
  transform<T>(
    element: T,
    key: string | number | symbol,
    render?: (value: T) => string
  ): string {
    if (!render) return element[key] as string;
    return render(element);
  }
}
