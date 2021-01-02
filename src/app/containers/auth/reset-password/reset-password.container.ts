import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IAppState } from '@store/state';
import { Store, select } from '@ngrx/store';
import { UserSelectors } from '@store/selectors';
import { IUserResetPasswordRequest } from '@services';
import { UserActions } from '@store/actions/user.action';
import { PASSWORD_PATTERN } from '@app/core/patterns';
import { BaseComponent } from '@components/base/base-component';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter } from 'rxjs/operators';

@Component({
  selector: 'ta-reset-password',
  templateUrl: './reset-password.container.html',
  styleUrls: ['./reset-password.container.scss']
})
export class ResetPasswordContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public form: FormGroup;

  private _restorePassCode: string;

  ctrlPassword = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]);

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _activatedRoute: ActivatedRoute,
  ) {
    super();

    this.form = this._fb.group({
      password: this.ctrlPassword,
    })

    this._activatedRoute.queryParams.pipe(
      takeUntil(this.unsubscribe$),
      map(params => params.restorePassCode as string),
      filter(restorePassCode => !!restorePassCode),
    ).subscribe(restorePassCode => {
      this._restorePassCode = restorePassCode;
    });
  }

  ngOnInit() {
    this.isProcess$ = this._store
      .pipe(select(UserSelectors.selectIsResetPasswordProcess));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public onSubmit() {
    if (this.form.valid) {
      const params: IUserResetPasswordRequest = {
        password: this.form.get('password').value,
        restorePassCode: this._restorePassCode,
      };
      this._store.dispatch(UserActions.userResetPasswordRequest(params));
    }
  }
}
