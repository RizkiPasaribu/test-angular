import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MyLayoutService {
  constructor(private _snackBar: MatSnackBar) {}

  mySnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['text-white', 'bg-green-400'],
      verticalPosition: 'top',
    });
  }
}
