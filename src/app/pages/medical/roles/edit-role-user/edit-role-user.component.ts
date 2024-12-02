import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data/data.service';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-edit-role-user',
  templateUrl: './edit-role-user.component.html',
  styleUrls: ['./edit-role-user.component.scss'],
})
export class EditRoleUserComponent implements OnInit {
  routes = AppRoutes;

  sideBar = [];
  role_id: number = null;
  name = '';
  permissions = [];
  valid_form = false;
  valid_form_success = false;
  text_validation: string = null;

  constructor(
    private dataService: DataService,
    private roleService: RolesService,
    private ativatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.sideBar = this.dataService.sidebar[0].menu;
    this.ativatedRoute.params.subscribe((resp) => {
      this.role_id = resp['id'];
    });
    this.showRole();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  showRole() {
    this.roleService.getRole(this.role_id).subscribe((resp) => {
      // console.log(resp);
      this.name = resp.name;
      this.permissions = resp.permision_pluck;
    });
  }

  addPermission(subMenu: any) {
    if (subMenu.permision) {
      const INDEX = this.permissions.findIndex(
        (item) => item === subMenu.permision
      );
      if (INDEX !== -1) {
        this.permissions.splice(INDEX, 1);
      } else {
        this.permissions.push(subMenu.permision);
      }
      console.log(this.permissions);
    }
  }

  save() {
    this.valid_form = false;
    // || this.permissions.length === 0
    if (!this.name ) {

      this.valid_form = true;
      return;
    }
    const data = {
      name: this.name,
      permissions: this.permissions,
    };
    this.valid_form_success = false;
    this.text_validation = null;

    this.roleService.editRole(data, this.role_id).subscribe((resp) => {
      // console.log(resp);
      if (resp.message === 403) {
        this.text_validation = resp.message_text;
        return;
      }
      this.valid_form_success = true;
    });
  }
}
