import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPrice, ICurrency } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  currenciesDictionary: { [id: string]: ICurrency };

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

  private _prices: Array<IPrice>;

  @Input() set prices(v: Array<IPrice>) {
    if (!!v) {
      this._prices = v.map(item => ({ ...item }));

      this.normalizePrices();
    }
  }

  get prices() {
    return this._prices;
  }

  @Output() update = new EventEmitter<Array<IPrice>>();

  constructor() { }

  ngOnInit(): void { }

  onPriceChange(original: IPrice, price: IPrice): void {
    const index = this._prices.indexOf(original);

    if (index > -1) {
      this._prices[index] = price;
    }

    this.update.emit([...this._prices]);
  }

  private normalizePrices(): void {
    if (this._prices && this._currencies) {
      this._currencies.forEach((currency, index) => {
        if (this._prices.length <= index) {
          this._prices.push({
            currency: currency.id,
            value: 0,
          });
        }
      });
    }
  }
}
