import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  success(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 20000,
      panelClass: "success",
    })
  }

  error(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 20000,
      panelClass: "error-snack",
    })
  }
}
