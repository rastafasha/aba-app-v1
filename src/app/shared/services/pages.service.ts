import { Injectable } from '@angular/core';
// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class PageService {
  onInitPage() {
    this.closeMenuSidebar();
    window.scrollTo(0, 0);
  }
  closeMenuSidebar() {
    $('.sidebar').addClass('cerrar');
    $('.menu-opened').remove('menu-opened');
  }
}
