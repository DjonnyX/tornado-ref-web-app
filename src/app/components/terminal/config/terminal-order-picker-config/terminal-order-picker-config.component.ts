import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ITerminalOrderPickerConfig } from '@djonnyx/tornado-types';

const INIT_STATE: ITerminalOrderPickerConfig = {
  theme: "light",
};

@Component({
  selector: 'ta-terminal-order-picker-config',
  templateUrl: './terminal-order-picker-config.component.html',
  styleUrls: ['./terminal-order-picker-config.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerminalOrderPickerConfigComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TerminalOrderPickerConfigComponent),
    multi: true,
  }]
})
export class TerminalOrderPickerConfigComponent implements OnInit, ControlValueAccessor, Validator {

  private _themes: Array<string>;
  @Input() set themes(v: Array<string>) {
    if (this._themes !== v) {
      this._themes = v;

      INIT_STATE.theme = this.mTheme = this._themes?.length ? this._themes[0] : "none";
    }
  }
  get themes() { return this._themes; }

  public mTheme: string = INIT_STATE.theme;

  private _value: ITerminalOrderPickerConfig = { ...INIT_STATE };

  get value() {
    return this._value;
  }

  @Input()
  set value(val: ITerminalOrderPickerConfig) {
    this._value = val || { ...INIT_STATE };

    this.mTheme = this._value.theme;

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: ITerminalOrderPickerConfig) { }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this._value = {
      theme: this.mTheme,
    };

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: ITerminalOrderPickerConfig) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = !!this._value.theme;

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
