import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-auth-error',
  templateUrl: './auth-error.container.html',
  styleUrls: ['./auth-error.container.scss']
})
export class AuthErrorContainer extends BaseComponent implements OnInit, OnDestroy {

  public errorMessage$: Observable<string>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  returnToSignIn() {
    this._router.navigate(["signin"]);
  }

  ngOnInit(): void {
    this.errorMessage$ = this._activatedRoute.queryParams.pipe(
      takeUntil(this.unsubscribe$),
      map(params => params.error as string),
      filter(error => !!error),
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
