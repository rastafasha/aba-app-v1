import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppearanceService } from 'src/app/shared/appearance/appearance.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';
import { environment } from 'src/environments/environment';
import { AppUser } from 'src/app/core/models/users.model';

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
  role = '';

  imagenSerUrl = environment.url_media;

  constructor(
    private router: Router,
    private sideBar: SideBarService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private appearanceService: AppearanceService
  ) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
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
    this.role = this.user?.roles?.[0];
    this.locationId = this.user?.location_id;

    this.authService.getUserFromStorage();
    this.appearanceService.getLocalDarkMode();
    this.activatedRoute.params.subscribe((resp) => {
      // console.log(resp);
      this.user_id = resp['id'];
    });
    this.getDoctor();
  }

  getDoctor() {
    this.authService.getUserRomoto(this.user_id).subscribe((resp) => {
      // console.log(resp);
      this.usuario = resp as AppUser;
    });
  }

  toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();

    this.addClass = !this.addClass;
    const root = document.getElementsByTagName('html')[0];
    const sidebar = document.getElementById('sidebar');

    if (this.addClass) {
      root.classList.add('menu-opened');
      sidebar.classList.add('opened');
    } else {
      root.classList.remove('menu-opened');
      sidebar.classList.remove('opened');
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([AppRoutes.auth.login]);
    });
  }

  darkMode(dark: string) {
    const element = document.body;

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
