import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  routes = AppRoutes;
  CustomControler!: number | string | boolean;
  passwordClass = false;
  confirmPasswordClass = false;
  isValidConfirmPassword = false;
  form: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor() {
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
    } else {
      this.isValidConfirmPassword = false;
    }
  }

  passwordFunc() {
    this.passwordClass = !this.passwordClass;
  }

  confirmPasswordFunc() {
    this.confirmPasswordClass = !this.confirmPasswordClass;
  }
}
