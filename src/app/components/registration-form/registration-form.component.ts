import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRegistrationRequest } from '@services';
import { BaseForm } from '@components/base/base-form/base-form.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'tss-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent extends BaseForm implements OnInit {

  @Input() public isAuthProcess = false;
  @Output() registrationRequest = new EventEmitter<IUserRegistrationRequest>();

  public form: FormGroup;

  public registerQueryParams: any;

  matcher = new MyErrorStateMatcher();

  usernameCntrl = new FormControl('', Validators.required);
  passwordCntrl = new FormControl('', Validators.required);
  repeatPasswordCntrl = new FormControl('', Validators.required);
  emailCntrl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    super();

    this.form = this._fb.group({
      username: this.usernameCntrl,
      password: this.passwordCntrl,
      repeatPassword: this.repeatPasswordCntrl,
      email: this.emailCntrl
    })
  }

  ngOnInit() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (!!queryParams && !!queryParams['returnUrl'])
      this.registerQueryParams = { 'returnUrl': queryParams['returnUrl'] };
  }

  public onSubmit() {
    if (this.form.valid) {
      const userCredentials: IUserRegistrationRequest = {
        username: this.form.get('username').value,
        password: this.form.get('password').value,
        email: this.form.get('email').value
      };
      this.registrationRequest.next(userCredentials);
    }
  }

}
