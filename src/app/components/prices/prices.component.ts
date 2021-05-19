import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { IPrice, ICurrency } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PricesComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PricesComponent),
    multi: true,
  }]
})
export class PricesComponent implements OnInit {

  currenciesDictionary: { [id: string]: ICurrency };

  @Input() disabled: boolean = false;

  private _currencies: Array<ICurrency>;

  @Input() set currencies(v: Array<ICurrency>) {
    if (!!v) {
      this._currencies = v;

      this.currenciesDictionary = {};
      this._currencies.forEach(currency => {
        this.currenciesDictionary[currency.id] = currency;
      });

      this.normalizePrices();
    }
  }

  get currencies() {
    return this._currencies;
  }

  private _value: Array<IPrice>;

  @Input() set value(v: Array<IPrice>) {
    if (!!v) {
      this._value = v.map(item => ({ ...item }));

      // this.normalizePrices();
    }
  }

  get value() {
    return this._value;
  }

  // @Output() update = new EventEmitter<Array<IPrice>>();

  public onTouched = () => {
    // etc
  }

  public onChange = (value: Array<IPrice>) => {
    // etc
  }

  public onValidatorChange = () => {
    // etc
  }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this.onChange(this.value);
  }

  writeValue(value: Array<IPrice>) {
    this._value = value;
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const isValid = true;

    return isValid ? null : {
      invalid: true,
    };
  }

  onPriceChange(original: IPrice, next: IPrice): void {
    const index = this._value.indexOf(original);

    if (index > -1) {
      this._value[index].currency = next.currency;
      this._value[index].value = next.value;
    }

    // this.update.emit([...this._value]);
    this.onChange(this._value);
  }

  private normalizePrices(): void {
    if (this._value && this._currencies) {
      this._currencies.forEach((currency, index) => {
        if (this._value.length <= index) {
          this._value.push({
            currency: currency.id,
            value: 0,
          });
        }
      });
    }
  }
}
