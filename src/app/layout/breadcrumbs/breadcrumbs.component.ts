import { Component, Input } from '@angular/core';

interface Breadcrumb {
  label: string;
  href?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: (string | Breadcrumb)[] = [];

  get displayBreadcrumbs() {
    if (this.breadcrumbs.length <= 2) {
      return this.breadcrumbs;
    }
    return [this.breadcrumbs[0], this.breadcrumbs[this.breadcrumbs.length - 1]];
  }

  getLabel(crumb: string | Breadcrumb): string {
    return typeof crumb === 'string' ? crumb : crumb.label;
  }

  getHref(crumb: string | Breadcrumb): string | undefined {
    return typeof crumb === 'string' ? undefined : crumb.href;
  }
}