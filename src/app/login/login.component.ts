import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Dependency Injection the auth service
  constructor(private authService: AuthService, private router: Router) {}

  // lifecycle for init app
  ngOnInit(): void {}

  // variabel
  isShowPassword: boolean = false;
  isLoading: boolean = false;

  // handle user input
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async login() {
    this.isLoading = true;
    await lastValueFrom(this.authService.login(this.loginForm.value))
      .then(() => {
        this.authService.isLogin = true;
        alert('login success');
        this.router.navigate(['']);
      })
      .catch((e) => alert(e.error.detail))
      .finally(() => (this.isLoading = false));
  }
}
