import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { DataService } from 'src/app/shared/data/data.service';
import { RolesService } from '../service/roles.service';
import { Router } from '@angular/router';
import { DoctorService } from '../../doctors/service/doctor.service';
import { Location } from '@angular/common';
import { PageService } from 'src/app/shared/services/pages.service';
// eslint-disable-next-line no-var
declare var $: any;

@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.scss'],
})
export class AddRoleUserComponent {
  routes = AppRoutes;

  sideBar = [];
  name = '';
  permissions = [];
  valid_form = false;
  valid_form_success = false;
  text_validation: any = null;

  constructor(
    private dataService: DataService,
    private roleService: RolesService,
    private pageService: PageService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.pageService.onInitPage();
    this.sideBar = this.dataService.sidebar[0].menu;
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  addPermission(subMenu: any) {
    if (subMenu.permision) {
      const INDEX = this.permissions.findIndex(
        (item: any) => item === subMenu.permision
      );
      if (INDEX !== -1) {
        this.permissions.splice(INDEX, 1);
      } else {
        this.permissions.push(subMenu.permision);
      }
      console.log(this.permissions);
    }
  }

  onSave() {
    this.valid_form = false;

    if (!this.name || this.permissions.length === 0) {
      this.valid_form = true;
      return;
    }
    const data = {
      name: this.name,
      permissions: this.permissions,
    };
    this.valid_form_success = false;
    this.text_validation = null;

    this.roleService.storeRole(data).subscribe((resp) => {
      // console.log(resp);
      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        this.name = '';
        this.permissions = [];
        this.valid_form_success = true;
        //limpia los checks
        const SIDE_BAR = this.sideBar;
        this.sideBar = [];
        setTimeout(() => {
          this.sideBar = SIDE_BAR;
        }, 50);
        //limpia los checks
        this.router.navigate([AppRoutes.roles.list]);
      }
    });
  }

  closeMenuSidebar() {
    $('.sidebar').addClass('cerrar');
    $('.menu-opened').remove('menu-opened');
  }
}
