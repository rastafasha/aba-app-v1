import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';

const components = [
  HeaderComponent,
  SidebarComponent,
  SimpleLayoutComponent,
  PageHeaderComponent,
  BreadcrumbsComponent,
];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, SharedModule],
})
export class LayoutModule {}
