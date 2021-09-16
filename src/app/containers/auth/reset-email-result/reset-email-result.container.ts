import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-reset-email-result',
  templateUrl: './reset-email-result.container.html',
  styleUrls: ['./reset-email-result.container.scss']
})
export class ResetEmailResultContainer implements OnInit {

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
