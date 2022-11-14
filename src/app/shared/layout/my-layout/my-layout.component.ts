import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProfileMe } from '../../services/auth/auth-type';
import { AuthService } from '../../services/auth/auth.service';
import { MyLayoutService } from './my-layout.service';

@Component({
  selector: 'app-my-layout',
  templateUrl: './my-layout.component.html',
  styleUrls: ['./my-layout.component.css'],
})
export class MyLayoutComponent implements OnInit {
  // varibel data
  isLoading = true;
  data?: ProfileMe;
  isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private route: Router,
    private myLayout: MyLayoutService
  ) {
    this.authService.getMe().subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {}

  async logout() {
    await lastValueFrom(this.authService.logout());
    localStorage.clear();
    this.myLayout.mySnackbar('Log Out Successfully');
    this.route.navigate(['/login']);
  }
}
