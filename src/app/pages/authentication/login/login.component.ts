import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppUser } from 'src/app/shared/models/users.models';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  routes = AppRoutes;
  passwordClass = false;
  ERROR = false;
  user: AppUser;
  roles: string[] = [];

  email = new FormControl();
  password = new FormControl();
  remember = new FormControl();
  errors: any = null;
  loginForm: FormGroup;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false, [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getLocalStorage();
  }

  getLocalStorage() {
    if (!this.auth.user) {
      this.user = null;
      return;
    }
    this.user = this.auth.user as AppUser;
    this.getUserRol();
    // this.getuserPermisos();
  }

  loginFormSubmit() {
    if (this.form.valid) {
      this.ERROR = false;
      this.auth
        .login(
          this.form.value.email ? this.form.value.email : '',
          this.form.value.password ? this.form.value.password : ''
        )
        .subscribe(
          (resp: any) => {
            // console.log(resp);

            if (resp === true) {
              // EL LOGIN ES EXITOSO

              setTimeout(() => {
                this.getLocalStorage();
                // this.router.navigate([routes.adminDashboard]);
              }, 50);
            } else {
              // EL LOGIN NO ES EXITOSO
              this.ERROR = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  getUserRol() {
    const mainRole = this.user?.roles?.[0];
    if (!mainRole) {
      return;
    }

    switch (mainRole) {
      case 'SUPERADMIN':
        this.router.navigate([AppRoutes.adminDashboard]);
        break;
      // solo tiene una locacion pero se comporta como superadmin
      case 'MANAGER':
        // this.router.navigate([routes.adminDashboard]);
        this.router.navigate(['location/view/', this.user.location_id]);
        break;
      //roles secundarios son multilocation
      case 'BCBA':
        this.router.navigate(['doctors/profile/', this.user.id]);
        break;
      case 'RBT':
        this.router.navigate(['doctors/profile/', this.user.id]);
        break;
      default:
        break;
    }
  }

  getUserPermisos() {
    if (this.user.permissions[0] === 'admin_dashboard') {
      this.router.navigate([AppRoutes.adminDashboard]);
    }
    if (this.user.permissions[0] === 'doctor_dashboard') {
      this.router.navigate([AppRoutes.doctorDashboard]);
    }
    if (this.user.permissions[0] === 'patient_dashboard') {
      this.router.navigate([AppRoutes.patientDashboard]);
    }
  }

  loginFormSubmit2() {
    this.auth
      .login(
        this.form.value.email ? this.form.value.email : '',
        this.form.value.password ? this.form.value.password : ''
      )
      .subscribe(
        (resp: any) => {
          this.user = resp;
          if (resp) {
            if (this.user.roles[0] === 'DOCTOR') {
              this.router.navigate([AppRoutes.doctorDashboard]);
            }
            if (this.user.roles[0] === 'SUPERADMIN') {
              this.router.navigate([AppRoutes.adminDashboard]);
            }
          } else {
            this.router.navigate([AppRoutes.adminDashboard]);
          }
          // if(this.loginForm.get('remember').value){
          //   localStorage.setItem('email', this.loginForm.get('email').value);
          // }else{
          //   localStorage.removeItem('email');
          // }
          // this.router.navigateByUrl('/dashboard');
        },
        (error: HttpErrorResponse) => {
          // Swal.fire('Error', error.error.msg, 'error');
          this.errors = error.error;
        }
      );
  }

  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}
