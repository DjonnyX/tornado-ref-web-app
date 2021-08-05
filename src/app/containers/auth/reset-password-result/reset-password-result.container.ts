import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-reset-password-result',
  templateUrl: './reset-password-result.container.html',
  styleUrls: ['./reset-password-result.container.scss']
})
export class ResetPasswordResultContainer implements OnInit {

  constructor(
    private _router: Router,
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void {
  }

  returnToSignIn() {
    this._router.navigate(["signin"]);
  }

}
