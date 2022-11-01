import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthResponse } from '../shared/auth-type';
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
  ngOnInit(): void {
    if (localStorage.getItem('refresh_token')) {
      this.authService.isLogin = true;
      this.router.navigate(['']);
    }
  }

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
      .then((data: AuthResponse) => {
        this.authService.isLogin = true;
        alert('login success');
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('expires_in', data.expires_in.toString());
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_type', data.token_type);
        console.log(data);
        this.router.navigate(['']);
      })
      .catch((e) => alert(e.error.detail))
      .finally(() => (this.isLoading = false));
  }
}
