import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IAppState } from '@store/state';
import { Store, select } from '@ngrx/store';
import { UserSelectors } from '@store/selectors';
import { IUserResetEmailRequest } from '@services';
import { UserActions } from '@store/actions/user.action';
import { PASSWORD_PATTERN } from '@app/core/patterns';
import { BaseComponent } from '@components/base/base-component';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter } from 'rxjs/operators';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-reset-email',
  templateUrl: './reset-email.container.html',
  styleUrls: ['./reset-email.container.scss']
})
export class ResetEmailContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public form: FormGroup;

  private _restoreEmailCode: string;

  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _activatedRoute: ActivatedRoute,
    public readonly localization: LocalizationService,
  ) {
    super();

    this.form = this._fb.group({
      email: this.ctrlEmail,
    })

    this._activatedRoute.queryParams.pipe(
      takeUntil(this.unsubscribe$),
      map(params => params.restoreEmailCode as string),
      filter(restoreEmailCode => !!restoreEmailCode),
    ).subscribe(restoreEmailCode => {
      this._restoreEmailCode = restoreEmailCode;
    });
  }

  ngOnInit() {
    this.isProcess$ = this._store
      .pipe(select(UserSelectors.selectIsResetEmailProcess));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public onSubmit() {
    if (this.form.valid) {
      const params: IUserResetEmailRequest = {
        email: this.form.get('email').value,
        restoreEmailCode: this._restoreEmailCode,
      };
      this._store.dispatch(UserActions.userResetEmailRequest(params));
    }
  }
}
