import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-change-email-result',
  templateUrl: './change-email-result.container.html',
  styleUrls: ['./change-email-result.container.scss']
})
export class ChangeEmailResultCotainer implements OnInit {

  constructor(
    private _router: Router,
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void { }

  returnTo() {
    this._router.navigate(["admin/profile"]);
  }
}
