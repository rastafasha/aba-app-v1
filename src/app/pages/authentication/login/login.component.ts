import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/users.model';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { LoginUseCasesService } from './login-use-cases.service';

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
    private loginUseCases: LoginUseCasesService,
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
    this.loginUseCases.init();
  }

  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }

  submit() {
    if (!this.form.valid) return;
    this.error = false;
    const { email, password } = this.form.value;
    this.loginUseCases.submit(email, password).subscribe({
      next: (resp) => {
        if (resp) {
          this.loginUseCases.getUser();
        } else {
          this.error = true;
        }
      },
      error: (error) => console.log(error),
    });
  }
}
