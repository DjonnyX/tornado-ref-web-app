import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserActions } from '@store/actions/user.action';
import { UserSelectors } from '@store/selectors/user.selector';
import { IUserAuthRequest } from '@services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PASSWORD_PATTERN } from '@app/core/patterns';

@Component({
  selector: 'ta-signin',
  templateUrl: './signin.container.html',
  styleUrls: ['./signin.container.scss']
})
export class SigninContainer implements OnInit {

  public loaded$: Observable<boolean>;

  public form: FormGroup;

  public registerQueryParams: any;

  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);
  ctrlPassword = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]);
  ctrlRememberMe = new FormControl('');

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
  ) {
    this.form = this._fb.group({
      email: this.ctrlEmail,
      password: this.ctrlPassword,
      rememberMe: this.ctrlRememberMe
    })
  }

  ngOnInit() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (!!queryParams && !!queryParams['returnUrl'])
      this.registerQueryParams = { 'returnUrl': queryParams['returnUrl'] };


    this.loaded$ = this._store
      .pipe(select(UserSelectors.selectLoaded));
  }

  public onSubmit() {
    if (this.form.valid) {
      const userCredentials: IUserAuthRequest = {
        username: this.form.get('email').value,
        password: this.form.get('password').value,
        rememberMe: this.form.get('rememberMe').value
      } as IUserAuthRequest;
      this._store.dispatch(UserActions.userAuthRequest(userCredentials));
    }
  }
}
