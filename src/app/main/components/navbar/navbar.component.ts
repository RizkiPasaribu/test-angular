import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProfileMe } from 'src/app/shared/services/auth/auth-type';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // varibel data
  data?: ProfileMe;
  isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {
    this.authService.getMe().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {}

  async logout() {
    await lastValueFrom(this.authService.logout());
    localStorage.clear();
    this._snackBar.open('Log Out Successfully', '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['text-white', 'bg-green-400'],
    });
    this.route.navigate(['/login']);
  }
}
