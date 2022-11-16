import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate() {
    if (!localStorage.getItem('refresh_token')) {
      this.route.navigate(['/login']);
      return false;
    }
    console.log('ok');
    return true;
  }
}
