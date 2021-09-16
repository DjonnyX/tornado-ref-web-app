import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-forgot-password-result',
  templateUrl: './forgot-password-result.container.html',
  styleUrls: ['./forgot-password-result.container.scss']
})
export class ForgotPasswordResultCotainer implements OnInit {

  fromProfile: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public readonly localization: LocalizationService,
  ) { }

  ngOnInit(): void {
    this.fromProfile = this._activatedRoute.snapshot.queryParamMap.get("fromprofile") == "true";
  }

  returnTo() {
    if (this.fromProfile) {
      this._router.navigate(["admin/profile"]);
    } else {
      this._router.navigate(["signin"]);
    }
  }
}
