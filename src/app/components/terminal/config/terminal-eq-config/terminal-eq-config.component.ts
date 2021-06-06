import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ITerminalEQConfig } from '@djonnyx/tornado-types';

const INIT_STATE: ITerminalEQConfig = {
  theme: "light",
  layout: {
    new: {
      columns: 2,
      rows: 5,
    },
    complete: {
      columns: 2,
      rows: 5,
    }
  }
};

@Component({
  selector: 'ta-terminal-eq-config',
  templateUrl: './terminal-eq-config.component.html',
  styleUrls: ['./terminal-eq-config.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerminalEQConfigComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TerminalEQConfigComponent),
    multi: true,
  }]
})
export class TerminalEQConfigComponent implements OnInit, ControlValueAccessor, Validator {

  private _themes: Array<string>;
  @Input() set themes(v: Array<string>) {
    if (this._themes !== v) {
      this._themes = v;

      INIT_STATE.theme = this.mTheme = this._themes?.length ? this._themes[0] : "none";
    }
  }
  get themes() { return this._themes; }

  public mTheme: string = INIT_STATE.theme;
  public mLayoutNewColumns: number = INIT_STATE.layout.new.columns;
  public mLayoutNewRows: number = INIT_STATE.layout.new.rows;
  public mLayoutCompleteColumns: number = INIT_STATE.layout.complete.columns;
  public mLayoutCompleteRows: number = INIT_STATE.layout.complete.rows;

  private _value: ITerminalEQConfig = { ...INIT_STATE };

  get value() {
    return this._value;
  }

  @Input()
  set value(val: ITerminalEQConfig) {
    this._value = val || { ...INIT_STATE };

    this.mTheme = this._value.theme;
    this.mLayoutNewColumns = this._value.layout?.new?.columns;
    this.mLayoutNewRows = this._value.layout?.new?.rows;
    this.mLayoutCompleteColumns = this._value.layout?.complete?.columns;
    this.mLayoutCompleteRows = this._value.layout?.complete?.rows;

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: ITerminalEQConfig) { }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this._value = {
      theme: this.mTheme,
      layout: {
        new: {
          columns: this.mLayoutNewColumns,
          rows: this.mLayoutNewRows,
        },
        complete: {
          columns: this.mLayoutCompleteColumns,
          rows: this.mLayoutCompleteRows,
        },
      }
    };

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: ITerminalEQConfig) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = !!this._value.theme
      && this.mLayoutNewColumns !== undefined && this.mLayoutNewRows !== undefined
      && this.mLayoutCompleteColumns !== undefined && this.mLayoutCompleteRows !== undefined;

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
