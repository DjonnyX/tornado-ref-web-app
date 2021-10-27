import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import * as _ from "lodash";

export interface IPriceByDevicesData {
  largeOrEqual: number;
  cost: number;
}

@Component({
  selector: 'ta-price-by-devices',
  templateUrl: './price-by-devices.component.html',
  styleUrls: ['./price-by-devices.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PriceByDevicesComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PriceByDevicesComponent),
    multi: true,
  }]
})
export class PriceByDevicesComponent implements OnInit {

  items: Array<IPriceByDevicesData>;

  private _value: Array<IPriceByDevicesData> = [];

  get value() {
    return this._value;
  }

  @Input()
  set value(val: Array<IPriceByDevicesData>) {
    this._value = val || [];

    this.items = _.cloneDeep(this._value);

    this.onChangeModel();
  }

  onTouched = () => { };

  onValidatorChange = () => { };

  onChange(value: Array<IPriceByDevicesData>) { }

  constructor() { }

  ngOnInit(): void {
    this.onChangeModel();
  }

  onChangeModel() {
    this._value = this.items;

    this.onChange(this._value);
    this.onValidatorChange();
  }

  writeValue(value: Array<IPriceByDevicesData>) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = !!this._value && this._value.length > 0;

    return valid ? null : { invalid: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  onAddItem(): void {
    this.items.push({
      largeOrEqual: 0,
      cost: 0,
    });

    this.onChangeModel();
  }

  onChangeItem(itemData: IPriceByDevicesData, index: number) {
    this.items[index].cost = itemData.cost;
    this.items[index].largeOrEqual = itemData.largeOrEqual;
    this.onChangeModel();
  }

  onDeleteItem(itemData: IPriceByDevicesData, index: number) {
    this.items.splice(index, 1);
    this.value = this.items;
  }
}
