import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

import { IUserAuthRequest } from '@services';
import { BaseForm } from '@components/base/base-form/base-form.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'tss-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends BaseForm implements OnInit {

  @Input() public isAuthProcess: boolean = false;
  @Output() loginRequest: EventEmitter<IUserAuthRequest> = new EventEmitter<IUserAuthRequest>();

  public form: FormGroup;

  public registerQueryParams: any;

  matcher = new MyErrorStateMatcher();

  usernameCntrl = new FormControl('', Validators.required);
  passwordCntrl = new FormControl('', Validators.required);
  rememberMeCntrl = new FormControl('');

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    super();

    this.form = this._fb.group({
      username: this.usernameCntrl,
      password: this.passwordCntrl,
      rememberMe: this.rememberMeCntrl
    })
  }

  ngOnInit() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (!!queryParams && !!queryParams['returnUrl'])
      this.registerQueryParams = { 'returnUrl': queryParams['returnUrl'] };
  }

  public onSubmit() {
    if (this.form.valid) {
      const userCredentials: IUserAuthRequest = {
        username: this.form.get('username').value,
        password: this.form.get('password').value,
        rememberMe: this.form.get('rememberMe').value
      } as IUserAuthRequest;
      this.loginRequest.next(userCredentials);
    }
  }

}
