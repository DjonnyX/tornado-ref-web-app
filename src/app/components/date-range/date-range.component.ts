import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base/base-component';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { forwardRef } from '@angular/core';

interface IRange {
  start: Date;
  end: Date;
}

const INIT_STATE: IRange = {
  start: new Date(),
  end: new Date(Date.now() + 84000000),
}

@Component({
  selector: 'ta-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangeComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateRangeComponent),
    multi: true,
  }]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor, Validator {
  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date(Date.now() + 8640000)),
  });

  private _value: IRange = { ...INIT_STATE };

  get value() {
    return this._value;
  }

  @Input()
  set value(val: IRange) {
    this._value = val || { ...INIT_STATE };

    this.range.get("start").setValue(this._value.start);
    this.range.get("end").setValue(this._value.end);

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: IRange) { }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this._value = {
      start: this.range.get("start").value,
      end: this.range.get("end").value,
    };

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: IRange) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = !!this._value.start && !!this._value.end;

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}