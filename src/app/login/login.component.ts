import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AuthResponse } from '../shared/auth-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Dependency Injection the auth service
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // variabel
  isShowPassword = false;

  // handle user input
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async login() {
    let isLogin: AuthResponse = await lastValueFrom(
      this.authService.login(this.loginForm.value)
    );
  }
}
