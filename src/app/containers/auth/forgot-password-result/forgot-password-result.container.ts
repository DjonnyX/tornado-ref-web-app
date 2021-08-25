import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-forgot-password-result',
  templateUrl: './forgot-password-result.container.html',
  styleUrls: ['./forgot-password-result.container.scss']
})
export class ForgotPasswordResultCotainer implements OnInit {

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
