import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppearanceService } from 'src/app/shared/appearance/appearance.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';
import { environment } from 'src/environments/environment';
import { AppUser } from 'src/app/shared/models/users.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  routes = AppRoutes;
  openBox = false;
  miniSidebar = false;
  addClass = false;
  user: AppUser;
  usuario: AppUser;
  user_id: number;
  avatar: string;
  locationId: number;
  roles = '';

  imagenSerUrl = environment.url_media;

  constructor(
    public router: Router,
    private sideBar: SideBarService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    private appearanceService: AppearanceService
  ) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }

  openBoxFunc() {
    this.openBox = !this.openBox;
    /* eslint no-var: off */
    var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
    if (this.openBox) {
      mainWrapper.classList.add('open-msg-box');
    } else {
      mainWrapper.classList.remove('open-msg-box');
    }
  }

  ngOnInit(): void {
    this.user = this.authService.user as AppUser;
    this.roles = this.user?.roles?.[0];
    this.locationId = this.user?.location_id;

    window.scrollTo(0, 0);
    this.authService.getUserFromStorage();
    this.appearanceService.getLocalDarkMode();
    this.activatedRoute.params.subscribe((resp: any) => {
      // console.log(resp);
      this.user_id = resp.id;
    });
    this.getDoctor();
  }

  getDoctor() {
    this.authService.getUserRomoto(this.user_id).subscribe((resp: any) => {
      // console.log(resp);
      this.usuario = resp;
    });
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();

    this.addClass = !this.addClass;
    /* eslint no-var: off */
    var root = document.getElementsByTagName('html')[0];
    /* eslint no-var: off */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var sidebar: any = document.getElementById('sidebar');

    if (this.addClass) {
      root.classList.add('menu-opened');
      sidebar.classList.add('opened');
    } else {
      root.classList.remove('menu-opened');
      sidebar.classList.remove('opened');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate([AppRoutes.login]);
  }

  darkMode(dark: string) {
    var element = document.body;

    const classExists = document.getElementsByClassName('darkmode').length > 0;

    var dayNight = document.getElementsByClassName('site');
    for (var i = 0; i < dayNight.length; i++) {
      // dayNight[i].classList.toggle("darkmode");
      element.classList.toggle('darkmode');
    }
    // localStorage.setItem('dark', dark);

    if (classExists) {
      localStorage.removeItem('darkmode');
      // console.log('✅ class exists on page, removido');
    } else {
      localStorage.setItem('darkmode', dark);
      // console.log('⛔️ class does NOT exist on page, agregado');
    }
    // console.log('Pulsado');
    // location.reload();
  }
}
