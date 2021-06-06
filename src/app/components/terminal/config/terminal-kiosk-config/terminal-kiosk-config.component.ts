import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ITerminalKioskConfig } from '@djonnyx/tornado-types';

const INIT_STATE: ITerminalKioskConfig = {
  theme: "light",
  suffix: "K",
};

@Component({
  selector: 'ta-terminal-kiosk-config',
  templateUrl: './terminal-kiosk-config.component.html',
  styleUrls: ['./terminal-kiosk-config.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerminalKioskConfigComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TerminalKioskConfigComponent),
    multi: true,
  }]
})
export class TerminalKioskConfigComponent implements OnInit, ControlValueAccessor, Validator {

  private _themes: Array<string>;
  @Input() set themes(v: Array<string>) {
    if (this._themes !== v) {
      this._themes = v;

      INIT_STATE.theme = this.mTheme = this._themes?.length ? this._themes[0] : "none";
    }
  }
  get themes() { return this._themes; }

  public mTheme: string = INIT_STATE.theme;
  public mSuffix: string = INIT_STATE.suffix;

  private _value: ITerminalKioskConfig = { ...INIT_STATE };

  get value() {
    return this._value;
  }

  @Input()
  set value(val: ITerminalKioskConfig) {
    this._value = val || { ...INIT_STATE };

    this.mTheme = this._value.theme;
    this.mSuffix = this._value.suffix;

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: ITerminalKioskConfig) { }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this._value = {
      theme: this.mTheme,
      suffix: this.mSuffix,
    };

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: ITerminalKioskConfig) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = !!this._value.theme && !!this._value.suffix;

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
