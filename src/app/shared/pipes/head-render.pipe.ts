import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headRender',
})
export class HeadRenderPipe implements PipeTransform {
  transform(element: string, render?: (value: string) => string): string {
    if (!render) return element;
    return render(element);
  }
}
