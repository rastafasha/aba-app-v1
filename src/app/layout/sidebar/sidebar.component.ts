import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataService } from 'src/app/shared/data/data.service';
import { MenuItem, SideBarData } from 'src/app/shared/models/models';
import { AppUser } from 'src/app/shared/models/users.models';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  routes = AppRoutes;
  base = '';
  page = '';
  currentUrl = '';
  classAdd = false;

  multilevel = [false, false, false];

  sidebarData: SideBarData[] = [];
  user: AppUser;

  constructor(
    private data: DataService,
    private router: Router,
    private sideBar: SideBarService,
    private authService: AuthService
  ) {
    //fin
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
  }

  ngOnInit(): void {
    this.user = this.authService.user as AppUser;
    //inicio
    if (this.user?.roles.includes('SUPERADMIN')) {
      this.sidebarData = this.data.sideBar;
    } else {
      //vamos a filtrar y validar que opciones puede ver el rol
      const permissions = this.user?.permissions;
      const SIDE_BAR_G: any[] = [];

      this.data.sideBar.forEach((side: any) => {
        const SIDE_B: any[] = [];
        side.menu.forEach((menu_s: any) => {
          const SUB_MENUS = menu_s.subMenus.filter(
            (submenu: any) =>
              permissions?.includes(submenu.permision) && submenu.show_nav
          );
          if (SUB_MENUS.length > 0) {
            menu_s.subMenus = SUB_MENUS;
            SIDE_B.push(menu_s);
          }
          if (permissions?.includes(menu_s.permision)) {
            menu_s.subMenus = [];
            SIDE_B.push(menu_s);
          }
        });
        if (SIDE_B.length > 0) {
          side.menu = SIDE_B;
          SIDE_BAR_G.push(side);
        }
      });
      this.sidebarData = SIDE_BAR_G;
    }
  }

  expandSubMenus(menu: MenuItem): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.sidebarData.map((mainMenus: SideBarData) => {
      mainMenus.menu.map((resMenu: MenuItem) => {
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }
  private getRoutes(route: { url: string }): void {
    const bodyTag = document.body;

    bodyTag.classList.remove('slide-nav');
    bodyTag.classList.remove('opened');
    this.currentUrl = route.url;

    const splitVal = route.url.split('/');

    this.base = splitVal[1];
    this.page = splitVal[2];
  }
  miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next('true');
    } else {
      this.sideBar.expandSideBar.next('false');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate([AppRoutes.login]);
  }
}
