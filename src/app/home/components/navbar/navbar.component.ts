import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {}

  logout() {
    this.auth.isLogin = false;
    this.route.navigate(['/login']);
  }
}
