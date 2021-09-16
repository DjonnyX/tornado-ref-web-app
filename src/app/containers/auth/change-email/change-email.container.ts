import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';
import { ApiService, IUserChangeEmailRequest } from '@services';
import { UserActions } from '@store/actions/user.action';
import { ICaptcha } from '@models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-change-email',
  templateUrl: './change-email.container.html',
  styleUrls: ['./change-email.container.scss']
})
export class ChangeEmailContainer extends BaseComponent implements OnInit {

  public isProcess$: Observable<boolean>;

  private _captcha: ICaptcha;
  private _safeCaptchaSvg: SafeHtml;
  get safeCaptchaSvg() { return this._safeCaptchaSvg; }

  public form: FormGroup;

  public registerQueryParams: any;

  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);
  ctrlCaptcha = new FormControl('', Validators.required);

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>,
    private _apiService: ApiService,
    private _sanitizer: DomSanitizer,
    public readonly localization: LocalizationService,
  ) {
    super();

    this.form = this._fb.group({
      email: this.ctrlEmail,
      captcha: this.ctrlCaptcha,
    })
  }

  ngOnInit() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (!!queryParams && !!queryParams['returnUrl'])
      this.registerQueryParams = { 'returnUrl': queryParams['returnUrl'] };

    this.isProcess$ = this._store
      .pipe(select(UserSelectors.selectIsChangeEmailProcess));

    this.onResetCatcha();
  }

  public onSubmit() {
    if (this.form.valid) {
      const params: IUserChangeEmailRequest = {
        email: this.form.get('email').value,
        captchaId: this._captcha.id,
        captchaVal: this.form.get('captcha').value,
        language: this.localization.lang,
      };
      this._store.dispatch(UserActions.userChangeEmailRequest(params));
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
