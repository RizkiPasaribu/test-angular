import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProfileMe } from '../../services/auth/auth-type';
import { AuthService } from '../../services/auth/auth.service';
import { MyLayoutService } from './my-layout.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  group,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-my-layout',
  templateUrl: './my-layout.component.html',
  styleUrls: ['./my-layout.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%' })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
        ]),
        query(':enter', animateChild()),
      ]),
    ]),
  ],
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

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
