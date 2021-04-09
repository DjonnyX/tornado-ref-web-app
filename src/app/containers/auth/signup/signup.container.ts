import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserActions } from '@store/actions/user.action';
import { UserSelectors } from '@store/selectors/user.selector';
import { ApiService, IUserSignupRequest } from '@services';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NAME_PATTERN, PASSWORD_PATTERN } from '@app/core/patterns';
import { equalControlsValidator } from '@app/validators/equals-control.validator';
import { map, takeUntil } from 'rxjs/operators';
import { ICaptcha } from '@models';
import { BaseComponent } from '@components/base/base-component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IIntegration } from '@djonnyx/tornado-types';
import { IntegrationSelectors, IntegrationsSelectors } from '@store/selectors';
import { IntegrationsActions } from '@store/actions/integrations.action';

@Component({
  selector: 'ta-signup',
  templateUrl: './signup.container.html',
  styleUrls: ['./signup.container.scss']
})
export class SignupContainer extends BaseComponent implements OnInit, OnDestroy {
  public integrations$: Observable<Array<IIntegration>>;

  public isProcess$: Observable<boolean>;

  public captcha$: Observable<ICaptcha>;
  private _captcha: ICaptcha;
  private _safeCaptchaSvg: SafeHtml;
  get safeCaptchaSvg() { return this._safeCaptchaSvg; }

  public form: FormGroup;

  public registerQueryParams: any;

  ctrlIntegration = new FormControl('', [Validators.required]);
  ctrlFirstName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);
  ctrlLastName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);
  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);
  ctrlPassword = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]);
  ctrlconfirmPassword = new FormControl('', [Validators.required, equalControlsValidator(this.ctrlPassword)]);
  ctrlCaptcha = new FormControl('', [Validators.required]);
  ctrlRememberMe = new FormControl('', [Validators.requiredTrue]);

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
    private _sanitizer: DomSanitizer,
  ) {
    super();

    this.form = this._fb.group({
      integration: this.ctrlIntegration,
      firstName: this.ctrlFirstName,
      lastName: this.ctrlLastName,
      email: this.ctrlEmail,
      password: this.ctrlPassword,
      confirmPassword: this.ctrlconfirmPassword,
      captchaValue: this.ctrlCaptcha,
      rememberMe: this.ctrlRememberMe
    });
  }

  ngOnInit() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (!!queryParams && !!queryParams['returnUrl'])
      this.registerQueryParams = { 'returnUrl': queryParams['returnUrl'] };

    this.isProcess$ = combineLatest([
      this._store
        .pipe(select(UserSelectors.selectIsSignupParamsProcess)),
      this._store
        .pipe(select(UserSelectors.selectIsSignupProcess)),
      this._store
        .pipe(select(IntegrationSelectors.selectIsGetProcess)),
    ]).pipe(
      map(([isSignupParamsProcess, isSignupProcess, isIntegrationsProcess]) =>
        isSignupParamsProcess && isSignupProcess && isIntegrationsProcess),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.captcha$ = this._store
      .pipe(select(UserSelectors.selectCaptcha));

    this.captcha$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(v => {
      this._captcha = v;
      this._safeCaptchaSvg = this._sanitizer.bypassSecurityTrustHtml(this._captcha.svg);
    });

    this.onResetCatcha();

    this._store.dispatch(IntegrationsActions.getAllRequest({}));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public onSubmit() {
    if (this.form.valid) {
      const userCredentials: IUserSignupRequest = {
        integrationId: this.form.get('integration').value,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        captchaId: this._captcha?.id,
        captchaValue: this.form.get('captchaValue').value,
      };
      this._store.dispatch(UserActions.userSignupRequest(userCredentials));
    }
  }

  public onResetCatcha() {
    this._apiService.getAuthCaptcha().pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(v => {
      this._captcha = v;
      this._safeCaptchaSvg = this._sanitizer.bypassSecurityTrustHtml(this._captcha.svg);
    })
  }
}
