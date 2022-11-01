import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  async logout() {
    await lastValueFrom(this.authService.logout());
    this.authService.isLogin = false;
    localStorage.clear();
    alert('Log Out Success');
    this.route.navigate(['/login']);
  }
}
