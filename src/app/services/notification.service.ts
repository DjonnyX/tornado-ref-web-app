import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _lastMessage: string;

  constructor(private _snackBar: MatSnackBar) { }

  success(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 20000,
      panelClass: "success",
    })
  }

  error(message: string) {
    if (!!this._snackBar._openedSnackBarRef && this._lastMessage === message) {
      return;
    }

    this._snackBar.open(message, "Close", {
      duration: 20000,
      panelClass: "error-snack",
    });
    this._lastMessage = message;
  }
}
