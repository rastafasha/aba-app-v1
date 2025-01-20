import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { PageHeaderComponent } from './page-header/page-header.component';

const components = [
  HeaderComponent,
  SidebarComponent,
  SimpleLayoutComponent,
  PageHeaderComponent,
];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, SharedModule],
})
export class LayoutModule {}
