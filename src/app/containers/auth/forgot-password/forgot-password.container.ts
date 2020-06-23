import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import { IUserForgotPasswordRequest } from '@services';
import { UserActions } from '@store/actions/user.action';

@Component({
  selector: 'ta-forgot-password',
  templateUrl: './forgot-password.container.html',
  styleUrls: ['./forgot-password.container.scss']
})
export class ForgotPasswordContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public form: FormGroup;

  public registerQueryParams: any;

  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
  ) {
    this.form = this._fb.group({
      email: this.ctrlEmail,
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
      const params: IUserForgotPasswordRequest = {
        email: this.form.get('email').value,
      };
      this._store.dispatch(UserActions.userForgotPasswordRequest(params));
    }
  }
}
