import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { IAccount, IRole } from '@djonnyx/tornado-types';
import { IKeyValue } from '@components/key-value/key-value.component';
import { ICaptcha } from '@models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NAME_PATTERN } from '@app/core/patterns';
import { LocalizationService } from '@app/services/localization/localization.service';

interface IData {
  firstName: IKeyValue;
  lastName: IKeyValue;
  email: IKeyValue;
  roleType: IKeyValue;
}

@Component({
  selector: 'ta-account-creator-form',
  templateUrl: './account-creator-form.component.html',
  styleUrls: ['./account-creator-form.component.scss']
})
export class AccountCreatorFormComponent extends BaseComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private _captcha: ICaptcha;
  @Input() set captcha(v: ICaptcha) {
    if (this._captcha !== v) {
      this._captcha = v;

      if (this._captcha?.svg) {
        this._safeCaptchaSvg = this._sanitizer.bypassSecurityTrustHtml(this._captcha.svg);
      }
    }
  }
  get captcha() { return this._captcha; }

  private _safeCaptchaSvg: SafeHtml;
  get safeCaptchaSvg() { return this._safeCaptchaSvg; }

  public registerQueryParams: any;

  ctrlRole = new FormControl('', [Validators.required]);
  ctrlFirstName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);
  ctrlLastName = new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]);
  ctrlEmail = new FormControl('', [Validators.required, Validators.email]);
  ctrlCaptcha = new FormControl('', [Validators.required]);

  private _account: IAccount;
  @Input() set account(account: IAccount) {
    if (account !== this._account) {
      this._account = account;

      this.generateData();

      this.ctrlRole.setValue(account?.roleType);
      this.ctrlFirstName.setValue(account?.firstName);
      this.ctrlLastName.setValue(account?.lastName);
    }
  }
  get account() { return this._account; }

  private _roles: Array<IRole>;
  @Input() set roles(roles: Array<IRole>) {
    if (roles !== this._roles) {
      this._roles = roles;

      this.generateData();
    }
  }
  get roles() { return this._roles; }

  private _data: IData;

  get data() {
    return this._data;
  }

  private _isEditMode: boolean;
  @Input() set isEditMode(v: boolean) {
    if (this._isEditMode !== v) {
      this._isEditMode = v;

      if (v) {
        this.ctrlEmail.setValidators([]);
        this.ctrlCaptcha.setValidators([]);
      } else {
        this.ctrlEmail.setValidators([Validators.required, Validators.email]);
        this.ctrlCaptcha.setValidators([Validators.required]);
      }

      this.form.updateValueAndValidity();
    }
  }
  get isEditMode() { return this._isEditMode; }

  @Output() save = new EventEmitter<IAccount>();

  @Output() cancel = new EventEmitter<void>();

  @Output() update = new EventEmitter<IAccount>();

  @Output() resetCaptcha = new EventEmitter<void>();

  isEdit = false;

  constructor(
    private _fb: FormBuilder,
    private _sanitizer: DomSanitizer,
    public readonly localization: LocalizationService,
  ) {
    super();

    this.form = this._fb.group({
      roleType: this.ctrlRole,
      firstName: this.ctrlFirstName,
      lastName: this.ctrlLastName,
      email: this.ctrlEmail,
      captchaValue: this.ctrlCaptcha,
    });
  }

  private generateData(): void {
    this._data = {
      firstName: {
        key: "Имя",
        value: this._account?.firstName || ' ---',
      },
      lastName: {
        key: "Фамилия",
        value: this._account?.lastName || ' ---',
      },
      email: {
        key: "Email",
        value: this._account ? this._account?.email : ' ---',
      },
      roleType: {
        key: "Роль",
        value: this._account ? this._account?.roleType : ' ---',
      },
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onEnterSubmit(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.stopImmediatePropagation();
      event.preventDefault();

      this.onSubmit();
    }
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onSubmit(): void {
    if (this.form.valid) {

      if (this.isEditMode) {
        this.save.emit({
          id: this._account?.id,
          firstName: this.ctrlFirstName.value,
          lastName: this.ctrlLastName.value,
          roleType: this.ctrlRole.value,
        } as IAccount);
      } else {
        this.save.emit({
          ...this.form.getRawValue(),
          captchaId: this.captcha?.id,
        });
      }

      this.isEdit = false;
    }
  }

  onEditCancel(): void {
    this.isEdit = false;
    if (!this.isEditMode) {
      this.onCancel();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onResetCaptcha(): void {
    this.resetCaptcha.emit();
  }
}
