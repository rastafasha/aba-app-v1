import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/shared/data/data.service';
import { MenuItem, SideBarData } from 'src/app/core/models';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';

@Component({
  selector: 'app-simple-layout',
  templateUrl: './simple-layout.component.html',
  styleUrls: ['./simple-layout.component.scss'],
})
export class SimpleLayoutComponent {
  miniSidebar = 'false';
  expandMenu = 'false';
  mobileSidebar = 'false';
  sideBarActivePath = false;
  headerActivePath = false;
  base = '';
  page = '';
  currentUrl = '';

  constructor(
    private sideBar: SideBarService,
    public router: Router,
    private data: DataService
  ) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
        this.miniSidebar = 'true';
      } else {
        this.miniSidebar = 'false';
      }
    });

    this.sideBar.toggleMobileSideBar.subscribe((res: string) => {
      if (res === 'true' || res === 'true') {
        this.mobileSidebar = 'true';
      } else {
        this.mobileSidebar = 'false';
      }
    });

    this.sideBar.expandSideBar.subscribe((res: string) => {
      this.expandMenu = res;
      if (res === 'false' && this.miniSidebar === 'true') {
        this.data.sidebar.map((mainMenus: SideBarData) => {
          mainMenus.menu.map((resMenu: MenuItem) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      if (res === 'true' && this.miniSidebar === 'true') {
        this.data.sidebar.map((mainMenus: SideBarData) => {
          mainMenus.menu.map((resMenu: MenuItem) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue === resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });
    this.getRoutes(this.router);
  }
  toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  private getRoutes(route: Router): void {
    if (route.url.split('/')[2] === 'confirm-mail') {
      this.sideBarActivePath = false;
      this.headerActivePath = false;
    } else {
      this.sideBarActivePath = true;
      this.headerActivePath = true;
    }
  }
}
