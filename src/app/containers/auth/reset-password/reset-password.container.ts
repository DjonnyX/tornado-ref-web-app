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

@Component({
  selector: 'ta-reset-password',
  templateUrl: './reset-password.container.html',
  styleUrls: ['./reset-password.container.scss']
})
export class ResetPasswordContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public form: FormGroup;

  ctrlPassword = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]);

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
  ) {
    super();

    this.form = this._fb.group({
      password: this.ctrlPassword,
    })
  }

  ngOnInit() {
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
