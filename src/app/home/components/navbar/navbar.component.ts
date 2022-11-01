import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async logout() {
    await lastValueFrom(this.authService.logout());
    this.authService.isLogin = false;
    localStorage.clear();
    this._snackBar.open('Log Out Successfully', '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['text-white', 'bg-red-500'],
    });
    this.route.navigate(['/login']);
  }
}
