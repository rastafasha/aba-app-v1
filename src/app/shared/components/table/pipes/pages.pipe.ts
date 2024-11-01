import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pages',
})
export class PagesPipe implements PipeTransform {
  transform(total: number, size: number, currentPage = 0, show = 0): number[] {
    const pages = Math.ceil(total / size);
    if (show === 0) return Array.from({ length: pages }, (_, i) => i + 1);

    const start = Math.max(currentPage - show, 1);
    const end = Math.min(currentPage + show, pages);
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }
}
