import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPrice, ICurrency } from '@djonnyx/tornado-types';
import { FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base/base-component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ta-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent extends BaseComponent implements OnInit {

  @Input() currenciesDictionary: { [id: string]: ICurrency } = {};

  private _currency: ICurrency;

  @Input() set currency(v: ICurrency) {
    if (this._currency !== v) {
      this._currency = v;

      this.updateValue();
    }
  }

  private _price: IPrice;

  @Input() set price(v: IPrice) {
    if (this._price !== v) {
      this._price = v;

      this.ctrlPrice.setValue((this._price.value * 0.01).toFixed(2));

      this.updateValue();
    }
  }

  @Output() update = new EventEmitter<IPrice>();

  ctrlPrice = new FormControl(0, [Validators.required]);

  private _value: IPrice = {
    currency: null,
    value: 0,
  };

  get value() {
    return this._value;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.ctrlPrice.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {

      this.update.emit({
        currency: this._currency.id,
        value: (value * 100),
      });
    });
  }

  getCurrencyName(): string {
    const currency = this.currenciesDictionary[this._currency.id];
    return !!currency ? currency.name : "Unknown";
  }

  private updateValue(): void {
    this._value = {
      currency: !!this._currency ? this._currency.id : null,
      value: !!this._price ? this._price.value : 0,
    };

    if (!!this._currency && this._currency.active) {
      this.ctrlPrice.enable();
    } else {
      this.ctrlPrice.disable();
    }

    this.update.emit(this._value);
  }
}
