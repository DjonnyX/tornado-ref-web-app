import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IVersion } from '@djonnyx/tornado-types';

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
  }/*,
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => VersionComponent),
    multi: true,
  }*/]
})
export class VersionComponent implements OnInit, ControlValueAccessor, Validator {

  private _value: IVersion;

  get value() {
    return this._value;
  }

  @Input()
  set value(val: IVersion) {
    this._value = val || { ...INIT_STATE };

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: IVersion) { this.updateInitialStateIfNeed(); }

  private initialState: IVersion = { ...INIT_STATE };

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: IVersion) {
    this.value = value;
    this.updateInitialStateIfNeed();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = !!this._value.name && this._value.code !== undefined && !!this._value.version;

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  private updateInitialStateIfNeed() {
    if (!!this.value) {
      if (!this.initialState)
        this.initialState = { ...this.value };
    }
  }
}
