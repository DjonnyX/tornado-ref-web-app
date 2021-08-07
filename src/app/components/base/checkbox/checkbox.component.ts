import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'ta-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true,
  }],
})
export class CheckboxComponent implements OnInit, ControlValueAccessor, Validator {

  private _value: boolean;
  @Input()
  set value(val: boolean) {
    if (this._value !== val) {
      this._value = val;

      this.onChangeModel();
    }
  }
  get value() { return this._value; }

  /**
   * value alias
   */
  @Input() set checked(val: boolean) {
    this.value = val;
  }
  get checked() { return this._value; }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: boolean) { }

  constructor() { }

  ngOnInit(): void {

    this.onChangeModel();
  }

  onToggleChecked(event: Event): void {
    this.value = !this._value;
  }

  onChangeModel() {
    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
