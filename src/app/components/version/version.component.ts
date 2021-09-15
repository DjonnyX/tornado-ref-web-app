import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IVersion } from '@djonnyx/tornado-types';

const VERSION_PATTERN = /^[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}$/;

const INIT_STATE: IVersion = {
  name: "",
  code: 0,
  version: "0.0.0",
};

@Component({
  selector: 'ta-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => VersionComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => VersionComponent),
    multi: true,
  }]
})
export class VersionComponent implements OnInit, ControlValueAccessor, Validator {

  private _disabled: boolean = false;
  @Input() set disabled(v: boolean) {
    if (this._disabled !== v) {
      this._disabled = v;
    }
  }
  get disabled() {
    return this._disabled;
  }

  public mName: string = INIT_STATE.name;
  public mCode: number = INIT_STATE.code;
  public mVersion: string = INIT_STATE.version;

  private _value: IVersion = { ...INIT_STATE };

  get value() {
    return this._value;
  }

  @Input()
  set value(val: IVersion) {
    this._value = val || { ...INIT_STATE };

    this.mName = this._value.name;
    this.mCode = this._value.code;
    this.mVersion = this._value.version;

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: IVersion) { }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this._value = {
      name: this.mName,
      code: this.mCode,
      version: this.mVersion,
    };

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: IVersion) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  checkVersionPattern() {
    return VERSION_PATTERN.test(this._value.version);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = !!this._value.name && this._value.code != undefined && !!this._value.version && this.checkVersionPattern();

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
