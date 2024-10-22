import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  error = false;
  user: AppUser;

  roles: string[] = [];
  errors: any = null;

  form: FormGroup;

  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];
  }
  get remember() {
    return this.form.controls['remember'];
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    if (!this.auth.user) {
      this.user = null;
      return;
    }
    this.user = this.auth.user as AppUser;
    this.getUserRol();
  }

  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }

  submit() {
    if (!this.form.valid) return;
    this.error = false;
    const { email, password } = this.form.value;
    this.auth.login(email ?? '', password ?? '').subscribe({
      next: (resp) => {
        if (resp) {
          this.getUser();
        } else {
          this.error = true;
        }
      },
      error: (error) => console.log(error),
    });
  }

  getUserRol() {
    const mainRole = this.user?.roles?.[0];
    if (!mainRole) {
      return;
    }

    switch (mainRole) {
      case 'SUPERADMIN':
        this.router.navigate([AppRoutes.dashboard.admin]);
        break;
      // solo tiene una locacion pero se comporta como superadmin
      case 'MANAGER':
        // this.router.navigate([AppRoutes.dashboard.admin]);
        this.router.navigate([AppRoutes.location.view, this.user.location_id]);
        break;
      //roles secundarios son multilocation
      case 'BCBA':
        this.router.navigate([AppRoutes.doctors.profile, this.user.id]);
        break;
      case 'RBT':
        this.router.navigate([AppRoutes.doctors.profile, this.user.id]);
        break;
      default:
        break;
    }
  }
}
