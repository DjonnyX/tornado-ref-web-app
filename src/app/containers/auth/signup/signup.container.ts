import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserActions } from '@store/actions/user.action';
import { UserSelectors } from '@store/selectors/user.selector';
import { IUserSignupRequest } from '@services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NAME_PATTERN, PASSWORD_PATTERN } from '@app/core/patterns';
import { equalControlsValidator } from '@app/validators/equals-control.validator';

@Component({
  selector: 'ta-signup',
  templateUrl: './signup.container.html',
  styleUrls: ['./signup.container.scss']
})
export class SignupContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public form: FormGroup;

  public registerQueryParams: any;

  ctrlFirstName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);
  ctrlLastName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);
  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);
  ctrlPassword = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]);
  ctrlconfirmPassword = new FormControl('', [Validators.required, equalControlsValidator(this.ctrlPassword)]);
  ctrlRememberMe = new FormControl('', Validators.required);

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
  ) {
    this.form = this._fb.group({
      firstName: this.ctrlFirstName,
      lastName: this.ctrlLastName,
      email: this.ctrlEmail,
      password: this.ctrlPassword,
      confirmPassword: this.ctrlconfirmPassword,
      rememberMe: this.ctrlRememberMe
    })
  }

  ngOnInit() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (!!queryParams && !!queryParams['returnUrl'])
      this.registerQueryParams = { 'returnUrl': queryParams['returnUrl'] };


    this.isProcess$ = this._store
      .pipe(select(UserSelectors.selectIsSignupProcess));
  }

  public onSubmit() {
    if (this.form.valid) {
      const userCredentials: IUserSignupRequest = {
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        confirmPassword: this.form.get('confirmPassword').value,
      };
      this._store.dispatch(UserActions.userSignupRequest(userCredentials));
    }
  }
}
