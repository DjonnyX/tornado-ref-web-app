import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ta-reset-password-result',
  templateUrl: './reset-password-result.container.html',
  styleUrls: ['./reset-password-result.container.scss']
})
export class ResetPasswordResultContainer implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  returnToSignIn() {
    this._router.navigate(["signin"]);
  }

}
