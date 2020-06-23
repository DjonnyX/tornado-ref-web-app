import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from '@store/state';
import { Store, select } from '@ngrx/store';
import { UserSelectors } from '@store/selectors';
import { IUserResetPasswordRequest } from '@services';
import { UserActions } from '@store/actions/user.action';
import { equalControlsValidator } from '@app/validators/equals-control.validator';
import { PASSWORD_PATTERN } from '@app/core/patterns';

@Component({
  selector: 'ta-reset-password',
  templateUrl: './reset-password.container.html',
  styleUrls: ['./reset-password.container.scss']
})
export class ResetPasswordContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public form: FormGroup;

  public registerQueryParams: any;

  ctrlPassword = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]);

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
  ) {
    this.form = this._fb.group({
      password: this.ctrlPassword,
    })
  }

  ngOnInit() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (!!queryParams && !!queryParams['returnUrl'])
      this.registerQueryParams = { 'returnUrl': queryParams['returnUrl'] };


    this.isProcess$ = this._store
      .pipe(select(UserSelectors.selectIsResetPasswordProcess));
  }

  public onSubmit() {
    if (this.form.valid) {
      const params: IUserResetPasswordRequest = {
        password: this.form.get('password').value,
      };
      this._store.dispatch(UserActions.userResetPasswordRequest(params));
    }
  }
}
