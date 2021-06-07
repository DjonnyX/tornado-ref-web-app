import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

const INITIAL_STATE = [
  "rgb(0,0,0)",
  "rgb(255,255,255)",
];

@Component({
  selector: 'ta-gradient-color-editor',
  templateUrl: './gradient-color-editor.component.html',
  styleUrls: ['./gradient-color-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GradientColorEditorComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => GradientColorEditorComponent),
    multi: true,
  }]
})
export class GradientColorEditorComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() cpPosition: string = 'top-right';

  private _controls: Array<AbstractControl> = [];
  get controls() { return this._controls; }

  private _value: Array<string> = [...INITIAL_STATE];

  get value() {
    return this._value;
  }

  get preview() {
    return `linear-gradient(90deg, ${this._controls.map(c => c.value).join(", ")})`;
  }

  mColors: Array<string> = [...INITIAL_STATE];

  @Input()
  set value(val: Array<string>) {
    this._value = val || [...INITIAL_STATE];

    for (let i = 0, l = Math.max(this._value.length, this._controls.length); i < l; i++) {
      const color = this._value.length > i ? this._value[i] : undefined;
      let control = this._controls.length > i ? this._controls[i] : undefined;

      if (color !== undefined) {
        if (!!control) {
          control.setValue(color);
        } else {
          control = new FormControl(color, Validators.required);
          this._controls.push(control);
        }
      } else {
        this._controls.splice(i, 1);
      }
    }

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: Array<string>) { }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this._value = [
      ...this._controls.map(c => c.value),
    ];

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: Array<string>) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = this._value.length >= 2;

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
